import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import getWalletAddress from "./settings";

export const UnitContext = createContext({ unit: "km" });

async function getVehicles() {
    const walletAddress = await getWalletAddress();
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/users/${walletAddress}/vehicles`)).json();
}

export function useVehicles() {
    return useQuery({
        queryKey: ["vehicles"],
        queryFn: () => getVehicles()
    });
}

async function getVehicleById(id: number, unit: string) {
    const walletAddress = await getWalletAddress();
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}?walletAddress=${walletAddress}&localizedUnit=${unit}`)).json();
}

export function useVehicleById(id: number, unit: string) {
    return useQuery({
        queryKey: ["vehicle", id, unit],
        queryFn: () => getVehicleById(id, unit)
    });
}

export async function getVehicleImage(id: number) {
    const walletAddress = await getWalletAddress();
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}/image?walletAddress=${walletAddress}`)).text();
}

export function useVehicleImage(id: number) {
    return useQuery({
        queryKey: ["vehicle", id, "image"],
        queryFn: () => getVehicleImage(id)
    });
}