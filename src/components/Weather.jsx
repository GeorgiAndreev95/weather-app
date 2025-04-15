import { useEffect } from "react";
import { useState } from "react";

import { getForecast } from "../services/weatherService";
import classes from "./Weather.module.css";
import thermometerImg from "../assets/thermometer.png";
import waterDropImg from "../assets/water-drop.png";
import windImg from "../assets/wind.png";
import sunImg from "../assets/sun-icon.png";
import HourlyBreakdown from "./HourlyBreakdown";

export default function Weather({
    cityName,
    countryName,
    degreesState,
    error,
}) {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    const hours = [6, 9, 12, 15, 18, 21];

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
                <h3>Today's Forecast</h3>
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

            <div className={classes.airConditions}>
                <div className={classes.airConditionsTitle}>
                    <h3>Air Conditions</h3>
                    <button type="button">See more</button>
                </div>
                <div className={classes.airConditionsInfo}>
                    <div className={classes.airConditionsInfoSegment}>
                        <div className={classes.conditionItem}>
                            <p className={classes.conditionLabel}>
                                <img src={thermometerImg} /> Feels Like
                            </p>
                            <p className={classes.conditionValue}>
                                {degreesState === "C"
                                    ? `${currentWeatherData.current.feelslike_c} °C`
                                    : `${currentWeatherData.current.feelslike_f} °F`}
                            </p>
                        </div>
                        <div className={classes.conditionItem}>
                            <p className={classes.conditionLabel}>
                                <img src={windImg} /> Wind
                            </p>
                            <p className={classes.conditionValue}>
                                {`${currentWeatherData.current.wind_kph} km/h`}
                            </p>
                        </div>
                    </div>
                    <div className={classes.airConditionsInfoSegment}>
                        <div className={classes.conditionItem}>
                            <p className={classes.conditionLabel}>
                                <img src={waterDropImg} /> Chance of Rain
                            </p>
                            <p className={classes.conditionValue}>
                                {`${currentWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`}
                            </p>
                        </div>
                        <div className={classes.conditionItem}>
                            <p className={classes.conditionLabel}>
                                <img src={sunImg} /> UV Index
                            </p>
                            <p className={classes.conditionValue}>
                                {currentWeatherData.current.uv}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
