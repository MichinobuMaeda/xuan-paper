import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { resources } from "../i18n.js";

import AppBarItem from "./AppBarItem.jsx";

const STORAGE_KEY = "xuan-paper-language";

/**
 * A button component that toggles the application's language
 * between available translations.
 * Cycles through languages defined in the resources object
 * and persists the selection in localStorage.
 *
 * Features:
 * - Displays the current language code or a language icon if no label is available
 * - Automatically loads the previously selected language from localStorage on mount
 * - Cycles through available languages in the order they appear in the resources object
 * - Persists language preference across browser sessions
 *
 * This component requires:
 * - A properly configured i18next setup
 * - A resources object exported from i18n.js with language codes as keys
 * - Each translation entry should optionally have a 'label' property for display
 * - The i18n configuration must use the exported resources object
 *
 * @returns {JSX.Element} A button displaying the current language label or a language icon
 *
 * @example
 * // Basic usage in a header component
 * import ToggleLanguageButton from '../xuan-paper/ToggleLanguageButton';
 *
 * const Header = () => (
 *   <header className="flex justify-between items-center p-4">
 *     <h1>My App</h1>
 *     <div className="flex gap-2">
 *       <ToggleLanguageButton />
 *       <SettingsButton />
 *     </div>
 *   </header>
 * );
 *
 * @example
 * // Example i18n.js file with exported resources object
 * import i18n from "i18next";
 * import { initReactI18next } from "react-i18next";
 *
 * export const resources = {
 *   en: {
 *     label: "En",
 *     translation: {
 *       // English translations
 *     }
 *   },
 *   ja: {
 *     label: "日",
 *     translation: {
 *       // Japanese translations
 *     }
 *   },
 *   // Additional languages...
 * };
 *
 * // The i18n instance must use the same resources object that is exported
 * i18n.use(initReactI18next).init({
 *   resources, // Use the exported resources
 *   lng: "en",
 *   interpolation: {
 *     escapeValue: false // not needed for react as it escapes by default
 *   }
 * });
 *
 * export default i18n;
 */

const ToggleLanguageButton = ({
  bgColor = "bg-light-surface dark:bg-dark-surface",
}) => {
  const { i18n } = useTranslation();

  const [label, setLabel] = useState(resources[i18n.language]?.label);

  // Initialize language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage && Object.keys(resources).includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
      setLabel(resources[savedLanguage]?.label);
    }
  }, []);

  return (
    <AppBarItem
      icon={
        label ? (
          <div
            className={`size-6 justify-items-center
              rounded-md outline-1
              outline-light-on-surface dark:outline-dark-on-surface`}
          >
            {label}
          </div>
        ) : (
          /* Material icons 'Language' https://fonts.google.com/icons */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
          </svg>
        )
      }
      onClick={() => {
        const languages = Object.keys(resources);
        let index = languages.indexOf(i18n.language);
        const newLanguage = languages[++index < languages.length ? index : 0];

        // Save the selected language to localStorage
        localStorage.setItem(STORAGE_KEY, newLanguage);

        // Change the language
        i18n.changeLanguage(newLanguage);
        setLabel(resources[newLanguage]?.label);
      }}
      bgColor={bgColor}
    />
  );
};

ToggleLanguageButton.propTypes = {
  bgColor: PropTypes.string,
};

export default ToggleLanguageButton;
