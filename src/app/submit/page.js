'use client'
import SideProfile from "../(components)/SideProfile";
import { useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextPost from "../(components)/TextPost";
import ImagePost from "../(components)/ImagePost";

export default function PostSubmitPage() {
    const [selectedTab, setSelectedTab] = useState(1);
    const isAuth = useSelector(state => state.value).isAuth;
    console.log(isAuth);
    const router = useRouter();
    return !isAuth ? router.push('/login') : <div className='bg-[#DAE0E6] pt-14 w-full h-max min-h-screen'>
        <div className='p-5  gap-5 text-slate-800 flex h-max overflow-x-hidden w-[1300px] mx-auto' >
            <div className="w-2/3 flex flex-col h-max gap-4">
                <div><h1 className="text-2xl font-medium text-slate-800">Create a post</h1></div>
                <hr className="w-full bg-white h-0.5" />
                <button className="w-1/3 bg-white rounded-md p-3 text-slate-800 font-medium">
                    Choose a community
                </button>
                <div className="h-2/3 bg-white text-lg text-[grey] font-bold rounded-md">
                    <div id="tabs" className="w-full flex ">
                        <button className={`w-1/2 p-4 border-r border-r-[#fafafa] ${selectedTab === 1 && 'text-blue-500 border-blue-500 border-b-2'}`} onClick={() => setSelectedTab(1)}>Post</button>
                        <button className={`w-1/2 p-4 border-l border-l-[#fafafa] ${selectedTab === 2 && 'text-blue-500 border-blue-500 border-b-2'}`} onClick={() => setSelectedTab(2)}>Image</button>
                        {/* <button >Link</button> */}
                        {/* <button></button> */}
                    </div>
                    <>
                        {selectedTab === 1 && <TextPost />}
                        {selectedTab === 2 && <ImagePost />}
                    </>
                    {/* <ImagePost /> */}

                </div>
            </div>
            <SideProfile />
        </div>
    </div>
}

