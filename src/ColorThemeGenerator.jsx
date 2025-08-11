import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import Button from "./xuan-paper/Button.jsx";
import Slider from "./xuan-paper/Slider.jsx";

import SvgUndo from "./icons/SvgUndo.jsx";
import SvgDownload from "./icons/SvgDownload.jsx";

import Section from "./layout/Section.jsx";
import Row from "./layout/Row.jsx";
import { generateScheme, generateThemeCss } from "./material-theme.js";
import { hslToHex, isDarkBackground, downloadFile } from "./utils.js";

const ColorThemeGenerator = () => {
  const { t } = useTranslation();

  const iniC = 0;
  const iniH = 0.4;
  const [c, setC] = useState(iniC);
  const [h, setH] = useState(iniH);
  const [schema, setSchema] = useState([]);

  const hexColor = useMemo(() => hslToHex(Math.round(h * 360)));

  useEffect(() => {
    generateScheme(hexColor, Number(Math.round(c * 100) / 100).toFixed(2)).then(
      (ret) => setSchema(ret),
    );
  }, [h, c]);

  const downloadThemeCss = () =>
    downloadFile("theme.css", generateThemeCss(schema));

  return (
    <>
      <Section
        label={t("color theme")}
        suffix={
          <Button
            icon={<SvgUndo />}
            style="outlined"
            onClick={() => {
              setH(iniH);
              setC(iniC);
            }}
            disabled={h === iniH && c === iniC}
            size="xs"
          />
        }
      >
        <Row>
          <span className="flex h-10 w-20 items-end">
            {t("hue")}: {Math.round(h * 360)}
          </span>
          <span
            className={`flex h-10 w-32 justify-center items-center rounded-md
                gap-2 font-mono ${
                  isDarkBackground(hexColor)
                    ? "text-light-form"
                    : "text-dark-form"
                }`}
            style={{
              backgroundColor: hexColor,
            }}
          >
            {hexColor}
          </span>
          <div className="hidden sm:flex justify-end grow">
            <Button
              icon={<SvgDownload />}
              label="theme.css"
              style="outlined"
              onClick={downloadThemeCss}
            />
          </div>
          <div className="flex sm:hidden justify-end grow">
            <Button
              icon={<SvgDownload />}
              style="outlined"
              onClick={downloadThemeCss}
            />
          </div>
          <Slider value={h} onChange={(v) => setH(v)} width="w-full" />
          {t("contrast")}: {Number(c).toFixed(2)}
          <Slider value={c} onChange={(v) => setC(v)} width="w-full" />
        </Row>
      </Section>
      <div className="flex flex-col md:flex-row sm:px-2 gap-2 w-full justify-center">
        {schema.map(([brightness, colors]) => (
          <div className="flex flex-col gap-0">
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

export default ColorThemeGenerator;
