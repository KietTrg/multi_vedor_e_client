import React from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Contact = () => {
    return (
        <div className='w-full '>
            <Headers />
            <div className=' py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className='w-full flex justify-center'>
                        <div className='w-2/5 flex flex-col items-center'>
                            <img className='w-[250px] h-[80px]' src={logo} />
                            <div className='p-6 flex flex-col gap-4'>
                                <div>
                                    <span>Thank you for your interest in Plant Go. We are always ready to listen and assist you with any inquiries or requests.</span>
                                </div>
                                <div>
                                    <h2 className='text-[#3a4d39] font-bold uppercase'>Contact Information:</h2>
                                    <ul className='flex flex-col gap-2 '>
                                        <li>Address: Ninh Kieu, Can Tho</li>
                                        <li>Phone: 0704875988</li>
                                        <li>Email: Kietb2016977@student.ctu.edu.vn</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className='text-[#3a4d39] font-bold uppercase'>Office Hours:</h2>
                                    <span>Monday - Friday: 8:00 AM - 5:30 PM</span>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span>Follow us: </span>
                                    <a href="#"><FaFacebookF /></a>
                                    <a href="#"><FaXTwitter /></a>
                                    <a href="#"><FaGithub /></a>
                                </div>
                                <span className='border-t-2 pt-2 text-center'>We look forward to serving and collaborating with you!</span>

                            </div>
                        </div>
                        <div className='w-3/5 ' >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184420487!2d105.76804037464412!3d10.029933690077012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1715158734864!5m2!1svi!2s"
                                width="100%"
                                height="450"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact