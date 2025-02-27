"use client";

import { useVehicles } from "@/_hooks/vehicles";

export default function VehicleInterface() {
    const vehicles = useVehicles("0x49CdA1a1de49Bb4B52151652aF8469A0da53B678");

    if (vehicles.isSuccess)
        console.log(vehicles.data);

    return <></>
}