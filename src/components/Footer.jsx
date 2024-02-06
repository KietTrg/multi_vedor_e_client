import React from 'react'
import footer from '../assets/footer1.jpg'
import logo from '../assets/logo_white.png'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
    const wishlist_count = 4
    const card_product_count = 4
    return (
        <footer>
            <div className=' w-full  md-lg:pb-10 sm:pb-6'>
                <div className='relative' >
                    <img className='sm:h-screen md:h-screen xl:h-screen lg:h-screen md-lg:h-screen h-full' src={footer} alt="" />
                    <div className='bg-[rgba(0,0,0,0.5)] absolute z-[9999] top-0 left-0 w-full h-full flex flex-col'>
                        <div className='w-[85%] mx-auto h-full'>
                            <div className=' grid md-lg:grid-cols-1 grid-cols-4 h-5/6 py-16'>
                                <div className=' col-span-2'>
                                    <img className='h-[100px] w-[400px] mb-4' src={logo} alt="logo" />
                                    <ul className='flex flex-col gap-2 text-gray-400'>
                                        <li>Address: Ninh Kieu, Can Tho</li>
                                        <li>Phone: 0704875988</li>
                                        <li>Email: Kietb2016977@student.ctu.edu.vn</li>
                                    </ul>
                                </div>
                                <div className=' col-span-1 pt-12'>
                                    <h2 className='text-xl text-white font-semibold mb-4'>Quick Link</h2>
                                    <ul className='flex flex-col gap-2 text-gray-400'>
                                        <li>
                                            <Link>About Us</Link>
                                        </li>
                                        <li>
                                            <Link>Contact Us</Link>
                                        </li>
                                        <li>
                                            <Link>My orders</Link>
                                        </li>
                                        <li>
                                            <Link>Delivery Information</Link>
                                        </li>
                                        <li>
                                            <Link>Privacy Policy</Link>
                                        </li>
                                        <li>
                                            <Link>Blogs</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className=' col-span-1 pt-12'>
                                    <h2 className='text-xl text-white font-semibold mb-4'>Category</h2>
                                    <ul className='flex flex-col gap-2 text-gray-400'>
                                        <ul className='flex flex-col gap-2 text-gray-400'>
                                            <li>
                                                <Link>Table Tree Plant</Link>
                                            </li>
                                            <li>
                                                <Link>Indoor Plants</Link>
                                            </li>
                                            <li>
                                                <Link>Cactus Plant</Link>
                                            </li>
                                            <li>
                                                <Link>House Plants</Link>
                                            </li>
                                            <li>
                                                <Link>New Arrivals</Link>
                                            </li>
                                            <li>
                                                <Link>Featured Products</Link>
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='text-white h-1/6'>
                            <div className='w-full border-t-2 border-white text-center py-4 '>
                                <div className='w-[85%] mx-auto md-lg:flex-col flex items-center justify-between'>
                                    <span>Copiright ©2023 All rights reserved</span>
                                    <div className='flex items-center justify-center gap-2'>
                                        <span>Follow us: </span>
                                        <a href="#"><FaFacebookF /></a>
                                        <a href="#"><FaXTwitter /></a>
                                        <a href="#"><FaGithub /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
            <div className='hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2 bg-white rounded-full p-2'>
                <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                        <span className='text-xl text-orange-500'><FaFacebookF /></span>
                        {
                            card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                {
                                    card_product_count
                                }
                            </div>
                        }
                    </div>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                        <span className='text-xl text-red-500'><FaFacebookF /></span>
                        {
                            wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                {wishlist_count}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer