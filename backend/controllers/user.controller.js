import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { z } from "zod/v4";
import jwt from "jsonwebtoken";
import config from "../config.js";
export const signup = async (req, res) => {
  const { username, password } = req.body;

  const userSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 chars long" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 chars long" }),
  });

  const validatedData = userSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(400)
      .json({ errors: validatedData.error.issues.map((err) => err.message) });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcryptjs.hash(password, 10);

    // else
    const createdUser = new User({
      username: username,
      password: hashpassword,
    });

    await createdUser.save();
    res.status(201).json({
      message: "User created successfully",
      // user: {
      //   _id: createdUser._id,
      //   name: createdUser.name,
      //   email: createdUser.email,
      // },
    });
  } catch (error) {
    res.status(500).json({ message: "signup error" });
    console.log("error in signup ", error);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    //jwt
    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_USER_PASSWORD,
      { expiresIn: "1d" }
    );

    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true, //sp that cookie cant be accessed thru js directly
      secure: process.env.NODE_ENV === "production", //true for https only in prod not in dev since it is http rn
      sameSite: "Strict", //CSRF attacks prevention
    };
    //"jwt" is the name
    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "error in login" });
    console.log("error in login", error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in logout" });
    console.log("error in logout", error);
  }
};
