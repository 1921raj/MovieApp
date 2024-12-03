import React, { useRef } from 'react';
import Card from '../components/Card';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const HorizontalScrollCard = ({ data = [], heading, trending ,media_type}) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300; // Adjust the scroll distance
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative container mx-auto px-3 my-10">
      <h2 className="text-xl lg:text-2xl font-bold pl-14 mb-2 text-white capitalize">
        {heading}
      </h2>

      <div className="overflow-hidden relative rounded-full">
        <div
          ref={scrollContainerRef}
          className="pl-5 pr-3 grid grid-flow-col auto-cols-[250px] overflow-x-auto gap-5 rounded-full hide-scrollbar"
        >
          {data.map((item, index) => (
            <div
              key={item.id + 'heading' + index}
              className="transform transition-transform duration-300 hover:scale-110" // Add hover animation
            >
              <Card data={item} index={index + 1} trending={trending} media_type={media_type} />
            </div>
          ))}
        </div>

        {/* Left and Right Scroll Buttons */}
        <div className="hidden lg:flex">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-400 hover:bg-white p-2 rounded-full text-2xl text-black z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-400 hover:bg-white p-2 rounded-full text-2xl text-black z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
