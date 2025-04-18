import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Weather from "../components/Weather/Weather";

function Home() {
    const [currentSelectedCity, setCurrentSelectedCity] = useState(undefined);
    const [currentSelectedCountry, setCurrentSelectedCountry] =
        useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [degreesState, setDegreesState] = useState("C");
    const [error, setError] = useState(null);
    const setToggle = useState(true)[1];

    const onSwapHandler = () => {
        setDegreesState((prevState) => (prevState === "C" ? "F" : "C"));
        return degreesState;
    };

    const handleToggle = () => {
        setToggle((prevState) => !prevState);
    };

    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentSelectedCity(`${latitude},${longitude}`);
                setCurrentSelectedCountry(undefined);
            },
            (err) => {
                setError(`Error: ${err.message}`);
            }
        );
    };

    useEffect(() => {
        handleGeolocation();
    }, []);

    return (
        <>
            <Header
                onSwapHandler={onSwapHandler}
                cityName={currentSelectedCity}
                setCurrentSelectedCity={setCurrentSelectedCity}
                setCurrentSelectedCountry={setCurrentSelectedCountry}
                setInputValue={setInputValue}
                inputValue={inputValue}
                degreesState={degreesState}
                onGoHome={handleGeolocation}
                onToggle={handleToggle}
            />
            <Weather
                error={error}
                cityName={currentSelectedCity}
                countryName={currentSelectedCountry}
                degreesState={degreesState}
            />
        </>
    );
}

export default Home;
