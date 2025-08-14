import { useState, useMemo, useEffect } from "react";

import Button from "./xuan-paper/Button.jsx";

import SvgResetSettings from "./icons/SvgResetSettings.jsx";
import SvgDownload from "./icons/SvgDownload.jsx";

import "./App.css";
import PWABadge from "./PWABadge.jsx";

import ToggleLanguageButton from "./layout/ToggleLanguageButton.jsx";
import ToggleDarkModeButton from "./layout/ToggleDarkModeButton.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";

import ColorThemeParameters from "./ColorThemeParameters.jsx";
import ComponentsDemo from "./ComponentsDemo.jsx";
import ColorThemeValues from "./ColorThemeValues.jsx";

import { generateScheme, generateThemeCss } from "./material-theme.js";
import { hslToHex, downloadFile } from "./utils.js";

function App() {
  const iniHue = 0.4;
  const iniContrast = 0;
  const [hue, setHue] = useState(iniHue);
  const [contrast, setContrast] = useState(iniContrast);
  const [schema, setSchema] = useState([]);

  const seedColor = useMemo(() => hslToHex(Math.round(hue * 360)));

  const resetColorThemeParameters = () => {
    setHue(iniHue);
    setContrast(iniContrast);
  };

  // Generate color schema async
  useEffect(() => {
    generateScheme(
      seedColor,
      Number(Math.round(contrast * 100) / 100).toFixed(2),
    ).then((ret) => setSchema(ret));
  }, [hue, contrast]);

  // Apply color schema to all components
  useEffect(() => {
    schema.forEach(([brightness, colors]) =>
      colors.forEach(([key, hex]) => {
        document.documentElement.style.setProperty(
          `--color-${brightness}-${key.replace(
            /[A-Z]+(?![a-z])|[A-Z]/g,
            ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
          )}`,
          hex,
        );
      }),
    );
  }, [schema]);

  const downloadThemeCss = () =>
    downloadFile("theme.css", generateThemeCss(schema));

  return (
    <div className="flex flex-col items-center">
      <Header
        title="Xuan Paper"
        suffix={
          <div className="flex flex-row items-center gap-4">
            <Button
              icon={<SvgResetSettings />}
              style="embedded"
              onClick={resetColorThemeParameters}
              disabled={hue === iniHue && contrast === iniContrast}
            />
            <div className="hidden sm:flex">
              <Button
                icon={<SvgDownload />}
                label="CSS"
                style="embedded"
                onClick={downloadThemeCss}
              />
            </div>
            <div className="flex sm:hidden">
              <Button
                icon={<SvgDownload />}
                style="embedded"
                onClick={downloadThemeCss}
              />
            </div>
            <ToggleLanguageButton />
            <ToggleDarkModeButton />
          </div>
        }
        bottom={
          <>
            <PWABadge />
            <ColorThemeParameters
              hue={hue}
              contrast={contrast}
              onChange={({ hue, contrast }) => {
                setHue(hue);
                setContrast(contrast);
              }}
            />
          </>
        }
      />

      <main
        className={`flex flex-col pb-6 gap-2 w-full sm:max-w-[1024px]
          bg-light-form dark:bg-dark-form
          text-light-on-form dark:text-dark-on-form`}
      >
        <div
          className={`flex px-4 py-2 justify-center items-center
            text-lg sm:text-xl md:text-2xl
            text-light-primary dark:text-dark-primary`}
        >
          Tailwind / React / Material design 3
        </div>
        <ComponentsDemo />
        <ColorThemeValues schema={schema} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
