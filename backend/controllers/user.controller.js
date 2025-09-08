import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    let SECURE_URL;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      SECURE_URL = cloudResponse.secure_url;
    } else {
      SECURE_URL = "";
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: SECURE_URL,
      },
    });

    return res.status(201).json({
      message: "Account created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email }).populate({
      path: "savedJobs",
      populate: {
        path: "company",
      },
    });

    if (!user) {
      res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    //check role is correct or not
    if (role !== user.role) {
      res.status(400).json({
        message: "Account doesn't exist with currect role.",
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      savedJobs: user.savedJobs,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // typo fixed (not httpsOnly)
        secure: true, // true because your backend is https:// on Render
        sameSite: "None", // needed for cross-site cookie
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    // Support both resume file (name: file) and profile photo (name: profilePhoto)
    const files = req.files || {};
    const resumeFile = Array.isArray(files.file) ? files.file[0] : undefined;
    const photoFile = Array.isArray(files.profilePhoto) ? files.profilePhoto[0] : undefined;
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;

    let user = await User.findById(userId);

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // Upload resume if present
    if (resumeFile) {
      const fileUri = getDataUri(resumeFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        format: "pdf",
      });
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }
    // Upload profile photo if present
    if (photoFile) {
      const fileUri = getDataUri(photoFile);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "profile_photos",
        resource_type: "image",
      });
      user.profile.profilePhoto = cloudResponse.secure_url;
    }
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetPassEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No account with this email" });
    }

    const otp = ("" + Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiresAt = expiresAt;
    await user.save();

    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "Support"}" <${process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
      to: email,
      subject: `${otp} is your OTP to Reset Password`,
      text: `${otp} is your OTP to Reset Password`,
      html: `<p>Your OTP to reset password is <strong>${otp}</strong>. It expires in 10 minutes.</p>`,
    });

    return res.status(200).json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.resetPasswordOtp || !user.resetPasswordOtpExpiresAt) {
      return res.status(400).json({ success: false, message: "OTP not found. Please request again." });
    }

    if (user.resetPasswordOtpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    }

    if (String(user.resetPasswordOtp) !== String(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark verified by clearing OTP but issuing a short-lived token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Temporarily store token in user document with short expiry
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    // Reuse the field to hold token expiry; store token in memory variable to return
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified", resetToken, email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Optional: ensure within reset window
    if (user.resetPasswordOtpExpiresAt && user.resetPasswordOtpExpiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "Reset window expired. Please request again." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to update password" });
  }
};