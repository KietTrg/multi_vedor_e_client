import React, { useEffect, useState } from 'react'
import Ratings from './Ratings'
import RatingTemp from './RatingTemp'
import Pagination from '../components/Pagination';
import RatingReact from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review, messageClear, get_review, get_product } from '../store/Reducers/homeReducer';
import toast from 'react-hot-toast';

const Reviews = ({ product }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, ratingReview, totalReview, reviews } = useSelector(state => state.home)
    const [pageNumber, setPageNumber] = useState(1)
    const [parPage, setParPage] = useState(10)

    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')
    const submitReview = (e) => {
        e.preventDefault()
        const obj = {
            name: userInfo.name,
            review: review,
            rating: rating,
            productId: product._id
        }
        dispatch(customer_review(obj))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(get_review({
                productId: product._id,
                pageNumber: pageNumber
            }))
            dispatch(get_product(product._id))

            setRating('')
            setReview('')
            dispatch(messageClear())
        }

    }, [successMessage])
    useEffect(() => {
        if (product._id) {
            dispatch(get_review({
                productId: product._id,
                pageNumber: pageNumber
            }))
        }
    }, [pageNumber, product])
    return (
        <div className='mt-8'>
            <div className='flex gap-10 md:flex-col'>
                <div className='flex flex-col gap-2 justify-start items-start py-4'>
                    <div>
                        <span className='text-6xl '>{product.rating}</span>
                        <span className='text-3xl '>/5</span>
                    </div>
                    <div className='flex text-4xl gap-1'>
                        <Ratings ratings={product.rating} />
                    </div>
                    <p className='text-sm text-[#3a4d39]'>{totalReview} Ratings</p>
                </div>
                <div className='flex gap-2 flex-col py-4'>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px] '>
                            <RatingTemp rating={5} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div style={{ width: `${Math.floor((100 * (ratingReview[0]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#3a4d39]'>

                            </div>
                        </div>
                        <p className='text-sm text-[#3a4d39] w-[0%]'>{ratingReview[0]?.sum}</p>
                    </div>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px] '>
                            <RatingTemp rating={4} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div style={{ width: `${Math.floor((100 * (ratingReview[1]?.sum || 0)) / totalReview)}%` }} className='h-full  bg-[#3a4d39]'>

                            </div>
                        </div>
                        <p className='text-sm text-[#3a4d39] w-[0%]'>{ratingReview[1]?.sum}</p>
                    </div>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px] '>
                            <RatingTemp rating={3} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div style={{ width: `${Math.floor((100 * (ratingReview[2]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#3a4d39]'>

                            </div>
                        </div>
                        <p className='text-sm text-[#3a4d39] w-[0%]'>{ratingReview[2]?.sum}</p>
                    </div>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px] '>
                            <RatingTemp rating={2} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div style={{ width: `${Math.floor((100 * (ratingReview[3]?.sum || 0)) / totalReview)}%` }} className='h-full bg-[#3a4d39]'>

                            </div>
                        </div>
                        <p className='text-sm text-[#3a4d39] w-[0%]'>{ratingReview[3]?.sum}</p>
                    </div>
                    <div className='flex justify-start items-center gap-5'>
                        <div className='text-md flex gap-1 w-[93px] '>
                            <RatingTemp rating={1} />
                        </div>
                        <div className='w-[200px] h-[14px] bg-slate-200 relative'>
                            <div style={{ width: `${Math.floor((100 * (ratingReview[4]?.sum || 0)) / totalReview)}%` }} className='h-full  bg-[#3a4d39]'>

                            </div>
                        </div>
                        <p className='text-sm text-[#3a4d39] w-[0%]'>{ratingReview[4]?.sum}</p>
                    </div>
                </div>
            </div>
            <h2 className='text-[#3a4d39] text-xl py-5'>Products Reviews {totalReview}</h2>
            <div className='flex flex-col gap-8 pb-10 pt-4'>
                {
                    reviews.map((el, i) => <div key={i} className='flex flex-col gap-1'>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-1 text-xl'>
                                <RatingTemp rating={el.rating} />
                            </div>
                            <span className='text-[#3a4d39]'>{el.date}</span>
                        </div>
                        <span className='text-[#3a4d39] text-md'>{el.name}</span>
                        <p className='text-[#3a4d39] text-sm'>{el.review}</p>
                    </div>)
                }
                <div className='flex justify-end'>
                    {totalReview > 5 && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalReview} parPage={parPage} showItem={Math.round(totalReview / 5)} />}
                </div>
            </div>
            <div>
                {
                    userInfo ?
                        <div className='flex flex-col gap-3'>
                            <div className='flex gap-1'>
                                <RatingReact
                                    onChange={(e) => setRating(e)}
                                    initialRating={rating}
                                    emptySymbol={<span className='text-4xl text-[#3a4d39] gap-1 flex'><FaRegStar></FaRegStar></span>}
                                    fullSymbol={<span className='text-[#3a4d39] text-4xl gap-1 flex'><FaStar /></span>}
                                />
                            </div>
                            <form onSubmit={submitReview}>
                                <textarea required onChange={(e) => setReview(e.target.value)} className='border outline-0 p-3 w-full rounded-md' name="" id="" cols="30" rows="5"></textarea>
                                <div className='mt-2'>
                                    <button className='py-1 px-5 bg-[#739072] hover:bg-[#3a4d39] transition-all duration-300 rounded-md text-white'>Submit</button>
                                </div>
                            </form>
                        </div> : <div>
                            <Link className='py-1 px-5 bg-[#739072] hover:bg-[#3a4d39] transition-all duration-300 rounded-md text-white' to='/login'>Login</Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Reviews