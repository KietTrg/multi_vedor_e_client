import React, { useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Swal from 'sweetalert2'
import { addToCoupons, messageClear } from '../store/Reducers/homeReducer'
import toast from 'react-hot-toast'
const Voucher = () => {
    const { coupons, successMessage, errorMessage } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1,
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1,
        },
    }
    const checkStatusCoupon = (expire) => {
        if (Date.now() < new Date(expire).getTime()) {
            return true
        }
        return false
    }
    const addVoucher = (Voucher) => {
        if (userInfo) {
            dispatch(addToCoupons({
                userId: userInfo.id,
                couponId: Voucher._id,
                name: Voucher.name,
                expire: Voucher.expire,
                percent: Voucher.percent
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
        <div className='w-[87%] mx-auto relative'>

            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                transitionDuration={500}
                showDots={true}
                responsive={responsive}
            >
                {coupons.map((el, i) =>
                    checkStatusCoupon(el.expire) ? <div className='w-full h-[180px] relative p-3'>
                        <div className='w-full h-full bg-[#b3c6b3] rounded-md py-3 px-2'>
                            <div className='bg-white h-4 w-4 rounded-full absolute top-[3px] left-[108px] z-50'></div>
                            <div className='flex h-full w-full'>
                                <div className=' items-center justify-center flex w-1/3 border-r-2 border-dashed'>
                                    <span className='font-semibold text-3xl text-center text-[#3A4D39]'>Plant Go</span>
                                </div>
                                <div className=' w-2/3 flex flex-col gap-2 px-2'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-3xl font-bold text-[#3A4D39]'>{el.percent}<span className='text-xl'>%OFF</span></span>
                                        <button onClick={() => addVoucher(el)} className='p-1 bg-[#81a080] rounded-md hover:bg-[#516450] transition-all duration-300'>Collect</button>
                                    </div>
                                    <div className='gap-1 flex-col flex w-fit'>
                                        <span>Coupon code: </span>
                                        <span className='rounded-bl-full rounded-tr-full bg-[#81a080] px-3 py-[2px] italic'>{el.name}</span>
                                    </div>
                                    <span className='text-xs italic'>Expire: {moment(el.expire).format('DD/MM/YYYY hh:mm:ss a')}</span>
                                </div>
                            </div>
                            <div className='bg-white h-4 w-4 rounded-full absolute bottom-[3px] left-[108px] z-50'></div>
                        </div>
                    </div> : <div></div>
                )}
            </Carousel>
        </div>

    )
}

export default Voucher