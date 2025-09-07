import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CreativeCommons, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) =>
      job.title.toLowerCase().includes(searchJobByText.toLowerCase())
    );
    setFilterJobs(filteredJobs);
  }, [searchJobByText, allAdminJobs]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        {allAdminJobs.length <= 0 ? (
          <span>You haven't Registered any Job yet.</span>
        ) : (
          <>
            {filterJobs.length <= 0 ? (
              <span>0 Search Result</span>
            ) : (
              <>
                {filterJobs.map((job) => {
                  return (
                    <TableBody>
                      <TableCell>{job.company.name}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>
                        {new Date(job.createdAt).toDateString()}
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger>
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div
                              onClick={() => {
                                navigate(`/admin/jobs/${job._id}/applicants`);
                              }}
                              className="flex items-center w-fit gap-2 cursor-pointer mb-2"
                            >
                              <Eye className="w-4" />
                              <span>Applicants</span>
                            </div>
                            <div
                              onClick={() => {
                                navigate(`/admin/companies/${job._id}`);
                              }}
                              className="flex items-center w-fit gap-2 cursor-pointer "
                            >
                              <Edit2 className="w-4" />
                              <span>Edit</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableBody>
                  );
                })}
              </>
            )}
          </>
        )}
      </Table>
    </div>
  );
};

export default AdminJobsTable;
