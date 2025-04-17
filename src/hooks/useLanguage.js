import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
    const { i18n } = useTranslation();

    const changeSelectedLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
    };

    useEffect(() => {
        const lng = localStorage.getItem("lng") ?? "en";

        i18n.changeLanguage(lng);
    }, [i18n]);

    return {
        changeSelectedLanguage,
    };
};

export default useLanguage;
