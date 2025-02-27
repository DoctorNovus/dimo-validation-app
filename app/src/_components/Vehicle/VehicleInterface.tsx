"use client";

import { useVehicles } from "@/_hooks/vehicles";
import { useDimoAuthState } from "@dimo-network/login-with-dimo";

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
                    vehicleData.map((vehicle, key) => (
                        <div key={key} className="flex flex-col gap-1 border border-solid shadow-md p-4 rounded-lg items-center">
                            <span>{vehicle.definition.make}</span>
                            <span>{vehicle.definition.model}</span>
                            <span>{vehicle.definition.year}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}