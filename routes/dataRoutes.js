const express = require("express");
const axios = require("axios");
const User = require("../models/User");

const router = express.Router();

router.get("/api/user", async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findOne({ fitbitId: req.user.fitbitId });

        if (!user) return res.status(404).json({ message: "User not found" });

        const response = await axios.get("https://api.fitbit.com/1/user/-/profile.json", {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Fitbit data:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
});

module.exports = router;
