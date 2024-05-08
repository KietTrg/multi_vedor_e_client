import React, { useEffect } from 'react'
import product from '../../assets/products.jpg'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { PiShoppingBagOpenDuotone } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import Ratings from '../Ratings'
import { formatMoney } from '../../store/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_card, add_to_wishlist, messageClear } from '../../store/Reducers/cardReducer'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const ShopProducts = ({ styles, products }) => {
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
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : ' grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-3`}>
            {
                products.map((el, i) => <div key={i} className={`flex transition-all duration-500 hover:shadow-md hover:border hover:border-green-950 hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
                    <div className={styles === 'grid' ? 'w-full relative group h-[210px] md:-[270px] xs:h-[170px] overflow-hidden' : ' md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden'}>
                        <img className='h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover' src={el.images[0]} alt="" />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => addToWishlist(el)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all '><FaRegHeart></FaRegHeart></li>
                            <Link className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all ' to={`/product/details/${el.slug}/${el._id}`}><MdOutlineRemoveRedEye /></Link>
                            <li onClick={() => addToCard(el._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#4d664c] hover:text-white hover:rotate-[720deg] transition-all '><PiShoppingBagOpenDuotone /></li>
                        </ul>
                    </div>
                    <div className='flex justify-start items-start flex-col gap-1'>

                        <h2 className='text-[#3A4D39]'>{el.name}</h2>
                        <div className='flex justify-between items-center gap-3'>
                            <span className='text-lg text-[#CD8D7A] font-semibold'>{formatMoney(el.price)}đ</span>
                            <div className='flex gap-1'>
                                <Ratings ratings={el.rating} />
                            </div>
                        </div>

                    </div>
                </div>)}
        </div>
    )
}

export default ShopProducts