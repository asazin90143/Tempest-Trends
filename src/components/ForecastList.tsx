import React from 'react';
import { ChevronRight } from 'lucide-react';
import { WeatherResponse } from '../lib/types';
import { getWeatherIcon } from '../lib/iconMapper';

interface ForecastListProps {
    weather: WeatherResponse;
}

export function HourlyForecast({ weather }: ForecastListProps) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Today's Forecast</h3>
                <span className="text-sm text-slate-400">12 Hours</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {weather.hourly.map((hour, idx) => {
                    const Icon = getWeatherIcon(hour.iconCode);
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
    );
}

export function DailyForecast({ weather }: ForecastListProps) {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                7-Day Forecast
            </h3>

            <div className="flex flex-col gap-4 flex-grow">
                {weather.daily.map((day, idx) => {
                    const Icon = getWeatherIcon(day.iconCode);
                    // Calculate gradient bar width based on min/max temp range
                    // In a real app we would compute the absolute min/max across all 7 days for the scaling
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
    );
}
