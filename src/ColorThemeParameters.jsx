import { useMemo } from "react";
import PropTypes from "prop-types";

import Slider from "./xuan-paper/Slider.jsx";
import SvgContrast from "./icons/SvgContrast.jsx";

import { hslToHex, isDarkBackground } from "./utils.js";

const ColorThemeParameters = ({ hue, contrast, onChange }) => {
  const hexColor = useMemo(() => hslToHex(Math.round(hue * 360)));

  return (
    <div
      className={`flex flex-wrap px-2 py-2 gap-1 w-full justify-center
        bg-light-background dark:bg-dark-background
        text-light-on-background dark:text-dark-on-background`}
    >
      <div className="flex flex-row gap-2">
        <span
          className={`flex h-12 w-24 justify-center items-center
            rounded-md gap-2 font-mono
            ${isDarkBackground(hexColor) ? "text-light-form" : "text-dark-form"}
          `}
          style={{ backgroundColor: hexColor }}
        >
          {hexColor}
        </span>
        <Slider
          value={hue}
          onChange={(v) => onChange({ hue: v, contrast })}
          width="w-56 md:w-64 lg:w-96"
        />
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row w-24 items-center gap-2 justify-end">
          <span className="flex size-8">
            <SvgContrast />
          </span>
          <span className="flex font-mono">{Number(contrast).toFixed(2)}</span>
        </div>
        <Slider
          value={contrast}
          onChange={(v) => onChange({ hue, contrast: v })}
          width="w-56 md:w-64 lg:w-96"
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
