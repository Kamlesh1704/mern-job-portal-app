import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {

const navigate = useNavigate();
const {allJobs} = useSelector(store => store.job);

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Latest
            </span>{" "}
            Job Openings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most recent job opportunities from top companies. 
            Stay ahead of the competition with our curated selection of fresh openings.
          </p>
        </div>
        
        {allJobs.length <= 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Available</h3>
            <p className="text-gray-600">Check back soon for new opportunities!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs.slice(0, 6).map((job) => (
              <LatestJobCards job={job} key={job._id} />
            ))}
          </div>
        )}
        
        {allJobs.length > 6 && (
          <div className="text-center mt-12">
            <button onClick={() => navigate("/jobs")} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              View All Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
