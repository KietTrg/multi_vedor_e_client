import React, { useEffect, useState } from 'react'
import products from '../../assets/products.jpg'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { add_friend, send_message, updateMessage, messageClear } from '../../store/Reducers/chatReducer'
import { MdSend } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import toast from 'react-hot-toast'
import { useRef } from 'react'
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
    console.log('my_friends: ', my_friends);
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
    console.log('activeSeller: ', activeSeller);

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
        } else {
            toast.success(receverMessage.senderName + ' ' + 'send a message')
            dispacth(messageClear())

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
                        {/* <span><AiOutlineMessage /></span> */}
                        <span>Message the seller</span>
                    </div>
                    <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
                        {
                            my_friends.map((el, i) => <Link to={`/dashboard/chat/${el.friendId}`} className={`flex gap-2 justify-start items-center pl-2 py-[5px]`} >
                                <div className='w-[30px] h-[30px] rounded-full relative'>
                                    {
                                        activeSeller.some(e => e.sellerId === el.friendId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                    }
                                    <img src={el.image} alt="" />
                                </div>
                                <span>{el.name}</span>
                            </Link>)
                        }
                    </div>
                </div>
                <div className='w-[calc(100%-230px)]'>
                    {
                        currentFriend ? <div className='w-full h-full'>
                            <div className='px-3 shadow-md rounded-r-md flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]'>
                                <div className='w-[35px] h-[35px] rounded-full  relative'>
                                    {
                                        activeSeller.some(e => e.sellerId === currentFriend.friendId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0'></div>
                                    }
                                    <img className=' rounded-full ' src={currentFriend.image} alt="" />
                                </div>
                                <span>{currentFriend.name}</span>
                            </div>
                            <div className='h-[400px] w-full  p-3 rounded-md'>
                                <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
                                    {
                                        friend_messages.map((e, i) => {
                                            if (currentFriend?.friendId !== e.receverId) {
                                                return (
                                                    <div ref={scrollRef} className='w-full flex gap-2 justify-start items-center text-[14px]'>
                                                        <img className='w-[30px] h-[30px] ' src={products} alt="" />
                                                        <div className='p-2 bg-purple-500 text-white rounded-md'>
                                                            <span>{e.message}</span>

                                                        </div>
                                                    </div>

                                                )
                                            } else {
                                                return (<div ref={scrollRef} className='w-full flex gap-2 justify-end items-center text-[14px]'>
                                                    <img className='w-[30px] h-[30px] ' src={products} alt="" />
                                                    <div className='p-2 bg-cyan-500 text-white rounded-md'>
                                                        <span>{e.message}</span>
                                                    </div>
                                                </div>)
                                            }
                                        })
                                    }


                                </div>
                            </div>
                            <div className='flex p-2 justify-between items-center w-full'>
                                <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
                                    <label className='cursor-pointer' htmlFor=""><FaPlus /></label>
                                    <input className='hidden' type="file" />
                                </div>
                                <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
                                    <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='input message' className='w-full rounded-full h-full outline-none p-3' />
                                    <div className='text-2xl right-2 top-2 absolute cursor-auto'>
                                        {/* <span>
                                            <GrEmoji />
                                            GrEmoji</span> */}
                                    </div>

                                </div>
                                <div className='w-[40px] p-2 justify-center items-center rounded-full'>
                                    <div onClick={send} className='text-2xl cursor-pointer'>
                                        <MdSend />
                                    </div>
                                </div>
                            </div>
                        </div> : <div className='w-full h-full flex justify-center items-center text-lg ont-bold text-slate-600'>
                            <span>select seller</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat