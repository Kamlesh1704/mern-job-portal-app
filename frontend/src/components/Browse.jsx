import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { setSearchedQuery } from "../redux/jobSlice";

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
  return () => {
   dispatch(setSearchedQuery(""));
  }
}, [])

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
         <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs.length <= 0 ? (
            <span>No Job Found</span>
          ) : (
            <>
              {allJobs.map((item) => {
                return <Job job={item} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
