import React, { useEffect } from 'react'
import { formatMoney } from '../../store/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux'
import Ratings from '../Ratings';
import { add_to_card, add_to_wishlist, messageClear } from '../../store/Reducers/cardReducer';
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
const FeatureProducts = ({ products }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)
    const addToCard = (pid) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: pid
            }))
        } else {
            Swal.fire({
                title: 'Please Login',
                text: "Welcome! Please Login to continue.",
                icon: "info",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {

                    navigate('/login')
                }
            })
        }
    }
    const addToWishlist = (product) => {
        // console.log('product: ', product);
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug,
            }))
        } else {
            Swal.fire({
                title: 'Please Login',
                text: "Welcome! Please Login to continue.",
                icon: "info",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {

                    navigate('/login')
                }
            })
        }
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }


    }, [successMessage, errorMessage])

    return (
        <div className='w-[86%] flex flex-wrap mx-auto'>
            <div className='w-full'>
                <div className='text-center flex justify-between items-center text-4xl text-[#3A4D39] relative pb-[45px]'>
                    <div className='w-[35%] h-[2px] bg-[#3A4D39] mt-2'></div>
                    <h2>Featured Products</h2>
                    <div className='w-[35%] h-[2px] bg-[#3A4D39] mt-2'></div>
                </div>
            </div>
            <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                {products.map((el, index) => <div key={index} className=' group transition-all cursor-pointer duration-500 hover:shadow-md hover:border-[#3A4D39] rounded-md hover:border hover:-mt-3'>
                    <div className=' relative overflow-hidden'>
                        {el.discount > 0 && <div className='flex justify-center items-center absolute text-white w-[45px] h-[25px] rounded-md bg-[#E6BA95] left-2 top-2'>{el.discount}%</div>}
                        <img className=' rounded-md sm:w-full w-full h-[300px]' src={el.images[0]} alt="" />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => addToWishlist(el)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all '><FaRegHeart></FaRegHeart></li>
                            <Link className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all ' to={`/product/details/${el.slug}/${el._id}`}><MdOutlineRemoveRedEye /></Link>
                            <li onClick={() => addToCard(el._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all '><PiShoppingBagOpenDuotone /></li>
                        </ul>
                    </div>
                    <div className='py-3 text-[#3A4D39] px-2'>
                        <h2>{el.name}</h2>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-lg text-[#CD8D7A] font-semibold'>{formatMoney(el.price)} đ</span>
                            <div className='flex gap-1'>
                                <Ratings ratings={el.rating} />
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default FeatureProducts