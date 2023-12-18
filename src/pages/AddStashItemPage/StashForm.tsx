import { Form } from "react-router-dom";

const StashForm = () => {
  return (
    <Form action='/addstashitem' method='post'>
    <div className="my-2">
        <label>Yarn name</label>
        <input
            required
            type="text"
            name="name"
            className='my-1 px-3 py-1 border block'
        />
    </div>
    <div className="my-2">
        <label>Skeins</label>
        <input
            type="text"
            name="skeins"
            className='my-1 px-3 py-1 border block'
        />
    </div>
    <div className="my-2">
        <label>Colorway</label>
        <input
            type="text"
            name="colorway"
            className='my-1 px-3 py-1 border block'
        />
    </div>
    <div className="my-2">
        <label>Dye lot</label>
        <input
            type="text"
            name="dyelot"
            className='my-1 px-3 py-1 border block'
        />
    </div>
    <div className="my-2">
        <label>Purchased at</label>
        <input
            type="text"
            name="purchased"
            className='my-1 px-3 py-1 border block'
        />
    </div>
    <button
        className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
    >Add yarn</button>
</Form>
  )
}
export default StashForm