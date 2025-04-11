import axiosInstance from "../axiosInstance";

const key = import.meta.env.VITE_WEATHER_API_KEY;

export const getForecast = async (cityName, coutryName) => {
    const query = coutryName ? `${cityName} ${coutryName}` : cityName;

    try {
        const { data } = await axiosInstance.get(
            `/forecast.json?key=${key}&q=${query}&days=7`
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAutocomplete = async (cityName) => {
    try {
        const { data } = await axiosInstance.get(
            `http://api.weatherapi.com/v1/search.json?key=${key}&q=${cityName}`
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
