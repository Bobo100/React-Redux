import { useState, useEffect } from "react";
import RouterLink from "./RoutesLink"

const Footer = () => {
    const [screenHeight, setScreenHeight] = useState(0);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setScreenHeight(window.innerHeight);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    useEffect(() => {
        setScreenHeight(window.innerHeight);
    }, []);


    if (screenHeight < 500) return (<></>);

    return (
        <div className="footer m-3">
            <RouterLink />
        </div>
    )
}

export default Footer