import axiosInstance from "../axiosInstance";

const key = import.meta.env.VITE_WEATHER_API_KEY;

export const getCurrentWeather = async (cityName) => {
    try {
        const { data } = await axiosInstance.get(
            `/current.json?key=${key}&q=${cityName}`
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getForecast = async (cityName) => {
    try {
        const { data } = await axiosInstance.get(
            `/forecast.json?key=${key}&q=${cityName}&days=7`
        );

        return data;
    } catch (error) {
        console.log(error);
    }
};
