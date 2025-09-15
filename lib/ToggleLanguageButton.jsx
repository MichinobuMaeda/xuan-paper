/**
 * @file ToggleLanguageButton component for internationalization support.
 * Provides a button that cycles through available languages with persistence.
 * @since 1.0.0
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "./Button.jsx";

const STORAGE_KEY = "xuan-paper-language";

/**
 * Initializes the language from localStorage if a valid language is stored.
 * @param {object} langs - Languages object mapping language codes to language configurations.
 * @param {Function} setLanguage - Function to set the current language
 */
const initLanguage = (langs, setLanguage) => {
  const lang = localStorage.getItem(STORAGE_KEY);
  if (lang && Object.keys(langs).includes(lang)) {
    setLanguage(lang);
  }
};

/**
 * Cycles to the next available language in the languages object.
 * @param {object} langs - Languages object mapping language codes to language configurations.
 * @param {string} currentLanguage - The currently active language code
 * @param {Function} setLanguage - Function to set the new language
 */
const nextLanguage = (langs, currentLanguage, setLanguage) => {
  const languages = Object.keys(langs);
  let index = languages.indexOf(currentLanguage) + 1;
  const nextLang = languages[index < languages.length ? index : 0];
  localStorage.setItem(STORAGE_KEY, nextLang);
  setLanguage(nextLang);
};

/**
 * A button component that toggles the application's language between available translations.
 * Cycles through languages defined in the languages object and persists the selection in localStorage.
 *
 * The component automatically displays either:
 * - The current language's label (if defined in langs[lang].label)
 * - A universal language icon (Material Design language icon) as fallback
 *
 * Key features:
 * - Automatically loads the previously selected language from localStorage on mount
 * - Cycles through available languages in the order they appear in the languages object
 * - Persists language preference across browser sessions using localStorage
 * - Framework-agnostic design works with any internationalization library or custom setup
 * - Provides visual feedback with either text labels or language icon
 * - Supports all Button component styling options
 *
 * Requirements:
 * - A languages object with language codes as keys
 * - Each language entry should optionally have a 'label' property for display
 * - Parent component should handle the actual language switching logic via setLang callback
 * @component
 * @param {object} props - Component props
 * @param {object} props.langs - Languages object mapping language codes to language configurations (e.g., { en: {label: 'En'}, ja: {label: '日'} }). Each entry may have a 'label' property for display.
 * @param {string} props.lang - The currently active language code.
 * @param {Function} props.setLang - Callback to update the current language code.
 * @param {string} [props.style] - Visual style variant for the button (e.g., "embedded", "outlined"). Defaults to "embedded".
 * @param {string} [props.size] - Size variant for the button (e.g., "sm", "md"). Defaults to "sm".
 * @returns {JSX.Element} A button displaying the current language label or a language icon.
 * @example
 * // Basic usage in a header component
 * import ToggleLanguageButton from '../xuan-paper/ToggleLanguageButton';
 *
 * const Header = () => {
 *   const [currentLang, setCurrentLang] = useState('en');
 *   const languages = {
 *     en: { label: 'En' },
 *     ja: { label: '日' },
 *     es: { label: 'Es' }
 *   };
 *
 *   return (
 *     <header className="flex justify-between items-center p-4">
 *       <h1>My App</h1>
 *       <div className="flex gap-2">
 *         <ToggleLanguageButton
 *           langs={languages}
 *           lang={currentLang}
 *           setLang={setCurrentLang}
 *         />
 *         <SettingsButton />
 *       </div>
 *     </header>
 *   );
 * };
 * @example
 * // Custom styling with different button styles
 * <ToggleLanguageButton
 *   langs={languages}
 *   lang={currentLang}
 *   setLang={setCurrentLang}
 *   style="outlined"
 *   size="md"
 * />
 * @example
 * // Example languages object structure
 * const languages = {
 *   en: {
 *     label: "En"
 *   },
 *   ja: {
 *     label: "日"
 *   },
 *   es: {
 *     label: "Es"
 *   },
 *   fr: {
 *     label: "Fr"
 *   }
 * };
 *
 * // Use with any internationalization setup
 * const handleLanguageChange = (newLang) => {
 *   setCurrentLanguage(newLang);
 *   // Update your app's language however you prefer:
 *   // - i18next: i18n.changeLanguage(newLang)
 *   // - react-intl: setLocale(newLang)
 *   // - custom solution: updateTranslations(newLang)
 * };
 */
const ToggleLanguageButton = ({
  langs,
  lang,
  setLang,
  style = "embedded",
  size = "sm",
}) => {
  const [label, setLabel] = useState(langs[lang]?.label);

  const setLanguage = (lang) => {
    setLang(lang);
    setLabel(langs[lang]?.label);
  };

  // On component mount
  useEffect(() => {
    initLanguage(langs, setLanguage);
  }, []);

  return (
    <Button
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
      onClick={() => nextLanguage(langs, lang, setLanguage)}
      style={style}
      size={size}
    />
  );
};

ToggleLanguageButton.propTypes = {
  langs: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ).isRequired,
  lang: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
  style: PropTypes.string,
  size: PropTypes.string,
};

export default ToggleLanguageButton;
