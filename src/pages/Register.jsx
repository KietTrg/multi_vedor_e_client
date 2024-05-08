import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/register.svg'
import { useDispatch, useSelector } from 'react-redux'
import { customer_register, messageClear } from '../store/Reducers/authReducer'
import toast from 'react-hot-toast'
import { HashLoader } from 'react-spinners';
import { overideStyle } from '../utils/utils'
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth)
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const register = (e) => {
        e.preventDefault()
        dispatch(customer_register(state))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/login')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }

    }, [successMessage, errorMessage])
    return (
        <div>
            <Headers />
            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-10'>
                    <div className='grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md'>
                        <div className='px-8 py-8'>
                            <h2 className='text-center w-full text-xl text-[#3a4d39]font-bold'>Register</h2>
                            <div>
                                <form onSubmit={register} className='text-slate-600'>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="name">Name</label>
                                        <input onChange={inputHandle} value={state.name} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='name' name='name' placeholder='name' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='email' name='email' placeholder='email' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="password">Passoword</label>
                                        <input onChange={inputHandle} value={state.password} type="password" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='password' name='password' placeholder='password' required />
                                    </div>
                                    <button className='px-8 w-full py-2 bg-[#739072] shadow-lg hover:bg-[#3a4d39] text-white rounded-md'>{loader ? <HashLoader color='#fff' cssOverride={overideStyle} /> : 'Register'}</button>
                                </form>

                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You have no account ? <Link className='text-blue-500' to='/login'>Login</Link></p>
                            </div>

                        </div>
                        <div className='w-full h-full py-4 pr-4'>
                            <img className='w-full h-[95%]' src={registerImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register