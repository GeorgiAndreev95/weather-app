import classes from "./DailyBreakdown.module.css";

export default function DailyBreakdown({
    currentWeatherData,
    degreesState,
    day,
}) {
    const date = new Date(currentWeatherData.forecast.forecastday[day].date);
    let weekday = date.toLocaleDateString("en-US", { weekday: "short" });

    if (day === 0) {
        weekday = "Today";
    }

    return (
        <div className={classes.daily}>
            <p>{weekday}</p>
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
