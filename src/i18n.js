import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import bg from "./locales/bg.json";

let language = localStorage.getItem("lng") ?? "en";

i18n.use(initReactI18next).init({
    resources: {
        en,
        bg,
    },

    lng: `${language}`,

    fallbackLng: "en",
    debug: true,

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
