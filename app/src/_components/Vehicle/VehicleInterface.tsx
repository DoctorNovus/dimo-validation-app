"use client";

import { useVehicles } from "@/_hooks/vehicles";
import { ShareVehiclesWithDimo, useDimoAuthState } from "@dimo-network/login-with-dimo";
import VehiclePreview from "./VehiclePreview";

export default function VehicleInterface() {
    const { walletAddress } = useDimoAuthState();

    const vehicles = useVehicles(walletAddress);

    if (vehicles.isLoading)
        return <></>

    const vehicleData = vehicles.data;

    return (
        <div className="flex flex-col gap-4">
            {
                vehicleData.shared?.length > 0 &&
                (
                    <div className="flex flex-col gap-2">
                        <span className="text-lg">Shared Vehicles</span>
                        <div className="flex flex-row gap-2">
                            {
                                vehicleData.shared.map((vehicle, key) => <VehiclePreview key={key} vehicle={vehicle} />)
                            }
                        </div>
                    </div>
                )
            }

            {
                vehicleData.notShared?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <span className="text-lg">Vehicles Not Shared</span>

                        <div className="flex flex-row gap-2">
                            {
                                vehicleData.notShared.map((vehicle, key) => <VehiclePreview disabled key={key} vehicle={vehicle} />)
                            }
                        </div>

                        <div className="py-2">
                            <ShareVehiclesWithDimo
                                mode="popup"
                                onSuccess={(authData: unknown) => {
                                    console.log("Success:", authData);
                                }}
                                onError={(error: unknown) => console.error("Error:", error)}
                                permissionTemplateId={"1"}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}