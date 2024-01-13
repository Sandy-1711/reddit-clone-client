'use client'
import { useSelector } from 'react-redux'
export default function AddPostBar() {

    const user = useSelector(state => state.value).user?.user
    return <div className="bg-white flex w-full p-2 rounded-sm h-max justify-center gap-5 items-center">
        <img src={user.profilePic} className='aspect-square object-cover w-[5%] rounded-full' />
        <button className='w-[95%] bg-[#DAE0E6] h-full p-2 text-left rounded-sm'>Create Post</button>
    </div>
}