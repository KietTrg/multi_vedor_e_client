import React from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import logo from '../assets/logo.png'
import { ABOUT } from '../store/config'
const About = () => {
    return (
        <div className='w-full '>
            <Headers />
            <div className=' py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className='w-full flex justify-center'>
                        <img className='w-[250px] h-[80px]' src={logo} />
                    </div>
                    <div className='p-6 flex flex-col gap-4'>
                        {ABOUT.map((el) =>
                            <div>
                                <h2 className='text-[#3a4d39] font-bold uppercase'>{el.title}</h2>
                                <span>{el.content1}</span>
                                <br />
                                {el.content2 && <span>{el.content2}</span>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About