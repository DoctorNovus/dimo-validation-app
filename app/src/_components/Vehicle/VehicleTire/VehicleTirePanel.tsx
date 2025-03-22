import { useState } from "react";
import VehicleTireIcon from "./VehicleTireIcon";

export default function VehicleTirePanel({ validity, editing, onChange, oldValue, value: tempVal, unit, slot, signal }) {
    const [value, setValue] = useState(tempVal);

    if (editing) {
        return (
            <div className={`flex ${slot % 2 != 0 ? "flex-row" : "flex-row-reverse"} justify-center items-center`}>
                <div className={`flex flex-col gap-2 w-1/2 ${slot % 2 != 0 ? "items-end" : "items-start"}`}>
                    <div className="flex flex-row gap-1">
                        <input name={`${signal}`} type="number" max={99} min={1} value={value ?? 0} onChange={(e) => { onChange(e.target.value); setValue(e.target.value) }} className="w-5 underline underline-offset-4 outline-none" />
                        <span className="w-full">{unit}</span>
                    </div>
                    <div className="flex flex-row gap-1 line-through">
                        <input name={`old_${signal}`} value={oldValue} onChange={() => { }} disabled className="w-5" />
                        <span>{unit}</span>
                    </div>
                </div>
                <div className="flex w-32 aspect-square">
                    <VehicleTireIcon error={value <= 25} />
                </div>
            </div>
        )
    }

    return (
        <div className={`flex ${slot % 2 != 0 ? "flex-row" : "flex-row-reverse"} justify-center items-center`}>
            <div className={`flex flex-col gap-2 w-1/2 ${slot % 2 != 0 ? "items-end" : "items-start"}`}>
                <div className="flex flex-row gap-1">
                    <label htmlFor={`${signal}_${tempVal != oldValue ? validity : "accurate"}`} className="hidden"></label>
                    <input name={`${signal}_${tempVal != oldValue ? validity : "accurate"}`} type="number" value={tempVal} onChange={() => { }} disabled={true} className="w-5" />
                    <span className="w-5">{unit}</span>
                </div>
                {
                    (oldValue != tempVal) && (
                        <div className="flex flex-row gap-1 line-through">
                            <label htmlFor={`old_${signal}_${tempVal != oldValue ? validity : "accurate"}`}></label>
                            <input name={`old_${signal}_${tempVal != oldValue ? validity : "accurate"}`} value={oldValue} onChange={() => { }} disabled className="w-5" />
                            <span className="w-5">{unit}</span>
                        </div>
                    )
                }
            </div>
            <div className="flex w-32 aspect-square">
                <VehicleTireIcon error={tempVal <= 25} />
            </div>
        </div>
    )
}