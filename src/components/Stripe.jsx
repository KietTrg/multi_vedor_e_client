import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe('pk_test_51OlRpIHOujiWwT21D9dJPwEDUXkl6IIqI9lnmRoMsNulb15Z9a6IzKVpyRJlrToU3Z6SNfLxKLW3MqtexekApu3N00Ogeg11eO')
const Stripe = ({ price, orderId }) => {
    console.log('price: ', price);
    const [clientSecret, setClientSecret] = useState('')
    const apperance = {
        theme: 'stripe'
    }
    const options = {
        apperance,
        clientSecret
    }
    const create_payment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/order/create-payment', { price }, { withCredentials: true })
            // console.log('data: ', data);
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log('error: ', error.response.data);

        }
    }
    return (
        <div>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : <button onClick={create_payment}>Start Payment</button>
            }
        </div>
    )
}

export default Stripe