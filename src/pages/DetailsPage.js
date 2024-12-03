import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);

  // Fetch movie details, cast details, similar items, and recommendations
  const { data, loading: detailsLoading, error: detailsError } = useFetchDetails(`/${params.explore}/${params.id}`);
  const { data: castData, loading: castLoading, error: castError } = useFetchDetails(`/${params.explore}/${params.id}/credits`);
  const { data: similarData } = useFetchDetails(`/${params.explore}/${params.id}/similar`);
  const { data: recommendationData } = useFetchDetails(`/${params.explore}/${params.id}/recommendations`);

  if (detailsLoading || castLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (detailsError || castError) {
    return <p className="text-center mt-10 text-red-500">Failed to load details. Please try again.</p>;
  }

  const writer = castData?.crew?.filter((el) => el?.job === "Writer")?.map((el) => el?.name)?.join(", ") || "N/A";

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full h-[400px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt={data?.title || "Backdrop"}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-b from-neutral-900/45 to-transparent/60"></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-16 px-3 lg:py-0 flex flex-col lg:flex-row gap-10 lg:gap-10">
        {/* Movie Poster */}
        <div className="lg:-mt-28 relative lg:mx-0 mx-auto w-fit transform transition-transform z-20 duration-500 hover:scale-110">
          <div className="flex-shrink-10">
            <img
              src={imageURL + data?.poster_path}
              alt="Movie Poster"
              className="w-90 h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Divider */}
        <Divider />

        {/* Movie Details */}
        <div className="text-xl text-white">
          <h2 className="text-2xl font-bold text-white">{data?.title || data?.name}</h2>
          <p className="text-neutral-300">{data?.tagline}</p>
          <Divider />

          {/* Ratings, Views, and Duration */}
          <div className="flex items-center my-3 gap-3">
            <p className="text-neutral-300">Ratings: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p className="text-neutral-300">Views: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p className="text-neutral-300">
              Duration: {data?.runtime ? `${Math.floor(data?.runtime / 60)}h ${data?.runtime % 60}m` : 'N/A'}
            </p>
          </div>

          <Divider />

          {/* Overview */}
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 text-center my-3">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release Date: {moment(data?.release_date).format("DD/MM/YYYY")}</p>
              <span>|</span>
              <p>Revenue: ${Number(data?.revenue).toLocaleString()}</p>
            </div>
          </div>

          <Divider />

          {/* Director and Writer */}
          <div>
            <p>
              <span className="text-white">Director</span>: {castData?.crew?.find((el) => el?.job === "Director")?.name || "N/A"}
            </p>
            <Divider />
            <p>
              <span>Writer:</span> {writer}
            </p>
            <Divider />
            <h2 className="text-4xl font-bold mt-6 justify-between items-center">Star Cast:</h2>

            {/* Star Cast Section */}
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {castData?.cast?.slice(0, 10).map((cast) => (
                  <div key={cast.id} className="text-center">
                    <img
                      src={cast.profile_path ? imageURL + cast.profile_path : '/placeholder-profile.jpg'}
                      alt={cast.name}
                      className="w-75 h-55 object-cover rounded-full shadow-md transform transition-transform z-20 duration-500 hover:scale-110"
                    />
                    <h4 className="text-lg mt-2 font-medium text-white">{cast.name}</h4>
                    <p className="text-sm text-neutral-400">{cast.character || 'Unknown Role'}</p>
                  </div>
                ))}
              </div>
              {!castData?.cast?.length && (
                <p className="text-neutral-400 mt-4">No cast information available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Items Section */}
      {similarData?.results?.length > 0 && (
        <div>
          <HorizontalScrollCard
            data={similarData?.results}
            heading={`Similar ${params?.explore}`}
            media_type={params?.explore}
          />
        </div>
      )}

      {/* Recommendations Section */}
      {recommendationData?.results?.length > 0 && (
        <div>
          <HorizontalScrollCard
            data={recommendationData?.results}
            heading={`Recommendations for ${params?.explore}`}
            media_type={params?.explore}
          />
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
