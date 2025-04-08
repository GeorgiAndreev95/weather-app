import { useEffect } from "react";
import { useState } from "react";
import { getCurrentWeather } from "../services/weatherService";

export default function Weather() {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    useEffect(() => {
        const fetchCurrentWeatherData = async () => {
            const response = await getCurrentWeather();
            console.log(response);

            setCurrentWeatherData(response);
        };

        fetchCurrentWeatherData();
    }, []);

    if (!currentWeatherData) {
        return <p>Fetching weather data...</p>;
    }

    return (
        <div>
            <p>{currentWeatherData.location.country}</p>
            <p>{currentWeatherData.location.name}</p>
            <p>{currentWeatherData.current.name}</p>
        </div>
    );
}
