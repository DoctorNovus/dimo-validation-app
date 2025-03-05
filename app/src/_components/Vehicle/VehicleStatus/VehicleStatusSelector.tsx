'use client';

import { useState } from "react";
import VehicleStatusAccurate from "./VehicleStatusAccurate";
import VehicleStatusInaccurate from "./VehicleStatusInaccurate";

export default function VehicleStatusSelector({ signal, name, value }: { signal: string, name: string, value: string }) {

    const [selection, setSelection] = useState("accurate");

    return (
        <div className="flex flex-row gap-2 justify-between">
            {
                ["accurate", "skip"].includes(selection) && (
                    <VehicleStatusAccurate status={selection} signal={signal} name={name} value={value} />
                )
            }

            {
                ["inaccurate", "outdated"].includes(selection) && (
                    <VehicleStatusInaccurate status={selection} signal={signal} name={name} value={value} />
                )
            }

            <div className="w-full md:w-fit flex items-center h-10 px-2 py-2 bg-gray-500 rounded-lg">
                <select value={selection} className="w-full h-10 flex text-white outline-0" onChange={(e) => {
                    setSelection(e.target.value);
                }}>
                    <option value="accurate">Accurate</option>
                    <option value="inaccurate">Inaccurate</option>
                    <option value="outdated">Outdated</option>
                    <option value="skip">Unsure (Skip)</option>
                </select>
            </div>
        </div>
    )
}