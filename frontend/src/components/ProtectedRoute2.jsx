import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute2 = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  
  return <>{children}</>;
};
