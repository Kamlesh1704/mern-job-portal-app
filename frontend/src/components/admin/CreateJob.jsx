import React, {  useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CompanySetup = () => {
 
  useGetAllCompanies();
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: [],
    salary: null,
    location: "",
    jobType: "",
    experience: null,
    positions: null,
    companyId: null,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value.toLowerCase());
    setInput({...input, companyId: selectedCompany._id});
   
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate("/admin/jobs")}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Create New Job</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <Label className="mb-2.5">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-2.5">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>{" "}
            <div>
              <Label className="mb-2.5">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>{" "}
            <div>
              <Label className="mb-2.5">Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-2.5">Location</Label>
              <Input
                type="text"
                name="location"
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-2.5">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-2.5">Experience(in Year)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-2.5">Positions</Label>
              <Input
                type="number"
                name="positions"
                value={input.positions}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="mb-2.5">Company</Label>

              <Select onValueChange={changeSelectHandler}>
                <SelectTrigger className="w-125">
                  <SelectValue placeholder=" Select a Company" />
                </SelectTrigger>
                <SelectContent >
                  {companies.map((company) => (
                    <SelectItem  value={company.name}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {companies.length <= 0 ? (
            <span className="text-red-600 font-medium mx-90 ">
              Please Registered a Company First
            </span>
          ) : (
            <>
              {loading ? (
                <Button className="w-full my-6">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-6">
                  Create
                </Button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
