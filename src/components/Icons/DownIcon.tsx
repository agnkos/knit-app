import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { QueuedItemType } from "../../types"

type DownIconProps = {
    item: QueuedItemType,
    changePosition: (id: string, position: number, direction: string) => void
}

const DownIcon = ({ changePosition, item }: DownIconProps) => {
    return (
        <ArrowDownCircleIcon
            className='w-5 h-5 text-zinc-800 cursor-pointer  hover:text-teal-600 transition-colors duration-300'
            onClick={() =>
                changePosition(item.queuedItemId, item.position, 'down')
            }
            data-testid='down-icon'
        />
    )
}
export default DownIcon