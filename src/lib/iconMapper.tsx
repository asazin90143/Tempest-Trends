import {
    Cloud,
    CloudRain,
    CloudLightning,
    Sun,
    Moon,
    Snowflake,
    Wind
} from 'lucide-react';

export const getWeatherIcon = (code: string | undefined) => {
    switch (code?.toLowerCase()) {
        case 'rain':
        case 'showers':
            return CloudRain;
        case 'lightning':
        case 'thunderstorms':
            return CloudLightning;
        case 'clear':
        case 'sunny':
            return Sun;
        case 'snow':
            return Snowflake;
        case 'wind':
            return Wind;
        case 'clouds':
        case 'mostly cloudy':
        case 'partly cloudy':
        default:
            return Cloud;
    }
}
