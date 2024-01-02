import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Layout from './components/Layout';
import { Login } from "./pages/LoginPage";
import { action as loginAction } from "./pages/LoginPage/action";
import { Signup } from "./pages/SignupPage";
import { action as signupAction } from "./pages/SignupPage/action";
import Dashboard from './pages/User/Dashboard';
import Projects, { loader as projectsLoader } from './pages/User/Projects';
import Queue, { loader as queuedItemsLoader } from './pages/User/Queue';
import Stash, { loader as stashLoader } from './pages/User/Stash';
import { AddProject } from './pages/AddProjectPage';
import { action as addProjectAction } from './pages/AddProjectPage/action';
import ProjectDetail, { loader as projectDetailLoader } from './pages/User/ProjectDetail';
import { EditProject } from './pages/EditProjectPage';
import { action as editProjectAction } from './pages/EditProjectPage/action'
import { EditStashItem } from './pages/EditStashItemPage';
import { action as editItemAction } from './pages/EditStashItemPage/action';
import QueueModal, { action as addToQueueAction } from './components/QueueModal';
import ErrorPage from './pages/ErrorPage';
import { AddStashItem } from './pages/AddStashItemPage/';
import { action as addStashItemAction } from './pages/AddStashItemPage/action';
import StashItemDetail, { loader as stashItemDetailLoader } from './pages/User/StashItemDetail';
import Notes, { loader as notesLoader } from './pages/User/Notes';
import { AddNote } from './pages/AddNotePage';
import { action as addNoteAction } from './pages/AddNotePage/action'
import NoteDetail, { loader as noteDetailLoader, action as noteDetailAction } from './pages/User/NoteDetail';

export const testRoutes = 
  <Route element={<Layout />} errorElement={<ErrorPage />}>
    <Route path='/' element={<Login />} action={loginAction} />
    <Route path='signup' element={<Signup />} action={signupAction} />
    <Route element={<Dashboard />} errorElement={<ErrorPage />}>
      <Route
        path='projects'
        index
        element={<Projects />}
        loader={projectsLoader}
      />
      <Route path='queue' element={<Queue />} loader={queuedItemsLoader}>
        <Route
          path='add'
          element={<QueueModal />}
          action={addToQueueAction}
        />
      </Route>
      <Route path='stash' element={<Stash />} loader={stashLoader} />
      <Route
        path='addstashitem'
        element={<AddStashItem />}
        action={addStashItemAction}
      />
      <Route
        path='stash/:id'
        element={<StashItemDetail />}
        loader={stashItemDetailLoader}
      />
      <Route
        path='stash/:id/edit'
        element={<EditStashItem />}
        loader={stashItemDetailLoader}
        action={editItemAction}
      />
      <Route
        path='addproject'
        element={<AddProject />}
        action={addProjectAction}
      />
      <Route
        path='projects/:id'
        element={<ProjectDetail />}
        loader={projectDetailLoader}
      />
      <Route
        path='projects/:id/edit'
        element={<EditProject />}
        loader={projectDetailLoader}
        action={editProjectAction}
      />
      <Route path='notes' element={<Notes />} loader={notesLoader} />
      <Route
        path='notes/:id'
        element={<NoteDetail />}
        loader={noteDetailLoader}
        action={noteDetailAction}
      />
      <Route path='addnote' element={<AddNote />} action={addNoteAction} />
    </Route>
    <Route path='*' element={<ErrorPage />} />
  </Route>


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route path='/' element={<Login />} action={loginAction} />
      <Route path='signup' element={<Signup />} action={signupAction} />
      <Route element={<Dashboard />} errorElement={<ErrorPage />}>
        <Route
          path='projects'
          index
          element={<Projects />}
          loader={projectsLoader}
        />
        <Route path='queue' element={<Queue />} loader={queuedItemsLoader}>
          <Route
            path='add'
            element={<QueueModal />}
            action={addToQueueAction}
          />
        </Route>
        <Route path='stash' element={<Stash />} loader={stashLoader} />
        <Route
          path='addstashitem'
          element={<AddStashItem />}
          action={addStashItemAction}
        />
        <Route
          path='stash/:id'
          element={<StashItemDetail />}
          loader={stashItemDetailLoader}
        />
        <Route
          path='stash/:id/edit'
          element={<EditStashItem />}
          loader={stashItemDetailLoader}
          action={editItemAction}
        />
        <Route
          path='addproject'
          element={<AddProject />}
          action={addProjectAction}
        />
        <Route
          path='projects/:id'
          element={<ProjectDetail />}
          loader={projectDetailLoader}
        />
        <Route
          path='projects/:id/edit'
          element={<EditProject />}
          loader={projectDetailLoader}
          action={editProjectAction}
        />
        <Route path='notes' element={<Notes />} loader={notesLoader} />
        <Route
          path='notes/:id'
          element={<NoteDetail />}
          loader={noteDetailLoader}
          action={noteDetailAction}
        />
        <Route path='addnote' element={<AddNote />} action={addNoteAction} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Route>))

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
