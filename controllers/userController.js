import cron from "node-cron";
import { generateToken } from "../config/generateToken.js";
import { sendNotificationEmail } from "../config/mailSetup.js";
import User from "../models/userModel.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        todos: user.todos,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ status: "error", message: "Login Unsuccessful" });
      return;
    }
  } catch (error) {
    res
      .status(error.status)
      .json({ status: "error", message: "error message" });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ status: "error", message: "User already exists" });
      return;
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Registration Unsuccessful" });
      return;
    }
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};

//************************************

cron.schedule("0 0 * * *", async () => {
  const inactiveUsers = await User.find({
    lastLogin: { $lt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  });

  inactiveUsers.forEach((user) => {
    sendNotificationEmail(user.email);
  });
});

//************************************
