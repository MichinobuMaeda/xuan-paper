import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import {
  iniHue,
  iniContrast,
  hueAtom,
  contrastAtom,
  seedColorAtom,
  schemeAtom,
  colorChangedAtom,
  demoValueResetAtom,
} from "./state.js";

import AppBar from "./xuan-paper/AppBar.jsx";
import AppBarItem from "./xuan-paper/AppBarItem.jsx";
import NavigationDrawer from "./xuan-paper/NavigationDrawer.jsx";
import NavigationRail from "./xuan-paper/NavigationRail.jsx";
import NavigationBar from "./xuan-paper/NavigationBar.jsx";
import Fab from "./xuan-paper/Fab.jsx";
import ToggleLanguageButton from "./xuan-paper/ToggleLanguageButton.jsx";
import ToggleDarkModeButton from "./xuan-paper/ToggleDarkModeButton.jsx";
import { generateThemeCss } from "./xuan-paper/material-theme.js";

import SvgArrowBackIos from "./icons/SvgArrowBackIos.jsx";
import SvgScreenRotationUp from "./icons/SvgScreenRotationUp.jsx";
import SvgFormatColorReset from "./icons/SvgFormatColorReset.jsx";
import SvgDownload from "./icons/SvgDownload.jsx";
import SvgUndo from "./icons/SvgUndo.jsx";
import SvgKeep from "./icons/SvgKeep.jsx";
import SvgKeepOff from "./icons/SvgKeepOff.jsx";
import SvgInfo from "./icons/SvgInfo.jsx";
import SvgEdit from "./icons/SvgEdit.jsx";

import "./App.css";
import PWABadge from "./xuan-paper/PWABadge.jsx";
import appLogo from "./assets/images/favicon.svg";
import version from "./version.js";

import ColorThemeParameters from "./ColorThemeParameters.jsx";
import ComponentsDemo from "./ComponentsDemo.jsx";
import ColorThemeValues from "./ColorThemeValues.jsx";
import { downloadFile } from "./utils.js";

const appName = "Xuan Paper";
const cssFileName = "theme.css";

/**
 * Main application component that provides the layout and functionality for the Xuan Paper theme generator.
 * Manages theme customization, navigation states, and UI behavior including scroll-based hiding/showing of elements.
 *
 * Features:
 * - Material Design 3 theme customization with color and contrast controls
 * - Responsive navigation (bottom bar, side rail, drawer)
 * - Auto-hiding UI elements based on scroll direction
 * - Theme CSS generation and download
 * - PWA capabilities with update notifications
 * - Internationalization support
 * - Demo components showcase
 * @component
 * @returns {JSX.Element} The complete application layout with navigation, theme controls, and demo components
 */
