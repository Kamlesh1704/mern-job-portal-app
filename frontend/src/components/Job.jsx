import React from "react";
import { Button } from "./ui/button";
import { Bookmark, BookMarked ,BookmarkX} from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import { setAllJobs } from "../redux/jobSlice";
const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const route = useLocation();

  const daysAgoFunc = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  const saveJobHandler = async (id) => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/save/${id}`, {
        withCredentials: true,
      });
      dispatch(setAuthUser(res.data.user));
      dispatch(setAllJobs(res.data.allJobs));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

  const unSaveJobHandler = async (id) => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/unsave/${id}`, {
        withCredentials: true,
      });
      dispatch(setAuthUser(res.data.user));
      dispatch(setAllJobs(res.data.allJobs));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message);
    }
  };

console.log(job);
  const isSaved = job.userSaved && job.userSaved.includes(user._id);
  console.log(isSaved);
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunc(job.createdAt) === 0
            ? "Today"
            : `${daysAgoFunc(job.createdAt)} days ago`}
        </p>
        {
          route.pathname === "/jobs/saved" ? (
            <>
            <Button
                  variant="outline"
                  className="rounded-full"
                  size="icon"
                  onClick={() => unSaveJobHandler(job._id)}
                >
                  <BookmarkX />
                </Button>
            </>
          ):(
            <>
            
            {isSaved ? (
              <>
                <Button variant="outline" className="rounded-full" size="icon">
                  <BookMarked />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="rounded-full"
                  size="icon"
                  onClick={() => saveJobHandler(job._id)}
                >
                  <Bookmark />
                </Button>
              </>
            )}
            </>
          )
        }
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage
              src={
                job.company.logo
                  ? `${job.company.logo}`
                  : "data:image/png;base64,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"
              }
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.company.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description} </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job.positions} position
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job.salary} LPA
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job.jobType}
        </Badge>
      </div>
      <div className="flex gap-3 py-2">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
        >
          details
        </Button>

        {route.pathname === "/jobs/saved" ? (
          <>
            <Button className="bg-[#7209b7] cursor-pointer"
            onClick={() => unSaveJobHandler(job._id)}>
              Unsave
            </Button>
          </>
        ) : (
          <>
            {isSaved ? (
              <>
                <Button className="bg-[#9f7ab8] disabled:cursor-not-allowed hover:bg-[#9f7ab8] ">
                  Saved
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-[#7209b7] cursor-pointer"
                  onClick={() => saveJobHandler(job._id)}
                >
                  save for later{" "}
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Job;
