import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Categorys = () => {
    const { categorys } = useSelector(state => state.home)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3,
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2,
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1,
        },

    }
    return (
        <div className='w-[87%] mx-auto relative'>

            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                transitionDuration={500}
                showDots={true}
                responsive={responsive}
            >
                {categorys.map((el, i) => <Link to={`products?category=${el.name}`} key={i} className='h-[185px] block '>
                    <div className='w-full h-full relative p-3'>
                        <img className='rounded-md h-[200px] w-[180px]' src={el.image} alt="" />
                        <div className=' bottom-6 w-full mx-auto left-0 flex justify-center items-center absolute'>
                            <span className='py-[2px] px-6 bg-[#333] text-white'>{el.name}</span>
                        </div>
                    </div>
                </Link>)}
            </Carousel>
        </div>

    )
}

export default Categorys