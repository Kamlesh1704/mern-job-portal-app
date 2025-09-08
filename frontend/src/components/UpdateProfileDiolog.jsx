import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

const UpdateProfileDiolog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.bio,
    skills: user.profile.skills.map((skill) => skill),
    file: user.profile.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try{
setLoading(true);
        const res = await axios.post(
          `${USER_API_END_POINT}/profile/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        console.log(res)
        if(res.data.success){
            dispatch(setAuthUser(res.data.user));
            toast.success(res.data.message);
        }
    }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
    setOpen(false);


  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm: max-w-[425px] "
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-col-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="text"
                    onChange={changeEventHandler}
                    id="name"
                    value={input.fullname}
                    name="fullname"
                    className="col-span-3"
                  />
                </div>
                <div className="grid gri-col-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    onChange={changeEventHandler}
                    type="email"
                    id="email"
                    value={input.email}
                    name="email"
                    className="col-span-3"
                  />
                </div>
                <div className="grid gri-col-4 items-center gap-4">
                  <Label htmlFor="Number" className="text-right">
                    Number
                  </Label>
                  <Input
                    value={input.phoneNumber}
                    type="number"
                    id="Number"
                    onChange={changeEventHandler}
                    name="phoneNumber"
                    className="col-span-3"
                  />
                </div>
                <div className="grid gri-col-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input
                    onChange={changeEventHandler}
                    value={input.bio}
                    type="text"
                    id="bio"
                    name="bio"
                    className="col-span-3"
                  />
                </div>
                <div className="grid gri-col-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Skills
                  </Label>
                  <Input
                    onChange={changeEventHandler}
                    value={input.skills}
                    id="skills"
                    name="skills"
                    className="col-span-3"
                  />
                </div>
                <div className="grid gri-col-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Resume
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={changeFileHandler}
                    accept="application/pdf"
                    name="file"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4">
                    {" "}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                  Update  
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDiolog;
