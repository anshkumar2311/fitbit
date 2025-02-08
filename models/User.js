const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fitbitId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiresIn: { type: Number, required: true },
});

module.exports = mongoose.model("User", UserSchema);
