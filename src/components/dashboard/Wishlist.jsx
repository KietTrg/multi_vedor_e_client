import React, { useEffect } from 'react'
import product from '../../assets/products.jpg'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import Ratings from '../Ratings'
import { useDispatch, useSelector } from 'react-redux'
import { get_wishlists, delete_wishlist, messageClear } from '../../store/Reducers/cardReducer'
import { formatMoney } from '../../store/helpers'
import toast from 'react-hot-toast'
const Wishlist = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { wishlist, successMessage } = useSelector(state => state.card)
    // console.log('wishlist: ', wishlist);
    const deleteWishlist = (wishlistId) => {
        dispatch(delete_wishlist(wishlistId))

    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_wishlists(userInfo.id))
        }
    })
    useEffect(() => {
        dispatch(get_wishlists(userInfo.id))
    }, [])
    return (
        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
            {
                wishlist.map((el, i) => <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'>
                    <div className='relative overflow-hidden'>

                        {
                            el.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{el.discount}%</div>
                        }

                        <img className='sm:h-full w-full h-[240px]' src={el.image} alt="product image" />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => deleteWishlist(el._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all'>
                                <FaRegHeart />
                            </li>
                            <Link to={`/product/details/${el.slug}/${el.productId}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all' >
                                <MdOutlineRemoveRedEye />
                            </Link>

                        </ul>
                    </div>
                    <div className='py-3 text-slate-600 px-2'>
                        <h2>{el.name}</h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-lg  font-bold'>{formatMoney(el.price
                            )}vnd</span>
                            <div className='flex'>
                                <Ratings ratings={el.rating} />
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </div>
    )
}

export default Wishlist