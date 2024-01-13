'use client'
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux'
import Dashboard from "../Dashboard";
export default function App() {
    const router = useRouter();
    const userState = useSelector((state) => state.value)
    console.log(userState);
    return (userState?.isAuth && userState?.user ? <Dashboard /> : router.push('/login'))
}