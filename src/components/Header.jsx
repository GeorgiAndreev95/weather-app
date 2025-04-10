import { useEffect, useRef, useState } from "react";

import classes from "./Header.module.css";
import image from "../assets/sun-flare.png";
import { getAutocomplete } from "../services/weatherService";

export default function Header({
    onSwapHandler,
    setInputValue,
    inputValue,
    setCurrentSelectedCity,
    setCurrentSelectedCountry,
    degreesState,
}) {
    const lastChange = useRef();
    const [suggestionResults, setSuggestionResults] = useState([]);
    const [inputDisplayValue, setInputDisplayValue] = useState("");

    useEffect(() => {
        if (inputValue.length > 0) {
            const fetchAutocompleteSuggestions = async () => {
                const response = await getAutocomplete(inputValue);

                setSuggestionResults(response);
            };

            fetchAutocompleteSuggestions();
        }
    }, [inputValue]);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputDisplayValue(value);

        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        lastChange.current = setTimeout(() => {
            setInputValue(value);
        }, 500);

        if (value.length === 0) {
            setSuggestionResults([]);
        }
    };

    const handleClick = (cityName, countryName) => {
        setCurrentSelectedCity(cityName);
        setCurrentSelectedCountry(countryName);
        setSuggestionResults([]);
        setInputDisplayValue("");
    };

    const handleGoHome = () => {
        setCurrentSelectedCity(undefined);
        setSuggestionResults([]);
        setInputValue("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.header}>
            <div className={classes.title}>
                <img src={image} alt="A cartoony picture of the sun" />

                <h1 onClick={handleGoHome}>Weather App</h1>
            </div>
            <div className={classes.menu}>
                <form
                    className={`${classes.searchForm} ${
                        suggestionResults.length > 0
                            ? classes.searchFormActive
                            : ""
                    }`}
                    onSubmit={handleSubmit}
                >
                    <button type="submit" className={classes.icon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </button>

                    <input
                        type="text"
                        name="search"
                        placeholder="Search city..."
                        className={classes.searchBox}
                        autoComplete="off"
                        onChange={handleChange}
                        value={inputDisplayValue}
                        required
                    />
                    {suggestionResults.length > 0 && (
                        <ul className={classes.suggestions}>
                            {suggestionResults.map((city) => (
                                <li
                                    key={city.id}
                                    onClick={() =>
                                        handleClick(city.name, city.country)
                                    }
                                    className={classes.suggestionItem}
                                >
                                    {`${city.name}, ${city.country}`}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
                <div className={classes.degreeButtons}>
                    <button
                        className={classes.degreeButton}
                        onClick={onSwapHandler}
                    >
                        <span
                            style={{
                                color:
                                    degreesState === "C"
                                        ? "rgb(255, 177,0)"
                                        : "inherit",
                            }}
                        >
                            °C
                        </span>
                        {" / "}
                        <span
                            style={{
                                color:
                                    degreesState === "F"
                                        ? "rgb(255, 177,0)"
                                        : "inherit",
                            }}
                        >
                            °F
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
