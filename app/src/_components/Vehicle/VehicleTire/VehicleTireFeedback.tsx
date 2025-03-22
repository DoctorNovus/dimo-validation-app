import { useState } from "react";
import VehicleTirePanel from "./VehicleTirePanel";

export default function VehicleTireFeedback({ signals, values, setValues, validity, setValidity }) {

    const [editing, setEditing] = useState(false);

    const changeValues = (newValue) => {
        setValues({
            ...values,
            ...newValue
        });
    }

    if (editing) {
        return (
            <div className="w-screen h-screen absolute top-0 left-0 bg-black/20 flex items-center justify-center">
                <div className="flex flex-col w-2/3 h-auto bg-white dark:bg-[#2f2f2f] rounded-md px-4 py-4 gap-4">
                    <div className="w-full flex justify-center">
                        <span className="text-xl text-center">Tire Info Validation</span>
                    </div>

                    <div className="grid grid-cols-2 justify-center items-center">
                        <VehicleTirePanel editing={true} onChange={(val: number) => { if (val < 99) { changeValues({ left: { ...values.left, value: val } }) } }} oldValue={signals.chassisAxleRow1WheelLeftTirePressure.value} value={values.left.value} unit={values.left.unit} slot={1} />
                        <VehicleTirePanel editing={true} onChange={(val: number) => { if (val < 99) { changeValues({ right: { ...values.right, value: val } }) } }} oldValue={signals.chassisAxleRow1WheelLeftTirePressure.value} value={values.right.value} unit={values.right.unit} slot={2} />
                        <VehicleTirePanel editing={true} onChange={(val: number) => { if (val < 99) { changeValues({ rearLeft: { ...values.rearLeft, value: val } }) } }} oldValue={signals.chassisAxleRow1WheelLeftTirePressure.value} value={values.rearLeft.value} unit={values.rearLeft.unit} slot={3} />
                        <VehicleTirePanel editing={true} onChange={(val: number) => { if (val < 99) { changeValues({ rearRight: { ...values.rearRight, value: val } }) } }} oldValue={signals.chassisAxleRow1WheelLeftTirePressure.value} value={values.rearRight.value} unit={values.rearRight.unit} slot={4} />
                    </div>

                    <div className="w-full flex justify-center">
                        <button className="px-2 py-2 bg-white text-black rounded-md" onClick={() => setEditing(false)}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => { setValidity("accurate"); }} className={`${validity == "accurate" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Accurate</button>
            <button type="button" onClick={() => { setValidity("inaccurate"); setEditing(true) }} className={`${validity == "inaccurate" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Inaccurate</button>
            <button type="button" onClick={() => { setValidity("outdated"); setEditing(true) }} className={`${validity == "outdated" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Outdated</button>
            <button type="button" onClick={() => setValidity("skip")} className={`${validity == "skip" ? "bg-black text-white dark:bg-white dark:text-black" : "text-black border border-black dark:text-white dark:border-white"} w-full rounded-md text-lg`}>Skip</button>
        </div>
    );
}