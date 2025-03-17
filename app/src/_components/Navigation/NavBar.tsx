import DimoLogin from "../DIMO/DimoLogin";
import UnitSelector from "./UnitSelector";

export default function NavBar() {
    return (
        <div className="hidden md:flex w-full h-20 border-b border-b-gray-500/45 justify-between items-center px-4">
            <div>

            </div>

            <div className="w-1/4 flex justify-center items-center gap-4">
                <UnitSelector />

                <DimoLogin />

            </div>
        </div>
    )
}