import React, { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setJobApplications } from "../redux/applicationSlice";

const useGetApplicants = (jobId) => {
    const dispatch = useDispatch();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setJobApplications(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, []);
};

export default useGetApplicants;
