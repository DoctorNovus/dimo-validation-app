"use client";

import { UnitContext } from "@/_hooks/vehicles";

export default function UnitSelector() {
    return (
        <UnitContext.Consumer>
            {({ state, dispatch }) => (
                <div className="flex flex-row gap-1">
                    <select onChange={(e) => {
                        dispatch({
                            type: "regionChange",
                            region: e.target.value
                        });
                    }} value={state.region}>
                        <option value="us">US</option>
                        <option value="uk">UK</option>
                        <option value="can">Canada</option>
                        <option value="eu">EU</option>
                    </select>
                </div>
            )}
        </UnitContext.Consumer>
    )
}