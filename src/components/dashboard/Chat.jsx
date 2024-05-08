import React, { useEffect, useState } from 'react'
import products from '../../assets/products.jpg'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { add_friend, send_message, updateMessage, messageClear } from '../../store/Reducers/chatReducer'
import { MdSend } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import avataCustomer from '../../assets/avata_customer.jpg'
import { useRef } from 'react'
import { BiSend, BiSolidSend } from "react-icons/bi";

const socket = io('http://localhost:5000')
const Chat = () => {
    const scrollRef = useRef()
    const dispacth = useDispatch()
    const { sellerId } = useParams()
    const [text, setText] = useState('')
    const [activeSeller, setActiveSeller] = useState([])
    const [receverMessage, setReceverMessage] = useState('')
    const { userInfo } = useSelector(state => state.auth)
    const { my_friends,
        currentFriend,
        friend_messages, successMessage } = useSelector(state => state.chat)
    useEffect(() => {
        socket.emit('add_user', userInfo.id, userInfo)
    })
    useEffect(() => {

        dispacth(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id

        }))

    }, [sellerId])
    const send = () => {
        if (text) {
            dispacth(send_message({
                userId: userInfo?.id,
                sellerId,
                text,
                name: userInfo.name
            }))
            setText('')
        }
    }
    useEffect(() => {
        socket.on('seller_message', e => {
            setReceverMessage(e)
        })
        socket.on('activeSeller', (sellers) => {
            setActiveSeller(sellers)
        })
    }, [])

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_customer_message', friend_messages[friend_messages.length - 1])
            setText(' ')
            dispacth(messageClear())
        }
    }, [successMessage])

    useEffect(() => {
        if (receverMessage) {
            if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
                dispacth(updateMessage(receverMessage))
            }
        }
    }, [receverMessage])
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [friend_messages])

    return (
        <div className='bg-white p-3 rounded-md'>
            <div className='w-full flex'>
                <div className='w-[230px] border-r-2'>
                    <div className='flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]'>
                        <span>Message the seller</span>
                    </div>
                    <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
                        {
                            my_friends.map((el, i) =>
                                <Link to={`/dashboard/chat/${el.friendId}`} className={`h-10 flex justify-start gap-2 items-center px-2 ${sellerId === el.friendId ? ' bg-[#D0E7D2] rounded-md' : ''}`} >
                                    <div className='flex justify-center items-start flex-col w-full'>
                                        <div className='flex justify-center items-center'>
                                            <h2 className=' text-base font-semibold'>{el.name}</h2>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className='w-[calc(100%-230px)]'>
                    <div className=' w-full shadow-md'>
                        {
                            currentFriend && <div className='flex justify-between items-center  p-2'>
                                {
                                    currentFriend && <div className='flex justify-start items-center gap-3'>

                                        <div className='flex justify-center items-start flex-col w-full'>
                                            <div className='flex flex-col gap-2 justify-center items-start'>
                                                <h2 className='text-[#2B2A4C] text-base font-semibold'>{currentFriend.name}</h2>
                                                {activeSeller.some(e => e.sellerId === currentFriend.friendId) &&
                                                    <div className='flex items-center gap-2'>
                                                        <span className='text-gray-400 text-xs'>Đang hoạt động</span>
                                                        <div className='w-[8px] h-[8px] bg-green-500 rounded-full right-0 bottom-0 '></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>}
                    </div>
                    <div className='py-4'>
                        <div className='  rounded-md h-[calc(100vh-290px)] p-3 overflow-y-auto'>
                            {currentFriend ? friend_messages.map((e, i) => {
                                if (currentFriend?.friendId !== e.receverId) {
                                    return (
                                        <div ref={scrollRef} key={i} className='w-full flex justify-start items-center'>
                                            <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                <div className='w-[48px] h-[48px]'><img className='max-w-[48px] p-[2px] rounded-full w-[38px] h-[38px]' src={avataCustomer} alt="avata" /></div>

                                                <div className='py-2 px-5 rounded-full flex justify-center items-start flex-col w-full bg-gray-400'>

                                                    <span className='text-white text-base font-light'>{e.message}</span>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                } else {
                                    return (
                                        <div ref={scrollRef} key={i} className='w-full flex justify-end items-center'>
                                            <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                                                <div className='py-1 px-3 rounded-full flex justify-center items-end flex-col w-full bg-[#739072]'>
                                                    <span className='text-white text-base font-light'>{e.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            ) : <div className='h-full w-full justify-center items-center flex'>Select Customer</div>
                            }
                        </div>
                    </div>
                    <div className='flex gap-3 mx-2'>
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='input message' className='w-full rounded-full h-full outline-none p-3 bg-[#e6e6e6]' />
                        <button onClick={send} className='w-[50px] transition-all duration-500  rounded-md  text-[#3a4d39]'>{text ? <BiSolidSend size={35} /> : <BiSend size={35} />}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat