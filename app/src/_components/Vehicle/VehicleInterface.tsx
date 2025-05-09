"use client";

import { useVehicles } from "@/_hooks/vehicles";
import { ShareVehiclesWithDimo, initializeDimoSDK } from "@dimo-network/login-with-dimo";

import VehiclePreview from "./VehiclePreview";

export default function VehicleInterface() {
    initializeDimoSDK({
        clientId: process.env.NEXT_PUBLIC_DIMO_CLIENT_ID as string,
        redirectUri: process.env.NEXT_PUBLIC_DIMO_REDIRECT_URI as string
    });

    const vehicles = useVehicles();

    if (vehicles.isLoading) {
        return (
            <div className={'justify-center flex content-center text-center'}>
                <p>Loading...</p>
            </div>
        )
    }

    const vehicleData = vehicles?.data;

    if (!vehicleData) {
        return (
            <div className={'justify-center flex content-center text-center'}>
                <p>No vehicle data.<br /> Make sure you are signed into the correct account and have shared your vehicle with this app.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {
                vehicleData.shared?.length > 0 &&
                (
                    <div className="flex flex-col gap-2">
                        <span className="text-lg">Shared Vehicles</span>
                        <div className="flex flex-col md:flex-row gap-2">
                            {
                                vehicleData.shared.map((vehicle, key) => (
                                    <VehiclePreview key={key} vehicle={vehicle} />
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {
                vehicleData.notShared?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <span className="text-lg">Vehicles Not Shared</span>

                        <div className="flex flex-col md:flex-row gap-2">
                            {
                                vehicleData.notShared.map((vehicle, key) => <VehiclePreview disabled key={key} vehicle={vehicle} />)
                            }
                        </div>

                        <div className="py-2">
                            <ShareVehiclesWithDimo
                                mode="redirect"
                                onSuccess={async (authData: unknown) => {
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