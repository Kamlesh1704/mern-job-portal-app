import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
const LatestJobCards = (props) => {
  const { job} = props;
 const navigate = useNavigate();
  return (
    <div  className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer" onClick={() => navigate(`/description/${job._id}`)}>
      <div>
        <h1 className="font-medium text-lg">{job.company.name}</h1>
        <p className="text-sm text-gray-500">india</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-gray-600 text-sm">{job.description}.</p>
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
    </div>
  );
};

export default LatestJobCards;
