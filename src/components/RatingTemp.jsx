import React from 'react'
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
const RatingTemp = ({ rating }) => {
    if (rating === 5) {
        return (
            <>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
            </>
        )
    }
    else if (rating === 4) {
        return (
            <>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
            </>
        )
    }
    else if (rating === 3) {
        return (
            <>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
            </>
        )
    }
    else if (rating === 2) {
        return (
            <>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
            </>
        )
    }
    else if (rating === 1) {
        return (
            <>
                <span className='text-[#3a4d39]'><FaStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
            </>
        )
    }
    else {
        return (
            <>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
                <span className='text-[#3a4d39]'><FaRegStar /></span>
            </>
        )
    }
}

export default RatingTemp