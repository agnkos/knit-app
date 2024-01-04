import { Suspense } from 'react';
import {
  useNavigate,
  Link,
  Await,
} from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { getStash } from '../../config/firebase';
import { StashItem } from '../../types';
import ItemsPlaceholder from '../../components/ItemsPlaceholder';
import ImagePlaceholder from '../../components/ImagePlaceholder';
import Image from '../../components/Image';
import { defer, useLoaderData } from "react-router-typesafe";

export function loader() {
  return defer({ stash: getStash() });
}

const Stash = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();

  const addStashItem = () => {
    navigate('/addstashitem');
  };

  function renderStash(stash: StashItem[]) {
    const stashElements = stash.map((item) => (
      <Link to={`${item.stashItemId}`} key={item.stashItemId}>
        <div
          className='flex flex-col items-center gap-2 mb-4'>
          <p className='text-lg text-center sm:w-[200px] truncate'>{item.name}</p>
          {item.imageUrl ?
            <Image url={item.imageUrl} alt="stash photo" />
            :
            <ImagePlaceholder />
          }
        </div>
      </Link>
    ));

    if (stash.length === 0)
      return <ItemsPlaceholder text='Time to buy some yarn!' />;

    return (
      <div className='p-4 flex flex-col sm:flex-wrap sm:flex-row sm:gap-6'>
        {stashElements}
      </div>
    );
  }

  return (
    <div className='flex flex-col grow'>
      <div className='flex gap-3 items-center my-4'>
        <h1 className='px-4 max-[330px]:text-2xl text-3xl sm:text-4xl font-bold'>
          My Stash
        </h1>
        <button
          className='flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
          onClick={addStashItem}
        >
          <PlusCircleIcon className='w-4 h-4' />
          <span>new yarn</span>
        </button>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={loaderData.stash}>{renderStash}</Await>
      </Suspense>
    </div>
  );
};
export default Stash;
