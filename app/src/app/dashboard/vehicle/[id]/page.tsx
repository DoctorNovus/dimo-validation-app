'use client';

import { UnitContext, useVehicleById } from "@/_hooks/vehicles";
import { useParams } from "next/navigation";

import VehicleBanner from "@/_components/Vehicle/VehicleBanner";
import VehicleAdvancedMode from "@/_components/Vehicle/Views/VehicleAdvancedMode";

import { useContext, useState } from "react";

import VehicleBasicMode from "@/_components/Vehicle/Views/VehicleBasicMode";
import { getTheme } from "@/_hooks/settings";
import { ToastContainer } from "react-toastify";

export default function VehicleIdentityPage() {
    const [viewMode, setViewMode] = useState(0);

    const { state: { region } } = useContext(UnitContext);

    const { id }: { id?: number } = useParams();
    const vehicle = useVehicleById(parseInt(id?.toString() || "-1"), region);

    if (vehicle.isLoading)
        return <>Loading...</>

    if (vehicle.data.statusCode == 401) {
        setTimeout(() => {
            window.location.href = "/dashboard"
        }, 2000);

        return (
            <span>Not Your Vehicle.</span>
        )
    }

    const theme = getTheme();
    const signals = vehicle.data.signals;

    const lastSeen = new Date(signals?.lastSeen?.value).toLocaleDateString('en-US', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short"
    });

    return (
        <div className="px-4 py-2 flex flex-col gap-4 mb-24">
            <VehicleBanner theme={theme} vehicle={vehicle} id={id} lastSeen={lastSeen} />

            <div className="flex flex-row">
                <button className={`${viewMode == 0 ? "border-red-500 bg-red-500/20" : "border-r-0"} px-2 py-1 border rounded-l-lg text-lg`} onClick={() => setViewMode(0)}>Basic</button>
                <button className={`${viewMode == 1 ? "border-red-500 bg-red-500/20" : "border-l-0"} px-2 py-1 border rounded-r-lg text-lg`} onClick={() => setViewMode(1)}>Advanced</button>
            </div>

            {viewMode == 0 && <VehicleBasicMode id={id} signals={signals} theme={theme} />}
            {viewMode == 1 && <VehicleAdvancedMode id={id} signals={signals} theme={theme} />}

            <ToastContainer
                autoClose={false}
                position="bottom-left"
            />
        </div>
    )
}