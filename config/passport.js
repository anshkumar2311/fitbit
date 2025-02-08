const passport = require("passport");
const FitbitStrategy = require("passport-fitbit-oauth2").FitbitOAuth2Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
    new FitbitStrategy(
        {
            clientID: process.env.FITBIT_CLIENT_ID,
            clientSecret: process.env.FITBIT_CLIENT_SECRET,
            callbackURL: process.env.FITBIT_REDIRECT_URI,
            scope: ["activity", "heartrate", "sleep", "profile"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ fitbitId: profile.id });

                if (!user) {
                    user = new User({
                        fitbitId: profile.id,
                        accessToken,
                        refreshToken,
                        expiresIn: 3600,
                    });
                    await user.save();
                } else {
                    user.accessToken = accessToken;
                    user.refreshToken = refreshToken;
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
