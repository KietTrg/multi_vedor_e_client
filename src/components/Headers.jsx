import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { LuMail } from "react-icons/lu";
import { FaFacebookF, FaGithub, FaRegUser, FaRegHeart } from "react-icons/fa";
import { FaXTwitter, FaAngleDown } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import logo from '../assets/logo.png'
import { get_card, get_wishlists } from '../store/Reducers/cardReducer'

const Headers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { count, wishlist_count } = useSelector(state => state.card)
    console.log('wishList_count: ', wishlist_count);
    console.log('count: ', count);

    const { pathname } = useLocation()
    const [categoryShow, setCategoryShow] = useState(true)

    const [showSidebar, setShowSidebar] = useState(true)
    // const wishList = 4
    // const categorys = [
    //     'Table Tree',
    //     'Indoor plants',
    //     'Cactus Plants',
    //     'House Plants',
    //     'Other'
    // ]

    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')
    const search = () => {
        navigate(`/products/search?category=${category}&&searchValue=${searchValue}`)
    }
    const cardDetail = () => {
        if (userInfo) {
            navigate(`/card`)
        } else {
            Swal.fire({
                title: 'Please Login',
                text: "Welcome! Please Login to continue.",
                icon: "info",
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {

                    navigate('/login')
                }
            })
        }
    }
    useEffect(() => {
        dispatch(get_card(userInfo?.id))
        dispatch(get_wishlists(userInfo?.id))
    }, [])
    return (
        <div className='w-full bg-white'>
            <div className=' header-top bg-[#4d664c] md-lg:hidden '>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full  justify-between items-center h-[50px] text-white'>
                        <ul className='flex justify-start items-center gap-8 '>
                            <li className='flex justify-center items-center gap-2 text-sm   relative after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                                <span><LuMail /></span>
                                <span>kietb2016977@student.ctu.edu.vn</span>
                            </li>
                            <span>Plants Go</span>
                        </ul>
                        <div className='flex justify-center items-center gap-10'>
                            <div className='flex justify-center items-center gap-4'>
                                <a href="#"><FaFacebookF /></a>
                                <a href="#"><FaXTwitter /></a>
                                <a href="#"><FaGithub /></a>
                            </div>
                            <div className='flex cursor-pointer group text-slate-800 justify-center  items-center gap-2 relative after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] before:absolute before:h-[18px] before:bg-[#afafaf] before:-left-[20px] before:w-[1px] text-sm'>
                                <span className='text-white' >Language:</span>
                                <span className='text-white'>English</span>
                                <FaAngleDown color='#fff' />
                                <ul className=' absolute invisible transition-all top-6 rounded-md duration-200 p-2 w-[150px] flex flex-col gap-3 text-[#3A4D39] group-hover:visible group-hover:bg-gray-200 group-hover:top-12 z-10'>
                                    <li>VietName</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {
                                userInfo ? <Link className='flex items-center justify-center gap-2 cursor-pointer text-sm' to='/dashboard'>
                                    <span>{userInfo.name}</span>
                                    <span><FaRegUser /></span>
                                </Link> : <Link to='/login' className='flex items-center justify-center gap-2 cursor-pointer text-sm'>
                                    <span>Login</span>
                                    <span><FiLogIn size={17} /></span>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-white'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className=' h-[80px] md-lg:h[100px] flex justify-between items-center flex-wrap'>
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center '>
                                <Link to='/'>
                                    <img className='w-[250px]' src={logo} alt="" />
                                </Link>
                                <div className='justify-center items-center text-[#3A4D39] transition-all duration-300 rounded-md cursor-pointer lg:hidden md-lg:flex xl:hidden hidden hover:bg-[#3A4D39] hover:text-white' onClick={() => setShowSidebar(false)}>
                                    <span ><BsList className='p-2' size={40}></BsList></span>
                                </div>
                            </div>
                        </div>
                        <div className='md-lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                                <ul className='flex justify-start items-start gap-8 text-sm font-semibold uppercase md-lg:hidden'>
                                    <li>
                                        <Link to='/' className={`py-2 block ${pathname === '/' ? 'text-[#618264] border-b-2 border-b-[#618264] ' : 'text-black'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops' className={`p-2 block ${pathname === '/shops' ? 'text-[#618264] border-b-2 border-b-[#618264] ' : 'text-black'}`}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/blog' ? 'text-[#618264] border-b-2 border-b-[#618264] ' : 'text-black'}`}>Blog</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/about' ? 'text-[#618264] border-b-2 border-b-[#618264] ' : 'text-black'}`}>About</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/contact' ? 'text-[#618264] border-b-2 border-b-[#618264] ' : 'text-black'}`}>Contact</Link>
                                    </li>
                                </ul>
                                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                                    <div className='flex justify-center gap-5'>

                                        <div className=' relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] '>
                                            <span ><FaRegHeart size={20} color='#4F6F52' /></span>
                                            <div className='w-[15px] h-[15px] absolute bg-[#4F6F52] rounded-full text-white justify-center items-center text-sm flex -bottom-[-2px] -right-[-2px]'>
                                                {wishlist_count !== 0 ? wishlist_count : 0}
                                            </div>
                                        </div>
                                        <div onClick={cardDetail} className=' relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] '>
                                            <span ><PiShoppingBagOpenDuotone color='#4F6F52' size={25} /></span>
                                            <div className='w-[15px] h-[15px] absolute bg-[#4F6F52] rounded-full text-white justify-center items-center text-sm flex -bottom-[-2px] -right-[-2px]'>
                                                {count !== 0 ? count : 0}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md-lg:block'>
                <div onClick={() => setShowSidebar(true)} className={`fixed duration-200 transition-all ${showSidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}>
                </div>
                <div className={`w-[300px] z-[9999] transition-all duration-200 fixed ${showSidebar ? '-left-[300px]' : ' left-0 '} top-0 overflow-y-auto h-screen py-6 px-6 bg-[#739072]`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src={logo} alt="logo" />
                        </Link>
                        <div className='flex justify-start items-center gap-10 '>
                            <div className='flex cursor-pointer group text-slate-800 justify-center  items-center gap-2 relative after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] text-sm'>
                                <span className='text-white'>English</span>
                                <FaAngleDown color='#fff' />
                                <ul className=' absolute invisible transition-all top-6 left-1 rounded-md duration-200 p-2 w-[150px] flex flex-col gap-3 text-[#3A4D39] group-hover:visible group-hover:bg-gray-200 group-hover:top-12 z-10'>
                                    <li>VietName</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {
                                userInfo ? <Link className='flex items-center text-white justify-center gap-2 cursor-pointer text-sm' to='/dashboard'>
                                    <span>{userInfo.name}</span>
                                    <span><FaRegUser /></span>
                                </Link> : <div className='flex items-center  text-white justify-center gap-2 cursor-pointer text-sm'>
                                    <span>Login</span>
                                    <span><FiLogIn size={17} /></span>
                                </div>
                            }
                        </div>
                        <ul className='flex flex-col gap-3 justify-start items-start text-md font-semibold uppercase border-b-2 border-[#3A4D39] pb-4'>

                            <li>
                                <Link to='/' className={`p-2 block ${pathname === '/' ? 'text-[#fff] w-[250px] bg-[#3A4D39] rounded-md ' : 'text-[#3A4D39]'}`}><span>Home</span> </Link>
                            </li>
                            <li>
                                <Link to='/shops' className={`p-2 block ${pathname === '/shops' ? 'text-[#fff] w-[250px] bg-[#3A4D39] rounded-md ' : 'text-[#3A4D39]'}`}>Shop</Link>
                            </li>
                            <li>
                                <Link className={`p-2 block ${pathname === '/blog' ? 'text-[#fff] w-[250px] bg-[#3A4D39] rounded-md ' : 'text-[#3A4D39]'}`}>Blog</Link>
                            </li>
                            <li>
                                <Link className={`p-2 block ${pathname === '/about' ? 'text-[#fff] w-[250px] bg-[#3A4D39] rounded-md ' : 'text-[#3A4D39]'}`}>About</Link>
                            </li>
                            <li>
                                <Link className={`p-2 block ${pathname === '/contact' ? 'text-[#fff] w-[250px] bg-[#3A4D39] rounded-md ' : 'text-[#3A4D39]'}`}>Contact</Link>
                            </li>
                        </ul>
                        <div className='text-[#3A4D39] flex justify-start items-center gap-4 '>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaXTwitter /></a>
                            <a href="#"><FaGithub /></a>
                        </div>
                        <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                            <div className='text-[#3A4D39]'>
                                <span><FiPhone></FiPhone></span>
                            </div>
                            <div className='flex flex-col justify-end'>
                                <h2 className='text-sm font-medium text-[#3A4D39]'>0704875988</h2>
                                <span className='text-xs'>support 24/7</span>
                            </div>
                        </div>
                        <ul className='flex flex-col justify-start items-start gap-3'>
                            <li className='flex justify-start items-center gap-2 text-sm '>
                                <span className='text-[#3A4D39]'>
                                    <LuMail />
                                </span>
                                <span>kietb2016977@student.ctu.edu.vn</span>
                            </li>
                            <span className='text-sm'>Plants Go</span>
                        </ul>
                    </div>
                </div>
            </div>
            <div className=' w-[85%] lg:w-[90%] mx-auto'>
                <div className='flex w-full flex-wrap md-lg:gap-8'>
                    <div className='w-3/12 md-lg:w-full'>
                        <div className='bg-white relative'>
                            <div onClick={() => setCategoryShow(!categoryShow)} className='h-[40px] bg-[#739072] rounded-md text-white justify-center flex md-lg:justify-between md-lg:px-6 items-center gap-3 text-md cursor-pointer'>
                                <div className="flex justify-center items-center gap-3">
                                    <span><BsList></BsList></span>
                                    <span>All Category</span>
                                </div>
                                <span className='pt-1'><FaAngleDown /></span>
                            </div>
                            <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} overflow-hidden transition-all md-lg:relative duration-500 absolute z-[9999] bg-white w-full border-x`}>
                                <ul className='py-2 text-[#3A4D39]'>
                                    {
                                        categorys?.map((el, index) => {
                                            return (<li key={index} className='flex justify-start items-center gap-2 px-[24px] py-[6px]'>
                                                <Link to={`/products?category=${el.name}`} className='text-sm block'>{el.name}</Link>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
                        <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                            <div className='w-full md-lg:w-full'>
                                <div className='flex bg-[#D0E7D2] rounded-md h-[40px] items-center relative gap-5'>
                                    <div className=' relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden '>
                                        <select onChange={(e) => setCategory(e.target.value)} className='w-[150px] text-[#3A4D39] bg-transparent px-2 h-full border-none outline-0' name="" id="">
                                            <option value="">Select Option</option>
                                            {
                                                categorys?.map((el, index) => <option key={index} value={el.name}>{el.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <input onChange={(e) => setSearchValue(e.target.value)} className='w-full text-[#3A4D39] placeholder:text-[#3A4D39] relative bg-transparent  outline-0 px-3  h-full' type="text" name='' placeholder='what do you need' />
                                    <button onClick={search} className='bg-[#739072] hover:bg-[#3A4D39] right-2 px-4 transition-color duration-500 absolute h-[30px] rounded-md text-white '><IoIosSearch size={22} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Headers