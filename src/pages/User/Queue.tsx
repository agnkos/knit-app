import { Suspense } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import knittingImg from '../../img/knitting.png';
import { Await, Link, Outlet, defer, useLoaderData } from 'react-router-dom';
import { getQueuedItems } from "../../config/firebase";
import QueuedItem from "../../components/QueuedItem";
import { QueuedItemType } from "../../types"

export function loader() {
    return defer({ queuedItems: getQueuedItems() })
}

type LoaderData = {
    queuedItems: QueuedItemType[]
}

const Queue = () => {
    const loaderData = useLoaderData() as LoaderData;

    function renderQueuedItems(queuedItems: QueuedItemType[]) {
        const queuedItemsElements = queuedItems.map((item, index: number) => (
            <QueuedItem item={item} index={index} key={item.queuedItemId} />
        ))

        return (
            <div className="p-4">
                {queuedItemsElements}
            </div>
        )
    }

    return (
        <div className="flex flex-col grow">
            <div className="flex gap-3 items-center my-4">
                <h1 className="px-4 text-4xl font-bold max-[325px]:text-3xl">Queue</h1>
                <Link
                    to="add"
                    state={{ button: "" }}
                    className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
                >
                    <PlusCircleIcon className="w-4 h-4" />
                    <span>
                        add to queue
                    </span>
                </Link>
            </div>

            {loaderData.queuedItems.length === 0 && <div className="grow flex flex-col items-center justify-center">
                <div>
                    <img src={knittingImg}
                        className='ml-auto mr-auto'
                        alt="Knitting icon created by iconixar - Flaticon"
                    />
                    <p className='text-xl'>Time to plan some projects!</p>
                </div>
            </div>}
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