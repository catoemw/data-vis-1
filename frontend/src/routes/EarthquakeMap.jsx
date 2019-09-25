import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Source, Layer } from 'react-mapbox-gl';
import { parse } from 'papaparse';
import { parseEarthquakes } from "../helpers";

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiY2F0b2VtdyIsImEiOiJjaXZ2N3pucjMwMHo5Mm9zMWFhM2l3NTVwIn0.dgZUvupmioJqp1vj9QAMYQ',
});

const EarthquakeMap = () => {
    const [earthquakes, setEarthquakes] = useState(null)
    const getEarthquakeData = async () => {
        const request = new Request("http://localhost:12059/react-interview/getEarthQuakes", {
            method: "GET"
        })
        const response = await fetch(request);
        const earthquakeData = await response.text();
        setEarthquakes(parseEarthquakes(parse(earthquakeData).data));
    }
    useEffect(() => {
        getEarthquakeData()
    }, []);
    return (
        <Map
            style="mapbox://styles/mapbox/outdoors-v11"
            center={[39.04, 40.38]}
            zoom={[5]}
            containerStyle={{
                height: '100vh',
                width: '100vw',
            }}
        >
            <Source
                id="earthquake-source"
                geoJsonSource={{
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: earthquakes
                    }
                }}
            />
            <Layer
                sourceId="earthquake-source"
                id="earthquakes"
                type="heatmap"
                paint={{
                    "heatmap-weight": [
                        "interpolate",
                        ["linear"],
                        ["get", "richter"],
                        0, 0,
                        6, 1
                    ],
                    "heatmap-intensity": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0, 1,
                        9, 3
                    ],
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0, "rgba(0,0,0,0)",
                        0.2, "#6c91bd",
                        0.4, "#68a886",
                        0.6, "#cee364",
                        0.8, "#e3aa64",
                        1, "#8f3b3b"
                    ],
                    "heatmap-radius": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0, 2,
                        9, 20
                    ]
                }}
            />
        </Map>
    )
}

export default EarthquakeMap;