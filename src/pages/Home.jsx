import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Headers from '../components/Headers'
import Banner from '../components/Banner'
import Categorys from '../components/Categorys'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { getCoupons, get_category, get_products } from '../store/Reducers/homeReducer'
import Vouchers from '../components/Vouchers'

const Home = () => {
    const dispatch = useDispatch()
    const { products, latesProducts, topProducts, saleProducts, coupons } = useSelector(state => state.home)
    // console.log('coupons: ', coupons);
    useEffect(() => {
        dispatch(get_products())
    }, [])
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getCoupons());
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };

    }, [])
    return (
        <div className='w-full '>
            <Headers />
            <Banner />
            <div className='my-4'>
                <Categorys />
            </div>
            <div className='mt-4'>
                <Vouchers />
            </div>
            <div className=' py-[45px]'>
                <FeatureProducts products={products} />
            </div>
            <div className=' py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className=' grid w-full grid-row-3 gap-7'>
                        <div className=' overflow-hidden'>
                            <Products title='Latest Product' products={latesProducts} />
                        </div>
                        <div className=' overflow-hidden'>
                            <Products title='Top Rated Product' products={topProducts} />
                        </div>
                        <div className=' overflow-hidden'>
                            <Products title='Discount Product' products={saleProducts} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home