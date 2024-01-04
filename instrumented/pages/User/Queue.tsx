import { Suspense } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Await, Link, Outlet } from 'react-router-dom';
import { getQueuedItems } from "../../config/firebase";
import QueuedItem from "../../components/QueuedItem";
import { QueuedItemType } from "../../types";
import ItemsPlaceholder from "../../components/ItemsPlaceholder";
import { defer, useLoaderData } from "react-router-typesafe";

export function loader() {
  return defer({ queuedItems: getQueuedItems() });
}

const Queue = () => {
  const loaderData = useLoaderData<typeof loader>();

  function renderQueuedItems(queuedItems: QueuedItemType[]) {
    const queuedItemsElements = queuedItems.map((item, index: number) => (
      <QueuedItem item={item} index={index} key={item.queuedItemId} />
    ))

    if (queuedItems.length === 0) return <ItemsPlaceholder text='Time to plan some projects!' />

    return (
      <div className="p-4">
        {queuedItemsElements}
      </div>
    )
  }

  return (
    <div className='flex flex-col grow'>
      <div className='flex gap-3 items-center my-4'>
        <h1 className='px-4 text-3xl sm:text-4xl font-bold max-[325px]:text-3xl'>
          Queue
        </h1>
        <Link
          to='add'
          state={{ button: '' }}
          className='flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
        >
          <PlusCircleIcon className='w-4 h-4' />
          <span>add to queue</span>
        </Link>
      </div>

      <Outlet />
      <Suspense fallback={<h3>Loading queue...</h3>}>
        <Await resolve={loaderData.queuedItems}>
          {renderQueuedItems}
        </Await>
      </Suspense>
    </div>
  )
}
export default Queue