import {
  Await,
  Form,
  redirect,
  Link,
  useNavigate,
  ActionFunctionArgs,
  LoaderFunctionArgs
} from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { auth, db } from '../../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getNoteDetail } from '../../config/firebase';
import { Note } from '../../types';
import {
  TrashIcon,
  CheckIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';
import DeleteModal from '../../components/DeleteModal';
import DeleteModalContext from '../../context/DeleteModalContext';
import { defer, useLoaderData } from "react-router-typesafe";


export function loader({ params }: LoaderFunctionArgs) {
  // if (params.id !== undefined) {
  return defer({ noteDetail: getNoteDetail(String(params.id)) });
  // }
}

export async function action({
  params,
  request,
}: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const date = new Date();

  try {
    const noteRef = doc(
      db,
      'users',
      `${auth?.currentUser?.uid}`,
      'notes',
      `${params.id}`,
    );
    await updateDoc(noteRef, {
      noteId: noteRef.id,
      title: title,
      content: content,
      date: date.toLocaleDateString(),
    });
    return redirect(`/notes/${noteRef.id}`);
  } catch (error) {
    if (error instanceof Error) return { error: error.message }
    return String(error)
  }
}

const NoteDetail = () => {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();
  const { deleteModal, deleteModalDispatch } = useContext(DeleteModalContext);

  const deleteNote = async (id: string) => {
    const noteRef = doc(
      db,
      'users',
      `${auth?.currentUser?.uid}`,
      'notes',
      `${id}`,
    );
    await deleteDoc(noteRef);
    deleteModalDispatch({ type: 'HIDE' });
    navigate('/notes');
  };

  return (
    <>
      <Link to='/notes' className='flex gap-2 items-center mb-4'>
        <ArrowLeftCircleIcon className='w-5 h-5' />
        <p className='border-b border-white hover:border-b hover:border-zinc-950'>
          Back to notes
        </p>
      </Link>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={loaderData?.noteDetail}>
          {(note: Note) => (
            <>
              <Form
                action={`/notes/${note.noteId}`}
                method='post'
                className='h-full'
              >
                <div
                  key={note.noteId}
                  className='flex flex-col gap-1 mb-4 pb-4 h-full'
                >
                  <div className='flex justify-between'>
                    <input
                      type='text'
                      name='title'
                      className='font-bold text-xl'
                      defaultValue={note.title}
                    />
                    <div className='flex gap-2 items-center'>
                      <button className='block'>
                        <CheckIcon className='w-5 h-5 cursor-pointer hover:text-teal-600 transition-colors duration-300' />
                      </button>
                      <TrashIcon
                        className='w-5 h-5 cursor-pointer hover:text-teal-600 transition-colors duration-300'
                        onClick={() => deleteModalDispatch({ type: 'SHOW' })}
                      />
                    </div>
                  </div>
                  <p className='text-sm'>{note.date?.toString()}</p>
                  <textarea
                    required
                    name='content'
                    className='mt-1 mb-4 py-1 resize-none w-full h-full'
                    defaultValue={note.content}
                  />
                </div>
              </Form>
              {deleteModal && (
                <DeleteModal
                  closeModal={() => deleteModalDispatch({ type: 'HIDE' })}
                  deleteItem={() => deleteNote(note.noteId)}
                  item='note'
                />
              )}
            </>
          )}
        </Await>
      </Suspense>
    </>
  );
};
export default NoteDetail;
