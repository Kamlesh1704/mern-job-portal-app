import React from 'react'
import ApplicantsTable from './ApplicantsTable'
import Navbar from "../shared/Navbar.jsx"
import { useParams } from 'react-router-dom'
import useGetApplicants from '../../hooks/useGetApplicants.jsx'
import { useSelector } from 'react-redux'
const Applicants = () => {
  const params = useParams();
  useGetApplicants(params.id);
  const { jobApplications } = useSelector((store) => store.application);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants ({jobApplications.length})</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants
