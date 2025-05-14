"use client";

import { UnitContext } from "@/_hooks/vehicles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function UnitSelector() {
    const items = [
        { key: "us", label: "US" },
        { key: "uk", label: "UK" },
        { key: "can", label: "Canada" },
        { key: "eu", label: "EU" }
    ];

    const [open, setOpen] = useState(false);

    return (
        <UnitContext.Consumer>
            {({ state, dispatch }) => (
                <div className="flex flex-row items-center gap-1 border border-white/25 rounded-md px-2 py-1 relative" onClick={() => {
                    setOpen(!open);
                }}>
                    <span className="text-lg px-1">{items.find((item) => item.key == state.region)?.label}</span>
                    <ChevronDownIcon className="w-4 h-4" />

                    {open && (
                        <div className="flex flex-col items-center absolute right-0 top-10 bg-black rounded-md px-2 py-1 border border-white/25">
                            {items.map((item, key) => (
                                <div key={key} className="text-lg cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();

                                    dispatch({
                                        type: "regionChange",
                                        region: item.key
                                    });

                                    setOpen(false);
                                }}>{item.label}</div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </UnitContext.Consumer>
    )
}