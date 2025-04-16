import thermometerImg from "../assets/thermometer.png";
import sunImg from "../assets/sun-icon.png";
import compassImg from "../assets/compass.png";
import waterDropImg from "../assets/water-drop.png";
import windImg from "../assets/wind.png";

import classes from "./SeeMore.module.css";

export default function SeeMore({ degreesState, currentWeatherData }) {
    function Compass({ degrees }) {
        return (
            <div className={classes.compassContainer}>
                <div
                    className={classes.compassArrow}
                    style={{ transform: `rotate(${degrees}deg)` }}
                />
                <div className={classes.compassCenter} />
            </div>
        );
    }

    return (
        <section className={classes.seeMore}>
            <div>
                <p className={classes.images}>
                    <img src={thermometerImg} /> Feels Like:
                </p>
                <p className={classes.conditionValue}>
                    {degreesState === "C"
                        ? `${currentWeatherData.current.feelslike_c} °C`
                        : `${currentWeatherData.current.feelslike_f} °F`}
                </p>
            </div>
            <div>
                <p className={classes.images}>
                    <img src={sunImg} /> UV Index:
                </p>
                <p className={classes.conditionValue}>
                    {currentWeatherData.current.uv}
                </p>
            </div>

            <div>
                <p className={classes.images}>
                    <img src={compassImg} /> Wind direction:
                </p>
                <p></p>
            </div>
        </section>
    );
}
