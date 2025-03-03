'use client';

import { useVehicleById } from "@/_hooks/vehicles";
import { useParams } from "next/navigation";

import VehicleProperties from "@/_components/Vehicle/VehicleProperties";
import VehicleIcon from "@/_components/Vehicle/VehicleIcon";

export default function VehicleIdentityPage() {
    const { id } = useParams();
    const vehicle = useVehicleById(parseInt(id?.toString() || "-1"));

    if (vehicle.isLoading)
        return <>Loading...</>

    const signals = vehicle.data.data;

    const lastSeen = new Date(signals.lastSeen).toLocaleDateString('en-US', {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "short"
    });

    return (
        <div className="px-4 py-2 flex flex-col gap-4">
            <div className="w-1/2 flex flex-row gap-4 border border-red-700/50 shadow-md shadow-red-700 px-4 rounded-lg">
                <div className="w-20 h-20">
                    <VehicleIcon fill="white" />
                </div>
                <div className="w-full flex flex-col gap-1 justify-center">
                    <div className="flex flex-row justify-between gap-2">
                        <div className="flex flex-row gap-1">
                            <span>{vehicle.data.vehicle.definition.make}</span>
                            <span>{vehicle.data.vehicle.definition.model}</span>
                            <span>{vehicle.data.vehicle.definition.year}</span>
                        </div>
                        <span>ID: {id}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <label>Last Synced</label>
                        <span>{lastSeen}</span>
                    </div>
                </div>
            </div>

            <form className="py-4" onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const data = {};

                for (let elem of e.target) {
                    if (elem.name.trim() != "")
                        data[elem.name] = elem.value;
                }

                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/data/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            }}>
                <div className="flex flex-col gap-2.5">
                    {
                        Object.entries(signals).map(([name, value], key) => <VehicleProperties key={key} name={name} value={value} />)
                    }
                </div>

                <div className="flex flex-row gap-2">
                    <button type="submit" className="px-3 py-2 text-lg bg-gray-500 text-white rounded-lg cursor-pointer my-2">Send Data</button>
                    <button type="submit" className="px-3 py-2 text-lg text-gray-500 border border-white rounded-lg cursor-pointer my-2">Reset Data</button>
                </div>

            </form>
        </div >
    )
}