import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { SpaceIcon } from "lucide-react";

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((store) => store.job);
  console.log(appliedJobs);
  return (
    <div className="mb-10">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>

            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <span>You havn't applied any job yet.</span>
          ) : (
            <>
              {appliedJobs.map((item) => (
                <TableRow>
                  <TableCell>{`${new Date(item.createdAt).getDay()}/${new Date(item.createdAt).getMonth()}/${new Date(item.createdAt).getFullYear()}`}</TableCell>
                  <TableCell>{item.job.title}</TableCell>
                  <TableCell>{item.job.company.name}</TableCell>
                  <TableCell className="text-right">
                    {item.status === "pending" && <Badge>{item.status}</Badge> }
                    {item.status === "accepted" && <Badge className="bg-green-500">{item.status}</Badge> }
                    {item.status === "rejected" && <Badge className="bg-red-500">{item.status}</Badge> }            
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
