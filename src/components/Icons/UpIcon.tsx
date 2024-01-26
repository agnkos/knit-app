import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { QueuedItemType } from "../../types"

type UpIconProps = {
    item: QueuedItemType,
    changePosition: (id: string, poistion: number, direction: string) => void
}

export const UpIcon = ({ changePosition, item }: UpIconProps) => {
    return (
        <ArrowUpCircleIcon
            className='w-5 h-5 text-zinc-800 cursor-pointer  hover:text-teal-600 transition-colors duration-300'
            onClick={() => changePosition(item.queuedItemId, item.position, 'up')
            }
            data-testid="up-icon"
        />
    )
}

export default UpIcon