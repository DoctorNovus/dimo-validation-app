import { DimoAuthProvider } from "@dimo-network/login-with-dimo";

export default function DimoWrapper({ children }: { children: React.ReactElement }) {
    return (
        <DimoAuthProvider>
            {children}
        </DimoAuthProvider>
    )
}