import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import UnitSelector from "./UnitSelector";

export default function NavSidebar() {
    return (
        <div className="flex justify-between items-center md:items-start w-screen h-20 md:w-52 md:h-screen border-b md:border-r border-r-gray-500/45 px-8 md:px-4 p-4">
            <Link href="/dashboard" className="flex flex-row gap-3 items-center">
                <div className="flex w-6 h-6 items-center justify-center">
                    <HomeIcon />
                </div>
                <span className="text-base">Home</span>
            </Link>
            <div className="flex md:hidden">
                <UnitSelector />
            </div>
        </div>
    )
}