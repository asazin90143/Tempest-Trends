import React, { useState } from 'react';
import { Search, CloudLightning } from 'lucide-react';

interface HeaderProps {
    onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setSearchQuery('');
        }
    };

    return (
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-500 rounded-lg">
                    <CloudLightning className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Tempest Trends</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-96 relative">
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
    );
}
