import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_orders } from '../../store/Reducers/orderReducer'
import { formatMoney } from '../../store/helpers'
const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { myOrder, myOrders } = useSelector(state => state.order)
    console.log('myOrder: ', myOrder);
    console.log('myOrders: ', myOrders);
    const [state, setState] = useState('all')
    useEffect(() => {
        dispatch(get_orders({ status: state, customerId: userInfo.id }))
    }, [state])
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
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>My Orders</h2>
                <select className=' outline-none px-3 py-1 border rounded-md' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="all">--order status--</option>
                    <option value="placed">placed</option>
                    <option value="pending">pending</option>
                    <option value="cancelled">cancelled</option>
                    <option value="warehouse">warehouse</option>
                </select>
            </div>
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
                                myOrders.map((el, i) => <tr key={i} className='bg-white border-b'>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{el._id}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{formatMoney(el.price)} vnđ</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{el.paymentStatus}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{el.deliveryStatus}</td>
                                    <td scope='row' className='px-6 py-4'>
                                        <Link to={`/dashboard/order/order-detail/${el._id}`}>
                                            <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>view</span>
                                        </Link>
                                        {
                                            <span onClick={() => redirect(el)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer'>Pay Now</span>
                                        }
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders