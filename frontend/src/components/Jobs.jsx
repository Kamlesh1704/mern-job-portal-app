import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { setSearchedQuery } from "../redux/jobSlice";
import {motion} from "framer-motion"

const Jobs = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
  const {user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
  
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <motion.div 
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}
                  key={job._id}>
                    <Job job={job}
                    isSaved={user.savedJobs.map((item) => (item._id == job._id))}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
