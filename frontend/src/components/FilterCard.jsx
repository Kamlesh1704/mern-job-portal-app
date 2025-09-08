import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BrushCleaningIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
  },
  {
    filterType: "Salary",
    array: ["8-40k", "41-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue])
  
 
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Jobs</h2>
        </div>
        
        <RadioGroup onValueChange={changeHandler} value={selectedValue} className="space-y-6">
          {filterData.map((data, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                {data.filterType}
              </h3>
              <div className="space-y-2">
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={idx} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={item} id={itemId} className="text-primary" />
                      <Label 
                        htmlFor={itemId} 
                        className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
        
        <div className="pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => setSelectedValue("")}
          >
            <BrushCleaningIcon className="w-4 h-4" />
            <span>Clear All Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
