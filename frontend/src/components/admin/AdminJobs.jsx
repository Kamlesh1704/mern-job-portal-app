import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const Companies = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    
    useEffect(() => {
     dispatch(setSearchJobByText(input));
    }, [input])

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center justify-between my-6">
        <Input onChange={(e)=> setInput(e.target.value)} className="w-fit" placeholder="Filter by name" />
         <Button onClick = {() => navigate("/admin/jobs/create")}>New Job</Button>
               
        </div>
        <AdminJobsTable />

      </div>
    </div>
  );
};

export default Companies;
