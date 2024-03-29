import { StashItem } from "../../types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSubmit } from "react-router-dom";
import ImagePlaceholder from "../../components/ImagePlaceholder";
import Image from "../../components/Image";

type FormProps = {
    item: StashItem,
    uploadImage: (id: string) => void,
    deleteImage: (id: string) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    showModal: () => void
}

const StashForm = ({ item, uploadImage, deleteImage, handleChange, showModal }: FormProps) => {
    const submit = useSubmit()

    const initialValues = {
        name: item.name,
        skeins: item.skeins.toString(),
        colorway: item.colorway.toString(),
        dyelot: item.dyelot.toString(),
        purchased: item.purchased
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('Project name is required'),
        skeins: Yup.number()
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => submit(values, { action: `/stash/${item.stashItemId}/edit`, method: "post" })}
        >

            {() => (
                <Form>
                    <div className='p-4 sm:flex sm:gap-6 sm:items-start'>
                        <div>
                            {(!item.imageUrl || item.imageUrl === "") && <ImagePlaceholder />}
                            {item.imageUrl &&
                                <Image url={item.imageUrl} alt="stash photo" />
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
                            <p className='text-2xl my-1 font-bold'>
                                <Field
                                    type="text"
                                    name="name"
                                    className='px-3 py-1 border block w-full'
                                />
                                <ErrorMessage name="name" component="span" className="text-sm font-normal text-red-600" />
                            </p>
                            <p className="text-lg font-bold">Yarn info</p>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                <p className=" text-zinc-700 ">Skeins</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="skeins"
                                        className='my-1 px-3 py-1 border max-w-full'
                                    />
                                </p>
                            </div>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                <p className="text-zinc-700">Colorway</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="colorway"
                                        className='my-1 px-3 py-1 border max-w-full'
                                    />
                                </p>
                            </div>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                <p className=" text-zinc-700">Dye lot</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="dyelot"
                                        className='my-1 px-3 py-1 border max-w-full'
                                    />
                                </p>
                            </div>
                            <div className="grid grid-cols-[100px_minmax(100px,300px)] gap-2 py-1 border-b border-zinc-700">
                                <p className="text-zinc-700">Purchased at</p>
                                <p className="">
                                    <Field
                                        type="text"
                                        name="purchased"
                                        className='my-1 px-3 py-1 border max-w-full'
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
                </Form>)}
        </Formik>
    )
}
export default StashForm
