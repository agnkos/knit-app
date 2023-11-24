import knittingImg from '../img/knitting.png';

type ItemsPlaceholderProps = {
  text: string
}

const ItemsPlaceholder = ({ text }: ItemsPlaceholderProps) => {
  return (
    <div className="grow flex flex-col items-center justify-center">
      <div>
        <img src={knittingImg}
          className='ml-auto mr-auto sm:h-20 mb-2'
          alt="Knitting icon created by iconixar - Flaticon"
        />
        <p className='text-xl'>{text}</p>
      </div>
    </div>
  )
}
export default ItemsPlaceholder