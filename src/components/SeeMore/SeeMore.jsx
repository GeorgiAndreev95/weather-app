import { useTranslation } from "react-i18next";

import thermometerImg from "../../assets/thermometer.svg";
import sunImg from "../../assets/sun-icon.svg";
import compassImg from "../../assets/compass.svg";
import windImg from "../../assets/wind.svg";
import windGustsImg from "../../assets/wind-gusts.svg";
import barometerImg from "../../assets/barometer.svg";
import waterDropImg from "../../assets/water-drop.svg";
import rainImg from "../../assets/rain.svg";
import humidityImg from "../../assets/humidity.svg";
import dewImg from "../../assets/dew.svg";
import cloudCoverImg from "../../assets/cloud-cover.svg";
import visibilityImg from "../../assets/visibility.svg";
import sunriseImg from "../../assets/sunrise.svg";
import sunsetImg from "../../assets/sunset.svg";
import moonriseImg from "../../assets/moonrise.svg";
import moonsetImg from "../../assets/moonset.svg";
import moonPhaseImg from "../../assets/moon-phase.svg";

import classes from "./SeeMore.module.css";

export default function SeeMore({ degreesState, currentWeatherData }) {
    const { t } = useTranslation();
    const {
        feelslike_c,
        feelslike_f,
        uv,
        wind_degree,
        wind_dir,
        wind_kph,
        wind_mph,
        gust_kph,
        gust_mph,
        pressure_mb,
        humidity,
        dewpoint_c,
        dewpoint_f,
        cloud,
        vis_km,
        vis_miles,
    } = currentWeatherData.current;
    const { totalprecip_mm, totalprecip_in, daily_chance_of_rain } =
        currentWeatherData.forecast.forecastday[0].day;
    const { sunrise, sunset, moonrise, moonset, moon_phase } =
        currentWeatherData.forecast.forecastday[0].astro;

    const feelsLike =
        degreesState === "C" ? `${feelslike_c} °C` : `${feelslike_f} °F`;
    const windSpeed =
        degreesState === "C" ? `${wind_kph} ${t("kmh")}` : `${wind_mph} mph`;
    const gustsSpeed =
        degreesState === "C" ? `${gust_kph} ${t("kmh")}` : `${gust_mph} mph`;
    const precipitationTotal =
        degreesState === "C" ? `${totalprecip_mm} mm` : `${totalprecip_in} in`;
    const dewpoint =
        degreesState === "C" ? `${dewpoint_c} °C` : `${dewpoint_f} °F`;
    const visibility =
        degreesState === "C"
            ? `${vis_km} ${t("km")}`
            : `${vis_miles} ${t("miles")}`;

    function convertTo24Hour(time12h) {
        const [timePart, modifier] = time12h.split(" ");

        let [hours, minutes] = timePart.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
    }

    return (
        <section className={classes.seeMore}>
            <h3>Additional Information:</h3>

            <div className={classes.wind}>
                <div className={classes.windChild}>
                    <div className={classes.item}>
                        <p>
                            <img
                                src={thermometerImg}
                                className={classes.images}
                            />
                            {t("feelsLikeColon")}
                        </p>
                        <p>{feelsLike}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img src={compassImg} className={classes.images} />
                            {t("windDirection")}
                        </p>
                        <p>
                            <span
                                style={{
                                    display: "inline-block",
                                    transform: `rotate(${wind_degree - 90}deg)`,
                                    transition: "transform 0.3s ease",
                                }}
                            >
                                ➤
                            </span>
                            {` ${wind_dir}`}
                        </p>
                    </div>
                </div>
                <div className={classes.windChild}>
                    <div className={classes.item}>
                        <p>
                            <img src={windImg} className={classes.images} />
                            {t("windColon")}
                        </p>
                        <p>{windSpeed}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img
                                src={windGustsImg}
                                className={classes.images}
                            />
                            {t("windGusts")}
                        </p>
                        <p>{gustsSpeed}</p>
                    </div>
                </div>
            </div>

            <div className={classes.atmosphere}>
                <div className={classes.atmosphereChild}>
                    <div className={classes.item}>
                        <p>
                            <img
                                src={barometerImg}
                                className={classes.images}
                            />
                            {t("atmosphericPressure")}
                        </p>
                        <p>{`${pressure_mb} hPa`}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img
                                src={visibilityImg}
                                className={classes.images}
                            />
                            {t("visibility")}
                        </p>
                        <p>{visibility}</p>
                    </div>
                </div>
                <div className={classes.atmosphereChild}>
                    <div className={classes.item}>
                        <p>
                            <img src={humidityImg} className={classes.images} />
                            {t("humidity")}
                        </p>
                        <p>{`${humidity}%`}</p>
                    </div>

                    <div className={classes.item}>
                        <p>
                            <img src={dewImg} className={classes.images} />
                            {t("dewpoint")}
                        </p>
                        <p>{dewpoint}</p>
                    </div>
                </div>
            </div>

            <div className={classes.rain}>
                <div className={classes.rainChild}>
                    <div className={classes.item}>
                        <p>
                            <img
                                src={waterDropImg}
                                className={classes.images}
                            />
                            {t("chanceOfRainColon")}
                        </p>
                        <p>{`${daily_chance_of_rain}%`}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img src={rainImg} className={classes.images} />
                            {t("precipitation")}
                        </p>
                        <p>{precipitationTotal}</p>
                    </div>
                </div>
                <div className={classes.rainChild}>
                    <div className={classes.item}>
                        <p>
                            <img
                                src={cloudCoverImg}
                                className={classes.images}
                            />
                            {t("cloudCover")}
                        </p>
                        <p>{`${cloud}%`}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img src={sunImg} className={classes.images} />
                            {t("uvIndexColon")}
                        </p>
                        <p>{uv}</p>
                    </div>
                </div>
            </div>

            <div className={classes.astro}>
                <div className={classes.astroChild}>
                    <div className={classes.item}>
                        <p>
                            <img src={sunriseImg} className={classes.images} />
                            {t("sunrise")}
                        </p>
                        <p>{convertTo24Hour(sunrise)}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img src={sunsetImg} className={classes.images} />
                            {t("sunset")}
                        </p>
                        <p>{convertTo24Hour(sunset)}</p>
                    </div>
                </div>
                <div className={classes.astroChild}>
                    <div className={classes.item}>
                        <p>
                            <img src={moonriseImg} className={classes.images} />
                            {t("moonrise")}
                        </p>
                        <p>{convertTo24Hour(moonrise)}</p>
                    </div>
                    <div className={classes.item}>
                        <p>
                            <img src={moonsetImg} className={classes.images} />
                            {t("moonset")}
                        </p>
                        <p>{convertTo24Hour(moonset)}</p>
                    </div>
                    <div>
                        <div className={classes.item}>
                            <p>
                                <img
                                    src={moonPhaseImg}
                                    className={classes.images}
                                />
                                {t("moonPhase")}
                            </p>
                            <p>{moon_phase}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
