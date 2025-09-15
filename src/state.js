import { atom } from "jotai";
import { hslToHex } from "../lib/material-theme.js";

export const iniHue = 0.4;
export const iniContrast = 0;

export const hueAtom = atom(iniHue);
export const contrastAtom = atom(iniContrast);
export const schemeAtom = atom([]);
export const seedColorAtom = atom((get) => {
  const hue = get(hueAtom);
  return hslToHex(Math.round(hue * 360));
});
export const colorChangedAtom = atom((get) => {
  const hue = get(hueAtom);
  const contrast = get(contrastAtom);
  return hue !== iniHue || contrast !== iniContrast;
});

export const demoValueResetAtom = atom(true);
