import classes from "./DailyBreakdown.module.css";
import { useTranslation } from "react-i18next";

export default function DailyBreakdown({
    currentWeatherData,
    degreesState,
    day,
}) {
    const { t } = useTranslation();
    const date = new Date(currentWeatherData.forecast.forecastday[day].date);
    const lng = localStorage.getItem("lng");
    let weekday = date.toLocaleDateString("en-US", { weekday: "short" });

    if (lng === "bg") {
        weekday = date.toLocaleDateString("bg-BG", { weekday: "short" });
    }

    if (day === 0) {
        weekday = t("today");
    }

    return (
        <div className={classes.daily}>
            <p className={classes.day}>{weekday}</p>
            <div>
                <img
                    src={
                        currentWeatherData.forecast.forecastday[day].day
                            .condition.icon
                    }
                />
                <p>
                    {
                        currentWeatherData.forecast.forecastday[day].day
                            .condition.text
                    }
                </p>
            </div>

            <p className={classes.degrees}>
                {degreesState === "C"
                    ? `${currentWeatherData.forecast.forecastday[day].day.mintemp_c}°/${currentWeatherData.forecast.forecastday[day].day.maxtemp_c}°`
                    : `${currentWeatherData.forecast.forecastday[day].day.mintemp_f}°/${currentWeatherData.forecast.forecastday[day].day.maxtemp_f}°`}
            </p>
        </div>
    );
}
