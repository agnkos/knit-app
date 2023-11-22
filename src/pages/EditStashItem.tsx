import { Form, useLoaderData, Await, redirect, useNavigate, useParams } from "react-router-dom";
import { useState, Suspense } from "react";
import { auth, db } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "../config/firebase";
import imgPlaceholder from '../img/knit-black.png';
import { StashItem } from "../types";
import DeleteModal from "../components/DeleteModal";

export async function action({ params, request }: any): Promise<Response | {
    error: any;
}> {
    const formData = await request.formData();
    const name = formData.get('name');
    const skeins = formData.get('skeins');
    const colorway = formData.get('colorway');
    const dyelot = formData.get('dyelot');
    const purchased = formData.get('purchased');
    console.log('params id', params.id)
    console.log('params', params)
    console.log('req', request)

    try {
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${params.id}`)
        await updateDoc(itemRef, {
            stashItemId: itemRef.id,
            name: name,
            skeins: skeins,
            colorway: colorway,
            dyelot: dyelot,
            purchased: purchased
        })
        return redirect(`/stash/${itemRef.id}`)
    } catch (err: any) {
        return {
            error: err.message
        }
    }
}

type LoaderData = {
    stashItem: StashItem
}

const EditStashItem = () => {
    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const data = useLoaderData() as LoaderData
    const navigate = useNavigate()

    console.log(data.stashItem)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        console.log('file added')
        setImageUpload(file);
    }

    const uploadImage = async (id: string) => {
        if (!imageUpload) return;
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${id}`)
        const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
        try {
            await uploadBytes(imageFolderRef, imageUpload)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref).then(url => {
                        console.log(url)
                        updateDoc(itemRef, {
                            imageUrl: url
                        })
                    })
                })
        } catch (err) {
            console.log(err);
        }
        navigate(`/stash/${id}/edit`);
    }

    const deleteImage = (id: string) => {
        const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${id}`);
        deleteObject(imageFolderRef);
        updateDoc(itemRef, {
            imageUrl: ""
        })
        navigate(`/stash/${id}/edit`);
    }

    const showModal = () => {
        setShowDeleteModal(true);
        console.log('delete project?', data.stashItem.stashItemId)
    }

    const closeModal = () => {
        setShowDeleteModal(false);
    }

    const deleteStashItem = (id: string, url: string) => {
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${id}`);
        deleteDoc(itemRef);
        if (url) {
            const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
            deleteObject(imageFolderRef);
        }
        console.log('stash item deleted', id)
        closeModal();
        navigate('/projects');
    }

    return (
        <div><h1 className="text-2xl font-bold">Edit Yarn</h1>
            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={data.stashItem}>
                    {
                        (item: StashItem) => (
                            <>
                                <Form action={`/stash/${item.stashItemId}/edit`} method="post">
                                    <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                                        <div>
                                            {(!item.imageUrl || item.imageUrl === "") && (
                                                <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px] sm:mx-auto'>
                                                    <img src={imgPlaceholder}
                                                        alt="Wool icon created by Darius Dan - Flaticon"
                                                        className='opacity-30'
                                                    />
                                                </div>

                                            )
                                            }
                                            {item.imageUrl && (
                                                <div className="my-2 mx-auto border border-zinc-950 max-w-[500px] h-[80vw] w-[80vw] sm:w-[200px] sm:h-[200px]">
                                                    <img src={item.imageUrl}
                                                        alt={`stash photo`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )
                                            }
                                            <input
                                                type="file"
                                                id="file"
                                                className='my-1 p-1 border sm:max-w-[250px] max-w-full'
                                                onChange={handleChange}
                                            />
                                            <div className="flex justify-end gap-4 sm:max-w-[250px]">
                                                <div
                                                    onClick={() => uploadImage(item.stashItemId)}
                                                    className=' my-4 max-w-fit px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                                >Add Photo</div>
                                                <div
                                                    onClick={() => deleteImage(item.stashItemId)}
                                                    className=' my-4 max-w-fit px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                                >Remove Photo</div>
                                            </div>
                                        </div>
                                        <div className="max-w-[500px] sm:grow me-2">
                                            <p className='text-2xl font-bold'>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    className='my-1 px-3 py-1 border block w-full'
                                                    defaultValue={item.name}
                                                /></p>
                                            <p className="text-lg font-bold">Yarn info</p>
                                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                                <p className=" text-zinc-700 ">Skeins</p>
                                                <p className="">
                                                    <input
                                                        type="text"
                                                        name="skeins"
                                                        className='my-1 px-3 py-1 border max-w-full'
                                                        defaultValue={item.skeins}
                                                    />
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                                <p className="text-zinc-700">Colorway</p>
                                                <p className="">
                                                    <input
                                                        type="text"
                                                        name="colorway"
                                                        className='my-1 px-3 py-1 border max-w-full'
                                                        defaultValue={item.colorway}
                                                    />
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                                <p className=" text-zinc-700">Dye lot</p>
                                                <p className="">
                                                    <input
                                                        type="text"
                                                        name="dyelot"
                                                        className='my-1 px-3 py-1 border max-w-full'
                                                        defaultValue={item.dyelot}
                                                    />
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                                <p className="text-zinc-700">Purchased at</p>
                                                <p className="">
                                                    <input
                                                        type="text"
                                                        name="purchased"
                                                        className='my-1 px-3 py-1 border max-w-full'
                                                        defaultValue={item.purchased}
                                                    />
                                                </p>
                                            </div>
                                            <div className="flex gap-4 items-center justify-end">
                                                <div
                                                    onClick={showModal}
                                                    className=' my-4  max-w-fit px-3 py-1 bg-red-400  hover:bg-red-600 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer'
                                                >Delete Item</div>
                                                <button
                                                    className='block px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                                                >Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                                {showDeleteModal && <DeleteModal closeModal={closeModal} deleteItem={() => deleteStashItem(item.stashItemId, item.imageUrl)} item='yarn' />}
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div >
    )
}
export default EditStashItem