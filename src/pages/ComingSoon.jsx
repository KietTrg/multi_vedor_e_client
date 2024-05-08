import React from 'react'
import Footer from '../components/Footer'
import Headers from '../components/Headers'
import image from '../assets/footer.jpg'
const ComingSoon = () => {
    return (
        <div className='w-full '>
            <Headers />
            <div className='flex justify-center items-center'>
                <img src={image} className='my-4 relative' />
                <span className='absolute text-white font-bold text-[100px]'>Coming soon.</span>
            </div>
            <Footer />
        </div>
    )
}

export default ComingSoon