"use client";

import { UnitContext } from "@/_hooks/vehicles";
import { useReducer } from "react";

import NavBar from "./NavBar";
import NavSidebar from "./NavSidebar";

const reducer = (state, action) => {
    switch (action.type) {
        case "regionChange":
            localStorage.setItem("region", action.region);
            return { region: action.region };
    }
};

export default function NavWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, { region: localStorage.getItem("region") || "eu" });

    const value = { state, dispatch };

    return (
        <UnitContext.Provider value={value}>
            <div className="w-full h-full">

                <NavBar />

                <div className="w-full h-full flex flex-col md:flex-row">
                    <NavSidebar />
                    <div className="w-full h-screen p-4 overflow-x-hidden overflow-y-scroll pb-20 [&::-webkit-scrollbar]:hidden">
                        {children}
                    </div>
                </div>
            </div>
        </UnitContext.Provider>
    )

}