import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q'); // City query
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    // Simple mock data for now, since this is a UI focus first
    const mockWeatherData = {
        city: q ? q.charAt(0).toUpperCase() + q.slice(1) : "San Francisco",
        country: "US",
        current: {
            temp: 68,
            feels_like: 66,
            humidity: 45,
            wind_speed: 12,
            conditions: "Partly Cloudy",
            iconCode: "Clouds", // Using strings so they can be mapped to lucide icons on the client
            high: 72,
            low: 54
        },
        hourly: [
            { time: "Now", temp: 68, iconCode: "Clouds" },
            { time: "1 PM", temp: 70, iconCode: "Clear" },
            { time: "2 PM", temp: 72, iconCode: "Clear" },
            { time: "3 PM", temp: 71, iconCode: "Clear" },
            { time: "4 PM", temp: 68, iconCode: "Clouds" },
            { time: "5 PM", temp: 65, iconCode: "Clouds" },
            { time: "6 PM", temp: 62, iconCode: "Rain" },
            { time: "7 PM", temp: 59, iconCode: "Rain" },
        ],
        daily: [
            { day: "Today", min: 54, max: 72, iconCode: "Clouds", conditions: "Partly Cloudy" },
            { day: "Mon", min: 52, max: 68, iconCode: "Rain", conditions: "Showers" },
            { day: "Tue", min: 50, max: 65, iconCode: "Lightning", conditions: "Thunderstorms" },
            { day: "Wed", min: 53, max: 70, iconCode: "Clear", conditions: "Sunny" },
            { day: "Thu", min: 55, max: 74, iconCode: "Clear", conditions: "Sunny" },
            { day: "Fri", min: 56, max: 75, iconCode: "Clouds", conditions: "Mostly Cloudy" },
            { day: "Sat", min: 54, max: 71, iconCode: "Rain", conditions: "Scattered Showers" },
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
