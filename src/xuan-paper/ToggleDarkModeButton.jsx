import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

import AppBarItem from "./AppBarItem.jsx";

const modeSystem = "system";
const modeLight = "light";
const modeDark = "dark";
const STORAGE_KEY = "xuan-paper-theme-mode";

/**
 * A toggle button component that cycles between light mode,
 * dark mode, and system preference.
 * Automatically detects system preference via media queries
 * and persists user's choice in localStorage.
 *
 * The component cycles through the following states:
 * 1. System preference (default) - uses the device's color scheme preference
 * 2. Light mode - forces light theme regardless of system preference
 * 3. Dark mode - forces dark theme regardless of system preference
 *
 * To apply dark mode styles in your app, add the following to your CSS:
 * ```css
 * @custom-variant dark (&:where(.dark, .dark *));
 * ```
 *
 * The component adds/removes the "dark" class on the documentElement (html)
 * automatically.
 * @returns {JSX.Element} A button with icon that changes based on current mode
 * @example
 * // Basic usage in a header component
 * import ToggleDarkModeButton from '../xuan-paper/ToggleDarkModeButton';
 *
 * const Header = () => (
 *   <header className="flex justify-between items-center p-4">
 *     <h1>My App</h1>
 *     <div className="flex gap-2">
 *       <ToggleDarkModeButton />
 *       <UserMenuButton />
 *     </div>
 *   </header>
 * );
 */

const ToggleDarkModeButton = ({
  bgColor = "bg-light-surface dark:bg-dark-surface",
}) => {
  // Initialize state from localStorage or default to system
  const [brightnessSetting, setBrightnessSetting] = useState(() => {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    return savedMode || modeSystem;
  });
  const [systemMode, setSystemMode] = useState("light");

  // Compute theme mode from app settings and system mode
  const darkTheme = useMemo(
    () =>
      brightnessSetting === modeLight
        ? false
        : brightnessSetting === modeDark
          ? true
          : systemMode === modeDark,
    [brightnessSetting, systemMode],
  );

  // Handle media query changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial value
    setSystemMode(mediaQuery.matches ? modeDark : modeLight);

    const handleChange = (event) => {
      setSystemMode(event.matches ? modeDark : modeLight);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Save mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, brightnessSetting);
  }, [brightnessSetting]);

  // Apply mode changes
  useEffect(() => {
    document.documentElement.className = darkTheme ? "dark" : "";
  }, [darkTheme]);

  return (
    <AppBarItem
      icon={
        brightnessSetting === modeSystem ? (
          /* Material icons 'Reset brightness' https://fonts.google.com/icons */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-252q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680v400Zm0 140 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z" />
          </svg>
        ) : brightnessSetting === modeLight ? (
          /* Material icons 'Light mode' https://fonts.google.com/icons */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
          </svg>
        ) : (
          /* Material icons 'Dark mode' https://fonts.google.com/icons */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </svg>
        )
      }
      onClick={() =>
        setBrightnessSetting(
          brightnessSetting === modeSystem
            ? systemMode === modeDark
              ? modeLight
              : modeDark
            : brightnessSetting === modeLight
              ? systemMode === modeDark
                ? modeDark
                : modeSystem
              : systemMode === modeDark
                ? modeSystem
                : modeLight,
        )
      }
      bgColor={bgColor}
    />
  );
};

ToggleDarkModeButton.propTypes = {
  bgColor: PropTypes.string,
};

export default ToggleDarkModeButton;
