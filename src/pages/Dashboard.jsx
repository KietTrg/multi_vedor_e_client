import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BsList } from 'react-icons/bs'
import { user_reset } from '../store/Reducers/authReducer'
import { reset_count } from '../store/Reducers/cardReducer'
import api from '../api/api'
const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { sellerId } = useParams()
    console.log('id: ', sellerId);
    console.log('pathname: ', pathname);
    const [filterShow, setFilterShow] = useState(false)

    const logout = async () => {
        try {
            const { data } = await api.get('/customer/logout')
            localStorage.removeItem('customerToken')
            dispatch(user_reset())
            dispatch(reset_count())
            navigate('/login')
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <div>
            <Headers />
            <div className=' mt-5'>
                <div className='w-[90%] mx-auto pt-5 md-lg:block hidden'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='justify-center items-center text-[#3A4D39] transition-all duration-300 rounded-md cursor-pointer lg:hidden md-lg:flex xl:hidden hidden hover:bg-[#3A4D39] hover:text-white p-2'>
                            <BsList size={20} />
                        </button>
                    </div>
                </div>
                <div className='h-full mx-auto'>
                    <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
                        <div className={` rounded-md z-[99999] md-lg:absolute ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 bg-white`}>
                            <ul className='py-2 text-slate-600 px-4'>
                                <li className={`flex justify-start items-center gap-2 p-2 cursor-pointer ${pathname === '/dashboard' ? 'bg-[#eee] text-red-700' : 'text-black'}`}>
                                    {/* <span className='text-xl'><RxDashboard /></span> */}
                                    <Link to='/dashboard' className='block'>Dashboard</Link>
                                </li>
                                <li className={`flex justify-start items-center gap-2 p-2 cursor-pointer ${pathname === '/dashboard/my-orders' ? 'bg-[#eee] text-red-600' : 'text-black'}`}>
                                    {/* <span className='text-xl'><RiProductHuntLine /></span> */}
                                    <Link to='/dashboard/my-orders' className='block'>My Orders</Link>
                                </li>
                                <li className={`flex justify-start items-center gap-2 p-2 cursor-pointer ${pathname === '/dashboard/my-wishlist' ? 'bg-[#eee] text-red-600' : 'text-black'}`}>
                                    {/* <span className='text-xl'><BsHeart /></span> */}
                                    <Link to='/dashboard/my-wishlist' className='block'>Wishlist</Link>
                                </li>
                                <li className={`flex justify-start items-center gap-2 p-2 cursor-pointer ${pathname === '/dashboard/my-vouchers' ? 'bg-[#eee] text-red-600' : 'text-black'}`}>
                                    {/* <span className='text-xl'><BsHeart /></span> */}
                                    <Link to='/dashboard/my-vouchers' className='block'>My Vouchers</Link>
                                </li>
                                <li className={`flex justify-start items-center gap-2 p-2 cursor-pointer ${pathname === '/dashboard/chat' || pathname === `/dashboard/chat/${sellerId}` ? 'bg-[#eee] text-red-600' : 'text-black'}`}>
                                    {/* <span className='text-xl'><BsChat /></span> */}
                                    <Link to='/dashboard/chat' className='block'>Chat</Link>
                                </li>

                                <li className={`flex justify-start items-center gap-2 p-2 cursor-pointer ${pathname === '/dashboard/change-password' ? 'bg-[#eee] text-red-600' : 'text-black'}`}>
                                    {/* <span className='text-xl'><TfiLock /></span> */}
                                    <Link to='/dashboard/change-password' className='block'>Change Password</Link>
                                </li>
                                <li onClick={logout} className='flex justify-start items-center gap-2 p-2 cursor-pointer text-black'>
                                    {/* <span className='text-xl'><BiLogInCircle /></span> */}
                                    <div className='block'>Logout</div>
                                </li>
                            </ul>
                        </div>
                        <div className='w-[calc(100%-270px)] md-lg:w-full'>
                            <div className='mx-4 md-lg:mx-0'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard