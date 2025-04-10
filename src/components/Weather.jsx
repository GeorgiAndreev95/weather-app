import { useEffect } from "react";
import { useState } from "react";

import { getForecast } from "../services/weatherService";
import classes from "./Weather.module.css";
import HourlyBreakdown from "./HourlyBreakdown";

export default function Weather({
    cityName = "Plovdiv",
    countryName,
    degreesState,
}) {
    const [currentWeatherData, setCurrentWeatherData] = useState(null);

    useEffect(() => {
        const fetchCurrentWeatherData = async () => {
            const response = await getForecast(cityName, countryName);
            console.log(response);

            setCurrentWeatherData(response);
        };

        fetchCurrentWeatherData();
    }, [cityName, countryName]);

    if (!currentWeatherData) {
        return <p>Fetching weather data...</p>;
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
                    <HourlyBreakdown
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                        hour={6}
                    />
                    <HourlyBreakdown
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                        hour={9}
                    />
                    <HourlyBreakdown
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                        hour={12}
                    />
                    <HourlyBreakdown
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                        hour={15}
                    />
                    <HourlyBreakdown
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                        hour={18}
                    />
                    <HourlyBreakdown
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                        hour={21}
                    />
                </div>
            </div>
        </main>
    );
}
