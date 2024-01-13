'use client'
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';
import Link from 'next/link'
const Navbar = () => {
    const data = useSelector(state => state.value).user?.user;
    const isAuth = useSelector(state => state.value).isAuth;
    // const { profilePic, username, email, posts } = data;
    console.log(data);
    const profilePic = data?.profilePic;
    const username = data?.username;
    const email = data?.email;
    const posts = data?.posts
    const len = posts?.length;
    return (
        <nav className=" bg-white w-screen fixed top-0 left-0 right-0 z-50">
            <div className='text-black p-1 mx-auto border-[#343536] border-b flex h-14 justify-around'>
                <div className=' h-full flex items-center justify-center logo w-40 bg-[#FF4500] text-white text-center uppercase font-bold rounded-md'>Reddit Clone</div>
                {/* search box */}
                <div className='flex justify-center items-center placeholder:text-[#5c5d5f] border border-[#5c5d5f] font-light bg-[#272729] w-1/3 rounded-full h-full'>
                    <CiSearch className="h-4/6 w-auto ml-5 mr-2" />
                    <input type='text' placeholder='Search Reddit' className="hover:border-none active:border-none focus-within:border-none outline-none bg-transparent h-full w-full px-2" >
                    </input>
                </div>
                <div className='h-full items-center justify-center flex gap-1'>
                    <IoMdNotifications className=" h-5/6 p-1 w-auto rounded-sm hover:bg-[#DAE0E6]" />
                    <AiOutlineMessage className="h-5/6 p-1 w-auto hover:bg-[#DAE0E6]" />
                    <Link href="/submit" className="h-5/6 w-auto p-1 hover:bg-[#DAE0E6]">
                        <HiOutlinePlus className="h-full w-auto " />
                    </Link>
                </div>
                {isAuth && <button className=" w-[10%] flex hover:border border-[#5c5d5f] justify-around items-center p-1">
                    <img src={profilePic} alt="profile image" className="h-4/6 w-auto object-cover rounded-sm aspect-square" />
                    <div className=" text-sm flex flex-col justify-center items-start">
                        <span>{username}</span>
                        <span>{len} posts</span>
                    </div>
                    <div><BsChevronDown /></div>
                </button>
                }
            </div >
            {/* <div className='border-b border-[#343536]'>
                <div className="container p-3  mx-auto flex justify-between items-center">
                    <Link href="/">
                        <span className="text-white text-lg font-bold">Reddit Clone</span>
                    </Link>

                    <div className="flex space-x-4">
                        <Link href="/">
                            <span className="text-white">Home</span>
                        </Link>
                        <Link href="/subreddits">
                            <span className="text-white">Subreddits</span>
                            <span className="text-white">Subreddits</span>
                        </Link>
                        <Link href="/create-post">
                            <span className="text-white">Create Post</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href="/login">
                            <span className="text-white">Login</span>
                        </Link>
                        <Link href="/signup">
                            <span className="text-white">Sign Up</span>
                        </Link>
                    </div>
                </div>

            </div> */}
        </nav >
    );
};

export default Navbar;
