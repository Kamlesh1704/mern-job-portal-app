import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    
    useEffect(() => {
     dispatch(setSearchCompanyByText(input));
    }, [input])

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center justify-between my-6">
        <Input onChange={(e)=> setInput(e.target.value)} className="w-fit" placeholder="Filter by name" />
        <Button onClick = {() => navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompaniesTable />

      </div>
    </div>
  );
};

export default Companies;
