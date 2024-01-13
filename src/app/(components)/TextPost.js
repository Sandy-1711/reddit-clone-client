'use client'
import { useState } from "react";
import { useSelector } from 'react-redux';
export default function TextPost() {
    const authinfo = useSelector(state => state.value).user?.user;

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    async function uploadpost(e) {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/api/posts/u/${authinfo._id}/addPost`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                token: `Bearer ${authinfo.token}`,
            },
            body: JSON.stringify({ title: title, content: content })

        })
        const data = await res.json();
        setTitle('');
        setContent('');
    }
    return <form onSubmit={uploadpost} className="p-5 flex flex-col w-full gap-2">
        <input id="peer1" value={title} onChange={(e) => setTitle(e.target.value)} className="peer px-5 py-3 border border-gray-400 rounded-md" required placeholder="Title" maxLength={300} />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="peer px-5 py-3 border border-gray-400 rounded-md" required rows={12} placeholder="Text"></textarea>
        <button className={`p-3 rounded-full ${title && content && 'bg-blue-500 text-white'} ${(!title || !content) && 'bg-gray-300 cursor-not-allowed'} `} >Post</button>
    </form>
}