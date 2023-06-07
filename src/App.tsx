import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login, { action as loginAction } from "./pages/Login";
import Layout from './components/Layout';
import Signup, { action as signupAction } from "./pages/Signup";
// import UserLayout from './components/UserLayout';
import Dashboard from './pages/User/Dashboard';
import Projects, { loader as projectsLoader } from './pages/User/Projects';
import Queue, { loader as queuedItemsLoader } from './pages/User/Queue';
import Stash from './pages/User/Stash';
import Notes from './pages/User/Notes';
import AddProject, { action as addProjectAction } from './pages/AddProject';
import ProjectDetail, { loader as projectDetailLoader } from './pages/User/ProjectDetail';
import EditProject, { action as editAction } from './pages/EditProject';
import QueueModal, { action as addToQueueAction } from './components/QueueModal';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Login />} action={loginAction} />

    <Route path="signup" element={<Signup />} action={signupAction} />

    <Route element={<Dashboard />}>
      <Route path="projects" index element={<Projects />} loader={projectsLoader} />
      <Route path="queue" element={<Queue />} loader={queuedItemsLoader}>
        <Route path="add" element={<QueueModal />} action={addToQueueAction} />
      </Route>
      <Route path="stash" element={<Stash />} />
      <Route path="notes" element={<Notes />} />
      <Route path="addproject" element={<AddProject />} action={addProjectAction} />
      <Route path="projects/:id" element={<ProjectDetail />} loader={projectDetailLoader} />
      <Route path="projects/:id/edit" element={<EditProject />} loader={projectDetailLoader} action={editAction} />
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