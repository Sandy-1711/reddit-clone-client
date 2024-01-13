'use client'
import { useState } from "react";
import { logIn } from "../../../redux/features/authSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useRouter } from "next/navigation";
export default function Login() {
    const dispatch = useDispatch();
    const authInfo = useSelector((state) => state.value)
    console.log(authInfo);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const router=useRouter();
    async function handleLogin(e) {
        e.preventDefault();
        if (!username || !password) return;
        const formdata = {
            username: username,
            password: password,
        }
        let res = await fetch('http://localhost:5000/api' + '/auth/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const user = await res.json();
        console.log(user);
        dispatch(logIn(user))
        router.back();
    }
    return authInfo.isAuth ? router.push('/') :
        <div className="bg-[#EBEDF9] h-screen flex justify-center items-center">
            {/* <h1 className="">Login</h1> */}
            <div className="flex min-w-[600px] h-1/2 w-1/3">
                <div className="w-1/2 bg-[url('/login.png')] bg-cover  bg-no-repeat"></div>
                <form className='relative p-6 text-black bg-white flex flex-col w-1/2 items-center justify-center'>
                    <h1 className="absolute top-[20%] z-10 text-3xl">Reddit</h1>
                    <input onChange={(e) => setusername(e.target.value)} name="username" className="w-full bg-slate-100 p-3" type="text" placeholder="username"></input>
                    <input onChange={(e) => { setpassword(e.target.value) }} name="password" className="w-full bg-slate-100 p-3" type="password" placeholder="password"></input>
                    <button onClick={handleLogin} className="w-full text-white rounded-sm p-2 bg-[#FE7750]">Login</button>
                    <span className="text-center text-sm">don&apos;t have an account?</span>
                    <a href="/register" className="text-[#FE7750] text-sm text-center">Sign up and join the disccussion.</a>
                </form>
            </div>
        </div>
}