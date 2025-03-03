"use client";

import { LoginWithDimo, initializeDimoSDK, useDimoAuthState } from "@dimo-network/login-with-dimo";

export default function DimoLogin() {
    const { isAuthenticated } = useDimoAuthState();

    if (!isAuthenticated)
        initializeDimoSDK({
            clientId: process.env.NEXT_PUBLIC_DIMO_CLIENT_ID!,
            redirectUri: process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI!,
            apiKey: process.env.NEXT_PUBLIC_DIMO_API_KEY!
        });

    if (isAuthenticated)
        return <span>Logged In</span>

    return (
        <LoginWithDimo
            mode="popup"
            onSuccess={(authData: unknown) => {
                console.log("Success:", authData);
            }}
            onError={(error: unknown) => console.error("Error:", error)}
            permissionTemplateId={"1"}
        />
    )

}