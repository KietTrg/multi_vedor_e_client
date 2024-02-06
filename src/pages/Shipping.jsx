import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, redirect, useNavigate, useLocation } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { BsShopWindow } from 'react-icons/bs'
import { FaRegTrashCan } from 'react-icons/fa6'
import product from '../assets/products.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from '../store/helpers'
import { place_order } from '../store/Reducers/orderReducer'

const Shipping = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { state: { product, price, shipping_fee, items } } = useLocation()
    // console.log('data: ', data);
    // console.log('state: ', state);
    const [state, setState] = useState({
        name: '',
        address: '',
        phone: '',
        post: '',
        province: '',
        city: "",
        area: ""
    })
    const [res, setRes] = useState(false)
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const save = (e) => {
        e.preventDefault()
        const { name, address, phone, post, province, city, area } = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }
    }
    const placeOrder = () => {
        dispatch(place_order({
            price,
            product,
            shipping_fee,
            shippingInfo: state,
            userId: userInfo.id,
            navigate,
            items
        }))
    }
    console.log('product: ', product);

    return (
        <div>
            <Headers />
            <section className='bg-[url("D:\DocumentsUniversity\Study\Multi_vendor_ecommerce\client\src\assets\footer1.jpg")] h-[220px] mt-6 bg-cover relative '>
                <div className='mx-auto w-full h-full  absolute left-0 top-0 bg-[rgba(0,0,0,0.5)] '>
                    <div className='flex flex-col justify-center items-center gap-1 h-full w-full text-white'>
                        <h2 className='text-4xl font-semibold mb-2'>Shop Products</h2>
                        <div className='flex items-center justify-center gap-2 '>
                            <Link to='/'>Home</Link>
                            <span><IoIosArrowForward /></span>
                            <span className='text-[#739072]'>Place Order</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16'>
                    <div className='w-full flex flex-wrap'>
                        <div className='w-[67%] md-lg:w-full'>
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-6 shadow-sm rounded-md">
                                    {
                                        !res && <>
                                            <h2 className='text-slate-600 font-bold pb-3'>Shipping Information</h2>
                                            <form onSubmit={save}>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="name">Name</label>
                                                        <input onChange={inputHandle} value={state.name} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='name' placeholder='name' id='name' />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="address">Address</label>
                                                        <input onChange={inputHandle} value={state.address} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='address' placeholder='House no / building / strreet /area' id='address' />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="phone">Phone</label>
                                                        <input onChange={inputHandle} value={state.phone} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='phone' placeholder='phone' id='phone' />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="post">Post</label>
                                                        <input onChange={inputHandle} value={state.post} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='post' placeholder='post' id='post' />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="province">Province</label>
                                                        <input onChange={inputHandle} value={state.province} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='province' placeholder='province' id='province' />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="city">City</label>
                                                        <input onChange={inputHandle} value={state.city} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='city' placeholder='city' id='city' />
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label htmlFor="area">Area</label>
                                                        <input onChange={inputHandle} value={state.area} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' name='area' placeholder='area' id='province' />
                                                    </div>
                                                    <div className='flex flex-col gap-1 mt-3 w-full'>
                                                        <button className='px-3 py-[6px] rounded-sm hover:shadow-indigo-500/20 hover:shadow-lg bg-indigo-500 text-white'>Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </>
                                    }
                                    {
                                        res && <div className='flex flex-col gap-1'>
                                            <h2 className='text-slate-600 font-semibold pb-2'>Deliver to Kiet Truong</h2>
                                            <p>
                                                <span className='bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>Home</span>
                                                <span className='text-slate-600 text-sm'>{state?.address} {state?.province} {state?.city} {state?.area}</span>
                                                <span onClick={() => setRes(false)} className='text-indigo-500 cursor-pointer'> change</span>
                                            </p>
                                            <p className='text-slate-600 text-sm'>Email to kietb2016977@student.ctu.edu.vn</p>
                                        </div>
                                    }
                                </div>
                                {
                                    product.map((el, i) => <div key={i} className='flex bg-white rounded-md p-4 flex-col gap-2'>
                                        <div className='flex gap-2 justify-start items-center'>
                                            <span><BsShopWindow></BsShopWindow></span>
                                            <h2 className='text-md text-[#3A4D39]'>{el.shopName}</h2>
                                        </div>
                                        {
                                            el.products.map((e, i) => <div key={i} className='w-full flex flex-wrap'>
                                                <div className='flex sm:w-full gap-2 w-6/12'>
                                                    <div className='flex gap-2 justify-start items-center'>
                                                        <img className='w-[80px] h-[80px] rounded-md' src={e
                                                            .productInfo.images[0]} alt="product" />
                                                        <div className=' pr-4 text-[#3A4D39]'>
                                                            <h2 className='text-md' >{e
                                                                .productInfo.name}</h2>
                                                            <span className='text-sm'>Brand: {e
                                                                .productInfo.brand}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center justify-end w-6/12 sm:w-full sm:mt-3'>
                                                    <div className=' pl-4 sm:pl-0'>
                                                        <h2 className=' text-lg text-[#CD8D7A] font-semibold'>{formatMoney(e.productInfo.price - Math.floor((e
                                                            .productInfo.price * e.productInfo.discount) / 100))} vnd</h2>
                                                        <p className=' line-through'>{formatMoney(e
                                                            .productInfo.price)} vnd</p>
                                                        <p>-{e.productInfo.discount}%</p>
                                                    </div>

                                                </div>
                                            </div>)
                                        }
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className='w-[33%] md-lg:w-full'>
                            <div className="pl-3 md-lg:pl-0">
                                <div className='bg-white font-medium p-5 text-slate-600 flex flex-col gap-3'>
                                    <h2 className='text-xl font-semibold'>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <span>Items Total ({items})</span>
                                        <span>{formatMoney(price)} vnđ</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span>Delivery Fee</span>
                                        <span>{formatMoney(shipping_fee)} vnđ</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span>Total Payment</span>
                                        <span>{formatMoney(price + shipping_fee)} vnđ</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span>Total</span>
                                        <span>{formatMoney(price + shipping_fee)} vnđ</span>
                                    </div>
                                    <button onClick={placeOrder} disabled={res ? false : true} className={`px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg ${res ? 'bg-orange-500' : 'bg-orange-300'} text-sm text-white uppercase`}>Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Shipping