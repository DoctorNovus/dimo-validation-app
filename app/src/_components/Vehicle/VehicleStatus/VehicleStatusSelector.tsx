'use client';

import { useState } from "react";
import VehicleStatusAccurate from "./VehicleStatusAccurate";
import VehicleStatusInaccurate from "./VehicleStatusInaccurate";

export default function VehicleStatusSelector({ signal, name, value }: { signal: string, name: string, value: string }) {

    const [selection, setSelection] = useState("accurate");

    const SELECTIONS = {
        ACCURATE: <VehicleStatusAccurate status={selection} signal={signal} name={name} value={value} />,
        INACCURATE: <VehicleStatusInaccurate status={selection} signal={signal} name={name} value={value} />
    }

    let selector;

    switch (selection) {
        case "accurate":
            selector = SELECTIONS.ACCURATE;
            break;

        case "inaccurate":
            selector = SELECTIONS.INACCURATE;
            break;

        case "outdated":
            selector = SELECTIONS.INACCURATE;
            break;

        case "skip":
            selector = SELECTIONS.ACCURATE;
    }

    return (
        <div className="flex flex-row gap-2 justify-between">
            {selector}

            <div className="px-2">
                <select value={selection} className="w-full h-10 flex bg-gray-500 rounded-lg px-2 py-2 text-white" onChange={(e) => {
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