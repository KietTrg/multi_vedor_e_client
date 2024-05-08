import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import stripe from '../assets/Stripe.png'

import Stripe from '../components/Stripe'
import { formatMoney } from '../store/helpers'
const Payment = () => {
    const { state: { price, items, orderId } } = useLocation()

    const [paymentMethod, setPaymentMethod] = useState('stripe')
    return (
        <div>
            <Headers />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                    <div className='flex flex-wrap md:flex-col-reverse'>

                        <div className='w-full md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-0'>
                                <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                    <h2>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <span>{items} items and shipping fee included</span>
                                        <span>{formatMoney(price)} vnđ</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Total Amount</span>
                                        <span className='text-lg text-[#3A4D39]'>{formatMoney(price)} vnđ</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Payment Method</span>
                                        <div onClick={() => setPaymentMethod('stripe')} className={`${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                                            <div className='flex flex-col gap-[3px] justify-center items-center'>
                                                <img className='w-[100px]' src={stripe} alt="stripe" />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        paymentMethod === 'stripe' && <div className='bg-[#739072] p-2 rounded-md text-center text-white'>
                                            <Stripe orderId={orderId} price={price} />
                                        </div>
                                    }
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

export default Payment