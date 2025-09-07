import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
const ApplicantsTable = () => {
  const { jobApplications } = useSelector((store) => store.application);
  console.log(jobApplications);

  const updateStatus = async (status, applicationId) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${applicationId}/update`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <div>
      <Table>
        <TableCaption>A list of this Job Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        {jobApplications.length <= 0 ? (
          <span>No Applicant Applied till now</span>
        ) : (
          <>
            {jobApplications.map((application) => (
              <TableBody>
                <TableCell>{application.applicant.fullname}</TableCell>
                <TableCell>{application.applicant.email}</TableCell>
                <TableCell>{application.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {application.applicant.profile.resume ? (
                    <a
                      href={application.applicant.profile.resume}
                      target="_blank"
                      className="hover: text-blue-500 hover:border-blue-500 hover:border-b-1"
                    >
                      {application.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{`${new Date(
                  application.createdAt
                ).getDay()}/${new Date(
                  application.createdAt
                ).getMonth()}/${new Date(
                  application.createdAt
                ).getFullYear()}`}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          updateStatus("Accepted", application._id)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer mb-2"
                      >
                        Accepted
                      </div>
                      <div
                        onClick={() =>
                          updateStatus("Rejected", application._id)
                        }
                        className="flex items-center w-fit gap-2 cursor-pointer "
                      >
                        Rejected
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableBody>
            ))}
          </>
        )}
      </Table>
    </div>
  );
};

export default ApplicantsTable;
