import Axios from "axios";

const geocodeBaseUrl = "https://nominatim.openstreetmap.org";
export async function getAddress(lat: number, lng: number) {
    const response = await Axios.get(`${geocodeBaseUrl}/reverse?lat=${lat}&lon=${lng}&format=json`);
    return response.data;
}

export async function getLatLon(search: string) {
    const response = await Axios.get(`${geocodeBaseUrl}/search?q=spain ${search}&format=json`);
    return response.data[0];
}

export function getLocation() {
    return new Promise<Position | null>((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, () => resolve(null));
        } else {
            resolve(null);
        }
    })
}