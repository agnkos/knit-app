import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login, { action as loginAction } from "./pages/Login";
import Layout from './components/Layout';
import Signup, { action as signupAction } from "./pages/Signup";
import Dashboard from './pages/User/Dashboard';
import Projects, { loader as projectsLoader } from './pages/User/Projects';
import Queue, { loader as queuedItemsLoader } from './pages/User/Queue';
import Stash, { loader as stashLoader } from './pages/User/Stash';
import AddProject, { action as addProjectAction } from './pages/AddProject';
import ProjectDetail, { loader as projectDetailLoader } from './pages/User/ProjectDetail';
import EditProject, { action as editProjectAction } from './pages/EditProject';
import QueueModal, { action as addToQueueAction } from './components/QueueModal';
import ErrorPage from './pages/ErrorPage';
import AddStashItem, { action as addStashItemAction } from './pages/AddStashItem';
import StashItemDetail, { loader as stashItemDetailLoader } from './pages/User/StashItemDetail';
import EditStashItem, { action as editItemAction } from './pages/EditStashItem';
import Notes, { loader as notesLoader } from './pages/User/Notes';
import AddNote, { action as addNoteAction } from './pages/AddNote';
import NoteDetail, { loader as noteDetailLoader, action as noteDetailAction } from './pages/User/NoteDetail';

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />} errorElement={<ErrorPage />}>
    <Route path="/" element={<Login />} action={loginAction} />
    <Route path="signup" element={<Signup />} action={signupAction} />
    <Route element={<Dashboard />} errorElement={<ErrorPage />}>
      <Route path="projects" index element={<Projects />} loader={projectsLoader} />
      <Route path="queue" element={<Queue />} loader={queuedItemsLoader} >
        <Route path="add" element={<QueueModal />} action={addToQueueAction} />
      </Route>
      <Route path="stash" element={<Stash />} loader={stashLoader} />
      <Route path="addstashitem" element={<AddStashItem />} action={addStashItemAction} />
      <Route path="stash/:id" element={<StashItemDetail />} loader={stashItemDetailLoader} />
      <Route path="stash/:id/edit" element={<EditStashItem />} loader={stashItemDetailLoader} action={editItemAction} />
      <Route path="addproject" element={<AddProject />} action={addProjectAction} />
      <Route path="projects/:id" element={<ProjectDetail />} loader={projectDetailLoader} />
      <Route path="projects/:id/edit" element={<EditProject />} loader={projectDetailLoader} action={editProjectAction} />
      <Route path="notes" element={<Notes />} loader={notesLoader} />
      <Route path="notes/:id" element={<NoteDetail />} loader={noteDetailLoader} action={noteDetailAction}/>
      <Route path="addnote" element={<AddNote />} action={addNoteAction} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Route >
))

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}