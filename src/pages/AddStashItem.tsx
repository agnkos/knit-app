import { doc, collection, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Form, redirect, Link } from 'react-router-dom';

export async function action({ request }: any): Promise<
  | Response
  | {
      error: any;
    }
> {
  const formData = await request.formData();
  const name = formData.get('name');
  const skeins = formData.get('skeins');
  const colorway = formData.get('colorway');
  const dyelot = formData.get('dyelot');
  const purchased = formData.get('purchased');

  try {
    const stashItemRef = doc(
      collection(db, 'users', `${auth?.currentUser?.uid}`, 'stash'),
    );
    await setDoc(stashItemRef, {
      stashItemId: stashItemRef.id,
      name: name,
      skeins: skeins,
      colorway: colorway,
      dyelot: dyelot,
      purchased: purchased,
    });
    return redirect('/stash');
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
}

const AddStashItem = () => {
  return (
    <div>
      <div className='flex gap-2 items-center'>
        <h1 className='text-2xl font-bold'>New Project</h1>
        <Link to='/stash'>
          <button className='px-2 bg-teal-200 text-md  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'>
            cancel
          </button>
        </Link>
      </div>
      <Form action='/addstashitem' method='post'>
        <div className='my-2'>
          <label>Yarn name</label>
          <input
            required
            type='text'
            name='name'
            className='my-1 px-3 py-1 border block'
          />
        </div>
        <div className='my-2'>
          <label>Skeins</label>
          <input
            type='text'
            name='skeins'
            className='my-1 px-3 py-1 border block'
          />
        </div>
        <div className='my-2'>
          <label>Colorway</label>
          <input
            type='text'
            name='colorway'
            className='my-1 px-3 py-1 border block'
          />
        </div>
        <div className='my-2'>
          <label>Dye lot</label>
          <input
            type='text'
            name='dyelot'
            className='my-1 px-3 py-1 border block'
          />
        </div>
        <div className='my-2'>
          <label>Purchased at</label>
          <input
            type='text'
            name='purchased'
            className='my-1 px-3 py-1 border block'
          />
        </div>
        <button className='mt-1 px-3 py-1 bg-teal-200  hover:bg-teal-300 shadow-[3px_3px_0_0] shadow-zinc-800 hover:translate-x-0.5 hover:translate-y-0.5'>
          Add yarn
        </button>
      </Form>
    </div>
  );
};
export default AddStashItem;
