import axiosInstance from "../axiosInstance";

const key = import.meta.env.VITE_WEATHER_API_KEY;

export const getForecast = async (cityName, coutryName) => {
    const query = coutryName ? `${cityName} ${coutryName}` : cityName;
    const language = localStorage.getItem("lng");
    let url = `/forecast.json?key=${key}&q=${query}&days=7`;

    if (language !== "en") {
        url += `&lang=${language}`;
    }

    try {
        const { data } = await axiosInstance.get(url);

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAutocomplete = async (cityName) => {
    try {
        const { data } = await axiosInstance.get(
            `/search.json?key=${key}&q=${cityName}`
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
