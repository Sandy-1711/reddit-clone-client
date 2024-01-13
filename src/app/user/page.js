'use client'
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux'
export default function Page() {
    const user = useSelector(state => state.value.user)?.user;
    const router = useRouter();

    return router.push(`/user/${user.username}`);
}