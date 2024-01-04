import { Await, Link, LoaderFunctionArgs } from "react-router-dom";
import { Suspense } from "react";
import { getStashItem } from "../../config/firebase";
import { StashItem } from "../../types";
import { ArrowLeftCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import ImagePlaceholder from "../../components/ImagePlaceholder";
import Image from "../../components/Image";
import { defer, useLoaderData } from "react-router-typesafe";

export function loader({ params }: LoaderFunctionArgs) {
    return defer({ stashItem: getStashItem(String(params.id)) });
}

const StashItemDetail = () => {
    const loaderData = useLoaderData<typeof loader>();

    return (
        <>
            <Link to="/stash" className="flex gap-2 items-center">
                <ArrowLeftCircleIcon className="w-5 h-5" />
                <p className="border-b border-white hover:border-b hover:border-zinc-950">Back to stash</p>
            </Link>
            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={loaderData?.stashItem}>
                    {(item: StashItem) => (
                        <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                            {item.imageUrl ?
                                <Image url={item.imageUrl} alt="stash photo" />
                                :
                                <ImagePlaceholder />
                            }
                            <div className="max-w-[500px] sm:grow">
                                <div className="mb-3 flex justify-between items-center">
                                    <p className='text-2xl font-bold'>{item.name}</p>
                                    <Link to="edit">
                                        <button
                                            className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                            <span>
                                                edit
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                                <p className="text-lg font-bold">Yarn info</p>
                                <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                    <p className=" text-zinc-700 ">Skeins</p>
                                    <p className="">{item.skeins}</p>
                                </div>
                                <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                    <p className="text-zinc-700">Colorway</p>
                                    <p className="">{item.colorway}</p>
                                </div>
                                <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                    <p className="text-zinc-700">Dye lot</p>
                                    <p className="">{item.dyelot}</p>
                                </div>
                                <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                    <p className="text-zinc-700">Purchased at</p>
                                    <p className="">{item.purchased}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense >
        </>
    )
}
export default StashItemDetail