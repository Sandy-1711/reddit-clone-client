'use client'
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  // useState(){

  // }
  const [src, setsrc] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [file, setfile] = useState(null);
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
  return (
    <div className='w-screen h-max flex flex-col justify-center items-center bg-white'>
      <form className='p-2 text-black bg-slate-300 flex flex-col w-max'>
        <input onChange={function (e) {
          setusername(e.target.value)
        }} name='username' className='m-2  bg-slate-100 p-3' type='text' placeholder='username'></input>
        <input
          onChange={function (e) {
            setemail(e.target.value)
          }} name='email' className='m-2  bg-slate-100 p-3' type='email' placeholder='email'></input>
        <input onChange={(e) => { setpassword(e.target.value) }} name='password' className='m-2  bg-slate-100 p-3' type='password' placeholder='password'></input>
        <input onChange={(e) => { setfile(e.target.files[0]) }} name='profilePic' className='m-2  bg-slate-100 p-3' type='file' ></input>
        <button onClick={register} className=' m-2 text-white rounded-sm p-3 bg-blue-500'>Register</button>
      </form>
      <img id='foundimage' src={src.profilePic}></img>
    </div>
  )
}
