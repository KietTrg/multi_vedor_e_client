import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { IoIosArrowForward } from 'react-icons/io'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import products from '../assets/products.jpg'
import product from '../assets/product.jpg'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Ratings from '../components/Ratings'
import Reviews from '../components/Reviews'
import ShopProducts from '../components/products/ShopProducts'
import { FaFacebookF, FaGithub, FaRegHeart } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { get_product } from '../store/Reducers/homeReducer'
import { formatMoney } from '../store/helpers'
import { add_to_card, add_to_wishlist, messageClear, quantity_dec, quantity_inc } from '../store/Reducers/cardReducer'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
const Details = () => {
    const { slug, pid } = useParams()
    console.log('pid: ', pid);
    console.log('slug: ', slug);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { product, relatedProducts, moreProducts, totalReview } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)

    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')
    const [quantity, setQuantity] = useState(1)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3,
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2,
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1,
        },

    }
    useEffect(() => {
        dispatch(get_product(pid))
    }, [pid])
    const inc = () => {

        if (quantity >= product.stock) {
            toast.error('Out of stock')
        } else {
            setQuantity(quantity + 1)
        }

    }
    const dec = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const addCard = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id
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
    const addWishlist = () => {
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
    }, [errorMessage, successMessage])

    const buy = () => {
        let price = 0
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }
        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price: quantity * (price - Math.floor((price * 5) / 100)),
                products: [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]
        navigate('/shipping', {
            state: {
                product: obj,
                price: price * quantity,
                shipping_fee: 50000,
                items: 1
            }
        })
    }
    return (
        <div>
            <Headers />
            {/* <div className='bg-[url("D:\DocumentsUniversity\Study\Multi_vendor_ecommerce\client\src\assets\footer1.jpg")] h-[220px] mt-6 bg-cover relative '>
                <div className='mx-auto w-full h-full  absolute left-0 top-0 bg-[rgba(0,0,0,0.5)] '>
                    <div className='flex flex-col justify-center items-center gap-1 h-full w-full text-white'>
                        <h2 className='text-4xl font-semibold mb-2'>Shop Products</h2>
                        <div className='flex items-center justify-center gap-2 '>
                            <Link to='/'>Home</Link>
                            <span><IoIosArrowForward /></span>
                            <span className='text-[#739072]'>Products</span>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='bg-slate-100 py-4 my-5'>
                <div className='w-[85%] md:w-[85%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex justify-start items-center text-md text-[#3a4d39] w-full'>
                        <Link to='/'>Home</Link>
                        <span><IoIosArrowForward /></span>
                        <span>{product.category}</span>
                        <span><IoIosArrowForward /></span>
                        <span className='text-[#739072]'>{product.name}</span>

                    </div>

                </div>
            </div>
            <section>
                <div className='w-[85%] md:w-[85%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                        <div>
                            <div className='p-5 border'>
                                <img className='h-[500px] w-full' src={image ? image : product?.images?.[0]} alt="" />
                            </div>
                            <div className='py-3'>
                                {product.images && <Carousel
                                    autoPlay={true}
                                    infinite={true}
                                    transitionDuration={500}
                                    responsive={responsive}
                                >
                                    {product.images?.map((el, i) => <div className='px-1 cursor-pointer' onClick={() => setImage(el)}>
                                        <img src={el} alt="" />
                                    </div>)}
                                </Carousel>}
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-[#3a4d39]'>
                                <h2>{product.name}</h2>
                            </div>
                            <div className='flex justify-start items-center gap-4'>
                                <div className='flex gap-1'>
                                    <Ratings ratings={product.rating} />
                                </div>
                                <span className='text-[#3a4d39]'>({totalReview} reviews)</span>
                            </div>
                            <div className='text-2xl text-[#CD8D7A] flex gap-2'>{
                                product?.discount ? <>
                                    <h2 className=' line-through'>{formatMoney(product?.price)}d</h2>
                                    <h2>{formatMoney(product.price - Math.floor((product.price * product.discount) / 100))}d (-{product.discount}%)</h2>
                                </> : <h2>Price: {formatMoney(product.price)}d</h2>
                            }</div>
                            <div className='text-[#3a4d39]'>
                                <p>{product.description}</p>
                            </div>
                            <div className='flex gap-3 pb-10 border-b'>
                                {product.stock ? <>
                                    <div className='flex justify-center items-center text-xl'>
                                        <div onClick={dec} className='px-6 cursor-pointer'>-</div>
                                        <div className='px-5'>{quantity}</div>
                                        <div onClick={inc} className='px-6 cursor-pointer'>+</div>
                                    </div>
                                    <div>
                                        <button onClick={addCard} className='px-8 py-2 h-[50px] cursor-pointer bg-[#739072] hover:bg-[#3a4d39] text-white rounded-md transition-all'>Add To Card</button>
                                    </div>
                                </> : ""}
                                <div>
                                    <div onClick={addWishlist} className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer'>
                                        <FaRegHeart />
                                    </div>
                                </div>
                            </div>
                            <div className='flex py-5 gap-5'>
                                <div className='w-[150px] text-black flex flex-col gap-5 text-xl'>
                                    <span>Availability</span>
                                    <span>Share on</span>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <span className={`text-${product.stock ? 'green' : 'red'}-500`}>{product.stock ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
                                    <ul className='flex justify-start items-center gap-3'>
                                        <li> <a className='h-[38px] w-[38px] flex items-center justify-center' href="#"><FaFacebookF /></a></li>
                                        <li><a className='h-[38px] w-[38px] flex items-center justify-center' href="#"><FaXTwitter /></a></li>
                                        <li><a className='h-[38px] w-[38px] flex items-center justify-center' href="#"><FaGithub /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex py-5 gap-5'>
                                {product.stock ? <button onClick={buy} className='px-8 py-2 h-[50px] cursor-pointer bg-[#739072] hover:bg-[#3a4d39] text-white rounded-md transition-all'>Buy Now</button> : ""}
                                <Link to={`/dashboard/chat/${product.sellerId}`} className='block px-8 py-2 h-[50px] cursor-pointer bg-[#739072] hover:bg-[#3a4d39] text-white rounded-md transition-all'>Chat Seller</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[85%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>
                        <div className='w-[72%] md-lg:w-full'>
                            <div className='pr-4 md-lg:pr-0'>
                                <div className='grid grid-cols-2'>
                                    <button onClick={() => setState('reviews')} className={`py-1 px-5 hover:bg-green-500 ${state === 'reviews' ? 'bg-green-500 text-white' : 'bg-slate-200 text-[#3a4d39]'}`}>Reviews</button>
                                    <button onClick={() => setState('description')} className={`py-1 px-5 hover:bg-green-500 ${state === 'description' ? 'bg-green-500 text-white' : 'bg-slate-200 text-[#3a4d39]'}`}>Description</button>
                                </div>
                                <div>
                                    {state === 'reviews' ? <Reviews product={product}></Reviews> : <p className='py-5 text-[#3a4d39] '>'{product.description}'</p>}
                                </div>
                            </div>
                        </div>
                        <div className='w-[28%] md-lg:w-full'>
                            <div className='pl-4 md-lg:pl-0'>
                                <div className='px-3 py-2 text-[#3a4d39] bg-[#D0E7D2]'>
                                    <h2>From {product.shopName}</h2>
                                </div>
                                <div className='flex flex-col gap-5 mt-3 border p-3'>
                                    {moreProducts.length > 0 ? moreProducts.map((el, i) => <Link to={`/product/details/${el.slug}/${el._id}`} className='block'>
                                        <div className=' relative h-[350px]'>
                                            <img className='w-full h-full' src={el.images[0]} alt="" />
                                            <div className='flex justify-center items-center absolute text-white w-[45px] h-[25px] rounded-md bg-[#E6BA95] left-2 top-2'>
                                                {el.discount}%
                                            </div>
                                        </div>
                                        <h2 className='text-[#3a4d39] py-1'>{el.name}</h2>
                                        <div className='flex gap-1 items-center'>
                                            <Ratings ratings={el.rating} />
                                        </div>
                                    </Link>) : <h2>No more products from {product.shopName}</h2>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[85%] sm:w-[90%] lg:w-[90%] h-full mx-auto '>
                    <h2 className='text-2xl py-8 text-[#3a4d39]'>Related Products</h2>
                    <div>
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={
                                {
                                    1280: {
                                        slidesPerView: 3
                                    },
                                    565: {
                                        slidesPerView: 2
                                    },
                                }
                            }
                            spaceBetween={25}
                            loop={true}
                            pagination={
                                {
                                    clickable: true,
                                    el: '.custom_bullet'
                                }
                            }
                            modules={[Pagination]}
                            className='mySwiper'

                        >

                            {relatedProducts.map((el, i) => <SwiperSlide>
                                <Link className='block'>
                                    <div className=' relative h-[350px]'>
                                        <div className='w-full h-full'>

                                            <img className='w-full h-full' src={el?.images[0]} alt="img" />
                                            <div className=' absolute h-full w-full top-0 left-0 bg-black opacity-25 hover:opacity-50 transition-all duration-500'></div>
                                        </div>
                                        <div className='flex justify-center items-center absolute text-white w-[45px] h-[25px] rounded-md bg-[#E6BA95] left-2 top-2'>
                                            {el?.discount}%
                                        </div>
                                    </div>
                                    <div className='p-4 flex flex-col gap-1'>

                                        <h2 className='text-[#3a4d39] text-lg'>{el?.name}</h2>
                                        <div className='flex justify-between items-center gap-2'>
                                            <h2 className='text-[#CD8D7A] text-lg'>{formatMoney(el?.price)}d</h2>
                                            <div className='flex gap-1'>
                                                <Ratings ratings={el?.rating} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>)}
                        </Swiper>
                    </div>
                    <div className='w-full flex justify-center items-center py-10'>
                        <div className='custom_bullet justify-center items-center flex gap-2 w-auto'></div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Details