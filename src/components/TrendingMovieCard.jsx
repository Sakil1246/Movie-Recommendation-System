import React from 'react';
import { POSTER_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';


const TrendingMovieCard = ({ path, details, index }) => {
    const { id } = details;
    const navigate=useNavigate();
    const movieInfo = () => {
        navigate(`/tertiary/${id}`, { state: { details } });
      };
    return (
        <div className="flex cursor-pointer flex-row items-start w-full h-full object-cover" onClick={movieInfo}>

            <div
                className="flex-shrink-0 text-[150px] font-white text- leading-none px-4  select-none"
                style={{
                    WebkitTextStroke: '3px black',
                    color: 'red'
                }}
            >
                {index + 1}
            </div>



            <div className="flex flex-col items-center w-64  space-y-2">
                <img
                    src={`${POSTER_URL}${path}`}
                    alt={details.title || details.name}
                    className=" w-full h-auto shadow-md"
                />

            </div>
        </div>
    );
};

export default TrendingMovieCard;
