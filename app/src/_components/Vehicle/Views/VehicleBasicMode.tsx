import ViewBlock from "./ViewBlock";

export default function VehicleBasicMode({ id, signals }) {

    const ApplyBasicFilter = ([signal, data]) => {
        // if (!data.value) return null;

        switch (signal) {
            case "lastSeen":
            case "currentLocationAltitude":
            case "currentLocationLatitude":
            case "currentLocationLongitude":
            case "obdDistanceWithMIL":
            case "powertrainCombustionEngineTPS":
            case "powertrainFuelSystemAbsoluteLevel":
            case "angularVelocityYaw":
            case "chassisAxleRow1WheelLeftSpeed":
            case "chassisAxleRow1WheelLeftTirePressure":
            case "chassisAxleRow1WheelRightSpeed":
            case "chassisAxleRow1WheelRightTirePressure":
            case "chassisAxleRow2WheelLeftTirePressure":
            case "chassisAxleRow2WheelRightTirePressure":
            case "currentLocationHeading":
            case "currentLocationIsRedacted":
            case "obdBarometricPressure":
            case "obdCommandedEGR":
            case "obdCommandedEVAP":
            case "obdDTCList":
            case "obdDistanceSinceDTCClear":
            case "obdEngineLoad":
            case "obdFuelPressure":
            case "obdIntakeTemp":
            case "obdLongTermFuelTrim1":
            case "obdMAP":
            case "obdO2WRSensor1Voltage":
            case "obdO2WRSensor2Voltage":
            case "obdRunTime":
            case "obdShortTermFuelTrim1":
            case "obdWarmupsSinceDTCClear":
            case "powertrainCombustionEngineMAF":
            case "serviceDistanceToService":
                return null;
        }

        return [signal, data];
    }

    const filteredSignals = Object.entries(signals).filter(ApplyBasicFilter);

    return (
        <form className="py-4" onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const data = {
                id
            };

            for (const elem of e.target) {
                if (elem.nodeName == "INPUT") {
                    if (elem.name.trim() != ""){
                        data[elem.name] = elem.value;
                    }
                }
            }

            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/data/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }}>
            <div className="flex flex-col gap-4">
                {/* <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 aspect-square rounded-lg">
                        <MapboxMap
                            latitude={signals.currentLocationLatitude.value.value}
                            longitude={signals.currentLocationLongitude.value.value}
                            theme={theme}
                        />
                    </div>
                </div> */}

                <div className="grid grid-cols-3 gap-2">
                    {filteredSignals.map(([signal, data], key) => (
                        data.value && (
                            <ViewBlock key={key} signal={signal} label={data.name} value={typeof data.value?.value != "undefined" ? data.value.value : data.value} unit={data.unit} />
                        )
                    ))}
                </div>
            </div>

            <div className="flex flex-row justify-center md:justify-start gap-2">
                <button type="submit" className="w-full md:w-auto px-3 py-2 text-lg bg-gray-500 text-white rounded-lg cursor-pointer my-2">Send Data</button>
                <button type="reset" className="w-full md:w-auto px-3 py-2 text-lg text-gray-500 border-gray-500 dark:text-white border dark:border-white rounded-lg cursor-pointer my-2">Reset Data</button>
            </div>

        </form>
    )
}