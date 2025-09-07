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
    <div className="w-full bg-white p-3 rounded-md ">
      <Button
              variant="outline"
              className=" min-w-30 flex items-center gap-2 text-gray-500 font-semibold mb-4 ml-3"
              onClick={() =>navigate("/")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg ">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex  items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
      <Button
              variant="outline"
              className=" min-w-30 flex items-center gap-2 text-gray-700 font-semibold mt-5 ml-3"
              onClick={() =>setSelectedValue("")}
            >
              <BrushCleaningIcon />
              <span >Clear Filter</span>
            </Button>
    </div>
  );
};

export default FilterCard;
