import { Divider } from "@heroui/react";

import VehicleStatusSelector from "./VehicleStatus/VehicleStatusSelector";

export default function VehicleProperties({ name, value }: { name: string, value: string | { value: string } }) {
    let val;

    if (name == "lastSeen")
        return null;

    if (!value) {
        return null;
    } else if (typeof value == "object") {
        val = value.value;
        // timestamp = value.timestamp;
    } else
        val = value;

    return (
        <div className="flex flex-col shadow-md rounded-lg py-4 gap-2">

            <VehicleStatusSelector name={name} value={val} />

            <Divider className="text-gray-500" />

        </div>
    )
}