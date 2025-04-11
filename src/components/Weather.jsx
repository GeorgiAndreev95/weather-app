import { useEffect } from "react";
import { useState } from "react";

import { getForecast } from "../services/weatherService";
import classes from "./Weather.module.css";
import HourlyBreakdown from "./HourlyBreakdown";

export default function Weather({
    cityName,
    countryName,
    degreesState,
    error,
}) {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    const hours = [6, 9, 12, 15, 18, 21];

    console.log(cityName);
    useEffect(() => {
        if (!cityName) {
            return;
        }

        const fetchCurrentWeatherData = async () => {
            const response = await getForecast(cityName, countryName);
            console.log(response);

            setCurrentWeatherData(response);
        };

        fetchCurrentWeatherData();
    }, [cityName, countryName]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!currentWeatherData) {
        return (
            <div className={classes.weatherLoader}>
                <div className={classes.sun}></div>
                <div className={classes.cloud}></div>
                <p className={classes.fadingText}>Fetching weather data...</p>
            </div>
        );
    }

    return (
        <main className={classes.mainSection}>
            <div className={classes.currentDaySection}>
                <div className={classes.dataContainer}>
                    <div className={classes.dataContainerName}>
                        <p className={classes.cityName}>
                            {currentWeatherData.location.name}
                        </p>
                        <p>{currentWeatherData.location.country}</p>
                    </div>
                    <div className={classes.dataContainerTemp}>
                        <p>
                            {`${
                                degreesState === "C"
                                    ? `${currentWeatherData.current.temp_c} °C`
                                    : `${currentWeatherData.current.temp_f} °F`
                            }`}
                        </p>
                    </div>
                </div>

                <div className={classes.imgContainer}>
                    <img
                        src={currentWeatherData.current.condition.icon.replace(
                            "64x64",
                            "128x128"
                        )}
                        alt="A picture of the current weather conditions"
                    />
                </div>
            </div>
            <div className={classes.todaysForecast}>
                <h3>Today's Forecast:</h3>
                <div>
                    {hours.map((hour) => (
                        <HourlyBreakdown
                            key={hour}
                            currentWeatherData={currentWeatherData}
                            degreesState={degreesState}
                            hour={hour}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
