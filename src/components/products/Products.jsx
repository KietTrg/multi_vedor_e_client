import React from 'react'
import product from '../../assets/products.jpg'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs'
import { formatMoney } from '../../store/helpers'
const Products = ({ title, products }) => {
    // console.log('products: ', products);
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }
    // const products = [
    //     [1, 2, 3, 4, 5],
    //     [4, 5, 6, 7, 8],

    // ]
    const ButtonGroup = ({ next, previous }) => {
        return (
            <div className='flex justify-between items-center'>
                <div className='text-xl text-[#3A4D39]'>{title}</div>
                <div className='flex justify-center items-center gap-3 '>
                    <button onClick={() => next()} className='text-[#3A4D39]'>
                        <span><BsChevronBarLeft /></span>
                    </button>
                    <button onClick={() => previous()} className='text-[#3A4D39]'>
                        <span><BsChevronBarRight /></span>
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className='flex gap-8 flex-col-reverse'>
            <Carousel
                autoPlay={false}
                infinite={true}
                arrows={false}
                showDots={false}

                renderButtonGroupOutside={true}
                customButtonGroup={<ButtonGroup />}
                responsive={responsive}
                className='rounded-md'
            >
                {products.map((el, index) => {
                    return (<div key={index} className='flex md-lg:flex-col justify-start gap-2'>
                        {el.map((e, j) => <Link key={j} className='flex justify-start items-start' to='#'>
                            <img className='w-[110px] rounded-md sm:w-full h-[110px]' src={e.images[0]} alt="" />
                            <div className='flex flex-col justify-start items-start px-3 gap-1'>
                                <h2>{e.name}</h2>
                                <span className=' text-lg text-[#CD8D7A] font-semibold'>{formatMoney(e.price)}đ</span>
                            </div>
                        </Link>)}
                    </div>)
                })}
                {/* {products.map((el, i) => <Link key={i} className=' h-[185px] block '>
                    <div className='w-full h-full relative p-3'>
                        <img className='rounded-md' src={product} alt="" />
                        <div className=' bottom-6 w-full mx-auto left-0 flex justify-center items-center absolute'>
                            <span className='py-[2px] px-6 bg-[#333] text-white'>{el}</span>
                        </div>
                    </div>
                </Link>)} */}

            </Carousel>
        </div>
    )
}

export default Products