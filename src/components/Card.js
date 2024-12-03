import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Card = ({data ,trending ,index ,media_type}) => {
  const imageURL = useSelector(state =>state.movieoData.imageURL) 
  const mediaType = data.media_type ?? media_type
  return (
    <Link to={"/" + mediaType +"/" + data.id} className='w-full min-w-[250] max-w-[250px] h-80 overflow-hidden gap-2 block relative rounded hover:scale-110 z-40'>
  
     {
         data?.poster_path ? ( <img src={imageURL + data?.poster_path} alt={data?.title || "Image"} />)
         :<div className='bg-neutral-900 h-full w-full flex justify-center font-semibold items-center'>No Image found</div> 
        }
     

       <div className='absolute top-2'> 
         {
          trending && ( <div className='py-1 px-2 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'> 
                          #{index} Trending
                        </div>)
          }
         </div>
       <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/20 p-2'>
       <h2 className='text-ellipsis line-clamp-1 text-lgfont-semibold'>{data.title || data.name}</h2>
       <div className='text-sm text-neutral-500 flex justify-between'>
        <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
        <p className='bg-black/70 px-1 rounded-full text-xs'>Ratings :{Number(data.vote_average).toFixed(1)}+</p>
        
        </div>
       </div>
       

    </Link>
  )
}

export default Card
