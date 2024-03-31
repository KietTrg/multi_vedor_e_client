import React from 'react'

const MyVouchers = () => {
    return (
        <div className='w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1'>
            {[1, 2, 3, 4, 5, 6].map(() =>
                <div className='w-full h-[180px] relative p-3'>
                    <div className='w-full h-full bg-[#b3c6b3] rounded-md py-3 px-2'>
                        <div className='bg-white h-4 w-4 rounded-full absolute top-[3px] left-[108px] z-50'></div>
                        <div className='flex h-full w-full'>
                            <div className=' items-center justify-center flex w-1/3 border-r-2 border-dashed'>
                                <span className='font-semibold text-3xl text-center text-[#3A4D39]'>Plant Go</span>
                            </div>
                            <div className=' w-2/3 flex flex-col gap-2 px-2'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-3xl font-bold text-[#3A4D39]'>10<span className='text-xl'>%OFF</span></span>
                                    <button className='p-1 bg-[#81a080] rounded-md hover:bg-[#516450] transition-all duration-300'>Collect</button>
                                </div>
                                <div className='gap-1 flex-col flex w-fit'>
                                    <span>Coupon code: </span>
                                    <span className='rounded-bl-full rounded-tr-full bg-[#81a080] px-3 py-[2px] italic'>TETDOAVIEN</span>
                                </div>
                                <span className='text-xs italic'>Expire: 10/07/2002 10:20:00 am</span>
                            </div>
                        </div>
                        <div className='bg-white h-4 w-4 rounded-full absolute bottom-[3px] left-[108px] z-50'></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyVouchers