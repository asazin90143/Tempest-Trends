import { useState, useEffect, useCallback } from 'react';
import { WeatherResponse } from '../lib/types';

export function useWeather() {
    const [weather, setWeather] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
            if (!res.ok) throw new Error('Failed to fetch weather data');
            const data = await res.json();
            setWeather(data);
        } catch (err: any) {
            setError(err.message || 'Error fetching weather data');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWeatherByQuery = useCallback(async (q: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}`);
            if (!res.ok) throw new Error('Failed to fetch weather data');
            const data = await res.json();
            setWeather(data);
        } catch (err: any) {
            setError(err.message || 'Error fetching weather data');
        } finally {
            setLoading(false);
        }
    }, []);

    return { weather, loading, error, fetchWeatherByCoords, fetchWeatherByQuery };
}
