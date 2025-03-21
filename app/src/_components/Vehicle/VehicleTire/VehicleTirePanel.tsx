import VehicleTireIcon from "./VehicleTireIcon";

export default function VehicleTirePanel({ value, unit, slot }) {
    return (
        <div className={`flex ${slot % 2 != 0 ? "flex-row" : "flex-row-reverse"} justify-center items-center`}>
            <div className="flex flex-row gap-1">
                <span>{value}</span>
                <span>{unit}</span>
            </div>
            <div className="flex w-32 aspect-square">
                <VehicleTireIcon error={value <= 25} />
            </div>
        </div>
    )
}