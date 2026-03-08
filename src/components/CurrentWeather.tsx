import React from 'react';
import { MapPin, Star, Thermometer, Wind, Droplets, Sun } from 'lucide-react';
import { WeatherResponse } from '../lib/types';
import { getWeatherIcon } from '../lib/iconMapper';

interface CurrentWeatherProps {
    weather: WeatherResponse;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export default function CurrentWeather({ weather, isFavorite, onToggleFavorite }: CurrentWeatherProps) {
    const CurrentIcon = getWeatherIcon(weather.current.iconCode);

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <CurrentIcon className="w-64 h-64" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-slate-300 mb-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg font-medium">{weather.city}, {weather.country}</span>
                    </div>
                    <div className="text-7xl font-bold tracking-tighter mb-4">
                        {weather.current.temp}°
                    </div>
                    <div className="text-2xl font-medium text-slate-200 flex items-center gap-3">
                        <CurrentIcon className="w-8 h-8 text-indigo-400" />
                        {weather.current.conditions}
                    </div>
                </div>

                <button
                    onClick={onToggleFavorite}
                    className={`p-3 rounded-full backdrop-blur-md border transition-all ${isFavorite
                        ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    title={isFavorite ? "Remove from Favorites" : "Save to Favorites"}
                >
                    <Star className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
            </div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-6 border-t border-white/10">
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Thermometer className="w-4 h-4" /> Feels Like</span>
                    <span className="text-lg font-semibold">{weather.current.feels_like}°</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Wind className="w-4 h-4" /> Wind</span>
                    <span className="text-lg font-semibold">{weather.current.wind_speed} mph</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Droplets className="w-4 h-4" /> Humidity</span>
                    <span className="text-lg font-semibold">{weather.current.humidity}%</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Sun className="w-4 h-4" /> High / Low</span>
                    <span className="text-lg font-semibold">{weather.current.high}° / {weather.current.low}°</span>
                </div>
            </div>
        </div>
    );
}
