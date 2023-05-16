import { useNavigate } from 'react-router-dom';
import knittingImg from '../../img/knitting.png';
import { getProjects } from '../../config/firebase';

export function loader() {
  // console.log(projects)
  return { projects: getProjects() }
}

const Projects = () => {

  const navigate = useNavigate();

  const addProject = () => {
    navigate('/dashboard/addproject')
  }

  return (
    <div className="flex flex-col grow">
      <div className="flex gap-3 items-center mb-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <button
          className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
          onClick={addProject}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="">
            new project
          </span>
        </button>
      </div>

      <div className=" bg-pink-300 grow flex flex-col items-center justify-center">
        <div>
          <img src={knittingImg}
            className='ml-auto mr-auto'
            alt="Knitting icon created by iconixar - Flaticon"
          />
          <p className='text-xl'>Time to knit some projects!</p>
        </div>
      </div>
    </div>
  )
}
export default Projects

// flex items-center gap-1 py-1 px-2 bg-teal-200 hover:bg-teal-400 outline outline-1 outline-offset-2 outline-teal-200 text-sm font-semibold text-zinc-700"