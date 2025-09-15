import { useEffect } from "react";
import PropTypes from "prop-types";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import { hueAtom, contrastAtom, seedColorAtom, schemeAtom } from "./state.js";

import Slider from "../lib/Slider.jsx";
import SvgContrast from "./icons/SvgContrast.jsx";
import { generateScheme, applyColorScheme } from "../lib/material-theme.js";
import { isDarkBackground } from "./utils.js";

const ColorThemeParameters = () => {
  const [hue, setHue] = useAtom(hueAtom);
  const [contrast, setContrast] = useAtom(contrastAtom);
  const seedColor = useAtomValue(seedColorAtom);
  const setScheme = useSetAtom(schemeAtom);

  useEffect(() => {
    generateScheme(seedColor, contrast).then((scheme) => {
      setScheme(scheme);
      applyColorScheme(scheme);
    });
  }, [seedColor, contrast]);

  return (
    <div
      className={`flex flex-wrap px-2 gap-1 w-full justify-center
        bg-light-surface-container-lowest dark:bg-dark-surface-container-lowest
        text-light-on-surface dark:text-dark-on-surface`}
    >
      <div className="flex flex-row gap-2 items-center">
        <span
          className={`flex h-12 w-22 sm:w-24 justify-center items-center
            rounded-md gap-2 font-mono
            ${isDarkBackground(seedColor) ? "text-light-form" : "text-dark-form"}
          `}
          style={{ backgroundColor: seedColor }}
        >
          {seedColor}
        </span>
        <Slider value={hue} onChange={setHue} width="w-56 md:w-64 lg:w-84" />
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row w-22 sm:w-24 items-center gap-2 justify-end">
          <span className="flex size-8">
            <SvgContrast />
          </span>
          <span className="flex font-mono">{Number(contrast).toFixed(2)}</span>
        </div>
        <Slider
          value={contrast}
          onChange={setContrast}
          width="w-56 md:w-64 lg:w-84"
        />
      </div>
    </div>
  );
};

ColorThemeParameters.propTypes = {
  hue: PropTypes.number.isRequired,
  contrast: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorThemeParameters;
