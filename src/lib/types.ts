export interface WeatherResponse {
    city: string;
    country: string;
    current: {
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        conditions: string;
        icon: any; // We'll map string iconCodes to lucide React components on the frontend
        iconCode?: string;
        high: number;
        low: number;
    };
    hourly: {
        time: string;
        temp: number;
        icon: any;
        iconCode?: string;
    }[];
    daily: {
        day: string;
        min: number;
        max: number;
        icon: any;
        iconCode?: string;
        conditions: string;
    }[];
}

export type FavoriteCity = {
    id: string;
    cityName: string;
    countryCode: string;
    lat: number;
    lon: number;
};
