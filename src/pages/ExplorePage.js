import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card'; 

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1); 
  const [data, setData] = useState([]); 
  const [totalPageNo, setTotalPageNo] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const validParams = ['tv', 'movie']; 
  const endpoint = validParams.includes(params.explore) ? params.explore : 'tv';
   
  console.log("params Tv" ,params.explore)

  const fetchData = useCallback(async () => {
    if (pageNo > totalPageNo || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`/discover/${endpoint}`,{
        params: { page: pageNo },
      });

      
      setData((prev) => [...prev, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false); 
    }
  }, [params.explore, pageNo, totalPageNo, loading]);

  
  
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -10 && pageNo < totalPageNo) {
      setPageNo((prev) => prev + 1);
    }
  }, [pageNo, totalPageNo]);

  useEffect(() => {
    fetchData()
    setPageNo(1)
    setData([])
  }, [ params.explore]);

  useEffect(() => { window.addEventListener('scroll', handleScroll);  }, []);

  return (
    <div className="pt-12 pl-4 pb-3">
      <div className="mx-auto container">
        <h3 className="capitalize text-lg lg:text-xl font-semibold"> Popular {params.explore} Shows  </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-6  mt-6  justify-center lg:justify-start">
          {data.map((exploreData) =>{
            return(
              ( 
                <Card data={exploreData} key={exploreData.id + "exploreSection"} media_type={params.explore} />  )
            )
          })}
        </div>

        {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ExplorePage;
