import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login, { action as loginAction } from "./pages/Login";
import Layout from './components/Layout';
import Signup, { action as signupAction } from "./pages/Signup";
// import UserLayout from './components/UserLayout';
import Dashboard from './pages/User/Dashboard';
import Projects, { loader as projectLoader } from './pages/User/Projects';
import Queue from './pages/User/Queue';
import Stash from './pages/User/Stash';
import Notes from './pages/User/Notes';
import AddProject, { action as addProjectAction } from './pages/User/AddProject';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Login />} action={loginAction} />

    <Route path="signup" element={<Signup />} action={signupAction} />

    <Route path="dashboard" element={<Dashboard />}>
      <Route index element={<Projects />} loader={projectLoader} />
      <Route path="queue" element={<Queue />} />
      <Route path="stash" element={<Stash />} />
      <Route path="notes" element={<Notes />} />
      <Route path="addproject" element={<AddProject />} action={addProjectAction} />
    </Route>
  </Route>
))

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}