import { useVehicleVIN } from "@/_hooks/vehicles";
import VehicleIcon from "./VehicleIcon";

export default function VehicleBanner({ theme, vehicle, id, lastSeen }: { theme: "light" | "dark", vehicle: unknown, id: number, lastSeen: string }) {

    const vin = useVehicleVIN(id);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1 text-xl">
                <span>{vehicle.data.vehicle.make}</span>
                <span>{vehicle.data.vehicle.model}</span>
                <span>{vehicle.data.vehicle.year}</span>
            </div>

            <div className="flex flex-row gap-3 items-center">

                <div className="w-16 h-16">
                    <VehicleIcon id={id} fill={theme == "light" ? "black" : "white"} />
                </div>

                <div className="flex flex-col gap-1 justify-center">
                    <span className="flex flex-row gap-1">ID: <span className="text-gray-500">{id}</span></span>
                    {vin.isSuccess && (
                        <span className="flex flex-row gap-1">
                            VIN:
                            <input name="vin" value={vin.data} onChange={() => { }} contentEditable={false} className="text-gray-500 outline-none" />
                        </span>
                    )}
                    <span className="flex flex-col md:flex-row gap-1">Last Seen: <span className="text-gray-500">{lastSeen}</span></span>
                </div>

            </div>
        </div>
    )

}