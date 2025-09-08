import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDiolog from "./UpdateProfileDiolog";
import { useDispatch, useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { setAuthUser } from "../redux/authSlice";

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen]  = useState(false);
const {user} = useSelector(store => store.auth);
const dispatch = useDispatch();

const handleProfilePhotoChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("profilePhoto", file);
  try{
    const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    if(res.data?.success){
      dispatch(setAuthUser(res.data.user));
      toast.success("Profile photo updated");
    }
  }catch(err){
    toast.error(err.response?.data?.message || "Failed to update photo");
  }finally{
    // reset input so same file can be selected again if needed
    e.target.value = "";
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                  <AvatarImage src={user.profile.profilePhoto} />
                </Avatar>
                <label htmlFor="profilePhotoInput" className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
                  <Pen className="w-4 h-4 text-white" />
                </label>
                <input id="profilePhotoInput" type="file" accept="image/*" className="hidden" onChange={handleProfilePhotoChange} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.fullname}</h1>
                <p className="text-gray-600 mb-3">
                  {user.profile.bio || "No bio available"}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Contact className="w-4 h-4" />
                    <span>{user.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setOpen(true)} 
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors"
            >
              <Pen className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          {/* Skills Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.length !== 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge key={index} className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                    {item}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>
          
          {/* Resume Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
            {isResume ? (
              <a
                target="blank" 
                href={user.profile.resume}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <p className="text-gray-500 italic">No resume uploaded</p>
            )}
          </div>
        </div>
        
        {/* Applied Jobs Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>
      
      <UpdateProfileDiolog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
