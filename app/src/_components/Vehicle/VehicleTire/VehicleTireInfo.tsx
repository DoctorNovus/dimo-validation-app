import { useState } from "react";
import VehicleTireFeedback from "./VehicleTireFeedback";
import VehicleTirePanel from "./VehicleTirePanel";

export default function VehicleTireInfo({ signals }) {

    const [validity, setValidity] = useState("accurate");
    const [values, setValues] = useState({
        left: signals.chassisAxleRow1WheelLeftTirePressure,
        right: signals.chassisAxleRow1WheelRightTirePressure,
        rearLeft: signals.chassisAxleRow2WheelLeftTirePressure,
        rearRight: signals.chassisAxleRow2WheelRightTirePressure,
        leftSpeed: signals.chassisAxleRow1WheelLeftSpeed,
        rightSpeed: signals.chassisAxleRow1WheelRightSpeed
    });

    if (signals?.chassisAxleRow1WheelLeftTirePressure?.value == null) {
        return null;
    }

    return (
        <div className="col-span-2 row-span-2 flex flex-col w-full h-full border shadow-md dark:bg-[#1a1a1a] p-4 rounded-lg justify-center gap-4">
            <span className="text-xl my-2 text-center">Vehicle Tire Info</span>
            {signals.chassisAxleRow1WheelLeftTirePressure && signals.chassisAxleRow1WheelRightTirePressure && signals.chassisAxleRow2WheelLeftTirePressure && signals.chassisAxleRow2WheelRightTirePressure && (
                <div className="grid grid-cols-2 justify-center items-center">
                    <VehicleTirePanel validity={validity} signal="chassisAxleRow1WheelLeftTirePressure" oldValue={signals.chassisAxleRow1WheelLeftTirePressure.value} value={values.left.value} unit={values.left.unit} slot={1} />
                    <VehicleTirePanel validity={validity} signal="chassisAxleRow1WheelRightTirePressure" oldValue={signals.chassisAxleRow1WheelRightTirePressure.value} value={values.right.value} unit={values.right.unit} slot={2} />
                    <VehicleTirePanel validity={validity} signal="chassisAxleRow2WheelLeftTirePressure" oldValue={signals.chassisAxleRow2WheelLeftTirePressure.value} value={values.rearLeft.value} unit={values.rearLeft.unit} slot={3} />
                    <VehicleTirePanel validity={validity} signal="chassisAxleRow2WheelRightTirePressure" oldValue={signals.chassisAxleRow2WheelRightTirePressure.value} value={values.rearRight.value} unit={values.rearRight.unit} slot={4} />
                </div>
            )}

            <div className="flex flex-row justify-evenly">
                {values.leftSpeed && (
                    <div className="flex flex-col items-start">
                        <span className="text-lg">Left Speed</span>
                        <span>{values.leftSpeed.value} {values.leftSpeed.unit}</span>
                    </div>
                )}

                {values.rightSpeed && (
                    <div className="flex flex-col items-end">
                        <span className="text-lg">Right Speed</span>
                        <span>{values.rightSpeed.value} {values.rightSpeed.unit}</span>
                    </div>
                )}

            </div>
            <VehicleTireFeedback signals={signals} values={values} setValues={setValues} validity={validity} setValidity={setValidity} />
        </div>
    )
}