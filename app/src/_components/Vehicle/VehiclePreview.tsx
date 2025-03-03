import VehicleIcon from "./VehicleIcon";

export default function VehiclePreview({ vehicle, disabled }) {
    const redirect = () => {
        window.location.href = `/vehicle/${vehicle.tokenId}`;
    }

    if (disabled) {
        return (
            <div className={`flex flex-row gap-3 border shadow-md px-4 py-4 items-center rounded-md disabled`}>
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
                        <button className="px-2 bg-gray-500 rounded-md">Not Shared</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-row gap-3 border shadow-md px-4 py-4 items-center rounded-md disabled`}>
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
                    <button className="px-2 bg-red-500 rounded-md cursor-pointer" onClick={redirect}>Validate</button>
                </div>
            </div>
        </div>
    )
}