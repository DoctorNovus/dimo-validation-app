import { useState } from "react"

export default function VehicleStatusInaccurate({ name, value, status }: { name: string, value: string, status: string }) {
    const [validData, setValidData] = useState("");

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex flex-col justify-start gap-2">
                <label htmlFor={`old_${name}_${status}`} className="text-sm text-gray-500/70 line-through">{name}</label>
                <input name={`old_${name}_${status}`} disabled className="line-through text-black dark:text-white" value={value} onChange={() => { }} />
            </div>

            <div className="flex flex-col justify-start gap-2">
                <label htmlFor={`${name}_${status}`} className="text-sm text-gray-500/70">{name}</label>
                <input name={`${name}_${status}`} className="text-black dark:text-white text-base outline-none" placeholder="Enter accurate value..." value={validData} onChange={(e) => setValidData(e.target.value)} />
            </div>
        </div>
    )
}