import React, { useState } from 'react';
import { POSTER_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { genreMap } from '../utils/mockData';
import { motion } from "framer-motion";

const HomeMovieCard = ({ path, details }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const { id } = details;
    const genres = details?.genre_ids?.map((id) => genreMap[id]);

    const movieInfo = () => {
        navigate(`/tertiary/${id}`, { state: { details } });
    };

    return (
        <div
            className="group cursor-pointer relative w-56"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={movieInfo}
        >
            <motion.div>
                <div className="relative w-full bg-[#0F0F24] rounded-md overflow-hidden">
                    <img
                        alt={details?.title}
                        className="w-full h-[350px] object-cover rounded-t-md"
                        src={POSTER_URL + path}
                    />
                    <div className="p-4 bg-[#0F0F24] rounded-b-md min-h-[130px] flex flex-col justify-between">
                        <h2 className="text-lg font-semibold text-white truncate">
                            {details?.title || details?.original_title}
                        </h2>
                        <div className="flex text-sm text-green-400 mt-1">
                            {details?.vote_average ? `⭐ ${details?.vote_average}` : ""}
                            <span className="ml-auto text-gray-400">{details?.release_date}</span>
                        </div>
                        <div className="flex text-sm text-white mt-1 flex-wrap">
                            <h2>• {genres.join(" • ")}</h2>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

    );
};

export default HomeMovieCard;
