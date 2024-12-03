import React, { useState ,useEffect } from 'react'
import { useSelector  } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const BannerHome = () => {
    const bannerData = useSelector(state => state.movieoData.bannerData)
    
    const imageURL = useSelector(state => state.movieoData.imageURL)

    const [currentImage,setCurrentImage] =useState(1)
    
    const handleNext = () => {
        if (currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        } else {
            setCurrentImage(bannerData.length - 1);
        }
    };

    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1) % bannerData.length);
        }, 2000); 
        return () => clearInterval(interval);
    }, [bannerData.length]); 
    
    if (!Array.isArray(bannerData) || bannerData.length === 0 || !imageURL) {
        return <div>Loading...</div>; 
    }
 

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden group '>
                {
                    bannerData.map((data, index) => {
                        return (
                            <div key={data.id +"bannerHome" + index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${currentImage*100}%)`}}>
                                <div className='min-w-full min-h-full'>
                                    <img
                                        src={imageURL + data.backdrop_path}
                                        alt={data.title} // Adding alt text for accessibility
                                        className='h-full w-full object-cover'
                                    />
                                </div>

                            {/*  buttons  next and previous image */}
                            <div  className='absolute  top-0 w-full h-full ml-2 mr-2 items-center justify-between group-hover:flex'>
                                <button   onClick={handlePrev} className='bg-red-400  hover:bg-white p-1 rounded-full text-3xl z-10 text-black '>
                                 <FaAngleLeft/>
                                </button>
                                <button onClick={handleNext} className='bg-red-400  hover:bg-white p-1 rounded-full text-3xl z-10 text-black '>
                                <FaAngleRight/> 
                                </button>
                            </div>

                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>

                                <div className='container mx-auto'>
                                <div className='container  ml-2 items-center mx-auto absolute bottom-0 max-w-md'>
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.original_name}</h2>
                                    <p className='text-ellipsis line-clamp-2 my-2'>{data.overview}</p>
                                    <div className='flex items-center gap-4'>
                                        <p>Ratings:{Number(data.vote_average).toFixed(1)}+</p>
                                        <span>|</span>
                                        <p>Views:{Number(data.popularity).toFixed(0)}</p>
                                    </div>
                                    <button className='bg-white mt-2 ml-4 px-6 py-4 text-black font-bold rounded-full hover:bg-gradient-to-l from-green-400 to-orange-400 shadow-md transition-all hover:scale-105'>
                                        Play Now
                                    </button>

                                </div>
                                </div>

                               
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default BannerHome;
