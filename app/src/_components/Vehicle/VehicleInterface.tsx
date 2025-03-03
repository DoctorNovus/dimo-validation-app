"use client";

import { useVehicles } from "@/_hooks/vehicles";
import { useDimoAuthState } from "@dimo-network/login-with-dimo";
import VehiclePreview from "./VehiclePreview";

export default function VehicleInterface() {
    const { walletAddress } = useDimoAuthState();

    const vehicles = useVehicles(walletAddress);

    if (vehicles.isLoading)
        return <></>

    const vehicleData = vehicles.data;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <span className="text-lg">Shared Vehicles</span>
                <div className="flex flex-row gap-2">
                    {
                        vehicleData.shared.map((vehicle, key) => <VehiclePreview key={key} vehicle={vehicle} />)
                    }
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-lg">Vehicles Not Shared</span>
                <div className="flex flex-row gap-2">
                    {
                        vehicleData.notShared.map((vehicle, key) => <VehiclePreview disabled key={key} vehicle={vehicle} />)
                    }
                </div>
            </div>
        </div>
    )
}