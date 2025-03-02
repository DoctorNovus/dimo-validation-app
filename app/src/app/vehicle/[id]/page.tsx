'use client';

import VehicleIcon from "@/_components/Vehicle/VehicleIcon";
import { useVehicleById } from "@/_hooks/vehicles";
import { useParams } from "next/navigation";

import { Input } from "@heroui/input";
import { Divider } from "@heroui/react";


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

            <div>
                <div className="flex flex-col gap-2.5">
                    {
                        Object.entries(signals).map(([name, value], key) => {
                            let val, timestamp;

                            if (name == "lastSeen")
                                return null;

                            if (!value) {
                                return null;
                            } else if (typeof value == "object") {
                                val = value.value;
                                timestamp = value.timestamp;
                            } else
                                val = value;

                            return (
                                <div key={key} className="flex flex-col shadow-md rounded-lg py-4 gap-2">
                                    <div className="flex flex-row gap-2 justify-between">
                                        <div className="flex flex-col justify-start gap-2">
                                            <span className="text-sm text-gray-500/70">{name}</span>
                                            <span>{val}</span>
                                        </div>

                                        <div className="px-2">
                                            <select className="w-full h-10 flex bg-gray-500 rounded-lg px-2 py-2 text-white">
                                                <option value="accurate">Accurate</option>
                                                <option value="inaccurate">Inaccurate</option>
                                                <option value="outdated">Outdated</option>
                                                <option value="skip">Unsure (Skip)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Divider className="text-gray-500" />

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}