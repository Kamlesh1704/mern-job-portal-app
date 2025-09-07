import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User2, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setAuthUser } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">
              Job<span className="text-foreground">Portal</span>
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-primary transition-colors duration-200 focus-ring">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-primary transition-colors duration-200 focus-ring">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-primary transition-colors duration-200 focus-ring">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-primary transition-colors duration-200 focus-ring">
                    Jobs
                  </Link>
                </li>
                             <li>
                  <Link to="/jobs/saved" className="hover:text-primary transition-colors duration-200 focus-ring">
                    Saved
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="btn-animate focus-ring">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-animate focus-ring">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user.profile.profilePhoto
                        ? user.profile.profilePhoto
                        : "data:image/png;base64,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"
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex  gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user.profile.profilePhoto
                            ? user.profile.profilePhoto
                            : "data:image/png;base64,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"
                        }
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.profile.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5 text-gray-600">
                  {
                    user && user.role === "student" && (

                    <div className="flex mb-3 w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <button varient="link">
                        <Link to="/profile">View Profile</Link>
                      </button>
                    </div>
                    )
                  }
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <button onClick={logoutHandler} varient="link">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
