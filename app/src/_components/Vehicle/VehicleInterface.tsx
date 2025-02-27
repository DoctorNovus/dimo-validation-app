"use client";

import { useVehicles } from "@/_hooks/vehicles";
import { useDimoAuthState } from "@dimo-network/login-with-dimo";
import VehiclePreview from "./VehiclePreview";

export default function VehicleInterface() {
    const { walletAddress } = useDimoAuthState();

    const vehicles = useVehicles(walletAddress);

    if (vehicles.isLoading)
        return <></>

    const vehicleData = vehicles.data.data.vehicles.nodes;

    return (
        <div className="flex flex-col gap-2">
            <span>Vehicles</span>
            <div className="flex flex-row gap-2">
                {
                    vehicleData.map((vehicle, key) => <VehiclePreview key={key} vehicle={vehicle} />)
                }
            </div>
        </div>
    )
}