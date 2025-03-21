import { useQuery } from "@tanstack/react-query";

export default async function getWalletAddress() {
    return localStorage.getItem("walletAddress");
}

export function useWalletAddress() {
    return useQuery({
        queryKey: ["walletAddress"],
        queryFn: getWalletAddress
    });
}

export function getTheme() {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}