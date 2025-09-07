import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
const JobDescription = () => {
  const [singleJob, setSingleJob] = useState({});
  const params = useParams();
  const jobId = params.id;
  const {user} = useSelector(store => store.auth);
const navigate = useNavigate();
  
  const [isApplied, setIsApplied] = useState( singleJob?.applications?.includes(user._id) || false);
 
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        
        if(res.data.success){
          setSingleJob(res.data.job);
         setIsApplied( res.data.job.applications?.includes(user._id) || false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, user._id]);
  

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{},{
        withCredentials: true
      })
      if(res.data.success){
        
          setIsApplied(true);
          setSingleJob(res.data.job);
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }


  return (
    <div className="max-w-6xl mx-auto my-18">
        <div className="mb-10">
           <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() =>navigate("/jobs")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
        </div>
        <div className="max-w-5xl mx-auto my-10">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
               {singleJob.positions} position
            </Badge>
            <Badge className="text-[#f83002] font-bold" variant="ghost">
              {singleJob.salary} LPA
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob.jobType}
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          //onClick = {isApplied? null:applyJobHandler}
          onClick = {applyJobHandler}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "cursor-pointer bg-[#7209b7] hover:bg-[#5f32ad"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply"}
        </Button>
      </div>
      <h1 className="mt-3 border-b-2 border-b-gray-300 font-medium py-4">
        Job description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
        {singleJob.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
      {singleJob.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
          {singleJob.experienceLevel}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
          {singleJob.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length || 0}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {new Date(singleJob?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </h1>
      </div>
        </div>
    </div>
  );
};

export default JobDescription;
