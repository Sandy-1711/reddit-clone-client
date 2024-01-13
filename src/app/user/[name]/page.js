'use client'
// import Navbar from "@/app/(components)/Navbar";
import { useSelector } from 'react-redux'
export default function ProfilePage(params) {
    const user = useSelector(state => state.value.user)?.user;

    return (
        <div>
            {/* <Navbar  /> */}
        </div>
    )
}