function App() {
  const { t } = useTranslation();

  // Set up state management with Jotai for theme customization
  const setHue = useSetAtom(hueAtom);
  const [contrast, setContrast] = useAtom(contrastAtom);
  const seedColor = useAtomValue(seedColorAtom);
  const scheme = useAtomValue(schemeAtom);
  const colorChanged = useAtomValue(colorChangedAtom);

  // Reset theme colors to initial values
  const resetColor = () => {
    setHue(iniHue);
    setContrast(iniContrast);
  };

  // Generate and download theme CSS file
  const downloadThemeCss = () =>
    downloadFile(cssFileName, generateThemeCss(scheme, seedColor, contrast));

  // State for resetting demo component values
  const [demoValueReset, setDemoValueReset] = useAtom(demoValueResetAtom);

  // State for scroll-based UI behavior (hide/show app bar and navigation)
  const [scrollDirection, setScrollDirection] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Set up scroll listener for auto-hiding UI elements
  window.addEventListener("scroll", () => {
    // Only update if we've scrolled significantly (1/8 of viewport height)
    if (Math.abs(window.scrollY - lastScrollY) > window.innerHeight / 8) {
      if (lastScrollY !== 0) {
        setScrollDirection(window.scrollY - lastScrollY);
      }
      setLastScrollY(window.scrollY);
    }
  });

  // Dynamic classes for header that hides when scrolling down
  const headerOptionalClass = `sticky top-0 transition-all duration-500
    ${scrollDirection > 0 ? `-translate-y-14 3xl:translate-0` : ""}`;

  // Dynamic classes for footer that hides when scrolling up
  const footerOptionalClass = `sticky bottom-0 transition-all duration-500
    ${scrollDirection < 0 ? `translate-y-16 3xl:translate-0` : ""}`;

  // Toggle between horizontal (bottom bar) and vertical (side rail) navigation
  const [navVertical, setNavVertical] = useState(false);

  // Classes for vertical navigation rail positioning
  const navRailOptionalClass = `h-full w-24 lg:w-56 fixed top-0 pt-20 pb-20`;

  // Navigation drawer state management
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerKeep, setDrawerKeep] = useState(false);

  // Define navigation items for bottom bar, navigation rail, and drawer
  const navItems = [
    drawerOpen
      ? drawerKeep
        ? {
            icon: <SvgKeepOff />,
            label: "Narrow floating layout",
            active: true,
            onClick: () => {
              setDrawerKeep(false);
            },
          }
        : {
            icon: <SvgKeep />,
            label: "Wide fixed layout",
            active: true,
            onClick: () => {
              setDrawerKeep(true);
            },
          }
      : {
          icon: <SvgScreenRotationUp />,
          label: t("rotate"),
          active: true,
          onClick: () => {
            setNavVertical(!navVertical);
          },
        },
    {
      icon: <SvgDownload />,
      label: cssFileName,
      onClick: downloadThemeCss,
    },
    {
      icon: <SvgFormatColorReset />,
      label: t("reset color"),
      onClick: resetColor,
      disabled: !colorChanged,
    },
    {
      icon: <SvgUndo />,
      label: t("undo"),
      onClick: () => setDemoValueReset(true),
      disabled: demoValueReset,
    },
  ];

  return (
    <div
      className={`flex flex-col w-full justify-start items-start
      ${drawerKeep ? "pl-84" : ""}`}
    >
      <AppBar
        backArrow={
          <AppBarItem icon={<SvgArrowBackIos />} disabled onClick={() => {}} />
        }
        navigationDrawer={
          !drawerKeep && (
            <AppBarItem
              icon={
                /* Material icons 'Menu' https://fonts.google.com/icons */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              }
              onClick={() => setDrawerOpen(true)}
            />
          )
        }
        appLogo={
          <img
            src={appLogo}
            className="size-10 min-w-10"
            alt={`${appName} logo`}
          />
        }
        appName={appName}
        suffix={[
          <ToggleLanguageButton key="toggle-language" />,
          <ToggleDarkModeButton key="toggle-dark-mode" />,
        ]}
        optionalClass={headerOptionalClass}
        height="h-14" // Default
      />

      <main
        className={`flex flex-col pb-8 gap-2 w-full
          ${navVertical ? "pl-24 lg:pl-56" : ""}`}
      >
        <div
          className={`flex flex-col w-full top-safe-offset-14 z-30
            ${headerOptionalClass}
            shadow-xs shadow-light-shadow/50 dark:shadow-dark-shadow/50`}
        >
          <PWABadge
            checkForUpdateInterval={60 * 60 * 1000}
            needRefreshMessage={t("need refresh")}
            offlineReadyMessage={t("offline ready")}
          />
          <ColorThemeParameters />
        </div>
        <div
          className={`flex px-4 py-2 justify-center items-center
            text-lg sm:text-xl md:text-2xl
            text-light-primary dark:text-dark-primary`}
        >
          Tailwind / React / Material design 3
        </div>
        <ComponentsDemo />
        <ColorThemeValues />
        <div className="flex flex-col items-center p-2 w-full">
          Ver. {version}
          <a href="https://github.com/MichinobuMaeda/xuan-paper">
            https://github.com/MichinobuMaeda/xuan-paper
          </a>
        </div>
      </main>
      {!drawerOpen &&
        (navVertical ? (
          <NavigationRail
            items={navItems}
            optionalClass={navRailOptionalClass}
          />
        ) : (
          <NavigationBar items={navItems} optionalClass={footerOptionalClass} />
        ))}

      <NavigationDrawer
        keep={drawerKeep}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={[
          {
            label: "Headline",
          },
          ...navItems,
          <hr key="divider" />,
          {
            icon: <SvgInfo />,
            label: "With badge",
            badge: <span className="text-xs">10</span>,
            onClick: () => {},
          },
          {
            label:
              "Without Icon, with long label text that should be truncated",
            onClick: () => {},
          },
        ]}
      />
      <Fab
        icon={<SvgEdit />}
        items={[
          {
            icon: <SvgInfo />,
            label: "Menu item #1",
            onClick: () => {},
          },
          {
            icon: <SvgInfo />,
            onClick: () => {},
          },
          {
            label: "Menu item #3",
            onClick: () => {},
            disabled: true,
          },
        ]}
        position={`fixed bottom-safe ${navVertical ? "mb-4" : "mb-20"} right-4 z-40`}
      />
    </div>
  );
}

export default App;
