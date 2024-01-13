'use client'
import { useSelector } from 'react-redux'
import LatestPosts from './LatestPosts';
import SideProfile from './SideProfile';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
    const authState = useSelector(state => state.value.isAuth)
    const authInfo = useSelector(state => state.value).user?.user;
    const router = useRouter();
    return (
        !authState ? router.push('/') :
            <div className='bg-[#DAE0E6] pt-14 w-full h-max  min-h-screen'>
                <div className='p-5 overflow-hidden text-black min-h-screen gap-5 flex h-max overflow-x-hidden w-[1300px] mx-auto' >
                    <LatestPosts authInfo={authInfo} />
                    <SideProfile authInfo={authInfo} />
                </div>
            </div >
    )
}