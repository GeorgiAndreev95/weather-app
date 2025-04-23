import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./Weather.module.css";
import thermometerImg from "../../assets/thermometer.svg";
import waterDropImg from "../../assets/water-drop.svg";
import windImg from "../../assets/wind.svg";
import sunImg from "../../assets/sun-icon.svg";

import { useGetForecast } from "../../services/weatherService";
import HourlyBreakdown from "../HourlyBreakdown/HourlyBreakdown";
import DailyBreakdown from "../DailyBreakdown/DailyBreakdown";
import SeeMore from "../SeeMore/SeeMore";
import Modal from "../Modal/Modal";

export default function Weather({ cityName, countryName, degreesState }) {
    const { t } = useTranslation();
    const { data: currentWeatherData, refetch } = useGetForecast(
        cityName,
        countryName
    );
    const [showMoreOpen, setShowMoreOpen] = useState(false);

    const lng = localStorage.getItem("lng");
    const hours = [6, 9, 12, 15, 18, 21];
    const days = [0, 1, 2, 3, 4, 5, 6];

    const showMoreClickHandler = () => {
        setShowMoreOpen(true);
    };

    const onDismiss = () => {
        setShowMoreOpen(false);
    };

    useEffect(() => {
        refetch();
    }, [refetch, lng, cityName, countryName]);

    if (!currentWeatherData) {
        return (
            <div className={classes.weatherLoader}>
                <div className={classes.sun}></div>
                <div className={classes.cloud}></div>
                <p className={classes.fadingText}>{t("fetching")}</p>
            </div>
        );
    }

    const { name, country } = currentWeatherData.location;
    const { temp_c, temp_f, feelslike_c, feelslike_f, wind_kph, wind_mph, uv } =
        currentWeatherData.current;
    const { text, icon } = currentWeatherData.current.condition;
    const { daily_chance_of_rain } =
        currentWeatherData.forecast.forecastday[0].day;
    const currentTemp = degreesState === "C" ? `${temp_c} °C` : `${temp_f} °F`;
    const feelsLike =
        degreesState === "C" ? `${feelslike_c} °C` : `${feelslike_f} °F`;
    const windSpeed =
        degreesState === "C" ? `${wind_kph} ${t("kmh")}` : `${wind_mph} mph`;

    return (
        <main className={classes.mainSection}>
            <div>
                <div className={classes.currentDaySection}>
                    <div className={classes.dataContainer}>
                        <div className={classes.dataContainerName}>
                            <p className={classes.cityName}>{name}</p>
                            <p>{country}</p>
                        </div>
                        <div className={classes.dataContainerTemp}>
                            <p>{currentTemp}</p>
                        </div>
                        <p className={classes.condition}>{text}</p>
                    </div>

                    <div className={classes.imgContainer}>
                        <img src={icon.replace("64x64", "128x128")} />
                    </div>
                </div>
                <div className={classes.todaysForecast}>
                    <h3>{t("todaysForecast")}</h3>
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
                        <h3>{t("airConditions")}</h3>
                        <button type="button" onClick={showMoreClickHandler}>
                            {t("showMore")}
                        </button>
                    </div>
                    <div className={classes.airConditionsInfo}>
                        <div className={classes.airConditionsInfoSegment}>
                            <div className={classes.conditionItem}>
                                <p className={classes.conditionLabel}>
                                    <img src={thermometerImg} />
                                    {t("feelsLike")}
                                </p>
                                <p className={classes.conditionValue}>
                                    {feelsLike}
                                </p>
                            </div>
                            <div className={classes.conditionItem}>
                                <p className={classes.conditionLabel}>
                                    <img src={windImg} /> {t("wind")}
                                </p>
                                <p className={classes.conditionValue}>
                                    {windSpeed}
                                </p>
                            </div>
                        </div>
                        <div className={classes.airConditionsInfoSegment}>
                            <div className={classes.conditionItem}>
                                <p className={classes.conditionLabel}>
                                    <img src={waterDropImg} />
                                    {t("chanceOfRain")}
                                </p>
                                <p className={classes.conditionValue}>
                                    {`${daily_chance_of_rain}%`}
                                </p>
                            </div>
                            <div className={classes.conditionItem}>
                                <p className={classes.conditionLabel}>
                                    <img src={sunImg} /> {t("uvIndex")}
                                </p>
                                <p className={classes.conditionValue}>{uv}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showMoreOpen && (
                <Modal onDismiss={onDismiss}>
                    <SeeMore
                        currentWeatherData={currentWeatherData}
                        degreesState={degreesState}
                    />
                </Modal>
            )}

            <div className={classes.sevenDayForecast}>
                <h3>{t("sevenDayForecast")}</h3>
                <ul>
                    {days.map((day) => (
                        <DailyBreakdown
                            key={day}
                            currentWeatherData={currentWeatherData}
                            degreesState={degreesState}
                            day={day}
                        />
                    ))}
                </ul>
            </div>
        </main>
    );
}
