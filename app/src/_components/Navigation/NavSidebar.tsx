import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";

export default function NavSidebar() {
    return (
        <div className="w-52 h-screen border-r border-r-gray-500/45 p-4">
            <Link href="/" className="flex flex-row gap-3 items-center">
                <div className="flex w-6 h-6 items-center justify-center">
                    <HomeIcon />
                </div>
                <span className="text-base">Home</span>
            </Link>
        </div>
    )
}