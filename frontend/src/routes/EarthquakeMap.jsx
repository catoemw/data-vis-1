import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiY2F0b2VtdyIsImEiOiJjaXZ2N3pucjMwMHo5Mm9zMWFhM2l3NTVwIn0.dgZUvupmioJqp1vj9QAMYQ',
});

const EarthquakeMap = () => {
    return <Map
        style="mapbox://styles/mapbox/outdoors-v11"
        containerStyle={{
            height: '100vh',
            width: '100vw',
        }}
    />
}

export default EarthquakeMap;