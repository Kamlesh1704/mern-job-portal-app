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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterCard />
            </div>
          </div>
          
          {/* Jobs Grid */}
          <div className="flex-1">
            {allJobs.length <= 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {allJobs.length} Job{allJobs.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {allJobs.map((job) => (
                    <motion.div 
                      initial={{opacity:0, y:20}}
                      animate={{opacity:1, y:0}}
                      exit={{opacity:0, y:-20}}
                      transition={{duration:0.3}}
                      key={job._id}
                    >
                      <Job 
                        job={job}
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
    </div>
  );
};

export default Jobs;
