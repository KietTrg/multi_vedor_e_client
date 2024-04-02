import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVoucherCustomer } from '../../store/Reducers/couponReducer'
import moment from 'moment'
import toast from 'react-hot-toast'
// import { updateExpireVoucher } from '../../store/Reducers/homeReducer'

const MyVouchers = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { coupons } = useSelector(state => state.coupon)


    useEffect(() => {
        dispatch(getVoucherCustomer(userInfo.id))
    }, [])
    const getText = (text) => {
        console.log('text: ', text);
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copy coupon success')
        }).catch((err) => {
            toast.error('Failed to copy:', err)
        })
    }
    return (
        <div className='w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1'>
            {coupons.map((el, i) =>
                <div key={i} className='w-full h-[180px] relative p-3'>
                    <div className='w-full h-full bg-[#b3c6b3] rounded-md py-3 px-2'>
                        <div className='bg-white h-4 w-4 rounded-full absolute top-[3px] left-[130px] z-50'></div>
                        <div className='flex h-full w-full'>
                            <div className=' items-center justify-center flex w-1/3 border-r-2 border-dashed'>
                                <span className='font-semibold text-3xl text-center text-[#3A4D39]'>Plant Go</span>
                            </div>
                            <div className=' w-2/3 flex flex-col gap-2 px-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-3xl font-bold text-[#3A4D39]'>{el.percent}<span className='text-xl'>%OFF</span></span>
                                    <button onClick={() => getText(el.name)} className='p-1 bg-[#81a080] rounded-md hover:bg-[#516450] transition-all duration-300 text-sm'>Copy code coupon</button>
                                </div>
                                <div className='gap-1 flex-col flex w-fit'>
                                    <span>Coupon code: </span>
                                    <span className='rounded-bl-full rounded-tr-full bg-[#81a080] px-3 py-[2px] italic'>{el.name}</span>

                                </div>
                                <span className='text-xs italic'>Expire: {moment(el.expire).format('DD/MM/YYYY hh:mm:ss a')}</span>
                            </div>
                        </div>
                        <div className='bg-white h-4 w-4 rounded-full absolute bottom-[3px] left-[130px] z-50'></div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyVouchers