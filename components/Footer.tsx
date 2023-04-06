import { useState, useEffect } from "react";
import RouterLink from "./RoutesLink"

const Footer = () => {
    const [screenHeight, setScreenHeight] = useState(10);

    // 取得className 為 App的height
    const [height, setHeight] = useState(0)
    useEffect(() => {
        const app = document.querySelector('.App')
        setScreenHeight(window.innerHeight);
        if (app) {
            setHeight(app.clientHeight)
        }
    }, [])

    if (height < screenHeight) return (<></>);

    return (
        <div className="footer m-3">
            <RouterLink />
        </div>
    )
}

export default Footer