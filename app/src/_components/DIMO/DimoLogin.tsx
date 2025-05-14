"use client";

import { useWalletAddress } from "@/_hooks/settings";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import DimoLoginModal from "./DimoLoginModal";

export default function DimoLogin() {
    const [active, setActive] = useState(false);

    const walletAddress = useWalletAddress();

    const params = new URLSearchParams(window.location.search);

    if (params.size != 0) {
        const token = params.get("token");
        const email = params.get("email");
        const walletAddress = params.get("walletAddress");

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("walletAddress", walletAddress);
    }

    const loginURI = `https://login.dimo.org/?clientId=${process.env.NEXT_PUBLIC_DIMO_CLIENT_ID}&redirectUri=${process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI}&permissionTemplateId=1&entryState=VEHICLE_MANAGER&forceEmail=true`;
    const logoutURI = `https://login.dimo.org/?clientId=${process.env.NEXT_PUBLIC_DIMO_CLIENT_ID}&redirectUri=${process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI}&permissionTemplateId=1&entryState=LOGOUT&forceEmail=true`;

    if (walletAddress.isSuccess && !walletAddress.data)
        window.location.href = loginURI;

    return (
        <div onClick={() => setActive(!active)} className="flex relative">
            <UserCircleIcon color={active ? "red" : "white"} className="w-8 h-8" onClick={() => setActive(false)} />

            {active && (
                <DimoLoginModal open={active} setOpen={setActive} loginUri={loginURI} logoutUri={logoutURI} />
            )}
        </div>
    );

    // return (
    //     <div>
    //         <UserCircleIcon />

    //         <Link href={loginURI} className="bg-black text-white dark:bg-white dark:text-black text-base px-3 py-1 rounded-md">
    //             <span>Manage Your Account</span>
    //         </Link>
    //         {/* <Link href={loginURI} className="bg-black text-white dark:bg-white dark:text-black text-base px-3 py-1 rounded-md">
    //             <span>Logout</span>
    //         </Link> */}
    //     </div>

    // );

}