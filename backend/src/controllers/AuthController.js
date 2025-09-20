import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { envConfig } from "../configs/index.js";

// Move this to env in future
const ACCESS_SECRET = envConfig.JWT_ACCESS_SECRET;
const REFRESH_SECRET = envConfig.JWT_REFRESH_SECRET;

// ✅ Generate tokens
function generateTokens(user) {
  const accessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

// ✅ Signup
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const tokens = generateTokens(user);

    // Store refresh token in httpOnly cookie
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false, // set true in production with HTTPS
      sameSite: "strict",
    });

    res.json({ accessToken: tokens.accessToken, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Refresh
export const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  });
};

// ✅ Signout
export const signout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
  res.json({ message: "Signed out successfully" });
};

// ✅ Protected Route Example
export const protectedRoute = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ message: "Protected data", user });
  });
};
