import { useVehicleVIN } from "@/_hooks/vehicles";
import MapboxMap from "@components/Mapbox/MapboxMap";
import VehicleProperties from "@components/Vehicle/VehicleProperties";
import { useState } from "react";
import VehicleDisclaimer from "./VehicleDisclaimer";
import { toast } from "react-toastify";

export default function VehicleAdvancedMode({ id, signals, theme }) {
    const [submitted, setSubmitted] = useState(localStorage.getItem(`submitted-${id}`) ?? false);

    const vin = useVehicleVIN(id);

    return (
        <form className="py-4" onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            setSubmitted(true);
            localStorage.setItem(`submitted-${id}`, "true");

            const data = {
                id,
                email: localStorage.getItem("email"),
                vin: vin.data
            };

            for (const elem of e.target) {
                if (elem.name.trim() != "")
                    data[elem.name] = elem.value;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/data/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {

                const { message } = await res.json();

                toast.error(message);

                setSubmitted(false);

                return null;
            }

            toast("Submission has been sent!");
        }}>
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 aspect-square rounded-lg">
                        {signals?.currentLocationLatitude && signals?.currentLocationLongitude && (
                            <MapboxMap
                                latitude={signals.currentLocationLatitude.value}
                                longitude={signals.currentLocationLongitude.value}
                                theme={theme}
                            />
                        )}
                    </div>
                    {signals?.currentLocationLatitude && signals?.currentLocationLongitude && (
                        <div className="w-full flex flex-col gap-2">
                            <VehicleProperties signal={"currentLocationLatitude"} name={signals.currentLocationLatitude.name} value={signals.currentLocationLatitude.value} unit={signals.currentLocationLatitude.unit} />
                            <VehicleProperties signal={"currentLocationLongitude"} name={signals.currentLocationLongitude.name} value={signals.currentLocationLongitude.value} unit={signals.currentLocationLatitude.unit} />
                        </div>
                    )}
                </div>

                {
                    Object.entries(signals).filter(([name]) => {
                        switch (name) {
                            case "currentLocationLatitude":
                            case "currentLocationLongitude":
                            case "currentLocationAltitude":
                                return false;

                            default:
                                return true;
                        }
                    })
                        .map(([name, value], key) => <VehicleProperties key={key} signal={name} name={value.name} value={value.value} unit={value.unit} />)
                }
            </div>

            <VehicleDisclaimer />

            <div className="flex flex-row justify-center md:justify-start gap-2">
                <button type="submit" disabled={Boolean(submitted)} className="w-full md:w-auto px-3 py-2 text-lg bg-gray-500 text-white disabled:bg-gray-700 disabled:text-gray-500 rounded-lg cursor-pointer disabled:cursor-not-allowed my-2">Send Data</button>
                <button type="submit" disabled={Boolean(submitted)} className="w-full md:w-auto px-3 py-2 text-lg text-gray-500 border-gray-500 dark:text-white border dark:border-white disabled:border-gray-700 disabled:text-gray-500 rounded-lg cursor-pointer disabled:cursor-not-allowed my-2">Reset Data</button>
            </div>

        </form>
    )
}