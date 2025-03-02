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

async function getVehicleById(id: number) {
    return await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/vehicle/${id}`)).json();
}

export function useVehicleById(id: number){
    return useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => getVehicleById(id)
    });
}