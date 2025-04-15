import { useEffect, useState } from "react";

import Header from "./components/Header";
import Weather from "./components/Weather";

function App() {
    const [currentSelectedCity, setCurrentSelectedCity] = useState(undefined);
    const [currentSelectedCountry, setCurrentSelectedCountry] =
        useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [degreesState, setDegreesState] = useState("C");
    const [error, setError] = useState(null);

    const onSwapHandler = () => {
        setDegreesState((prevState) => (prevState === "C" ? "F" : "C"));
        return degreesState;
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentSelectedCity(`${latitude},${longitude}`);
            },
            (err) => {
                setError(`Error: ${err.message}`);
            }
        );
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

export default App;
