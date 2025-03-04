import { useRef, useEffect } from "react";
import { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import the mapbox-gl styles so that the map is displayed correctly

function MapboxMap({ latitude, longitude, theme }: { latitude: number, longitude: number, theme: string }) {
    const mapNode = useRef(null);

    useEffect(() => {

        const node = mapNode.current;

        if (typeof window === "undefined" || node === null) return;

        const mapboxMap = new Map({
            container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: `mapbox://styles/mapbox/${theme}-v11`,
            center: [longitude, latitude],
            zoom: 15,
        });

        new Marker()
            .setLngLat([longitude, latitude])
            .addTo(mapboxMap);

        return () => {
            mapboxMap.remove();
        };

    }, [theme, longitude, latitude]);

    return <div ref={mapNode} className="w-full h-full rounded-lg" />;
}

export default MapboxMap;