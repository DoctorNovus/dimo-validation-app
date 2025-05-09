"use client";

import { UnitContext } from "@/_hooks/vehicles";
import { useQueryClient } from "@tanstack/react-query";

export default function UnitSelector() {
    const id = window.location.href.split("/").pop();

    const queryClient = useQueryClient();

    const invalidate = (unit: string) => {
        queryClient.invalidateQueries({ queryKey: ["vehicle", id, "km"] });
        queryClient.invalidateQueries({ queryKey: ["vehicle", id, "mi"] });
    }

    return (
        <UnitContext.Consumer>
            {({ state, dispatch }) => (
                <div className="flex flex-row gap-1">
                    <span className={`${state.unit == "km" ? "text-red-500" : "text-black dark:text-white"} cursor-pointer`} onClick={() => {
                        dispatch({ type: "setToKM" });
                        invalidate("km");
                    }}>km</span>
                    <span className="text-gray-500">/</span>
                    <span className={`${state.unit == "mi" ? "text-red-500" : "text-black dark:text-white"} cursor-pointer`} onClick={() => {
                        dispatch({ type: "setToMI" });
                        invalidate("mi");
                    }}>mi</span>
                </div>
            )}
        </UnitContext.Consumer>
    )
}