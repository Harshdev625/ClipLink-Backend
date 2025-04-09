const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, password });
      await user.save();
      console.log("User created. Hashed password:", user.password);
    } else {
      console.log("User found. Hashed password:", user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Comparing passwords: ", password, "==", user.password, " => ", isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
