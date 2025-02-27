import { useQuery } from "@tanstack/react-query";

async function getVehicles(address: string) {
    return await (await fetch(`http://localhost:8080/users/${address}/vehicles`)).json();
}

export function useVehicles(address: string) {
    return useQuery({
        queryKey: ["vehicles"],
        queryFn: () => getVehicles(address)
    });
}