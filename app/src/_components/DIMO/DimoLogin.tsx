"use client";

import { useWalletAddress } from "@/_hooks/settings";
import Link from "next/link";

export default function DimoLogin() {
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

    const loginURI = `https://login.dimo.org/?clientId=${process.env.NEXT_PUBLIC_DIMO_CLIENT_ID}&redirectUri=${process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI}&permissionTemplateId=1&entryState=VEHICLE_MANAGER`;

    if (walletAddress.isSuccess && !walletAddress.data)
        window.location.href = loginURI;

    return (
        <div>
            <Link href={loginURI} className="bg-black text-white dark:bg-white dark:text-black text-base px-3 py-1 rounded-md">
                <span>Manage Your Account</span>
            </Link>
            {/* <Link href={loginURI} className="bg-black text-white dark:bg-white dark:text-black text-base px-3 py-1 rounded-md">
                <span>Logout</span>
            </Link> */}
        </div>

    );

}