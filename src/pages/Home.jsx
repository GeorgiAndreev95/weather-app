import { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Weather from "../components/Weather/Weather";
import ErrorComponent from "../components/ErrorComponent/ErrorComponent";

function Home() {
    const deg = localStorage.getItem("degrees");
    const [currentSelectedCity, setCurrentSelectedCity] = useState(undefined);
    const [currentSelectedCountry, setCurrentSelectedCountry] =
        useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [degreesState, setDegreesState] = useState(deg ? deg : "C");
    const [error, setError] = useState(null);
    const setToggle = useState(true)[1];

    const onSwapHandler = () => {
        const nextState = degreesState === "C" ? "F" : "C";

        setDegreesState(nextState);
        localStorage.setItem("degrees", nextState);
        console.log(nextState);
    };

    const handleToggle = () => {
        setToggle((prevState) => !prevState);
    };

    const handleGeolocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentSelectedCity(`${latitude},${longitude}`);
                setCurrentSelectedCountry(undefined);
                console.log("test");
                setError(null);
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setError(
                        "Location access denied. Please enable location services or search manually."
                    );
                } else {
                    setError(
                        "Could not get location. Please try again or search manually."
                    );
                }
                // setError(`Error: ${err.message}`);
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
                setError={setError}
            />
            {error && <ErrorComponent error={error} />}
            {!error && currentSelectedCity && (
                <Weather
                    cityName={currentSelectedCity}
                    countryName={currentSelectedCountry}
                    degreesState={degreesState}
                />
            )}
        </>
    );
}

export default Home;
