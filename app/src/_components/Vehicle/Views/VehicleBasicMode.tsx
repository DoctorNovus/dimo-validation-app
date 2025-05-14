import MapboxMapSelector from "@/_components/Mapbox/MapboxSelector";
import VehicleTireInfo from "../VehicleTire/VehicleTireInfo";
import ViewBlock from "./ViewBlock";
import { useState } from "react";
import { toast } from "react-toastify";
import { useVehicleVIN } from "@/_hooks/vehicles";
import VehicleDisclaimer from "./VehicleDisclaimer";

export default function VehicleBasicMode({ id, signals, theme }) {

    const [submitted, setSubmitted] = useState(localStorage.getItem(`submitted-${id}`) ?? false);
    const [ready, setReady] = useState(false);

    const vin = useVehicleVIN(id);

    const ApplyBasicFilter = ([signal, data]) => {

        if (!data.value)
            return null;

        if (signal == "lastSeen")
            return null;

        switch (signal) {
            // Location
            case "currentLocationApproximateLongitude":
            case "currentLocationApproximateLatitude":
            case "currentLocationLatitude":
            case "currentLocationLongitude":
                return null;

            // Tire Values
            case "chassisAxleRow1WheelLeftSpeed":
            case "chassisAxleRow1WheelLeftTirePressure":
            case "chassisAxleRow1WheelRightSpeed":
            case "chassisAxleRow1WheelRightTirePressure":
            case "chassisAxleRow2WheelLeftTirePressure":
            case "chassisAxleRow2WheelRightTirePressure":
                return null;

            // Battery Level (Voltage)
            case "lowVoltageBatteryCurrentVoltage":

            // Fuel Type
            case "powertrainFuelSystemSupportedFuelTypes":

            // Fuel Level / State of Charge (EV Battery Level)
            case "powertrainFuelSystemRelativeLevel":
            case "powertrainTractionBatteryStateOfChargeCurrent":

            // Odometer
            case "powertrainTransmissionTravelledDistance":

            // PSI
            case "chassisAxleRow1WheelLeftTirePressure":
            case "chassisAxleRow1WheelRightTirePressure":
            case "chassisAxleRow2WheelLeftTirePressure":
            case "chassisAxleRow2WheelRightTirePressure":

            // Powertrain Type
            case "powertrainType":
                return [signal, data];

        }

        return null;
    }

    const filteredSignals = Object.entries(signals).filter(ApplyBasicFilter);

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
                if (elem.nodeName == "INPUT") {
                    if (elem.name.trim() != "") {
                        data[elem.name] = elem.value;
                    }
                }
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
            <div className="flex flex-col gap-4 pb-2">
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-2">
                    <MapboxMapSelector theme={theme} latitude={signals.currentLocationLatitude.value} longitude={signals.currentLocationLongitude.value} />
                    <VehicleTireInfo signals={signals} />

                    {filteredSignals.map(([signal, data], key) => (
                        <ViewBlock key={key} signal={signal} label={data.name} value={typeof data.value?.value != "undefined" ? data.value.value : data.value} unit={data.unit} />
                    ))}
                </div>
            </div>

            <VehicleDisclaimer ready={ready} setReady={setReady} />

            <div className="flex flex-row justify-center md:justify-start gap-2">
                <button type="submit" disabled={!ready || Boolean(submitted)} className="w-full md:w-auto px-3 py-2 text-lg bg-gray-500 text-white disabled:bg-gray-200 disabled:text-gray-300 disabled:dark:bg-gray-700 disabled:dark:text-gray-500 rounded-lg cursor-pointer disabled:cursor-not-allowed my-2">Send Data</button>
                <button type="reset" disabled={!ready || Boolean(submitted)} className="w-full md:w-auto px-3 py-2 text-lg text-gray-500 border-gray-500 dark:text-white border dark:border-white disabled:border-gray-200 disabled:text-gray-300 disabled:dark:border-gray-700 disabled:dark:text-gray-500 rounded-lg cursor-pointer disabled:cursor-not-allowed my-2">Reset Data</button>
            </div>

            {submitted && (
                <span className="text-sm"><em>You have already submitted data for this car.</em></span>
            )}

        </form>
    )
}