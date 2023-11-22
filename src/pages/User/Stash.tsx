import { Suspense } from 'react'
import { defer, useLoaderData, useNavigate, Link, Await } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { getStash } from '../../config/firebase';
import { AllStash, StashItem } from '../../types';
import imgPlaceholder from '../../img/knit-black.png';
import knittingImg from '../../img/knitting.png';

export function loader() {
  return defer({ stash: getStash() })
}

type LoaderData = {
  stash: AllStash
}

const Stash = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as LoaderData;

  const addStashItem = () => {
    navigate('/addstashitem')
  }

  function renderStash(stash: StashItem[]) {
    const stashElements = stash.map(item => (
      <Link to={`${item.stashItemId}`} key={item.stashItemId}>
        <div
          className='flex flex-col items-center gap-2 mb-4'>
          <p className='text-lg'>{item.name}</p>
          {item.imageUrl ? (
            <div className="my-2 mx-auto border border-zinc-950 max-w-[500px] h-[80vw] w-[80vw] sm:w-[200px] sm:h-[200px]">
              <img src={item.imageUrl}
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

    return (
      <div className='p-4 flex flex-col sm:flex-wrap sm:flex-row sm:gap-6'>
        {stashElements}
      </div>
    )
  }

  // useEffect(() => {
  //   console.log('loader stash', loaderData)
  // }, [])

  return (
    <div className="flex flex-col grow">
      <div className="flex gap-3 items-center my-4">
        <h1 className="px-4 max-[330px]:text-2xl text-3xl sm:text-4xl font-bold">My Stash</h1>
        <button
          className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
          onClick={addStashItem}
        >
          <PlusCircleIcon className="w-4 h-4" />
          <span>
            new yarn
          </span>
        </button>
      </div>
      {loaderData.stash.length === 0 && (
        <div className=" bg-pink-300 grow flex flex-col items-center justify-center">
          <div>
            <img src={knittingImg}
              className='ml-auto mr-auto'
              alt="Knitting icon created by iconixar - Flaticon"
            />
            <p className='text-xl'>Time to buy some yarn!</p>
          </div>
        </div>
      )}
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={loaderData.stash}>
          {renderStash}
        </Await>
      </Suspense>
    </div>

  )
}
export default Stash