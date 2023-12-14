import { Form } from "react-router-dom";
import { StashItem } from "../../types";
import ImagePlaceholder from "../../components/ImagePlaceholder";

type FormProps = {
    item: StashItem,
    uploadImage: (id: string) => void,
    deleteImage: (id: string) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showModal: () => void
}

const StashForm = ({ item, uploadImage, deleteImage, handleChange, showModal }: FormProps) => {
    return (
        <Form action={`/stash/${item.stashItemId}/edit`} method="post">
            <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                <div>
                    {(!item.imageUrl || item.imageUrl === "") && <ImagePlaceholder />}
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
    )
}
export default StashForm
