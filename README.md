# Tempest Trends 🌤️

Tempest Trends is a responsive, high-performance web-based weather application built with Next.js. It delivers accurate current, hourly, and 7-day weather forecasts through a modern, polished dark-mode interface. 

The application emphasizes speed and reduced friction by utilizing local storage to manage favorite cities, removing the need for user account creation.

## 🌟 Features
* **Auto-Location Detection:** Prompts for Geolocation on first load to instantly display local weather.
* **Smart Search:** Search for any city or zip code with built-in debouncing to prevent rate limiting.
* **Comprehensive Dashboard:**
  * Real-time current temperature, "feels like", humidity, and wind speed.
  * 12-hour horizontal scrolling forecast.
  * 7-day extended forecast with dynamic temperature range gradient bars.
* **Favorites (Frictionless Storage):** Save your most visited locations easily. Data is persisted securely in your browser's local storage.
* **Premium UI:** Glassmorphism design system driven by Tailwind CSS and robust components from Shadcn UI.

## 🚀 Tech Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/) & [Lucide React](https://lucide.dev/) (Icons)
* **Data Provider:** [OpenWeatherMap API](https://openweathermap.org/api)

## 🛠️ Getting Started (Local Development)

### Prerequisites
Make sure you have Node.js installed. You will also need a free API key from OpenWeatherMap.

### 1. Clone & Install
Clone the repository and install the dependencies:
```bash
git clone <repository-url>
cd tempest-trends
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```
*(Note: In production, API keys should be handled server-side via Next.js API Routes to ensure security).*

### 3. Run the Development Server
Start the local Next.js server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🗺️ Architecture Overview
* **`/src/app`**: Contains the Next.js pages and API route handlers (Backend-for-Frontend).
* **`/src/components`**: Modular UI building blocks (Header, WeatherDashboard, ForecastList).
* **`/src/hooks`**: Custom React hooks handling business logic (`useWeather`, `useFavorites`).
* **API Route Proxy**: Client requests route through `/api/weather` to securely query OpenWeatherMap without exposing keys to the browser.

## 🚢 Deployment
Tempest Trends is optimized for deployment on Vercel. 
Simply push the code to a Git repository, link it to Vercel, add your `NEXT_PUBLIC_OPENWEATHER_API_KEY` to the environment variables in the Vercel dashboard, and deploy.
