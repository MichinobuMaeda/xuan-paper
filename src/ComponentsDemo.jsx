import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

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

import Section from "./layout/Section.jsx";
import Row from "./layout/Row.jsx";

const ComponentsDemo = () => {
  const { t } = useTranslation();

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

  const Result = ({ children }) => {
    return (
      <code className="flex flex-row w-full sm:w-auto sm:grow py-1 justify-end">
        {children}
      </code>
    );
  };

  const ItemGroup = ({ children }) => {
    return (
      <div className="flex flex-row gap-2 justify-items-start items-center">
        {children}
      </div>
    );
  };

  return (
    <Section
      label={t("components")}
      suffix={
        <Button
          icon={<SvgUndo />}
          style="outlined"
          onClick={reset}
          disabled={!changed}
          size="xs"
        />
      }
    >
      <Row>
        <Button
          label="Filled"
          style="filled"
          onClick={() => setBtn01("Filled")}
        />
        <Button label="Tonal" style="tonal" onClick={() => setBtn01("Tonal")} />
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
        <Result>[{btn01}]</Result>
      </Row>
      <Row>
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
        <Result>[{btn02}]</Result>
      </Row>
      <Row>
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
        <Result>[{btn03}]</Result>
      </Row>
      <Row>
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
      </Row>
      <Row>
        <ItemGroup>
          <CheckBox value={chk01a} onChange={(v) => setChk01a(v)} />
          <CheckBox
            label="Check 01"
            value={chk01b}
            onChange={(v) => setChk01b(v)}
          />
        </ItemGroup>
        <ItemGroup>
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
        </ItemGroup>
        <ItemGroup>
          <CheckBox value={chk03a} onChange={(v) => setChk03a(v)} disabled />
          <CheckBox
            label="Check 03"
            value={chk03b}
            onChange={(v) => setChk03b(v)}
            disabled
          />
        </ItemGroup>
        <Result>
          {chk(chk01a)}
          {chk(chk01b)}
          <span className="text-light-error dark:text-dark-error">
            {chk(chk02a)}
            {chk(chk02b)}
          </span>
          {chk(chk03a)}
          {chk(chk03b)}
        </Result>
      </Row>
      <Row>
        <ItemGroup>
          <Switch value={swt01a} onChange={(v) => setSwt01a(v)} />
          <Switch
            label="Switch 01"
            value={swt01b}
            onChange={(v) => setSwt01b(v)}
          />
        </ItemGroup>
        <ItemGroup>
          <Switch value={swt02a} onChange={(v) => setSwt02a(v)} disabled />
          <Switch
            label="Switch 02"
            value={swt02b}
            onChange={(v) => setSwt02b(v)}
            disabled
          />
        </ItemGroup>
        <Result>
          {chk(swt01a)}
          {chk(swt01b)}
          {chk(swt02a)}
          {chk(swt02b)}
        </Result>
      </Row>
      <Row>
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
        <Result>[{radio01}]</Result>
      </Row>
      <Row>
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
        <Result>
          [{btns01}] [{btns02.sort((a, b) => (a < b ? -1 : 1)).join(", ")}]
        </Result>
      </Row>
      <Row>
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
        <TextField
          label="Text 04"
          type="text"
          value="Input 04"
          message="Read only"
          onChange={(v) => {}}
          style="outlined"
          width="w-24"
          readonly
        />
        <TextField
          label="Text 05"
          type="text"
          value="Input 05"
          message="Disabled"
          onChange={(v) => {}}
          style="outlined"
          width="w-24"
          disabled
        />
        <Result>
          [{txt01}] [{txt02}] [{txt03}]
        </Result>
      </Row>
      <Row>
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
        <TextField
          label="Text 14"
          type="text"
          value="Input 14"
          message="Read only"
          onChange={(v) => {}}
          style="filled"
          width="w-24"
          readonly
        />
        <TextField
          label="Text 15"
          type="text"
          value="Input 15"
          message="Disabled"
          onChange={(v) => {}}
          style="filled"
          width="w-24"
          disabled
        />
        <Result>
          [{txt11}] [{txt12}] [{txt13}]
        </Result>
      </Row>
      <Row>
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
        <Result>
          [{pwd01}] [{pwd11}]
        </Result>
      </Row>
      <Row>
        <Slider value={sld01} onChange={(v) => setSld01(v)} />
        <Slider
          value={sld02}
          count={10}
          onChange={(v) => setSld02(v)}
          size="sm"
        />
        <Result>
          [{Math.round(sld01 * 100)}%] [{sld02}]
        </Result>
      </Row>
      <hr className="mx-2" />
    </Section>
  );
};

export default ComponentsDemo;
