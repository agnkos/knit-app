import { QueuedItemType } from "../../types"

type QueueModalFormContentProps = {
    state: {
        button: string,
        item: QueuedItemType
    }
    onSubmit: (data: { name: string, notes: string }) => void
}

// onSubmit: (...) => void a nie Promise<boolean>  ???
// Type 'SubmitFunction' is not assignable to type '(data: { name: string; notes: string; }) => Promise<boolean>'.
//   Type 'void' is not assignable to type 'Promise<boolean>'.

const QueueModalFormContent = ({ onSubmit, state }: QueueModalFormContentProps) => {
    const handleClick = () => {
        const formData = {
            name: (document.querySelector('input[name="name"]') as HTMLInputElement)?.value || '',
            notes: (document.querySelector('textarea[name="notes"]') as HTMLTextAreaElement)?.value || '',
        };
        onSubmit(formData);
    };
    return (
        <>
            <label className='text-sm' id="name">Project name</label>
            <input
                required
                type='text'
                name='name'
                className='my-1 px-3 py-1 border block'
                defaultValue={state?.item?.name}
                aria-labelledby="name"
            />
            <label className='text-sm' id='notes'>Notes</label>
            <textarea
                name='notes'
                defaultValue={state?.item?.notes}
                className='mt-1 mb-4 px-3 py-1 h-24 border block resize-none w-full'
                aria-labelledby="notes"
            />
            <input type='hidden' name='id' value={state?.item?.queuedItemId} />
            <button className='block ml-auto px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
                onClick={handleClick}
            >
                {state?.button === 'edit' ? 'Save changes' : 'Add to queue'}
            </button >
        </>
    )
}
export default QueueModalFormContent