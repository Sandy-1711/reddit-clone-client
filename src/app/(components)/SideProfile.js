'use client'

import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';

import { io } from 'socket.io-client'
import { MdDelete } from "react-icons/md";
import { logOut } from '../../../redux/features/authSlice';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux'
export default function SideProfile() {
    const authInfo=useSelector(state=>state.value).user?.user;
    const router = useRouter();
    const token = authInfo?.token;
    const id = authInfo?._id;
    const [user, setUser] = useState(null);
    console.log(user);
    async function handleDeletePost(id) {
        const res = await fetch('http://localhost:5000/api/posts/u/delete/' + user._id + '/' + id, {
            mode: 'cors',
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                token: "Bearer " + authInfo.token,
            }
        });
        console.log(await res.json());
    }
    useEffect(function () {
        const socket = io('http://localhost:5000', { transports: ['polling'] });
        socket.on('newpost', (post) => {
            console.log('new post', post);
            fetchuserdata();
        })
        socket.on('postdeleted', (deletedpost) => {
            console.log(deletedpost);
            fetchuserdata();
        })
        async function fetchuserdata() {
            const res = await fetch('http://localhost:5000/api/user/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    token: "Bearer " + token,
                }
            })
            if (res.status === 401) {
                dispatch(logOut());
            }
            const data = await res.json();
            setUser(data);
            console.log(user);
        }
        fetchuserdata();
        return () => {
            socket.disconnect();
        }
    }, [])

    const dispatch = useDispatch();
    return <div className='w-1/3 relative'>
        <div className='relative gap-6 flex flex-col p-3 bg-white rounded-sm items-center'>
            <img src='https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png' />

            <img className='absolute rounded-full object-cover w-16 h-16 top-5 left-1/2 -translate-x-1/2' src={user?.profilePic} />
            <div className='text-black'>
                <p className=' text-base font-medium'>{user?.username}</p>
                <p className='text-xs'><span className='font-bold'>ID: </span>{user?._id}</p>
                <h1 className='text-xs'><span className='text-xs font-bold'>Email: </span>{user?.email}</h1>
                <button className='text-xs text-white bg-blue-500 p-3 py-1 rounded-md' onClick={() => { dispatch(logOut()) }}>Logout</button>
                <p className='max-w-[300px] text-black text-xs break-all'>{authInfo?.token}</p>
            </div>
        </div>
        {/* <div className='w-full h-max text-black '>
            <h1 className='text-black text-2xl font-medium uppercase text-center'>Posts</h1>
            <div className='w-full flex flex-wrap gap-4 p-5'>

                {user?.posts?.map(function (post, index) {
                    return <div className='max-w-[300px] border border-slate-600 p-4 relative' key={post._id}>
                        <button onClick={() => handleDeletePost(post._id)}>
                            <MdDelete className='absolute h-6 w-6 right-2 top-2' />
                        </button>
                        <p><span className='font-bold'>Title: </span>{post.title}</p>
                        {post.img &&
                            <img className=' aspect-square object-cover w-full' src={post.img} />
                        }
                        <p><span className='font-bold'>Content: </span>{post.content}</p>
                        <p><span className='font-bold'>POST ID: </span>{post._id}</p>
                    </div>
                })}
            </div>
        </div> */}

    </div>
}