import React, { useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_data } from '../../store/Reducers/dashboardReducer'
import { PiShoppingBagOpenDuotone } from 'react-icons/pi'
import { FaRegHeart } from 'react-icons/fa'
import { TbDiscount } from 'react-icons/tb'
import { formatMoney } from '../../store/helpers'
const Index = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { totalOrder, pendingOrder, cancelledOrder, recentOrder } = useSelector(state => state.dashboard)
    // console.log('cancelledOrder: ', cancelledOrder);
    // console.log('pendingOrder: ', pendingOrder);
    // console.log('totalOrder: ', totalOrder);

    useEffect(() => {
        dispatch(get_data(userInfo.id))
    }, [])
    const redirect = (order) => {
        console.log('order: ', order);
        let items = 0
        for (let i = 0; i < order.length; i++) {
            items = order.products[i].quantity + items
            console.log('items: ', items);
        }
        navigate('/payment', {
            state: {
                price: order.price,
                items: items,
                orderId: order._id
            }
        })
    }
    return (
        <div>
            <div className='grid grid-cols-3 md:grid-cols-1 gap-5'>
                <div className='flex justify-center items-center p-5 bg-white shadow-md rounded-md gap-5'>
                    <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl '>
                        <span className='text-xl text-green-800'>
                            <PiShoppingBagOpenDuotone />
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{totalOrder}</h2>
                        <span>Orders</span>
                    </div>
                </div>
                <div className='flex justify-center items-center p-5 bg-white shadow-md rounded-md gap-5'>
                    <div className='bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl '>
                        <span className='text-xl text-blue-800'>
                            <FaRegHeart />
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{pendingOrder}</h2>
                        <span>Total WishList</span>
                    </div>
                </div>
                <div className='flex justify-center items-center p-5 bg-white shadow-md rounded-md gap-5'>
                    <div className='bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl '>
                        <span className='text-xl text-red-800'>
                            <TbDiscount size={25} />
                        </span>
                    </div>
                    <div className='flex flex-col justify-start items-start text-slate-600'>
                        <h2 className='text-3xl font-bold'>{cancelledOrder}</h2>
                        <span>Total Voucher</span>
                    </div>
                </div>
            </div>
            <div className='bg-white p-4 mt-5 shadow-md rounded-md'>
                <h2 className='text-lg font-semibold text-slate-600'>Recent Orders</h2>
                <div className='pt-4'>
                    <div className='relative overflow-x-auto'>
                        <table className='w-full text-sm text-left text-gray-500'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>Order Id</th>
                                    <th scope='col' className='px-6 py-3'>Price</th>
                                    <th scope='col' className='px-6 py-3'>Payment status</th>
                                    <th scope='col' className='px-6 py-3'>Order status</th>
                                    <th scope='col' className='px-6 py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    recentOrder.map((el, i) => <tr key={i} className='bg-white border-b'>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{el._id}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{formatMoney(el.price)}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{el.paymentStatus}</td>
                                        <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{el.deliveryStatus}</td>
                                        <td scope='row' className='px-6 py-4'>
                                            <Link to={`/dashboard/order/order-detail/${el._id}`}>
                                                <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>view</span>
                                            </Link>
                                            {
                                                el.paymentStatus === 'paid' ? '' : <span onClick={() => redirect(el)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer'>Pay Now</span>
                                            }
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index