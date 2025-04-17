import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import classes from "./Header.module.css";
import image from "../assets/sun-flare.png";
import { getAutocomplete } from "../services/weatherService";
import useLanguage from "../hooks/useLanguage";

export default function Header({
    onSwapHandler,
    setInputValue,
    inputValue,
    setCurrentSelectedCity,
    setCurrentSelectedCountry,
    degreesState,
    onGoHome,
    onToggle,
}) {
    const { t } = useTranslation();
    const lastChange = useRef();
    const [focusedIndex, setFocusedIndex] = useState(-1);
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
        setInputValue("");
        setFocusedIndex(-1);
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
        setSuggestionResults([]);
        setInputValue("");
        setInputDisplayValue("");
        onGoHome();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const keyDownHandler = (event) => {
        if (suggestionResults.length === 0) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();
            setFocusedIndex(
                (prevIndex) => (prevIndex + 1) % suggestionResults.length
            );
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setFocusedIndex((prevIndex) =>
                prevIndex <= 0 ? suggestionResults.length - 1 : prevIndex - 1
            );
        } else if (event.key === "Enter" && focusedIndex >= 0) {
            event.preventDefault();
            const selectedCity = suggestionResults[focusedIndex];
            handleClick(selectedCity.name, selectedCity.country);
        }
    };

    const { changeSelectedLanguage } = useLanguage();

    return (
        <div className={classes.header}>
            <div className={classes.title}>
                <img src={image} alt="A picture of the sun" />

                <h1 onClick={handleGoHome}>{t("headerTitle")}</h1>
                <button
                    onClick={() => {
                        changeSelectedLanguage("bg");
                        onToggle();
                    }}
                >
                    BG
                </button>
                <button
                    onClick={() => {
                        changeSelectedLanguage("en");
                        onToggle();
                    }}
                >
                    EN
                </button>
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
                    <div className={classes.icon}>
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
                    </div>

                    <input
                        type="text"
                        name="search"
                        placeholder={t("inputPlaceholder")}
                        className={classes.searchBox}
                        autoComplete="off"
                        onChange={handleChange}
                        onKeyDown={keyDownHandler}
                        value={inputDisplayValue}
                        required
                    />
                    {suggestionResults.length > 0 && (
                        <ul className={classes.suggestions}>
                            {suggestionResults.map((city, index) => (
                                <li
                                    key={city.id}
                                    onClick={() =>
                                        handleClick(city.name, city.country)
                                    }
                                    className={`${classes.suggestionItem} ${
                                        focusedIndex === index
                                            ? classes.focused
                                            : ""
                                    }`}
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
