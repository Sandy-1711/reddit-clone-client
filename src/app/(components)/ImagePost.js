import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
export default function ImagePost() {
    const authInfo = useSelector(state => state.value).user?.user;
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    async function uploadimagepost(e) {
        e.preventDefault();
        var formdata = {
            title: title,
            postimg: null,
        }
        if (image) {
            const reader = new FileReader();

            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                formdata.postimg = reader.result;
                // setfile(file);
                const res = await fetch(`http://localhost:5000/api/posts/u/${authInfo._id}/addPost`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(formdata),
                    headers: { "Content-Type": "application/json",token:`Bearer ${authInfo.token}` },
                    
                })
                // console.log(await res.json());
                // setsrc()
                const s = await res.json()
                console.log(s);
                setImage(null);
                setTitle('');
                // formdata.append('profilePic', newprofilephoto)
            }
        }

    }
    return <form className="p-5 flex flex-col w-full gap-2" onSubmit={uploadimagepost}>
        <input className="peer px-5 py-3 border relative border-gray-400 rounded-md" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" maxLength={300} />
        <div className="h-[450px] border relative border-gray-400 overflow-hidden rounded-md">
            {image && <img className="h-full w-full object-contain rounded-md relative z-10" src={URL.createObjectURL(image)} />}
            {!image && <input className="h-full w-full pointer-events-auto" type="file" onChange={(e) => setImage(e.target.files[0])} />}
            {image && <div className="absolute right-3 bottom-3 h-7 w-7 z-20" onClick={() => { setImage(null) }}><MdDelete className="h-full w-full text-gray-900 cursor-pointer" /></div>}
        </div>
        <button className={`p-3 rounded-full ${title && image && 'bg-blue-500 text-white'} ${(!title || !image) && 'bg-gray-300 cursor-not-allowed'} `}>Post</button>

    </form>
}