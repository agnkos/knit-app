import { Suspense } from 'react';
import { useLoaderData, useNavigate, defer, Await, Link } from 'react-router-dom';
import { getNotes } from '../../config/firebase';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { AllNotes, Note } from '../../types';

export function loader() {
  return defer({ notes: getNotes() })
}

type LoaderData = {
  notes: AllNotes
}

const Notes = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData() as LoaderData

  const addNote = () => {
    navigate('/addnote')
  }

  console.log(loaderData)

  function renderNotes(notes: Note[]) {
    const notesElements = notes.map(note => (
      <Link to={`${note.noteId}`} key={note.noteId}>
        <div className='flex flex-col gap-1 mb-4 pb-4 border-b'>
          <div className='flex justify-between'>
            <p className='font-bold'>{note.title}</p>
            <div className='flex gap-2'>
            </div>
          </div>
          <p className='text-sm'>{note.date?.toString()}</p>
          <p className='h-6 overflow-hidden'>{note.content}</p>
        </div>
      </Link>
    ))

    return (
      <div className='p-4'>
        {notesElements}
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-3 items-center my-4">
        <h1 className="px-4 max-[330px]:text-2xl text-3xl sm:text-4xl font-bold">Notes</h1>
        <button
          className="flex gap-1 items-center mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5"
          onClick={addNote}
        >
          <PlusCircleIcon className="w-4 h-4" />
          <span>
            new note
          </span>
        </button>
      </div>

      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={loaderData.notes}>

          {renderNotes}

        </Await>
      </Suspense>
    </div>
  )
}
export default Notes