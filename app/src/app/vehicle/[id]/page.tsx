'use client';

import { useVehicleById } from "@/_hooks/vehicles";
import { useParams } from "next/navigation";

export default function VehicleIdentityPage() {
    const { id } = useParams();
    const vehicle = useVehicleById(parseInt(id?.toString() || "-1"));

    console.log(vehicle.data);

    if (vehicle.isLoading)
        return <></>

    return (
        <></>
    )
}