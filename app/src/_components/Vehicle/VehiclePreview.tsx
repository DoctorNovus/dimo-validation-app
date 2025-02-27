import VehicleIcon from "./VehicleIcon";

export default function VehiclePreview({ vehicle }) {
    const redirect = () => {
        window.location.href = `/vehicle/${vehicle.tokenId}`;
    }

    return (
        <div className="flex flex-row gap-3 border shadow-md px-4 py-4 items-center rounded-md">
            <div className="flex">
                <div className="w-12 h-12">
                    <VehicleIcon />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-1">
                    <span>{vehicle.definition.make}</span>
                    <span>{vehicle.definition.model}</span>
                    <span>{vehicle.definition.year}</span>
                </div>
                <div>
                    <button className="px-2 bg-red-500 rounded-md" onClick={redirect}>Validate</button>
                </div>
            </div>
        </div>
    )
}