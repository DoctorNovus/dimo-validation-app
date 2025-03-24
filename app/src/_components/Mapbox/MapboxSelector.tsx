import { Map, Marker } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export default function MapboxMapSelector({ latitude, longitude, theme }) {

    const mapNode = useRef(null);

    const [lat, setLat] = useState(latitude);
    const [long, setLong] = useState(longitude);

    useEffect(() => {
        const mapboxMap = new Map({
            container: mapNode.current,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: `mapbox://styles/mapbox/${theme}-v11`,
            center: [long, lat],
            zoom: 16,
            interactive: true
        });

        const marker = new Marker({
            draggable: true
        });

        marker.setLngLat([long, lat]);
        marker.addTo(mapboxMap);

        marker.on("dragend", ({ target: { _lngLat: { lat, lng } } }) => {
            setLat(lat);
            setLong(lng);
        });

    }, [mapNode, latitude, longitude, lat, long, theme]);

    const longValidity = long == longitude ? "accurate" : "inaccurate";
    const latValidity = lat == latitude ? "accurate" : "inaccurate";

    const longSignal = `currentLocationLongitude_${longValidity}`;
    const latSignal = `currentLocationLatitude_${latValidity}`;

    return (
        <div className="col-span-2 row-span-2 flex w-full h-full border shadow-md dark:bg-[#1a1a1a] p-1 rounded-lg justify-center aspect-square">
            <div className="hidden">
                <div>
                    <label htmlFor={longSignal}></label>
                    <input name={longSignal} value={long} onChange={() => { }} />

                    {
                        longValidity == "inaccurate" && (
                            <div>
                                <label htmlFor={`old_${longSignal}`}></label>
                                <input name={`old_${longSignal}`} value={longitude} onChange={() => { }} />
                            </div>
                        )
                    }
                </div>

                <div>
                    <label htmlFor={latSignal}></label>
                    <input name={latSignal} value={long} onChange={() => { }} />

                    {
                        latValidity == "inaccurate" && (
                            <div>
                                <label htmlFor={`old_${latSignal}`}></label>
                                <input name={`old_${latSignal}`} value={latitude} onChange={() => { }} />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="w-full h-full">
                <div ref={mapNode} className="w-full h-full"></div>
            </div>
        </div>
    )
}