import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002]">
          No. 1 Job Hunt Website
        </span>
        <h1 className="font-bold text-5xl py-2 font-stretch-50% ">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6a3bc2]">Dream Jobs</span>
        </h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, exercitationem?</p>
      <div className="flex w-[40%] h-10 pl-5 shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input type="text" 
        placeholder="Find your dream jobs"
        className="outline-none border-none w-full"
        onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
        />
    <Button onClick={() => navigate("/browse")} className="rounded-r-full h-10 bg-[#6a38c2]" ><Search className="h-5 w-5"/></Button>
      </div>
      </div>
    </div>
  );
};

export default HeroSection;
