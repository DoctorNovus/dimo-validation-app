import VehicleIcon from "./VehicleIcon";

export default function VehicleBanner({ theme, vehicle, id, lastSeen }: { theme: "light" | "dark", vehicle: unknown, id: number, lastSeen: string }) {
    return (
        <div className="w-full md:w-1/2 flex flex-row items-center gap-4 border border-red-700/50 shadow-md shadow-red-700 px-4 py-2 md:py-1 rounded-lg">
            <div className="w-20 h-20">
                <VehicleIcon fill={theme == "light" ? "black" : "white"} />
            </div>
            <div className="w-full flex flex-col gap-1 justify-center">
                <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div className="flex flex-row gap-1">
                        <span>{vehicle.data.vehicle.definition.make}</span>
                        <span>{vehicle.data.vehicle.definition.model}</span>
                        <span>{vehicle.data.vehicle.definition.year}</span>
                    </div>
                    <span>ID: {id}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                    <label>Last Synced</label>
                    <span>{lastSeen}</span>
                </div>
            </div>
        </div>
    )
}