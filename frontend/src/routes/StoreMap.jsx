import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';
import { parseStores } from "../helpers";

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiY2F0b2VtdyIsImEiOiJjaXZ2N3pucjMwMHo5Mm9zMWFhM2l3NTVwIn0.dgZUvupmioJqp1vj9QAMYQ',
});

const StoreMap = () => {
    const [stores, setStores] = useState([])
    const getStores = async () => {
        const request = new Request("http://localhost:12059/react-interview/getLowesStores", {
            method: "GET"
        })
        const response = await fetch(request);
        const stores = await response.json();
        setStores(parseStores(stores));
    }
    useEffect(() => {
        getStores();
    }, [])
    return <Map
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
            height: '100vh',
            width: '100vw',
        }}
        center={[-95.7129, 37.0902]}
        zoom={[3]}
    >
        <Source
            id="store-source"
            geoJsonSource={{
                type: "geojson", data: {
                    type: "FeatureCollection",
                    features: stores
                }
            }}
        />
        <Layer
            sourceId="store-source"
            data={{
                type: "geojson", data: {
                    type: "FeatureCollection",
                    features: stores
                }
            }}
            id="stores"
            type="circle"
        />
    </Map>
}

export default StoreMap;