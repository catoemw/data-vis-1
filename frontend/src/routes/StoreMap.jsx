import React, { Fragment, useEffect, useState } from 'react'
import ReactMapboxGl, { Layer, Source } from 'react-mapbox-gl';
import { parseStores } from "../helpers";
import { Paper, Typography } from "@material-ui/core";

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiY2F0b2VtdyIsImEiOiJjaXZ2N3pucjMwMHo5Mm9zMWFhM2l3NTVwIn0.dgZUvupmioJqp1vj9QAMYQ',
});

const StoreMap = () => {
    const [stores, setStores] = useState([])
    const [map, setMap] = useState(null);
    const [center, setCenter] = useState([-95.7129, 37.0902])
    const [zoom, setZoom] = useState(3);
    const [focused, setFocused] = useState(null);
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
    }, []);
    useEffect(() => {
        if (map) {
            map.on("mouseover", 'stores', e => {
                const store = e.features[0];
                setFocused(store);
            });
            map.on("mouseleave", "stores", e => {
                setFocused(null);
            })
        }
    }, [map])
    const handleZoom = map => {
        setZoom(map.getZoom());;
    }
    const handleDragEnd = map => {
        setCenter(map.getCenter())
    }

    return (
        <Fragment>
            <Map
                style="mapbox://styles/mapbox/streets-v11"
                containerStyle={{
                    height: '100vh',
                    width: '100vw',
                }}
                center={center}
                zoom={[zoom]}
                onZoomEnd={handleZoom}
                onDragEnd={handleDragEnd}
                onStyleLoad={mapRef => setMap(mapRef)}
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
                    paint={{ "circle-color": "#00A", "circle-stroke-width": 2, "circle-stroke-color": "#FFF" }}
                />
            </Map>
            <div style={{ position: "absolute", bottom: 24, width: "100%" }}>
                <Paper style={{
                    height: "fit-content",
                    width: "fit-content",
                    padding: focused ? 16 : 0,
                    margin: "0 auto"
                }}>
                    {focused && <Typography variant="h6">{focused.properties.name} </Typography>}
                </Paper>
            </div>
        </Fragment>
    )
}

export default StoreMap;