export default function HourlyBreakdown({
    currentWeatherData,
    degreesState,
    hour,
}) {
    return (
        <div>
            <p>{hour}:00</p>
            <img
                src={
                    currentWeatherData.forecast.forecastday[0].hour[hour]
                        .condition.icon
                }
            />
            <p>
                {`${
                    degreesState === "C"
                        ? `${currentWeatherData.forecast.forecastday[0].hour[hour].temp_c} °C`
                        : `${currentWeatherData.forecast.forecastday[0].hour[hour].temp_f} °F`
                }`}
            </p>
        </div>
    );
}
