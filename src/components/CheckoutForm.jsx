import React, { useState } from 'react'
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js'
const CheckoutForm = ({ orderId }) => {
    localStorage.setItem('orderId', orderId)
    const stripe = useStripe()
    // console.log('stripe: ', stripe);
    const elements = useElements()
    // console.log('elements: ', elements);
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const paymentElementOpt = {
        layout: 'tabs'
    }
    const submit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3001/order/confirm'
            }
        })
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An unexpected  error occurred')
        }
        setIsLoading(false)
    }
    return (
        <form onSubmit={submit} id='payment-form' >
            <LinkAuthenticationElement
                id='link-authentication-element'
            // onChange={(e) => setEmail(e.target.value)}
            />
            <PaymentElement id='payment-element' options={paymentElementOpt} />
            <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-[6px] bg-green-800'>
                <span id='button-text'>{
                    isLoading ? <div>Loading...</div> : "Pay Now"
                }</span>
            </button>
            {message && <div>{message}</div>}
        </form>
    )
}

export default CheckoutForm