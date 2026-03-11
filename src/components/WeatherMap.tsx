import React from 'react';

interface WeatherMapProps {
    lat: number;
    lon: number;
}

export default function WeatherMap({ lat, lon }: WeatherMapProps) {
    // We use OpenWeatherMap's map as an iframe directly, matching the exact UI the user wants.
    // Default zoom to 5 for a good view of the Philippines or region.
    const mapUrl = `https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${lat}&lon=${lon}&zoom=5`;

    return (
        <div className="mt-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-slate-200">Weather Map</h2>
            <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-lg relative bg-slate-800">
                <iframe 
                    src={mapUrl}
                    className="w-full h-full border-0 absolute top-0 left-0"
                    title="Interactive Weather Map"
                    loading="lazy"
                />
            </div>
        </div>
    );
}
