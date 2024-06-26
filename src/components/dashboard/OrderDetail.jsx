import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { get_order } from '../../store/Reducers/orderReducer'
import { formatMoney } from '../../store/helpers'

const OrderDetail = () => {
    const dispatch = useDispatch()
    const { orderId } = useParams()
    const { myOrder } = useSelector(state => state.order)
    const { userInfo } = useSelector(state => state.auth)
    console.log('myOrder: ', myOrder);
    useEffect(() => {
        dispatch(get_order(orderId))
    }, [orderId])
    return (
        <div className='bg-white p-5'>
            <h2 className='text-slate-600 font-semibold'>#{myOrder._id} , <span className='pl-1'>{myOrder.date}</span></h2>
            <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-slate-600 font-semibold'>Deliver to: {myOrder.shippingInfo?.name}</h2>
                    <p>
                        <span className='bg-[#739072] text-[#3a4d39] text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>Home</span>
                        <span className='text-slate-600 text-sm'>{myOrder.shippingInfo?.address} {myOrder.shippingInfo?.province} {myOrder.shippingInfo?.city} {myOrder.shippingInfo?.area}</span>
                    </p>
                    <p className='text-slate-600 text-sm font-semibold'>Email to {userInfo.email}</p>
                </div>
                <div className='text-slate-600'>
                    <h2>Price: {formatMoney(myOrder.price)} vnđ include shipping iee</h2>
                    <p>Pyment status: <span className={`py-[1px] text-xs px-3 ${myOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md `}>{myOrder.paymentStatus}</span></p>
                    <p>Order status: <span className={`py-[1px] text-xs px-3 ${myOrder.deliveryStatus === 'paid' ? 'bg-indigo-100 text-indigo-800' : 'bg-red-100 text-red-800'} rounded-md `}>{myOrder.deliveryStatus}</span></p>
                </div>
            </div>
            <div className='mt-3'>
                <h2 className='text-slate-600 text-lg pb-2'>Products</h2>
                <div className='flex gap-5 flex-col'>
                    {
                        myOrder.products?.map((el, i) => <div key={i}>
                            <div className='flex gap-5 justify-start items-center text-slate-600'>
                                <div className='flex gap-2'>
                                    <img className='w-[55px] h-[55px]' src={el.images[0]} alt="image" />
                                    <div className='flex text-sm flex-col justify-start items-start'>
                                        <Link>{el.name}</Link>
                                        <p>
                                            <span>Brand: {el.brand}</span>
                                            <span>Quantity: {el.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='pl-4'>
                                    <h2 className='text-md text-orange-500'>{formatMoney(el.price - Math.floor((el.price * el.discount) / 100))}vnđ</h2>
                                    {
                                        el.discount > 0 &&
                                        <>
                                            <p>{formatMoney(el.price)} vnđ</p>
                                            <p>-{el.discount}%</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderDetail