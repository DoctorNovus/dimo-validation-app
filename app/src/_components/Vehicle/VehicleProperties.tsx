import { Divider } from "@heroui/react";

import VehicleStatusSelector from "./VehicleStatus/VehicleStatusSelector";

export default function VehicleProperties({ signal, name, value }: { signal: string, name: string, value: string | { value: string } }) {
    let val;

    if (signal == "lastSeen")
        return null;

    if (!value) {
        return null;
    } else if (typeof value == "object") {
        val = value.value;
        // timestamp = value.timestamp;
    } else
        val = value;

    return (
        <div className="flex flex-col rounded-lg py-4 gap-2">

            <VehicleStatusSelector signal={signal} name={name} value={val} />

            <Divider className="text-gray-500" />

        </div>
    )
}