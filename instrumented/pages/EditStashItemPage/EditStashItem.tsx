import {  Await, useNavigate } from "react-router-dom";
import { useState, Suspense, useContext } from "react";
import { auth, db } from "../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "../../config/firebase";
import { StashItem } from "../../types";
import DeleteModal from "../../components/DeleteModal";
import DeleteModalContext from '../../context/DeleteModalContext';
import StashForm from "./StashForm";
import { useLoaderData } from "react-router-typesafe";
import {loader} from '../User/StashItemDetail'
// type LoaderData = {
//     stashItem: StashItem
// }

export const EditStashItem = () => {
    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const { deleteModal, deleteModalDispatch } = useContext(DeleteModalContext);
    // const data = useLoaderData() as LoaderData;
    const data = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        console.log('file added')
        setImageUpload(file);
    }

    const uploadImage = async (id: string) => {
        // spr czy imageupload
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

    const deleteImage = async (id: string) => {
        const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${id}`);
        await deleteObject(imageFolderRef);
        await updateDoc(itemRef, {
            imageUrl: ""
        })
        navigate(`/stash/${id}/edit`);
    }

    const deleteStashItem = async (id: string, url: string) => {
        const itemRef = doc(db, "users", `${auth?.currentUser?.uid}`, "stash", `${id}`);
        await deleteDoc(itemRef);
        if (url) {
            const imageFolderRef = ref(storage, `${auth?.currentUser?.uid}/${id}`);
            await deleteObject(imageFolderRef);
        }
        deleteModalDispatch({ type: 'HIDE' })
        navigate('/stash');
    }

    const showModal = () => deleteModalDispatch({ type: 'SHOW' })
    const hideModal = () => deleteModalDispatch({ type: 'HIDE' })

    return (
        <div>
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">Edit Yarn</h1>
                <button
                    className='px-2 bg-teal-200 text-md  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                    onClick={() => navigate(-1)}
                >cancel</button>
            </div>
            <Suspense fallback={<h3>loading details...</h3>}>
                <Await resolve={data.stashItem}>
                    {
                        (item: StashItem) => (
                            <>
                                <StashForm
                                    item={item}
                                    handleChange={handleChange}
                                    uploadImage={uploadImage}
                                    deleteImage={deleteImage}
                                    showModal={showModal}
                                />
                                {deleteModal && <DeleteModal closeModal={hideModal} deleteItem={() => deleteStashItem(item.stashItemId, item.imageUrl)} item='yarn' />}
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div >
    )
}
