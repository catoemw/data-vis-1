export const parseStores = stores => {
    const newStores = stores.map(store => {
        const { name, number, geometry } = store;
        const { lng, lat } = geometry.location
        return {
            properties: { name, number },
            geometry: {
                type: "Point",
                coordinates: [lng, lat]
            }
        }
    })
    return newStores;
}

export const parseEarthquakes = earthquakes => {
    const keys = earthquakes[0];
    const rows = earthquakes.slice(1);
    const newQuakes = rows.map(row => {
        const data = { properties: {}, geometry: { type: "Point" } }
        row.forEach((value, index) => {
            const key = keys[index]
            data.properties[key] = isNaN(value) ? value : Number(value)
        });
        data.geometry.coordinates = [data.properties.lat, data.properties.long]
        return data;
    })
    return newQuakes;
}