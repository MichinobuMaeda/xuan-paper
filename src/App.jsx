import { useState, useMemo, useEffect } from "react";

import "./App.css";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import PWABadge from "./PWABadge.jsx";

import Button from "./xuan-paper/Button.jsx";
import CheckBox from "./xuan-paper/CheckBox.jsx";
import Switch from "./xuan-paper/Switch.jsx";
import RadioGroup from "./xuan-paper/RadioGroup.jsx";
import ButtonGroup from "./xuan-paper/ButtonGroup.jsx";
import TextField from "./xuan-paper/TextField.jsx";
import PasswordField from "./xuan-paper/PasswordField.jsx";
import Slider from "./xuan-paper/Slider.jsx";

import SvgUndo from "./icons/SvgUndo.jsx";
import SvgInfo from "./icons/SvgInfo.jsx";
import SvgClose from "./icons/SvgClose.jsx";
import SvgDirectionsCar from "./icons/SvgDirectionsCar.jsx";
import SvgDirectionsWalk from "./icons/SvgDirectionsWalk.jsx";
import SvgDownload from "./icons/SvgDownload.jsx";

import { generateScheme } from "./material-theme.js";

function App() {
  const [btn01, setBtn01] = useState("--");
  const [btn02, setBtn02] = useState("--");
  const [btn03, setBtn03] = useState("--");
  const [chk01a, setChk01a] = useState(false);
  const [chk01b, setChk01b] = useState(true);
  const [chk02a, setChk02a] = useState(false);
  const [chk02b, setChk02b] = useState(true);
  const [chk03a, setChk03a] = useState(false);
  const [chk03b, setChk03b] = useState(true);
  const [swt01a, setSwt01a] = useState(false);
  const [swt01b, setSwt01b] = useState(true);
  const [swt02a, setSwt02a] = useState(false);
  const [swt02b, setSwt02b] = useState(true);
  const [radio01, setRadio01] = useState("Item 01");
  const [btns01, setBtns01] = useState("Car");
  const [btns02, setBtns02] = useState(["A", "C"]);
  const [txt01, setTxt01] = useState("");
  const [txt02, setTxt02] = useState("Input 02");
  const [txt03, setTxt03] = useState(0);
  const [txt11, setTxt11] = useState("");
  const [txt12, setTxt12] = useState("Input 12");
  const [txt13, setTxt13] = useState(0);
  const [pwd01, setPWd01] = useState("P@ssw0rd");
  const [pwd11, setPWd11] = useState("P@ssw0rd");
  const [sld01, setSld01] = useState(0.5);
  const [sld02, setSld02] = useState(5);

  const changed = useMemo(
    () =>
      btn01 !== "--" ||
      btn02 !== "--" ||
      btn03 !== "--" ||
      chk01a ||
      !chk01b ||
      chk02a ||
      !chk02b ||
      chk03a ||
      !chk03b ||
      swt01a ||
      !swt01b ||
      swt02a ||
      !swt02b ||
      radio01 !== "Item 01" ||
      btns01 !== "Car" ||
      btns02.length !== 2 ||
      ["A", "C"].some((i) => !btns02.includes(i)) ||
      txt01 !== "" ||
      txt02 !== "Input 02" ||
      txt03 !== 0 ||
      txt11 !== "" ||
      txt12 !== "Input 12" ||
      txt13 !== 0 ||
      pwd01 !== "P@ssw0rd" ||
      pwd11 !== "P@ssw0rd" ||
      sld01 !== 0.5 ||
      sld02 !== 5,
    [
      btn01,
      btn02,
      btn03,
      chk01a,
      chk01b,
      chk02a,
      chk02b,
      chk03a,
      chk03b,
      swt01a,
      swt01b,
      swt02a,
      swt02b,
      radio01,
      btns01,
      btns02,
      txt01,
      txt02,
      txt03,
      txt11,
      txt12,
      txt13,
      pwd01,
      pwd11,
      sld01,
      sld02,
    ],
  );

  const reset = () => {
    setBtn01("--");
    setBtn02("--");
    setBtn03("--");
    setChk01a(false);
    setChk01b(true);
    setChk02a(false);
    setChk02b(true);
    setChk03a(false);
    setChk03b(true);
    setSwt01a(false);
    setSwt01b(true);
    setSwt02a(false);
    setSwt02b(true);
    setRadio01("Item 01");
    setBtns01("Car");
    setBtns02(["A", "C"]);
    setTxt01("");
    setTxt02("Input 02");
    setTxt03(0);
    setTxt11("");
    setTxt12("Input 12");
    setTxt13(0);
    setPWd01("P@ssw0rd");
    setPWd11("P@ssw0rd");
    setSld01(0.5);
    setSld02(5);
  };

  const chk = (v) => (v ? "[v]" : "[ ]");

  const iniC = 0;
  const iniH = 0.4;
  const [c, setC] = useState(iniC);
  const [h, setH] = useState(iniH);
  const [schema, setSchema] = useState([]);

  const darkBackground = (hex) =>
    (Number(`0x${hex.slice(1, 3)}`) * 1.1 +
      Number(`0x${hex.slice(3, 5)}`) * 1.3 +
      Number(`0x${hex.slice(5, 7)}`) / 1.5) /
      3 <
    112;

  const hslToHex = (h, s = 100, l = 50) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hexColor = useMemo(() => hslToHex(Math.round(h * 360)));

  useEffect(() => {
    generateScheme(hexColor, Number(Math.round(c * 100) / 100).toFixed(2)).then(
      (ret) => setSchema(ret),
    );
  }, [h, c]);

  const downloadFile = (filename, content) => {
    const data = new Blob([content]);
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const downloadThemeCss = () => {
    let css = "@theme {\n";

    schema.forEach(([brightness, colors]) =>
      colors.forEach(([key, hex]) => {
        css += `  --color-${brightness}-${key.replace(
          /[A-Z]+(?![a-z])|[A-Z]/g,
          ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
        )}: ${hex};\n`;
      }),
    );

    css += `
  --color-light-link: var(--color-blue-700);
  --color-dark-link: var(--color-blue-300);
  --color-light-form: var(--color-light-surface-container-lowest);
  --color-light-on-form: var(--color-dark-surface-container-lowest);
  --color-dark-form: var(--color-light-on-surface);
  --color-dark-on-form: var(--color-dark-on-surface);
`;

    css += "}\n";

    downloadFile("theme.css", css);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col pt-2 pb-6 gap-2 bg-light-form dark:bg-dark-form text-light-on-form dark:text-dark-on-form">
        <div className="flex flex-wrap px-2 gap-2 justify-start text-light-tertiary dark:text-dark-tertiary">
          Tailwind / React / Material design 3
        </div>
        <div
          className={`flex flex-wrap px-4 py-1 mb-2 gap-2 justify-start
            text-xl sticky top-10 z-20
            bg-light-tertiary-container dark:bg-dark-tertiary-container
            text-light-on-tertiary-container dark:text-dark-on-tertiary-container`}
        >
          <div className="flex grow">Components</div>
          <Button
            icon={<SvgUndo />}
            style="outlined"
            onClick={reset}
            disabled={!changed}
            size="xs"
          />
        </div>
        <div className="flex flex-wrap p-2 gap-2 justify-items-start items-center">
          <Button
            label="Filled"
            style="filled"
            onClick={() => setBtn01("Filled")}
          />
          <Button
            label="Tonal"
            style="tonal"
            onClick={() => setBtn01("Tonal")}
          />
          <Button
            label="Outlined"
            style="outlined"
            onClick={() => setBtn01("Outlined")}
          />
          <Button
            label="Elevated"
            style="elevated"
            onClick={() => setBtn01("Elevated")}
          />
          <Button label="Text" style="text" onClick={() => setBtn01("Text")} />
          <Button
            label="Danger"
            style="danger"
            onClick={() => setBtn01("Danger")}
          />
          <Button
            label="Disabled"
            onClick={() => setBtn01("Disabled")}
            disabled
          />
          <code className="flex flex-row grow p-1 justify-end">[{btn01}]</code>
        </div>
        <div className="flex flex-wrap p-2 gap-2 justify-items-start items-center">
          <Button
            icon={<SvgInfo />}
            label="Filled"
            style="filled"
            onClick={() => setBtn02("Filled")}
          />
          <Button
            icon={<SvgInfo />}
            label="Tonal"
            style="tonal"
            onClick={() => setBtn02("Tonal")}
          />
          <Button
            icon={<SvgInfo />}
            label="Outlined"
            style="outlined"
            onClick={() => setBtn02("Outlined")}
          />
          <Button
            icon={<SvgInfo />}
            label="Elevated"
            style="elevated"
            onClick={() => setBtn02("Elevated")}
          />
          <Button
            icon={<SvgInfo />}
            label="Text"
            style="text"
            onClick={() => setBtn02("Text")}
          />
          <Button
            icon={<SvgInfo />}
            label="Danger"
            style="danger"
            onClick={() => setBtn02("Danger")}
          />
          <Button
            icon={<SvgInfo />}
            label="Disabled"
            onClick={() => setBtn02("Disabled")}
            disabled
          />
          <code className="flex flex-row grow p-1 justify-end">[{btn02}]</code>
        </div>
        <div className="flex flex-wrap p-2 gap-2">
          <Button
            icon={<SvgInfo />}
            style="filled"
            onClick={() => setBtn03("Filled")}
          />
          <Button
            icon={<SvgInfo />}
            style="tonal"
            onClick={() => setBtn03("Tonal")}
          />
          <Button
            icon={<SvgInfo />}
            style="outlined"
            onClick={() => setBtn03("Outlined")}
          />
          <Button
            icon={<SvgInfo />}
            style="elevated"
            onClick={() => setBtn03("Elevated")}
          />
          <Button
            icon={<SvgInfo />}
            style="text"
            onClick={() => setBtn03("Text")}
          />
          <Button
            icon={<SvgInfo />}
            style="danger"
            onClick={() => setBtn03("Danger")}
          />
          <Button
            icon={<SvgInfo />}
            onClick={() => setBtn03("Disabled")}
            disabled
          />
          <Button onClick={() => setBtn03("Empty")} />
          <code className="flex flex-row grow p-1 justify-end">[{btn03}]</code>
        </div>
        <div className="flex flex-wrap p-2 gap-2 justify-items-start items-center">
          <Button
            icon={<SvgInfo />}
            label="Medium"
            style="filled"
            onClick={() => {}}
            size="md"
          />
          <Button
            icon={<SvgInfo />}
            label="Small"
            style="filled"
            onClick={() => {}}
            size="sm"
          />
          <Button
            icon={<SvgInfo />}
            label="X Small"
            style="filled"
            onClick={() => {}}
            size="xs"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-items-start items-center">
          <div className="flex flex-row p-2 gap-2 justify-items-start items-center">
            <CheckBox value={chk01a} onChange={(v) => setChk01a(v)} />
            <CheckBox
              label="Check 01"
              value={chk01b}
              onChange={(v) => setChk01b(v)}
            />
          </div>
          <div className="flex flex-row p-2 gap-2 justify-items-start items-center">
            <CheckBox
              value={chk02a}
              onChange={(v) => setChk02a(v)}
              style="danger"
            />
            <CheckBox
              label="Check 02"
              value={chk02b}
              onChange={(v) => setChk02b(v)}
              style="danger"
            />
          </div>
          <div className="flex flex-row p-2 gap-2 justify-items-start items-center">
            <CheckBox value={chk03a} onChange={(v) => setChk03a(v)} disabled />
            <CheckBox
              label="Check 03"
              value={chk03b}
              onChange={(v) => setChk03b(v)}
              disabled
            />
          </div>
          <code className="flex flex-row grow p-1 justify-end">
            {chk(chk01a)}
            {chk(chk01b)}
            <span className="text-light-error dark:text-dark-error">
              {chk(chk02a)}
              {chk(chk02b)}
            </span>
            {chk(chk03a)}
            {chk(chk03b)}
          </code>
        </div>
        <div className="flex flex-wrap gap-2 justify-items-start items-center">
          <div className="flex flex-row p-2 gap-2 justify-items-start items-center">
            <Switch value={swt01a} onChange={(v) => setSwt01a(v)} />
            <Switch
              label="Switch 01"
              value={swt01b}
              onChange={(v) => setSwt01b(v)}
            />
          </div>
          <div className="flex flex-row p-2 gap-2 justify-items-start items-center">
            <Switch value={swt02a} onChange={(v) => setSwt02a(v)} disabled />
            <Switch
              label="Switch 02"
              value={swt02b}
              onChange={(v) => setSwt02b(v)}
              disabled
            />
          </div>
          <code className="flex flex-row grow p-1 justify-end">
            {chk(swt01a)}
            {chk(swt01b)}
            {chk(swt02a)}
            {chk(swt02b)}
          </code>
        </div>
        <div className="flex flex-wrap p-2 gap-2 justify-items-start items-center">
          <RadioGroup
            name="radio01"
            value={radio01}
            items={[
              { value: "Item 01", label: "Item 01" },
              { value: "Item 02", label: "Item 02" },
              { value: "Item 03", label: "Item 03" },
            ]}
            onChange={(v) => setRadio01(v)}
            layout="horizontal"
          />
          <code className="flex flex-row grow p-1 justify-end">
            [{radio01}]
          </code>
        </div>
        <div className="flex flex-wrap p-2 gap-4 justify-items-start items-center">
          <ButtonGroup
            name="button-group01"
            value={btns01}
            items={[
              { value: "Car", label: "Car", icon: <SvgDirectionsCar /> },
              { value: "Bicycle", label: "Bicycle" },
              { value: "Walk", icon: <SvgDirectionsWalk /> },
            ]}
            onChange={(v) => setBtns01(v)}
          />
          <ButtonGroup
            name="button-group02"
            value={btns02}
            items={[
              { value: "A", label: "A" },
              { value: "B", label: "B" },
              { value: "C", label: "C" },
              { value: "D", label: "D" },
              { value: "E", label: "E" },
            ]}
            onChange={(v) => setBtns02(v)}
            multiSelect
          />
          <code className="flex flex-row grow p-1 justify-end">
            [{btns01}] [{btns02.sort((a, b) => (a < b ? -1 : 1)).join(", ")}]
          </code>
        </div>
        <div className="flex flex-wrap p-2 gap-2">
          <TextField
            label="Text 01"
            value={txt01}
            onChange={(v) => setTxt01(v)}
            width="w-32"
          />
          <TextField
            label="Text 02"
            value={txt02}
            prefix={
              <Button icon={<SvgInfo />} style="embed" onClick={() => {}} />
            }
            suffix={
              txt02 !== "Input 02" && (
                <Button
                  icon={<SvgClose />}
                  style="embed"
                  onClick={() => setTxt02("Input 02")}
                />
              )
            }
            message="Message 02"
            error={txt02 ? null : "Required"}
            onChange={(v) => setTxt02(v)}
            width="w-48"
          />
          <TextField
            label="Text 03"
            type="number"
            value={txt03}
            message="Greater than 0"
            error={txt03 <= 0 && "Greater than 0"}
            onChange={(v) => setTxt03(v)}
            width="w-28"
            fontFamily="font-mono"
          />
          <code className="flex flex-row grow p-1 justify-end">
            [{txt01}] [{txt02}] [{txt03}]
          </code>
        </div>
        <div className="flex flex-wrap p-2 gap-2">
          <TextField
            label="Text 11"
            value={txt11}
            onChange={(v) => setTxt11(v)}
            style="filled"
            width="w-32"
          />
          <TextField
            label="Text 12"
            value={txt12}
            prefix={
              <Button icon={<SvgInfo />} style="embed" onClick={() => {}} />
            }
            suffix={
              txt12 !== "Input 12" && (
                <Button
                  icon={<SvgClose />}
                  style="embed"
                  onClick={() => setTxt12("Input 12")}
                />
              )
            }
            message="Message 04"
            error={txt12 ? null : "Required"}
            onChange={(v) => setTxt12(v)}
            style="filled"
            width="w-48"
          />
          <TextField
            label="Text 13"
            type="number"
            value={txt13}
            message="Greater than 0"
            error={txt13 <= 0 && "Greater than 0"}
            onChange={(v) => setTxt13(v)}
            style="filled"
            width="w-28"
            fontFamily="font-mono"
          />
          <code className="flex flex-row grow p-1 justify-end">
            [{txt11}] [{txt12}] [{txt13}]
          </code>
        </div>
        <div className="flex flex-wrap p-2 gap-2">
          <PasswordField
            value={pwd01}
            label="Password"
            message="At least 8 characters"
            error={pwd01.length < 8 && "At least 8 characters"}
            onChange={(v) => setPWd01(v)}
            style="outlined"
            width="w-44"
          />
          <PasswordField
            value={pwd11}
            label="Password"
            message="At least 8 characters"
            error={pwd11.length < 8 && "At least 8 characters"}
            onChange={(v) => setPWd11(v)}
            style="filled"
            width="w-44"
          />
          <code className="flex flex-row grow p-1 justify-end">
            [{pwd01}] [{pwd11}]
          </code>
        </div>
        <div className="flex flex-wrap p-2 gap-2">
          <Slider value={sld01} onChange={(v) => setSld01(v)} />
          <Slider
            value={sld02}
            count={10}
            onChange={(v) => setSld02(v)}
            size="sm"
          />
          <code className="flex flex-row grow p-1 justify-end">
            [{Math.round(sld01 * 100)}%] [{sld02}]
          </code>
        </div>

        <div
          className={`flex flex-wrap px-4 py-1 mb-2 gap-2 justify-start
            text-xl sticky top-10 z-20
            bg-light-tertiary-container dark:bg-dark-tertiary-container
            text-light-on-tertiary-container dark:text-dark-on-tertiary-container`}
        >
          <div className="flex grow">Color theme</div>
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
        </div>
        <div className="flex flex-wrap px-6 gap-2 justify-start items-center">
          <div
            className={`flex h-12 w-32 justify-center items-center rounded-md
               font-mono ${
                 darkBackground(hexColor) ? "text-light-form" : "text-dark-form"
               }`}
            style={{
              backgroundColor: hexColor,
            }}
          >
            {hexColor}
          </div>
          <div className="flow grow">Hue: {Math.round(h * 360)}</div>
          <div className="hidden sm:flex">
            <Button
              icon={<SvgDownload />}
              label="theme.css"
              style="outlined"
              onClick={downloadThemeCss}
            />
          </div>
          <div className="flex sm:hidden">
            <Button
              icon={<SvgDownload />}
              style="outlined"
              onClick={downloadThemeCss}
            />
          </div>
        </div>
        <div className="flex flex-col px-2 gap-2 items-start">
          <Slider value={h} onChange={(v) => setH(v)} width="w-full" />
        </div>
        <div className="flex flex-col px-2 gap-2 items-start">
          <div className="flex px-6">Contrast: {Number(c).toFixed(2)}</div>
          <Slider value={c} onChange={(v) => setC(v)} width="w-full" />
        </div>
        <hr className="mx-2 my-4" />
        <div className="flex flex-col w-full px-2 gap-0 items-start">
          {schema.map(([brightness, colors]) =>
            colors.map(([key, hex]) => (
              <div
                key={`${brightness}:${key}`}
                className={`flex flex-wrap w-full
                  font-mono text-sm sm:text-base ${
                    darkBackground(hex) ? "text-light-form" : "text-dark-form"
                  }`}
                style={{ backgroundColor: hex }}
              >
                <div className="flex flex-row px-2 grow">
                  {brightness}:{key}
                </div>
                <div className="flex flex-row px-2">{hex}</div>
              </div>
            )),
          )}
        </div>
      </main>
      <PWABadge />
      <Footer />
    </>
  );
}

export default App;
