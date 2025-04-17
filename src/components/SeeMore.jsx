import thermometerImg from "../assets/thermometer.png";
import sunImg from "../assets/sun-icon.png";
import compassImg from "../assets/compass.png";
import windImg from "../assets/wind.png";
import windGustsImg from "../assets/wind-gusts.png";
import barometerImg from "../assets/barometer.png";
import waterDropImg from "../assets/water-drop.png";
import rainImg from "../assets/rain.png";

import classes from "./SeeMore.module.css";

export default function SeeMore({ degreesState, currentWeatherData }) {
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
        precip_mm,
        precip_in,
    } = currentWeatherData.current;

    return (
        <section className={classes.seeMore}>
            <div className={classes.item}>
                <p>
                    <img src={thermometerImg} className={classes.images} />{" "}
                    Feels Like:
                </p>
                <p>
                    {degreesState === "C"
                        ? `${feelslike_c} °C`
                        : `${feelslike_f} °F`}
                </p>
            </div>
            <div className={classes.item}>
                <p>
                    <img src={sunImg} className={classes.images} /> UV Index:
                </p>
                <p>{uv}</p>
            </div>

            <div className={classes.item}>
                <p>
                    <img src={compassImg} className={classes.images} /> Wind
                    Direction:
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

            <div className={classes.item}>
                <p>
                    <img src={windImg} className={classes.images} /> Wind:
                </p>
                <p>
                    {degreesState === "C"
                        ? `${wind_kph} km/h`
                        : `${wind_mph} mph`}
                </p>
            </div>
            <div className={classes.item}>
                <p>
                    <img src={windGustsImg} className={classes.images} /> Wind
                    Gusts:
                </p>
                <p>
                    {degreesState === "C"
                        ? `${gust_kph} km/h`
                        : `${gust_mph} mph`}
                </p>
            </div>
            <div className={classes.item}>
                <p>
                    <img src={barometerImg} className={classes.images} />{" "}
                    Atmospheric Pressure:
                </p>
                <p>{`${pressure_mb} hPa`}</p>
            </div>

            <div className={classes.item}>
                <p>
                    <img src={waterDropImg} className={classes.images} /> Chance
                    of Rain:
                </p>
                <p>
                    {`${currentWeatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`}
                </p>
            </div>
            <div className={classes.item}>
                <p>
                    <img src={rainImg} className={classes.images} />{" "}
                    Precipitation Current/Total:
                </p>
                <p>
                    {degreesState === "C"
                        ? `${precip_mm} mm`
                        : `${precip_in} in`}
                </p>
            </div>
        </section>
    );
}
