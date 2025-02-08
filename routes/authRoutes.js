const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
    "/auth/fitbit",
    passport.authenticate("fitbit", { scope: ["activity", "heartrate", "sleep", "profile"] })
);

router.get(
    "/auth/fitbit/callback",
    passport.authenticate("fitbit", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/api/user");
    }
);

router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

module.exports = router;
