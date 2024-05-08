import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { CiCircleCheck } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

const load = async () => {
    return await loadStripe('pk_test_51OlRpIHOujiWwT21D9dJPwEDUXkl6IIqI9lnmRoMsNulb15Z9a6IzKVpyRJlrToU3Z6SNfLxKLW3MqtexekApu3N00Ogeg11eO')
}
const ConfirmOrder = () => {
    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    setMessage('succeeded')
                    break
                case "processing":
                    setMessage('processing')
                    break
                case "requires_payment_method":
                    setMessage('failed')
                    break
                default:
                    setMessage('failed')
            }
        })
    }, [stripe])
    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }
    useEffect(() => {
        get_load()
    }, [])
    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log('error: ', error.response.data);

            }
        }
    }
    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    }, [message])
    return (
        <div className=' w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                (message === 'failed' || message === 'processing')
                    ?
                    <div className='w-[350px] h-[400px] shadow-2xl bg-slate-100 flex justify-center items-center'>
                        <div className='flex flex-col gap-3 items-center'>
                            <VscError color='green' size={150} />
                            <span className='text-lg text'>Error Payment</span>
                            <span className='text-sm text-center text-gray-400 px-6'>Something went wrong! <br /> <span>Please try again</span></span>
                            <Link className='px-5 py-2 bg-red-700  text-white rounded-full' to='/dashboard/my-orders'>Back to Dashboard</Link>
                        </div>
                    </div>

                    :
                    message === 'succeeded' ? loader ?
                        <HashLoader />
                        :
                        <div className='w-[350px] h-[400px] shadow-2xl bg-slate-100 flex justify-center items-center'>
                            <div className='flex flex-col gap-3 items-center'>
                                <CiCircleCheck color='green' size={150} />
                                <span className='text-lg text'>Successful Payment</span>
                                <span className='text-sm text-center text-gray-400 px-6'>Congratulations! Your purchase has been completed successfully. Thank you for choosing us for your shopping needs.</span>
                                <Link className='px-5 py-2 bg-green-700  text-white rounded-full' to='/dashboard/my-orders'>Back to Dashboard</Link>
                            </div>
                        </div>
                        :
                        <HashLoader />
            }
        </div>
    )
}

export default ConfirmOrder