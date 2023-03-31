import Footer from "./Footer";
import NavBar from "./NavBar";

interface LayoutProps {
    children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
    return (<div className="App ">
        <NavBar />
        <div className="pt-20">
            {children}
        </div>
        {/* <Footer /> */}
    </div>);
}