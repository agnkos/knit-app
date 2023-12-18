import imgPlaceholder from '../img/knit-black.png';

const ImagePlaceholder = () => {
  return (
    <div className='my-2 p-4 border border-zinc-950 bg-slate-100 sm:w-[200px]'>
      <img src={imgPlaceholder}
        alt="Wool icon created by Darius Dan - Flaticon"
        className=' opacity-30'
      />
    </div>
  )
}
export default ImagePlaceholder