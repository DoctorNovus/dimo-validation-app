import NavBar from "./NavBar";
import NavSidebar from "./NavSidebar";

export default function NavWrapper({ children }) {

    return (
        <div className="w-full h-full">
            <NavBar />

            <div className="w-full h-full flex flex-row">
                <NavSidebar />
                <div className="w-full h-screen px-2 py-1 overflow-x-hidden overflow-y-scroll pb-20 [&::-webkit-scrollbar]:hidden">
                    {children}
                </div>
            </div>

        </div>
    )

}