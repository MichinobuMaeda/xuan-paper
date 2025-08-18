import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useAtomValue } from "jotai";
import { schemeAtom } from "./state.js";

import { isDarkBackground } from "./utils.js";

const ColorThemeValues = () => {
  const { t } = useTranslation();
  const scheme = useAtomValue(schemeAtom);

  return (
    <>
      <h2>{t("theme color")}</h2>
      <div className="flex flex-col md:flex-row sm:px-2 py-2 gap-2 w-full justify-center">
        {scheme.map(([brightness, colors]) => (
          <div className="flex flex-col gap-0" key={brightness}>
            {colors.map(([key, hex]) => (
              <div
                key={`${brightness}:${key}`}
                className={`flex flex-wrap w-full px-2 gap-2 sm:gap-4
                  font-mono text-sm sm:text-base ${
                    isDarkBackground(hex) ? "text-light-form" : "text-dark-form"
                  }`}
                style={{ backgroundColor: hex }}
              >
                <div className="flex flex-row grow">
                  {brightness}:{key}
                </div>
                <div className="flex flex-row">{hex}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

ColorThemeValues.propTypes = {
  schema: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
    ),
  ).isRequired,
};

export default ColorThemeValues;
