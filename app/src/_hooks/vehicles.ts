import { useQuery } from "@tanstack/react-query";

async function getVehicles(address: string) {
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users/${address}/vehicles`)).json();
}

export function useVehicles(address: string) {
    return useQuery({
        queryKey: ["vehicles"],
        queryFn: () => getVehicles(address)
    });
}

async function getVehicleById(id: number, walletAddress: string) {
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}?walletAddress=${walletAddress}`)).json();
}

export function useVehicleById(id: number, walletAddress: string) {
    return useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => getVehicleById(id, walletAddress)
    });
}

export async function getVehicleImage(id: number, walletAddress: string) {
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}/image?walletAddress=${walletAddress}`)).text();
}

export function useVehicleImage(id: number, walletAddress: string){
    return useQuery({
        queryKey: ["vehicle", id, "image"],
        queryFn: () => getVehicleImage(id, walletAddress)
    });
}