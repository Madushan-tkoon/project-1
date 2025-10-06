const SlideControl = ({slideData, onSlideChange, selectedTshirtId, setLoad}) => {
  return (
    <div className='flex items-center gap-5 text-[16px] font-2 '>
      {slideData.map((data)=>(
        <button key={data.id} 
          className={`bg-gray-400 h-8 w-9 rounded-[4px] flex items-center justify-center cursor-pointer ${selectedTshirtId === data.id ? 'scale-120 bg-white' : ''}`}
          onClick={()=> {onSlideChange(data)}}
        >
          {data.id}
        </button>
      ))}
    </div>
  )
}

export default SlideControl
