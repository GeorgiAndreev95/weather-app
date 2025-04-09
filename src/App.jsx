import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Weather from "./components/Weather";

function App() {
    const [currentSelectedCity, setCurrentSelectedCity] = useState("Plovdiv");
    const [degreesState, setDegreesState] = useState("C");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const query = event.target.elements.search.value;
        setCurrentSelectedCity(query);
        console.log("Search for", query);
    };

    const onSwapHandler = () => {
        setDegreesState((prevState) => (prevState === "C" ? "F" : "C"));
        return degreesState;
    };

    return (
        <>
            <Header
                onSubmitHandler={onSubmitHandler}
                onSwapHandler={onSwapHandler}
            />
            <Weather
                cityName={currentSelectedCity}
                degreesState={degreesState}
            />
        </>
    );
}

export default App;
