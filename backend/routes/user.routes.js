import express from 'express';
import { login, logout, register, sendResetPassEmail, updatePassword, updateProfile, verifyOtp } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload, fieldsUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload,  register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(fieldsUpload, isAuthenticated, updateProfile);
router.route("/sendResetPassEmail").post(sendResetPassEmail);
router.route("/verifyOtp").post(verifyOtp);
router.route("/updatePassword").post(updatePassword);

export default router;