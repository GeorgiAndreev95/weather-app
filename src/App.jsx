import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Weather from "./components/Weather";

function App() {
    const [currentSelectedCity, setCurrentSelectedCity] = useState(undefined);
    const [currentSelectedCountry, setCurrentSelectedCountry] =
        useState(undefined);
    const [inputValue, setInputValue] = useState("");
    const [degreesState, setDegreesState] = useState("C");

    const onSwapHandler = () => {
        setDegreesState((prevState) => (prevState === "C" ? "F" : "C"));
        return degreesState;
    };

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
                cityName={currentSelectedCity}
                countryName={currentSelectedCountry}
                degreesState={degreesState}
            />
        </>
    );
}

export default App;
