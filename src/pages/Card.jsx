import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, redirect, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { BsShopWindow } from 'react-icons/bs'
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { get_card, delete_card, messageClear, quantity_inc, quantity_dec, get_fee } from '../store/Reducers/cardReducer'
import { formatMoney } from '../../src/store/helpers'
import toast from 'react-hot-toast'
import { applyCoupon } from '../store/Reducers/couponReducer'


const Card = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { card_products, successMessage, count, price, shipping_fee, outofstock, buyProductItem } = useSelector(state => state.card)
    // console.log('count: ', count);
    // console.log('card_products: ', card_products.map(e => e.products.map((el) => el.quantity)));

    const { successMessage: successMessageCoupon, percentCoupon } = useSelector(state => state.coupon)


    // console.log('card_products.length: ', card_products.length);
    const [voucher, setVoucher] = useState('')
    // const card_products = [1, 2, 3]
    // const outofstock = [1, 2]
    const redirect = () => {

        navigate('/shipping', {
            state: {
                product: card_products,
                price: percentCoupon > 0 ? price + shipping_fee - ((price + shipping_fee) * (percentCoupon / 100)) : price + shipping_fee,
                oldPrice: price,
                shipping_fee: shipping_fee,
                items: buyProductItem
            }
        })
    }

    useEffect(() => {
        dispatch(get_card(userInfo.id))
        // dispatch(get_fee())
        console.log('userInfo.id: ', userInfo.id);
    }, [])
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            dispatch(get_card(userInfo.id))
        }
    }, [successMessage])
    const inc = (quantity, stock, cardId) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_inc(cardId))
        }
    }
    const dec = (quantity, cardId) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(quantity_dec(cardId))
        }
    }
    const handleApply = () => {
        // voucher
        dispatch(applyCoupon({ info: voucher }))
    }
    return (
        <div>
            <Headers />
            <section className='bg-[url("D:\DocumentsUniversity\Study\Multi_vendor_ecommerce\client\src\assets\footer1.jpg")] h-[220px] mt-6 bg-cover relative '>
                <div className='mx-auto w-full h-full  absolute left-0 top-0 bg-[rgba(0,0,0,0.5)] '>
                    <div className='flex flex-col justify-center items-center gap-1 h-full w-full text-white'>
                        <h2 className='text-4xl font-semibold mb-2'>Card</h2>
                        <div className='flex items-center justify-center gap-2 '>
                            <Link to='/'>Home</Link>
                            <span><IoIosArrowForward /></span>
                            <span className='text-[#739072]'>Card</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-[#eee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
                    {card_products.length > 0 || outofstock.length > 0 ? <div className='flex flex-wrap'>
                        <div className='w-[67%] md-lg:w-full '>
                            <div className='pr-3 md-lg:pr-0'>
                                <div className='flex flex-col gap-3'>
                                    <div className='bg-[#D0E7D2] p-2 rounded-md'>
                                        <h2 className='text-md font-semibold text-[#3A4D39]'>Stock Products {card_products.length}</h2>
                                    </div>
                                    {
                                        card_products.map((el, i) => <div key={i} className='flex bg-white rounded-md p-4 flex-col gap-2'>
                                            <div className='flex gap-2 justify-start items-center'>
                                                <span><BsShopWindow></BsShopWindow></span>
                                                <h2 className='text-md text-[#3A4D39]'>{el.shopName}</h2>
                                            </div>
                                            {
                                                el.products.map((e, i) => <div className='w-full flex flex-wrap border-b-2 pb-2    '>
                                                    <div className='flex sm:w-full gap-2 w-6/12'>
                                                        <div className='flex gap-2 justify-start items-center'>
                                                            <img className='w-[80px] h-[80px] rounded-md' src={e.productInfo.images[0]} alt="product" />
                                                            <div className=' pr-4 text-[#3A4D39]'>
                                                                <h2 className='text-md' >{e.productInfo.name}</h2>
                                                                <span className='text-sm'>Brand: {e.productInfo.brand}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center justify-between w-6/12 sm:w-full sm:mt-3'>
                                                        {e.productInfo.discount !== 0 ? <div className=' pl-4 sm:pl-0'>
                                                            <h2 className=' text-lg text-[#CD8D7A] font-semibold'>{formatMoney(e.productInfo.price - Math.floor((e.productInfo.price * e.productInfo.discount) / 100))} vnđ</h2>
                                                            <p className=' line-through'>{formatMoney(e.productInfo.price)} vnđ</p>
                                                            <p>-{e.productInfo.discount}%</p>
                                                        </div> : <div className=' pl-4 sm:pl-0'>
                                                            <h2 className=' text-lg text-[#CD8D7A] font-semibold'>{formatMoney(e.productInfo.price)} vnđ</h2>

                                                        </div>}
                                                        <div className='flex flex-col gap-2'>
                                                            <div className='flex justify-center items-center h-[30px] text-xl text-[#3a4d39]'>
                                                                <div onClick={() => dec(e.quantity, e._id)} className='px-3 cursor-pointer after:h-[30px] relative after:absolute after:-right-[1px] after:bg-[#3a4d39] after:w-[1px]'>-</div>
                                                                <div className='px-3 '>{e.quantity}</div>
                                                                <div onClick={() => inc(e.quantity, e.productInfo.stock, e._id)} className='px-3 cursor-pointer after:h-[30px] relative after:absolute after:left-0 after:bg-[#3a4d39] after:w-[1px]'>+</div>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => dispatch(delete_card(e._id))} className='text-[#3a4d39] hover:text-[#cd8d7a]'><FaRegTrashCan size={20} /></button>
                                                    </div>
                                                </div>)
                                            }
                                        </div>)
                                    }
                                    {
                                        outofstock.length > 0 && <div className='flex flex-col gap-3'>
                                            <div className='bg-[#D0E7D2] p-2 rounded-md'>
                                                <h2 className='text-md font-semibold text-[#3A4D39]'>Out of Stock {outofstock.length}</h2>
                                            </div>
                                            <div className='bg-white p-4'>
                                                {
                                                    outofstock.map((el, i) => <div className='w-full flex flex-wrap'>
                                                        <div className='flex sm:w-full gap-2 w-6/12'>
                                                            <div className='flex gap-2 justify-start items-center'>
                                                                <img className='w-[80px] h-[80px] rounded-md' src={el.products[0].images[0]} alt="product" />
                                                                <div className=' pr-4 text-[#3A4D39]'>
                                                                    <h2 className='text-md' >{el.products[0].name}</h2>
                                                                    <span className='text-sm'>Brand: {el.products[0].brand}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center justify-between w-6/12 sm:w-full sm:mt-3'>
                                                            <div className=' pl-4 sm:pl-0'>
                                                                <h2 className=' text-lg text-[#CD8D7A] font-semibold'>{formatMoney(el.products[0].price - Math.floor((el.products[0].price * el.products[0].discount) / 100))} vnđ</h2>
                                                                <p className=' line-through'>{formatMoney(el.products[0].price)} vnđ</p>
                                                                <p>-{el.products[0].discount}%</p>
                                                            </div>
                                                            <div className='flex flex-col gap-2'>
                                                                <div className='flex justify-center items-center h-[30px] text-xl text-[#3a4d39]'>
                                                                    <div onClick={() => dec(el.quantity, el._id)} className='px-3 cursor-pointer after:h-[30px] relative after:absolute after:-right-[1px] after:bg-[#3a4d39] after:w-[1px]'>-</div>
                                                                    <div className='px-3 '>{el.quantity}</div>
                                                                    <div className='px-3 cursor-pointer after:h-[30px] relative after:absolute after:left-0 after:bg-[#3a4d39] after:w-[1px]'>+</div>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => dispatch(delete_card(el._id))} className='text-[#3a4d39] hover:text-[#cd8d7a]'><FaRegTrashCan size={20} /></button>
                                                        </div>
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-[33%] md-lg:w-full'>
                            <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                                {
                                    card_products.length > 0 && <div className='bg-white text-[#3d4a39] flex flex-col gap-3 p-2'>
                                        <h2 className='text-xl font-semibold'>Order Summary</h2>
                                        <div className='flex justify-between items-center'>
                                            <span>{buyProductItem} Item</span>
                                            <span>{formatMoney(price)} vnđ</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span>Shipping Fee</span>
                                            <span>{formatMoney(shipping_fee)} vnđ</span>
                                        </div>
                                        <div className='flex gap-2'>
                                            <input onChange={(e) => setVoucher(e.target.value)} value={voucher} className='w-full px-3 py-1 outline-0 bg-[#D0E7D2] rounded-md focus:border-[#3a4d39] border' type="text" placeholder='Input voucher' />
                                            <button onClick={handleApply} className='px-5 py-[1px] bg-[#739072] text-white rounded-md'>Apply</button>
                                        </div>
                                        {percentCoupon > 0 && <div className='flex justify-between items-center'>
                                            <span>Discount</span>
                                            <span>{formatMoney(percentCoupon)}%</span>
                                        </div>}
                                        <div className='flex justify-between items-center'>
                                            <span>Total</span>
                                            <span className='text-lg text-[#cd8d7a]'>{formatMoney((price + shipping_fee) - (price + shipping_fee) * (percentCoupon / 100))} vnđ</span>
                                        </div>
                                        <button onClick={redirect} className='px-5 py-[6px] rounded-md bg-[#739072] text-white hover:bg-[#3a4d39]'>Proceed to checkout {buyProductItem}</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div> : <div>
                        <Link className='px-4 py-1 bg-[#739072] text-white' to='/shops'>Shop Now</Link>
                    </div>}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Card