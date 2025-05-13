import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import getWalletAddress from "./settings";

export const UnitContext = createContext({ region: "eu" });

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

async function getVehicleById(id: number, region: string) {
    const walletAddress = await getWalletAddress();
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}?walletAddress=${walletAddress}&region=${region}`)).json();
}

export function useVehicleById(id: number, region: string) {
    return useQuery({
        queryKey: ["vehicle", id, region],
        queryFn: () => getVehicleById(id, region)
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

export async function getVehicleVIN(id: number) {
    const walletAddress = await getWalletAddress();
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}/vin?walletAddress=${walletAddress}`)).text();
}

export function useVehicleVIN(id: number) {
    return useQuery({
        queryKey: ["vehicle", id, "vin"],
        queryFn: () => getVehicleVIN(id)
    });
}