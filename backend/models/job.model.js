import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    requirements:[
        {type: String}
    ],
    salary: {
        type: Number,
        required: true
    },
    experienceLevel:{
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    positions:{
        type: Number,
        required: true,
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required: true,
    },
    created_by:{
        type: String,
        required: true
    },
    applications:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
    userSaved:[
     {type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }
    ],
    createdAt:{
        type:String,
        default: new Date()
    }
},{timestamps: true});

export const Job = mongoose.model("Job", jobSchema);