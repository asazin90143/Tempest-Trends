import React, { useState, useEffect } from 'react';
import {
    Search, MapPin, Star, Wind, Droplets, Sun,
    Cloud, CloudRain, CloudLightning, Thermometer,
    ChevronRight, Sunrise, Sunset
} from 'lucide-react';

// --- MOCK DATA ---
const mockWeatherData = {
    city: "San Francisco",
    country: "US",
    current: {
        temp: 68,
        feels_like: 66,
        humidity: 45,
        wind_speed: 12,
        conditions: "Partly Cloudy",
        icon: Cloud,
        high: 72,
        low: 54
    },
    hourly: [
        { time: "Now", temp: 68, icon: Cloud },
        { time: "1 PM", temp: 70, icon: Sun },
        { time: "2 PM", temp: 72, icon: Sun },
        { time: "3 PM", temp: 71, icon: Sun },
        { time: "4 PM", temp: 68, icon: Cloud },
        { time: "5 PM", temp: 65, icon: Cloud },
        { time: "6 PM", temp: 62, icon: CloudRain },
        { time: "7 PM", temp: 59, icon: CloudRain },
    ],
    daily: [
        { day: "Today", min: 54, max: 72, icon: Cloud, conditions: "Partly Cloudy" },
        { day: "Mon", min: 52, max: 68, icon: CloudRain, conditions: "Showers" },
        { day: "Tue", min: 50, max: 65, icon: CloudLightning, conditions: "Thunderstorms" },
        { day: "Wed", min: 53, max: 70, icon: Sun, conditions: "Sunny" },
        { day: "Thu", min: 55, max: 74, icon: Sun, conditions: "Sunny" },
        { day: "Fri", min: 56, max: 75, icon: Cloud, conditions: "Mostly Cloudy" },
        { day: "Sat", min: 54, max: 71, icon: CloudRain, conditions: "Scattered Showers" },
    ]
};

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [weather, setWeather] = useState(mockWeatherData);

    // Simulate toggling favorites (would write to localStorage in production)
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        // Simulate API fetch for new city
        setWeather({
            ...weather,
            city: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
            current: { ...weather.current, temp: Math.floor(Math.random() * 30) + 50 }
        });
        setSearchQuery('');
        setIsFavorite(false);
    };

    const CurrentIcon = weather.current.icon;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-slate-50 font-sans p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* HEADER & SEARCH */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-500 rounded-lg">
                            <CloudLightning className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Tempest Trends</h1>
                    </div>

                    <form onSubmit={handleSearch} className="w-full md:w-96 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search city or zip code..."
                            className="w-full bg-slate-800/50 border border-slate-700 text-slate-100 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </header>

                {/* MAIN WEATHER DASHBOARD */}
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT COLUMN: Current Weather & Hourly */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Current Weather Card */}
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
                                    onClick={toggleFavorite}
                                    className={`p-3 rounded-full backdrop-blur-md border transition-all ${isFavorite
                                        ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    title="Save to Favorites"
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

                        {/* Hourly Forecast */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold">Today's Forecast</h3>
                                <span className="text-sm text-slate-400">12 Hours</span>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {weather.hourly.map((hour, idx) => {
                                    const Icon = hour.icon;
                                    return (
                                        <div key={idx} className="flex flex-col items-center justify-between min-w-[80px] p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                                            <span className="text-sm text-slate-300">{hour.time}</span>
                                            <Icon className="w-8 h-8 my-3 text-indigo-300" />
                                            <span className="text-xl font-bold">{hour.temp}°</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: 7-Day Forecast */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            7-Day Forecast
                        </h3>

                        <div className="flex flex-col gap-4 flex-grow">
                            {weather.daily.map((day, idx) => {
                                const Icon = day.icon;
                                // Calculate gradient bar width based on min/max temp range
                                const tempRange = 80 - 40; // Max possible - Min possible in our mock
                                const leftPercent = ((day.min - 40) / tempRange) * 100;
                                const widthPercent = ((day.max - day.min) / tempRange) * 100;

                                return (
                                    <div key={idx} className="flex items-center justify-between gap-4">
                                        <span className="w-12 text-slate-300 font-medium">{day.day}</span>
                                        <Icon className="w-6 h-6 text-indigo-400" />

                                        <div className="flex-1 flex items-center gap-3">
                                            <span className="text-sm text-slate-400 w-6 text-right">{day.min}°</span>

                                            {/* Temperature Range Bar */}
                                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                                                <div
                                                    className="absolute h-full rounded-full bg-gradient-to-r from-indigo-500 to-amber-500"
                                                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                                                />
                                            </div>

                                            <span className="text-sm font-semibold w-6">{day.max}°</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <button className="mt-6 w-full py-3 rounded-xl bg-slate-800/50 text-indigo-300 font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            View Extended Forecast <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </main>
            </div>
        </div>
    );
}