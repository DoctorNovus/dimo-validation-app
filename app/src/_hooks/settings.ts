import { useQuery } from "@tanstack/react-query";

export default async function getWalletAddress() {
    return localStorage.getItem("walletAddress");
}

export function useWalletAddress(){
    return useQuery({
        queryKey: ["walletAddress"],
        queryFn: getWalletAddress
    });
}