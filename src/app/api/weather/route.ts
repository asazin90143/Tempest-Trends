import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q'); // City query
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    let city = "Manila";
    let country = "PH";

    if (q) {
        city = q.charAt(0).toUpperCase() + q.slice(1);
    } else if (lat && lon) {
        try {
            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            if (geoRes.ok) {
                const geoData = await geoRes.json();
                city = geoData.city || geoData.locality || "Your Location";
                country = geoData.countryCode || "PH";
            } else {
                city = "Local Area";
            }
        } catch (e) {
            city = "Local Area";
        }
    }

    // Simple mock data for now, since this is a UI focus first
    const mockWeatherData = {
        city: city,
        country: country,
        current: {
            temp: 88,
            feels_like: 95,
            humidity: 78,
            wind_speed: 8,
            conditions: "Partly Cloudy",
            iconCode: "Clouds", // Using strings so they can be mapped to lucide icons on the client
            high: 92,
            low: 79
        },
        hourly: [
            { time: "Now", temp: 88, iconCode: "Clouds" },
            { time: "1 PM", temp: 90, iconCode: "Clear" },
            { time: "2 PM", temp: 92, iconCode: "Clear" },
            { time: "3 PM", temp: 91, iconCode: "Clear" },
            { time: "4 PM", temp: 89, iconCode: "Clouds" },
            { time: "5 PM", temp: 87, iconCode: "Clouds" },
            { time: "6 PM", temp: 84, iconCode: "Rain" },
            { time: "7 PM", temp: 82, iconCode: "Rain" },
        ],
        daily: [
            { day: "Today", min: 79, max: 92, iconCode: "Clouds", conditions: "Partly Cloudy" },
            { day: "Mon", min: 78, max: 90, iconCode: "Rain", conditions: "Showers" },
            { day: "Tue", min: 77, max: 88, iconCode: "Lightning", conditions: "Thunderstorms" },
            { day: "Wed", min: 78, max: 91, iconCode: "Clear", conditions: "Sunny" },
            { day: "Thu", min: 79, max: 93, iconCode: "Clear", conditions: "Sunny" },
            { day: "Fri", min: 79, max: 92, iconCode: "Clouds", conditions: "Mostly Cloudy" },
            { day: "Sat", min: 78, max: 89, iconCode: "Rain", conditions: "Scattered Showers" },
        ]
    };

    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    if (!API_KEY) {
        // Return mock data if no real API key is provided
        return NextResponse.json(mockWeatherData);
    }

    try {
        // If we have an API key, we fetch the real data. 
        // Usually requires Geocoding + OneCall API.
        // We will just return the mock data for this sample to guarantee the UI works immediately
        // In a real production run here we would add:
        // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?...`)

        return NextResponse.json(mockWeatherData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}
