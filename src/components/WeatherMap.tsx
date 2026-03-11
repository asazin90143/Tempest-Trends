"use client";

import React, { useState } from 'react';
import { Map } from 'lucide-react';

type Layer = 'temperature' | 'precipitation' | 'clouds' | 'windspeed' | 'pressure';

export default function WeatherMap({ lat = 14.5995, lon = 120.9842 }: { lat?: number; lon?: number }) {
    const [layer, setLayer] = useState<Layer>('temperature');

    const tabs: { id: Layer; label: string }[] = [
        { id: 'temperature', label: 'Temperature' },
        { id: 'precipitation', label: 'Precipitation' },
        { id: 'clouds', label: 'Clouds' },
        { id: 'windspeed', label: 'Wind' },
        { id: 'pressure', label: 'Pressure' },
    ];

    return (
        <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-sky-400 mb-4 flex items-center gap-2">
                <Map className="w-6 h-6" /> Weather Map
            </h2>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                <div className="flex bg-slate-800/80 p-3 gap-2 overflow-x-auto border-b border-white/10 scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setLayer(tab.id)}
                            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                layer === tab.id
                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 transform scale-[1.02]'
                                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                
                <div className="w-full h-[500px] md:h-[600px] relative bg-slate-900 border-t border-sky-500/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-sky-500/30 border-t-sky-500 rounded-full animate-spin" />
                    </div>
                    <iframe 
                        // Adding key to force iframe reload when layer changes
                        key={layer}
                        src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=${layer}&lat=${lat}&lon=${lon}&zoom=5`}
                        className="absolute inset-0 w-full h-full border-0 z-10"
                        title="Interactive Weather Map"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
