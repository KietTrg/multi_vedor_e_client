import React from 'react'
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
const Ratings = ({ ratings }) => {
    return (
        <>
            {
                ratings >= 1 ? <span className='text-[#4d664c]'>< FaStar /></span> : ratings >= 1.5 ? <span className='text-[#4d664c]'><FaStarHalfAlt /></span> : <span className='text-[#4d664c]' ><FaRegStar /></span>
            }
            {
                ratings >= 2 ? <span className='text-[#4d664c]'>< FaStar /></span> : ratings >= 1.5 ? <span className='text-[#4d664c]'><FaStarHalfAlt /></span> : <span className='text-[#4d664c]' ><FaRegStar /></span>
            }
            {
                ratings >= 3 ? <span className='text-[#4d664c]'>< FaStar /></span> : ratings >= 2.5 ? <span className='text-[#4d664c]'><FaStarHalfAlt /></span> : <span className='text-[#4d664c]' ><FaRegStar /></span>
            }
            {
                ratings >= 4 ? <span className='text-[#4d664c]'>< FaStar /></span> : ratings >= 3.5 ? <span className='text-[#4d664c]'><FaStarHalfAlt /></span> : <span className='text-[#4d664c]' ><FaRegStar /></span>
            }
            {
                ratings >= 5 ? <span className='text-[#4d664c]'>< FaStar /></span> : ratings >= 4.5 ? <span className='text-[#4d664c]'><FaStarHalfAlt /></span> : <span className='text-[#4d664c]' ><FaRegStar /></span>
            }
        </>
    )
}

export default Ratings