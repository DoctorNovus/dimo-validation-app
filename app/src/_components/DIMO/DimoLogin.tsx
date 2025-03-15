"use client";

import { LoginWithDimo, initializeDimoSDK, useDimoAuthState } from "@dimo-network/login-with-dimo";
import Link from "next/link";

export default function DimoLogin() {
    const { isAuthenticated, walletAddress } = useDimoAuthState();

    const loginURI = `https://login.dimo.org/?clientId=${process.env.NEXT_PUBLIC_DIMO_CLIENT_ID}&redirectUri=${process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI}&permissionTemplateId=1&entryState=VEHICLE_MANAGER`;

    if (!isAuthenticated)
        initializeDimoSDK({
            clientId: process.env.NEXT_PUBLIC_DIMO_CLIENT_ID!,
            redirectUri: process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI!,
            apiKey: process.env.NEXT_PUBLIC_DIMO_API_KEY!
        });

    if (!walletAddress)
        window.location.href = loginURI;


    return (
        <Link href={loginURI} className="bg-black text-white dark:bg-white dark:text-black text-base px-3 py-1 rounded-md">
            <span>Manage Your Account</span>
        </Link>
    );

    return (
        <LoginWithDimo
            className="bg-black"
            mode="popup"
            onSuccess={(authData: unknown) => {
                console.log("Success:", authData);
            }}
            onError={(error: unknown) => console.error("Error:", error)}
            permissionTemplateId={"1"}
        />
    )

}