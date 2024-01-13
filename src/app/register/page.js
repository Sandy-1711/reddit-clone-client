'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from 'react-redux'
export default function Register() {
    const authInfo = useSelector(state => state.value);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [file, setfile] = useState(null);
    const router = useRouter();
    async function register(e) {
        e.preventDefault();
        // const formdata = new FormData();
        // formdata.append('username', username)
        // formdata.append('email', email)
        // formdata.append('password', password)
        const reader = new FileReader();
        var newprofilephoto;
        const formdata = {
            username: username,
            email: email,
            password: password,
            profilePic: null,
        }
        if (file) {

            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                newprofilephoto = reader.result;
                formdata.profilePic = newprofilephoto
                setfile(file);
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(formdata),
                    headers: { "Content-Type": "application/json" },
                })
                // console.log(await res.json());
                // setsrc()
                const s = await res.json()
                setsrc(s);
                // formdata.append('profilePic', newprofilephoto)
            }
        }
        else {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(formdata),
                headers: { "Content-Type": "application/json" },
            })
            console.log(await res.json());

        }

    }
    return authInfo.isAuth ? router.push('/') : <div className='bg-[#EBEDF9] h-screen flex justify-center items-center'>
        <div className="flex min-w-[600px] h-1/2 w-1/3 z-20">
            <div className="w-1/2 bg-[url('/login.png')] bg-cover  bg-no-repeat"></div>

            <form className='relative p-6 text-black bg-white flex flex-col w-1/2 items-center justify-center'>
                <h1 className="absolute top-[8%] z-10 text-3xl">Reddit</h1>

                <input onChange={function (e) {
                    setusername(e.target.value)
                }} name='username' className='m-2  bg-slate-100 p-3' type='text' placeholder='username'></input>
                <input
                    onChange={function (e) {
                        setemail(e.target.value)
                    }} name='email' className="w-full bg-slate-100 p-3" type='email' placeholder='email'></input>
                <input onChange={(e) => { setpassword(e.target.value) }} name='password' className="w-full bg-slate-100 p-3" type='password' placeholder='password'></input>
                <input onChange={(e) => { setfile(e.target.files[0]) }} name='profilePic' className="w-full bg-slate-100 p-3" type='file' ></input>
                <button onClick={register} className="w-full text-white rounded-sm p-2 bg-[#FE7750]">Register</button>

                <span className="text-center text-sm">Already have an account?</span>
                <a href="/login" className="text-[#FE7750] text-sm text-center">Login and join the disccussion.</a>
            </form>
        </div>

    </div>
}
