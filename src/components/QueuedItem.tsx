import {
  deleteDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { QueuedItemType } from '../types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';
import DeleteIcon from './Icons/DeleteIcon';
import UpIcon from './Icons/UpIcon';
import DownIcon from './Icons/DownIcon';

type QueuedItemProps = {
  item: QueuedItemType;
  index: number;
};

const QueuedItem = ({ item, index }: QueuedItemProps) => {
  const navigate = useNavigate();

  const deleteQueuedItem = (id: string) => {
    const itemRef = doc(
      db,
      'users',
      `${auth?.currentUser?.uid}`,
      'queue',
      `${id}`,
    );
    deleteDoc(itemRef);
    navigate('/queue');
  };

  const changePosition = async (
    id: string,
    prevPosition: number,
    action: string,
  ) => {
    const itemRef = doc(
      db,
      'users',
      `${auth?.currentUser?.uid}`,
      'queue',
      `${id}`,
    );

    const q = collection(db, 'users', `${auth?.currentUser?.uid}`, 'queue');
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    const prevItem = dataArr.filter(
      (item) => item.position === prevPosition - 1,
    );

    if (action === 'up') {
      if (prevPosition === 1) return;
      const prevItemRef = doc(
        db,
        'users',
        `${auth?.currentUser?.uid}`,
        'queue',
        `${prevItem[0].queuedItemId}`,
      );
      await updateDoc(itemRef, {
        position: prevPosition - 1,
      });
      await updateDoc(prevItemRef, {
        position: prevItem[0].position + 1,
      });
    }
    if (action === 'down') {
      if (prevPosition === dataArr.length) return;
      const nextItem = dataArr.filter(
        (item) => item.position === prevPosition + 1,
      );
      const nextItemRef = doc(
        db,
        'users',
        `${auth?.currentUser?.uid}`,
        'queue',
        `${nextItem[0].queuedItemId}`,
      );
      await updateDoc(itemRef, {
        position: prevPosition + 1,
      });
      await updateDoc(nextItemRef, {
        position: nextItem[0].position - 1,
      });
    }
    navigate('/queue');
  };

  return (
    <div className='mb-4 flex gap-2 items-start max-w-sm'>
      <div className='flex items-center gap-1'>
        <UpIcon changePosition={changePosition} item={item} />
        <p className='px-2 border' data-testid="item-index">{index + 1}</p>
        <DownIcon changePosition={changePosition} item={item} />
      </div>
      <div className='w-full'>
        <div className='flex items-center'>
          <p className='font-bold mr-2 md:ml-4' data-testid="item-name">{item.name}</p>
          <Link
            to='add'
            className='ml-auto'
            state={{ button: 'edit', item: item }}
          >
            <PencilIcon className='w-4 h-4 cursor-pointer  hover:text-teal-600 transition-colors duration-300' />
          </Link>
          <DeleteIcon deleteItem={deleteQueuedItem} item={item} />
        </div>
        <p className='md:ml-4' data-testid="item-notes">{item.notes}</p>
      </div>
    </div>
  );
};
export default QueuedItem;
