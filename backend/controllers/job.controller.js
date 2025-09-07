import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      positions,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      positions,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    let user = await User.findById(userId);
    user.savedJobs.push(jobId);
    await user.save();

    let job = await Job.findById(jobId);
    job.userSaved.push(userId);
    await job.save();

    user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: "company",
    });
    let allJobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Job Saved Successfully",
      user,
      allJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unsaveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    let user = await User.findById(userId);
    user.savedJobs = user.savedJobs.filter(
      (job) => job.toString() !== jobId.toString()
    );
    await user.save();

    let job = await Job.findById(jobId);
    job.userSaved = job.userSaved.filter(
      (item) => item.toString() !== userId.toString()
    );
    await job.save();

    user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: "company",
    });
    let allJobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Job UnSaved Successfully",
      user,
      allJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
