import React, { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page,setPage]=useState(1)
  const navigate =useNavigate()


  const fetchData = async () => {
 

    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page, 
        },
      });
      setData((prev)=>{return [...prev , ...response.data.results ]});
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    setPage(1)
    setData([])
    fetchData();
  }, [location?.search,]);

 const handleScroll =()=> {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };


  return (
    <div className="pt-16  ">
      <div className='lg:hidden  my-2 mx-2 sticky top-[70px] z-40'>
        <input type='text' placeholder='Search here...' onChange={(e)=>  navigate(`/search?q=${e.target.value}`) } 
        className='px-4 py-2 text-lg w-full bg-white rounded-full text-neutral-900 '
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results for "{}"
        </h3>

        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-6 mt-6 justify-center lg:justify-start ">
          {data.map((searchData) =>{
            return(
              ( 
                <Card data={searchData} key={searchData.id + "search"} media_type={searchData.media_type} />  )
            )
          })}
        </div>

        
      </div>
    </div>
  );
};

export default SearchPage;
