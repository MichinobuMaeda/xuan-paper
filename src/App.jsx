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

import "./App.css";
import PWABadge from "./xuan-paper/PWABadge.jsx";
import appLogo from "/favicon.svg";

import ColorThemeParameters from "./ColorThemeParameters.jsx";
import ComponentsDemo from "./ComponentsDemo.jsx";
import ColorThemeValues from "./ColorThemeValues.jsx";
import { downloadFile } from "./utils.js";

const appName = "Xuan Paper";
const cssFileName = "theme.css";

function App() {
  const { t } = useTranslation();

  const setHue = useSetAtom(hueAtom);
  const [contrast, setContrast] = useAtom(contrastAtom);
  const seedColor = useAtomValue(seedColorAtom);
  const scheme = useAtomValue(schemeAtom);
  const colorChanged = useAtomValue(colorChangedAtom);

  const resetColor = () => {
    setHue(iniHue);
    setContrast(iniContrast);
  };

  const downloadThemeCss = () =>
    downloadFile(cssFileName, generateThemeCss(scheme, seedColor, contrast));

  const [demoValueReset, setDemoValueReset] = useAtom(demoValueResetAtom);

  const [scrollDirection, setScrollDirection] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  window.addEventListener("scroll", () => {
    if (lastScrollY !== 0) {
      setScrollDirection(window.scrollY - lastScrollY);
    }
    setLastScrollY(window.scrollY);
  });

  const headerOptionalClass = `sticky top-0
    transition-all duration-500 z-30
    ${scrollDirection > 0 ? `-translate-y-14 3xl:translate-0` : ""}`;

  const appBarOptionalClass = `h-14 w-full ${headerOptionalClass}`;

  const footerOptionalClass = `sticky bottom-0 h-16 w-full
    transition-all duration-500 z-30
    ${scrollDirection < 0 ? `translate-y-16 3xl:translate-0` : ""}`;

  const [navVertical, setNavVertical] = useState(false);

  const navRailOptionalClass = `h-full w-24 lg:w-56 fixed top-0 pt-20 pb-20`;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerKeep, setDrawerKeep] = useState(false);

  const navItems = [
    drawerOpen
      ? drawerKeep
        ? {
            icon: <SvgKeep />,
            label: "Wide fixed layout",
            active: true,
            onClick: () => {
              setDrawerKeep(false);
            },
          }
        : {
            icon: <SvgKeepOff />,
            label: "Narrow floating layout",
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
    <>
      <AppBar
        backArrow={
          <AppBarItem icon={<SvgArrowBackIos />} disabled onClick={() => {}} />
        }
        navigationDrawer={
          !drawerKeep && (
            <AppBarItem
              icon={
                /* Material icon 'Menu' */
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
        optionalClass={appBarOptionalClass}
      />

      <main
        className={`flex flex-col pb-8 gap-2 w-full
          ${drawerKeep ? "pl-84" : navVertical ? "pl-24 lg:pl-56" : ""}`}
      >
        <div
          className={`flex flex-col w-full top-14 ${headerOptionalClass}
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
        <div className="flex flex-row justify-center p-4 w-full">
          <a
            className="text-sm text-light-link dark:text-dark-link"
            href="https://github.com/MichinobuMaeda/xuan-paper"
          >
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
        backArrow={
          <AppBarItem icon={<SvgArrowBackIos />} disabled onClick={() => {}} />
        }
        appLogo={
          <img
            src={appLogo}
            className="size-10 min-w-10"
            alt={`${appName} logo`}
          />
        }
        appName={appName}
        keep={drawerKeep}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={[
          ...navItems,
          <hr key="divider" />,
          {
            icon: <SvgInfo />,
            label: "With badge",
            badge: <span className="text-xs">10</span>,
          },
          {
            label:
              "Without Icon, with long label text that should be truncated",
          },
        ]}
      />
    </>
  );
}

export default App;
