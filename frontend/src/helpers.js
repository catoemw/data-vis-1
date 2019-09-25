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