//steps:
//search shadcn with vite
//make jsconfig.app.json and jsconfig.json on place of tsconfig.app.json and tsconfig.json
//follow steps to create vite app with shadcn ui
//remove app.css code
//search for component on shadcn.com and install it and use it
//then i can see ui folder in component folder , where all shadcn ui component present

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import CreateJob from "./components/admin/CreateJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { ProtectedRoute2 } from "./components/ProtectedRoute2";
import SavedJobs from "./components/SavedJobs";
import ForgetPassword from "./components/auth/ForgetPassword";
import ResetPassword from "./components/auth/ResetPassword";

const appRouter = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute2>
        <Jobs />,
      </ProtectedRoute2>
    ),
  },
  {
    path: "/jobs/saved",
    element: (
      <ProtectedRoute2>
        <SavedJobs />,
      </ProtectedRoute2>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <ProtectedRoute2>
        <JobDescription />,
      </ProtectedRoute2>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoute2>
        <Browse />,
      </ProtectedRoute2>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute2>
        <Profile />,
      </ProtectedRoute2>
    ),
  },
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <CreateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
