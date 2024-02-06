import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'
import { Range } from 'react-range'
import Products from '../components/products/Products'
import { FaRegStar, FaStar, FaListUl } from 'react-icons/fa';
import { BsList, BsGrid3X3Gap } from "react-icons/bs";
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux'
import { price_range_product, query_products } from '../store/Reducers/homeReducer'
import { formatMoney } from '../store/helpers';
const Shops = () => {
    const { categorys, latesProducts, priceRange, totalProducts, products, parPage } = useSelector(state => state.home)
    console.log('products: ', products);
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)

    const [filter, setFilter] = useState(true)
    const [styles, setStyles] = useState('grid')
    const [state, setState] = useState({ values: [priceRange.low, priceRange.high] })
    const [rating, setRating] = useState('')
    const [sortPrice, setSortPrice] = useState('')
    const [category, setCategory] = useState('')
    useEffect(() => {
        dispatch(price_range_product())
    }, [])
    useEffect(() => {
        setState({
            values: [priceRange.low, priceRange.high]
        })
    }, [priceRange])

    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }
    useEffect(() => {
        dispatch(query_products({
            low: state.values[0],
            hight: state.values[1],
            category,
            rating,
            sortPrice,
            pageNumber
        }))
    }, [state.values[0], state.values[1], category, rating, pageNumber, sortPrice])
    const resetRating = () => {
        setRating('')
        dispatch(query_products({
            low: state.values[0],
            hight: state.values[1],
            category,
            rating: '',
            sortPrice,
            pageNumber
        }))
    }
    return (
        <div>
            <Headers categorys={categorys} />
            <section className='bg-[url("D:\DocumentsUniversity\Study\Multi_vendor_ecommerce\client\src\assets\footer1.jpg")] h-[220px] mt-6 bg-cover relative '>
                <div className='mx-auto w-full h-full  absolute left-0 top-0 bg-[rgba(0,0,0,0.5)] '>
                    <div className='flex flex-col justify-center items-center gap-1 h-full w-full text-white'>
                        <h2 className='text-4xl font-semibold mb-2'>Shop Products</h2>
                        <div className='flex items-center justify-center gap-2 '>
                            <Link to='/'>Home</Link>
                            <span><IoIosArrowForward /></span>
                            <span className='text-[#739072]'>Shop Products</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-16'>
                <div className='w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className={`md:block hidden ${!filter ? ' transition-all duration-300 mb-6' : 'transition-all duration-300 mb-0'}`}>
                        <button onClick={() => setFilter(!filter)} className='text-center w-full py-2 px-3 bg-[#739072] text-white rounded-md'> Filter Product</button>
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                            <h2 className='text-3xl mb-3 text-[#3A4D39]'>Category</h2>
                            <div className='py-2'>
                                {
                                    categorys.map((el, index) => <div className='hover:bg-[#739072]  rounded-md flex gap-2 items-center justify-start px-1 py-1' key={index}>
                                        <input checked={category === el.name ? true : false} onChange={(e) => queryCategory(e, el.name)} type="checkbox" id={el.name} />
                                        <label htmlFor={el.name} className='text-[#3A4D39]  block cursor-pointer'>{el.name}</label>
                                    </div>)
                                }
                            </div>
                            <div className='py-2 flex flex-col gap-5'>
                                <h2 className='text-3xl mb-3 text-[#3A4D39]'>Price</h2>
                                <Range
                                    step={5}
                                    min={priceRange.low}
                                    max={priceRange.high}
                                    values={state.values}
                                    onChange={(values) => setState({ values })}
                                    renderTrack={({ props, children }) => (
                                        <div {...props} className='w-full h-[4px] rounded-full cursor-default bg-slate-200'>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div {...props} className='w-[15px] h-[15px] rounded-full bg-[#3A4D39]' />
                                    )}
                                />
                                <div>
                                    <span className='text-[#3a4d39]'>{formatMoney(Math.floor(state.values[0]))}đ - {formatMoney(Math.floor(state.values[1]))}đ</span>
                                </div>
                            </div>
                            <div className='py-3 flex flex-col gap-4'>
                                <h2 className='text-3xl mb-3 text-[#3A4D39]'>Rating</h2>
                                <div className='flex flex-col gap-3'>
                                    <div onClick={() => setRating(5)} className='flex gap-2 justify-start items-start text-[#3A4D39] text-xl cursor-pointer hover:bg-[#D0E7D2] rounded-md p-1'>
                                        {[1, 2, 3, 4, 5].map((el) => <span><FaStar></FaStar></span>)}
                                    </div>
                                    <div onClick={() => setRating(4)} className='flex gap-2 justify-start items-start text-[#3A4D39] text-xl cursor-pointer hover:bg-[#D0E7D2] rounded-md p-1'>
                                        {[1, 2, 3, 4].map((el) => <span><FaStar></FaStar></span>)}
                                        <span><FaRegStar /></span>
                                    </div>
                                    <div onClick={() => setRating(3)} className='flex gap-2 justify-start items-start text-[#3A4D39] text-xl cursor-pointer hover:bg-[#D0E7D2] rounded-md p-1'>
                                        {[1, 2, 3].map((el) => <span><FaStar></FaStar></span>)}
                                        <span><FaRegStar /></span>
                                        <span><FaRegStar /></span>

                                    </div>
                                    <div onClick={() => setRating(2)} className='flex gap-2 justify-start items-start text-[#3A4D39] text-xl cursor-pointer hover:bg-[#D0E7D2] rounded-md p-1'>
                                        {[1, 2].map((el) => <span><FaStar></FaStar></span>)}
                                        <span><FaRegStar /></span>
                                        <span><FaRegStar /></span>
                                        <span><FaRegStar /></span>

                                    </div>
                                    <div onClick={() => setRating(1)} className='flex gap-2 justify-start items-start text-[#3A4D39] text-xl cursor-pointer hover:bg-[#D0E7D2] rounded-md p-1'>
                                        {[1].map((el) => <span><FaStar></FaStar></span>)}
                                        <span><FaRegStar /></span>
                                        <span><FaRegStar /></span>
                                        <span><FaRegStar /></span>
                                        <span><FaRegStar /></span>

                                    </div>
                                    <div onClick={resetRating} className='flex gap-2 justify-start items-start text-[#3A4D39] text-xl cursor-pointer hover:bg-[#D0E7D2] rounded-md p-1'>
                                        {[1, 2, 3, 4, 5].map((el) => <span><FaRegStar></FaRegStar></span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                            <div className='pl-8 md:pl-0'>
                                <div className='p-2 bg-[#D0E7D2]  mb-10 px-3 rounded-md flex justify-between items-center'>
                                    <h2 className=' text-[#3A4D39]'>{totalProducts} Products</h2>
                                    <div className='flex justify-center items-center gap-3'>
                                        <select onChange={(e) => setSortPrice(e.target.value)} className='p-1 rounded-md outline-0 text-[#3A4D39]' name="" id="">
                                            <option value="">Sort By</option>
                                            <option value="low-to-hight">Low to Hight Price</option>
                                            <option value="hight-to-low">Hight to Low Price</option>
                                        </select>
                                        <div className='flex justify-center items-center gap-4 md-lg:hidden'>
                                            <div onClick={() => setStyles('grid')} className={` p-1 ${styles === 'grid' && ' text-[#739072] font-semibold'} text-[#3A4D39] hover:bg-[#3A4D39] hover:text-white cursor-pointer rounded-md`}>
                                                <BsGrid3X3Gap size={20} />
                                            </div>
                                            <div onClick={() => setStyles('list')} className={` p-1 ${styles === 'list' && 'text-[#739072]'} text-[#3A4D39] hover:bg-[#3A4D39] hover:text-white cursor-pointer rounded-md`}>
                                                <FaListUl size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-8'>
                                    <ShopProducts products={products} styles={styles} />
                                </div>
                                <div className='flex justify-center items-center'>
                                    {
                                        totalProducts > parPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProducts} parPage={parPage} showItem={Math.floor(totalProducts / parPage)} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-5 flex  flex-col gap-4 md:hidden'>
                        <Products title='Lastest Products' products={latesProducts} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
// , , 
export default Shops