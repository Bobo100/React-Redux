import Link from "next/link"
import { useRouter } from "next/router"

const RouterLink = () => {
    const router = useRouter()
    return (
        <>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>回到首頁</Link>
            <Link href="/useRedux" className={router.pathname === "/useRedux" ? "active" : ""}>Redux使用方式(舊版)</Link>
            <Link href="/useReduxOfficial" className={router.pathname === "/useReduxOfficial" ? "active" : ""}>Redux官方教學(最新版)</Link>
        </>
    )
}

export default RouterLink