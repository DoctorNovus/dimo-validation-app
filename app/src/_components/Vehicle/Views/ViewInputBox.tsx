import { useState } from "react";

export default function ViewInputBox({ label, value, setValue, unit, validity, setValidity, setEditing }) {

    const [data, setData] = useState(value);

    return (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black/20 flex items-center justify-center px-8 md:px-0 z-50">
            <div className="w-full md:w-1/2 md:h-48 bg-white dark:bg-[#2f2f2f] rounded-md px-4 py-2">
                <div className="text-xl my-2 text-gray-500">{label} Validation ({validity})</div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2 flex flex-col gap-1">
                        <span className="text-lg text-black dark:text-white">Detected Value</span>

                        <span className="text-gray-500/30 border-b border-black/30 dark:border-white/30">{value}<span>{unit}</span></span>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col gap-1">
                        <span className="text-lg text-black dark:text-white">Accurate Value</span>

                        <div className="text-gray-500 w-full border-b border-black text:border-white">
                            <input type="number" value={data} onChange={(e) => setData(parseFloat(e.target.value))} className="w-full outline-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-2 my-4">
                    <button type="button" className="bg-black dark:bg-white px-2 py-1 text-white dark:text-black rounded-md cursor-pointer text-lg md:text-base" onClick={() => { setEditing(false); setValue(data) }}>Save</button>
                    <button type="button" className="border border-black dark:border-white px-2 py-1 text-black dark:text-white rounded-md cursor-pointer text-lg md:text-base" onClick={() => { setValidity("accurate"); setEditing(false); }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}