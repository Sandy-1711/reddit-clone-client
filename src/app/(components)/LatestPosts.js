'use client'
import { io } from 'socket.io-client'
import { useEffect, useState } from "react";
import AddPostBar from "./AddPostBar";
import { useDispatch,useSelector } from 'react-redux'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from 'react-icons/fa';
export default function LatestPosts() {
    const dispatch = useDispatch();
    const authInfo=useSelector(state=>state.value).user?.user;
    // console.log(authInfo);
    const [newposts, setNewPosts] = useState([]);
    useEffect(function () {
        const socket = io('http://localhost:5000', { transports: ['polling'] });
        socket.on('newpost', (post) => {
            console.log('new post', post);
            fetchPosts();
        })
        socket.on('postdeleted', (deletedpost) => {
            console.log(deletedpost);
            fetchPosts();
        })
        async function fetchPosts() {
            const res = await fetch('http://localhost:5000/api/posts/latestposts', {
                headers: {
                    'Content-Type': 'application/json',
                    token: "Bearer " + authInfo.token,
                }
            })
            if (res.status === 401) {
                dispatch(logOut());
            }
            const posts = await res.json();
            if (!posts?.posts || res.status === 404) {
                console.log(posts.message);
            }
            setNewPosts(posts);
            console.log(posts);
        }
        fetchPosts();
    }, [])
    return <div className=' w-2/3 flex flex-col h-max gap-5'>
        {/* <h1 className='text-4xl'>All new posts</h1> */}
        <AddPostBar />
        {!newposts.posts ? <h1 className="bg-white p-2">{newposts.message}</h1> : newposts?.posts?.map(function (post) {
            return <div className='border border-[#ccc] w-full px-4 gap-5 bg-white relative flex rounded-md' key={post._id}>
                <div className='flex py-3 flex-col justify-start items-center '>
                    <div><FaArrowUp /></div>
                    {post.upvotes}
                    <div><FaArrowDown /></div>
                    {/* {post.downvotes} */}
                </div>
                <div className='py-1 pb-5 w-full'>
                    <span className='text-sm font-semibold'>u/{post?.authorName}</span>
                    <p className='text-xl font-semibold'>{post.title}</p>
                    {post?.postimg &&
                        <img src={post.postimg} className='h-auto  object-contain w-full' />
                    }
                    <p className='text-lg'>{post.content}</p>
                    <p className='text-xs'><span className='font-bold'>POST ID: </span>{post._id}</p>
                </div>
            </div>
        })}
    </div>
}