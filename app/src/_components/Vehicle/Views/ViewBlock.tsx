import { useState } from "react";
import ViewInputBox from "./ViewInputBox";
import MapboxMap from "@/_components/Mapbox/MapboxMap";

export default function ViewBlock({ signal, label, value: tempVal, unit }) {

    const [validity, setValidity] = useState("accurate");
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(tempVal);
    const [unitValidity, setUnitValidity] = useState("km");

    if (unitValidity != unit) {
        setValue(tempVal);
        setUnitValidity(unit);
        setValidity("accurate");
    }

    const cleanUp = (value: number) => {
        if (value.toFixed(2).toString().endsWith(".00"))
            return value.toFixed(0);

        return value.toFixed(2);
    }

    return (
        <div className="flex flex-col w-full aspect-square border shadow-md dark:bg-[#1a1a1a] p-4 rounded-lg justify-between">
            {tempVal != value && <input className="hidden" name={`old_${signal}_${validity}`} value={tempVal} onChange={() => { }} />}
            <input className="hidden" name={`${signal}_${validity}`} value={value} onChange={() => { }} />

            <div>
                <span className="text-xl">{label}</span>
                <div className="flex flex-row gap-0.5 text-gray-500">
                    <span className="flex text-lg gap-1">{cleanUp(value)}{tempVal != value && <span>({cleanUp(tempVal)})</span>}</span>
                    <span className="text-lg">{unit}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setValidity("accurate"); setValue(tempVal) }} className={`${validity == "accurate" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Accurate</button>
                <button type="button" onClick={() => { setValidity("inaccurate"); setEditing(true) }} className={`${validity == "inaccurate" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Inaccurate</button>
                <button type="button" onClick={() => { setValidity("outdated"); setEditing(true) }} className={`${validity == "outdated" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Outdated</button>
                <button type="button" onClick={() => setValidity("skip")} className={`${validity == "skip" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Skip</button>
            </div>

            {((validity == "inaccurate") || (validity == "outdated")) && editing == true && (
                <ViewInputBox signal={signal} validity={validity} setValidity={setValidity} setEditing={setEditing} label={label} value={value} setValue={setValue} unit={unit} />
            )}
        </div>
    )
}