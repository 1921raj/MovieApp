import React from 'react';
import { useSelector } from 'react-redux';
import BannerHome from '../components/BannerHome';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

const Home = () => {

  const trendingData = useSelector((state) => state.movieoData?.bannerData || []);
  const { data: nowPlayingData, loading } = useFetch('/movie/now_playing');
  const { data: topRatedData,  } = useFetch('/movie/top_rated');
  const { data: popularTvShowData,  } = useFetch('/tv/popular');
  const { data: onTheAirShowData } =useFetch("/tv/on_the_air")

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading="Trending" trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading="Now Playing"  media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading="TOp Rated Data" media_type={"movie"}/>
      <HorizontalScrollCard data={popularTvShowData} heading=" Popular TV Shows "media_type={"TV"} />
      <HorizontalScrollCard data={onTheAirShowData} heading=" On The Air" media_type={"movie"}/>
    </div>
  );
};

export default Home;
