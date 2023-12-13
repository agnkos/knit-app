import { Suspense } from 'react';
import { useLoaderData, useNavigate, defer, Await, Link } from 'react-router-dom';
import { getProjects } from '../../config/firebase';
import imgPlaceholder from '../../img/knit-black.png';
import { AllProjects, Project } from '../../types';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import ItemsPlaceholder from '../../components/ItemsPlaceholder';

export function loader() {
  return defer({ projects: getProjects() })
}

type LoaderData = {
  projects: AllProjects
}

const Projects = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as LoaderData;

  const addProject = () => {
    navigate('/addproject')
  }

  function renderProjects(projects: Project[]) {
    const projectsElements = projects.map(project => (
      <Link to={`${project.projectId}`} key={project.projectId}>
        <div
          className='flex flex-col items-center gap-2 mb-4'>
          <p className='text-lg text-center sm:w-[200px] truncate'>{project.name}</p>
          {project.imageUrl ? (
            <div className="my-2 mx-auto border border-zinc-950 max-w-[500px] h-[80vw] w-[80vw] sm:w-[200px] sm:h-[200px]">
              <img src={project.imageUrl}
                alt={`project photo`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px]'>
              <img src={imgPlaceholder}
                alt="Wool icon created by Darius Dan - Flaticon"
                className=' opacity-30'
              />
            </div>
          )
          }
        </div>
      </Link>
    ))

    if (projects.length === 0) return <ItemsPlaceholder text='Time to knit some projects!' />

    return (
      <div className='p-4 flex flex-col sm:flex-wrap sm:flex-row sm:gap-6'>
        {projectsElements}
      </div>
    )
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex gap-3 items-center my-4">
        <h1 className="px-4 max-[330px]:text-2xl text-3xl sm:text-4xl font-bold">Projects</h1>
        <button
          className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
          onClick={addProject}
        >
          <PlusCircleIcon className="w-4 h-4" />
          <span>
            new project
          </span>
        </button>
      </div>

      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={loaderData.projects}>
          {renderProjects}
        </Await>
      </Suspense>

    </div>
  )
}
export default Projects
