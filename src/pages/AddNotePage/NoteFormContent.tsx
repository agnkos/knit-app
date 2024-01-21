type NoteFormContentProps = {
    onSubmit: (data: { title: string, content: string }) => void
}

const NoteFormContent = ({ onSubmit }: NoteFormContentProps) => {
    const handleClick = () => {
        const formData = {
            title: (document.querySelector('[data-testid="title"]') as HTMLInputElement)?.value || '',
            content: (document.querySelector('textarea[data-testid="content"]') as HTMLTextAreaElement)?.value || '',
        };
        onSubmit(formData);
    };
    return (
        <>
            <div className="my-2">
                <label id="title">Title</label>
                <input
                    type="text"
                    name="title"
                    className='my-1 px-3 py-1 border block w-full'
                    aria-labelledby="title"
                    data-testid="title"
                />
            </div>
            <div className="my-2">
                <label id="content">Content</label>
                <textarea
                    required
                    name="content"
                    className='mt-1 mb-4 px-3 py-1 border block resize-none w-full h-32'
                    aria-labelledby="content"
                    data-testid="content"
                />
            </div>
            <button
                onClick={handleClick}
                className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'
            >Create note</button>
        </>
    )
}
export default NoteFormContent