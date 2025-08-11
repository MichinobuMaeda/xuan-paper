import {
  argbFromHex,
  DynamicScheme,
  Hct,
  hexFromArgb,
  TonalPalette,
  sanitizeDegreesDouble,
} from "@material/material-color-utilities";

/**
 * Generates a comprehensive Material Design color scheme from a seed color.
 * Creates both light and dark theme variants with all standard Material Design
 * color tokens including primary, secondary, tertiary, surface, and semantic colors.
 *
 * @param {string} seedColor - Hex color code (e.g., "#FF5722") to use
 * as the base for generating the entire color scheme
 * @param {number} contrast - Contrast level for the scheme
 *  (typically -1 to 1, where 0 is standard contrast)
 * @returns {Promise<Array<[string, Array<[string, string]>]>>}
 *  Promise resolving to an array of theme objects:
 *   - Each theme contains: [brightness, colorTokens]
 *   - brightness: "light" or "dark"
 *   - colorTokens: Array of [tokenName, hexColor] pairs
 *
 * @example
 * // Generate a blue-based theme with standard contrast
 * const scheme = await generateScheme("#1976D2", 0);
 * // Returns: [
 * //   ["light", [["primary", "#1976D2"], ["onPrimary", "#FFFFFF"], ...]],
 * //   ["dark", [["primary", "#90CAF9"], ["onPrimary", "#003258"], ...]]
 * // ]
 *
 * @example
 * // Generate a high-contrast green theme
 * const highContrastScheme = await generateScheme("#4CAF50", 0.5);
 *
 * @example
 * // Generate theme for brand colors
 * const brandColor = "#E91E63"; // Brand pink
 * const themeData = await generateScheme(brandColor, 0);
 * const [lightTheme, darkTheme] = themeData;
 */
export const generateScheme = async (seedColor, contrast) => {
  const sourceColorHct = Hct.fromInt(argbFromHex(seedColor));

  return [
    { key: "light", value: false },
    { key: "dark", value: true },
  ].map((brightness) => {
    const ds = new DynamicScheme({
      sourceColorHct,
      variant: "variant",
      contrastLevel: contrast,
      isDark: brightness.value,
      primaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0),
      secondaryPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
      tertiaryPalette: TonalPalette.fromHueAndChroma(
        sanitizeDegreesDouble(sourceColorHct.hue + 60.0),
        24.0,
      ),
      neutralPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 6.0),
      neutralVariantPalette: TonalPalette.fromHueAndChroma(
        sourceColorHct.hue,
        8.0,
      ),
    });

    return [
      brightness.key,
      [
        "primary",
        "surfaceTint",
        "onPrimary",
        "primaryContainer",
        "onPrimaryContainer",
        "secondary",
        "onSecondary",
        "secondaryContainer",
        "onSecondaryContainer",
        "tertiary",
        "onTertiary",
        "tertiaryContainer",
        "onTertiaryContainer",
        "error",
        "onError",
        "errorContainer",
        "onErrorContainer",
        "background",
        "onBackground",
        "surface",
        "onSurface",
        "surfaceVariant",
        "onSurfaceVariant",
        "outline",
        "outlineVariant",
        "shadow",
        "scrim",
        "inverseSurface",
        "inverseOnSurface",
        "inversePrimary",
        "primaryFixed",
        "onPrimaryFixed",
        "primaryFixedDim",
        "onPrimaryFixedVariant",
        "secondaryFixed",
        "onSecondaryFixed",
        "secondaryFixedDim",
        "onSecondaryFixedVariant",
        "tertiaryFixed",
        "onTertiaryFixed",
        "tertiaryFixedDim",
        "onTertiaryFixedVariant",
        "surfaceDim",
        "surfaceBright",
        "surfaceContainerLowest",
        "surfaceContainerLow",
        "surfaceContainer",
        "surfaceContainerHigh",
        "surfaceContainerHighest",
      ].map((key) => [key, hexFromArgb(ds[key])]),
    ];
  });
};

/**
 * Converts a Material Design color scheme into CSS custom properties (CSS variables).
 * Transforms the color scheme data into a CSS @theme block with properly named
 * CSS custom properties for both light and dark themes,
 * plus additional form-specific colors.
 *
 * @param {Array<[string, Array<[string, string]>]>} schema - Color scheme data
 *  from generateScheme():
 *   - Array of [brightness, colorTokens] pairs
 *   - brightness: "light" or "dark"
 *   - colorTokens: Array of [tokenName, hexColor] pairs
 * @returns {string} CSS string containing @theme block
 *  with all color custom properties
 *
 * @example
 * // Convert scheme to CSS
 * const scheme = await generateScheme("#1976D2", 0);
 * const cssTheme = generateThemeCss(scheme);
 * // Returns CSS like:
 * // "@theme {
 * //   --color-light-primary: #1976D2;
 * //   --color-light-on-primary: #FFFFFF;
 * //   --color-dark-primary: #90CAF9;
 * //   --color-dark-on-primary: #003258;
 * //   ...
 * // }"
 */
export const generateThemeCss = (schema) => {
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

  return css;
};
