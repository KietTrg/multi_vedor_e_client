import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { change_Password, messageClear } from '../../store/Reducers/authReducer'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ChangePassword = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.auth)

    // console.log('userInfo: ', userInfo.id);
    const dispatch = useDispatch()
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')

    const change = (e) => {
        e.preventDefault()
        dispatch(change_Password({ oldPass, newPass, customerId: userInfo.id }))


    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    })
    return (
        <div className='p-4 bg-white'>
            <h2 className='text-xl text-slate-600 pb-5'>Change Password</h2>
            <form onSubmit={change}>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="old_password">Old Password</label>
                    <input onChange={(e) => setOldPass(e.target.value)} value={oldPass} type="password" id='old_password' name='old_password' placeholder='old password' className='outline-none px-3 py-1 border rounded-md text-slate-600' />
                </div>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="new_password">New Password</label>
                    <input onChange={(e) => setNewPass(e.target.value)} value={newPass} type="password" id='new_password' name='new_password' placeholder='new password' className='outline-none px-3 py-1 border rounded-md text-slate-600' />
                </div>
                <div>
                    <button className='px-8 py-2 bg-[#81a080] shadow-lg hover:bg-[#3a4d39] text-white rounded-md'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword