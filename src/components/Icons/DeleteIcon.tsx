import { TrashIcon } from "@heroicons/react/24/outline"
import { QueuedItemType } from "../../types"

type DeleteIconProps = {
  item: QueuedItemType,
  deleteItem: (id: string) => void
}

const DeleteIcon = ({ deleteItem, item }: DeleteIconProps) => {
  return (
    <TrashIcon
      onClick={() => deleteItem(item.queuedItemId)}
      className='w-4 h-4 mx-4 max-[335px]:mx-2 cursor-pointer  hover:text-teal-600 transition-colors duration-300'
      data-testid='trash-icon'
    />
  )
}
export default DeleteIcon