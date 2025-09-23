import { Admin } from "../models/admin.model.js";
import bcryptjs from "bcryptjs";
import { z } from "zod/v4";
import jwt from "jsonwebtoken";
import config from "../config.js";
export const signup = async (req, res) => {
  const { username, password } = req.body;

  const adminSchema = z.object({
    username: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 chars long" }),
  });

  const validatedData = adminSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res
      .status(400)
      .json({ errors: validatedData.error.issues.map((err) => err.message) });
  }
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "admin already exists" });
    }

    const hashpassword = await bcryptjs.hash(password, 10);

    //else
    const createdUser = new Admin({
      username: username,
      password: hashpassword,
    });

    await createdUser.save();
    res.status(201).json({
      message: "Admin created successfully",
      //   user: {
      // _id: createdUser._id,
      // name: createdUser.name,
      // email: createdUser.email,
      //   },
    });
  } catch (error) {
    res.status(500).json({ message: "signup error" });
    console.log("error in signup ", error);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    const isMatch = await bcryptjs.compare(password, admin.password);
    if (!admin || !isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    //jwt
    const token = jwt.sign(
      {
        id: admin._id,
      },
      config.JWT_ADMIN_PASSWORD,
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
      admin,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "error in login" });
    console.log("error in login", error);
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ message: "You are not logged in" });
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "error in logout" });
    console.log("error in logout", error);
  }
};
