import VehicleTirePanel from "./VehicleTirePanel";

export default function VehicleTireInfo({ signals }) {

    if (!signals.chassisAxleRow1WheelLeftTirePressure.value)
        return (
            <></>
        );

    return (
        <div className="col-span-2 row-span-2 flex flex-col w-full h-full border shadow-md dark:bg-[#1a1a1a] p-4 rounded-lg justify-center gap-4">
            <span className="text-xl my-2 text-center">Vehicle Tire Info</span>
            <div className="grid grid-cols-2 justify-center items-center">
                <VehicleTirePanel value={signals.chassisAxleRow1WheelLeftTirePressure.value} unit={signals.chassisAxleRow1WheelLeftTirePressure.unit} slot={1} />
                <VehicleTirePanel value={signals.chassisAxleRow1WheelRightTirePressure.value} unit={signals.chassisAxleRow1WheelRightTirePressure.unit} slot={2} />
                <VehicleTirePanel value={signals.chassisAxleRow2WheelLeftTirePressure.value} unit={signals.chassisAxleRow2WheelLeftTirePressure.unit} slot={3} />
                <VehicleTirePanel value={signals.chassisAxleRow2WheelRightTirePressure.value} unit={signals.chassisAxleRow2WheelRightTirePressure.unit} slot={4} />
            </div>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col items-start">
                    <span className="text-lg">Left Speed</span>
                    <span>{signals.chassisAxleRow1WheelLeftSpeed.value} {signals.chassisAxleRow1WheelLeftSpeed.unit}</span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-lg">Right Speed</span>
                    <span>{signals.chassisAxleRow1WheelRightSpeed.value} {signals.chassisAxleRow1WheelRightSpeed.unit}</span>
                </div>
            </div>
        </div>
    )
}