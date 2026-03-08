"use client"

import React, { useEffect } from 'react';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import { HourlyForecast, DailyForecast } from '../components/ForecastList';
import { useWeather } from '../hooks/useWeather';
import { useFavorites } from '../hooks/useFavorites';
import { CloudLightning } from 'lucide-react';

export default function Home() {
  const { weather, loading, error, fetchWeatherByQuery, fetchWeatherByCoords } = useWeather();
  const { isFavorite, addFavorite, removeFavorite, isLoaded } = useFavorites();

  useEffect(() => {
    // Initial load behavior
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          // Fallback to a default search if geolocation is denied
          fetchWeatherByQuery("San Francisco");
        }
      );
    } else {
      fetchWeatherByQuery("San Francisco");
    }
  }, [fetchWeatherByCoords, fetchWeatherByQuery]);

  const handleSearch = (query: string) => {
    fetchWeatherByQuery(query);
  };

  const handleToggleFavorite = () => {
    if (!weather || !isLoaded) return;
    const cityId = `${weather.city}-${weather.country}`;

    if (isFavorite(weather.city)) {
      removeFavorite(cityId);
    } else {
      addFavorite({
        id: cityId,
        cityName: weather.city,
        countryCode: weather.country,
        lat: 0, // In a real app we'd save coordinates from geocoding
        lon: 0
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <Header onSearch={handleSearch} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <CloudLightning className="w-12 h-12 text-indigo-400 animate-pulse mb-4" />
            <span className="text-slate-400">Loading Weather Data...</span>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center">
            <span className="text-red-400">Failed to load weather data: {error}</span>
          </div>
        ) : weather ? (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN: Current Weather & Hourly */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <CurrentWeather
                weather={weather}
                isFavorite={isFavorite(weather.city)}
                onToggleFavorite={handleToggleFavorite}
              />
              <HourlyForecast weather={weather} />
            </div>

            {/* RIGHT COLUMN: 7-Day Forecast */}
            <DailyForecast weather={weather} />
          </main>
        ) : null}
      </div>
    </div>
  );
}
