import MapboxMap from "@components/Mapbox/MapboxMap";
import VehicleProperties from "@components/Vehicle/VehicleProperties";

export default function VehicleAdvancedMode({ id, signals, theme }) {
    console.log("Signals");
    console.log(signals);

    return (
        <form className="py-4" onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const data = {
                id
            };

            for (const elem of e.target) {
                if (elem.name.trim() != "")
                    data[elem.name] = elem.value;
            }

            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/data/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        }}>
            <div className="flex flex-col gap-2.5">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 aspect-square rounded-lg">
                        <MapboxMap
                            latitude={signals.currentLocationLatitude.value}
                            longitude={signals.currentLocationLongitude.value}
                            theme={theme}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <VehicleProperties signal={"currentLocationLatitude"} name={signals.currentLocationLatitude.name} value={signals.currentLocationLatitude.value} unit={signals.currentLocationLatitude.unit} />
                        <VehicleProperties signal={"currentLocationLongitude"} name={signals.currentLocationLongitude.name} value={signals.currentLocationLongitude.value} unit={signals.currentLocationLatitude.unit} />
                    </div>
                </div>

                {
                    Object.entries(signals).filter(([name]) => {
                        switch (name) {
                            case "currentLocationLatitude":
                            case "currentLocationLongitude":
                            case "currentLocationAltitude":
                                return false;

                            default:
                                return true;
                        }
                    })
                        .map(([name, value], key) => <VehicleProperties key={key} signal={name} name={value.name} value={value.value} unit={value.unit} />)
                }
            </div>

            <div className="flex flex-row justify-center md:justify-start gap-2">
                <button type="submit" className="w-full md:w-auto px-3 py-2 text-lg bg-gray-500 text-white rounded-lg cursor-pointer my-2">Send Data</button>
                <button type="submit" className="w-full md:w-auto px-3 py-2 text-lg text-gray-500 border-gray-500 dark:text-white border dark:border-white rounded-lg cursor-pointer my-2">Reset Data</button>
            </div>

        </form>
    )
}