/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the Material Color Utilities before importing the functions
vi.mock("@material/material-color-utilities", () => ({
  argbFromHex: vi.fn(),
  DynamicScheme: vi.fn(),
  Hct: {
    fromInt: vi.fn(),
  },
  hexFromArgb: vi.fn(),
  TonalPalette: {
    fromHueAndChroma: vi.fn(),
  },
  sanitizeDegreesDouble: vi.fn(),
}));

import {
  generateScheme,
  applyColorScheme,
  generateThemeCss,
  convertToVariables,
} from "../../../src/xuan-paper/material-theme.js";

// Import the mocked modules for setup
import {
  argbFromHex,
  DynamicScheme,
  Hct,
  hexFromArgb,
  TonalPalette,
  sanitizeDegreesDouble,
} from "@material/material-color-utilities";

describe("material-theme utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementations
    argbFromHex.mockReturnValue(0xff1976d2);

    Hct.fromInt.mockReturnValue({
      hue: 210,
      chroma: 48,
      tone: 45,
    });

    hexFromArgb.mockImplementation((argb) => {
      // Mock different colors for different properties
      const colorMap = {
        primary: "#1976D2",
        onPrimary: "#FFFFFF",
        primaryContainer: "#BBDEFB",
        background: "#FAFAFA",
        surface: "#FFFFFF",
        secondary: "#1565C0",
        tertiary: "#7B1FA2",
        error: "#D32F2F",
      };
      return colorMap[argb] || "#000000";
    });

    TonalPalette.fromHueAndChroma.mockReturnValue({
      tone: vi.fn().mockReturnValue(0xff000000),
    });

    sanitizeDegreesDouble.mockImplementation((degrees) => degrees % 360);

    // Mock DynamicScheme constructor
    DynamicScheme.mockImplementation(() => ({
      primary: "primary",
      surfaceTint: "surfaceTint",
      onPrimary: "onPrimary",
      primaryContainer: "primaryContainer",
      onPrimaryContainer: "onPrimaryContainer",
      secondary: "secondary",
      onSecondary: "onSecondary",
      secondaryContainer: "secondaryContainer",
      onSecondaryContainer: "onSecondaryContainer",
      tertiary: "tertiary",
      onTertiary: "onTertiary",
      tertiaryContainer: "tertiaryContainer",
      onTertiaryContainer: "onTertiaryContainer",
      error: "error",
      onError: "onError",
      errorContainer: "errorContainer",
      onErrorContainer: "onErrorContainer",
      background: "background",
      onBackground: "onBackground",
      surface: "surface",
      onSurface: "onSurface",
      surfaceVariant: "surfaceVariant",
      onSurfaceVariant: "onSurfaceVariant",
      outline: "outline",
      outlineVariant: "outlineVariant",
      shadow: "shadow",
      scrim: "scrim",
      inverseSurface: "inverseSurface",
      inverseOnSurface: "inverseOnSurface",
      inversePrimary: "inversePrimary",
      primaryFixed: "primaryFixed",
      onPrimaryFixed: "onPrimaryFixed",
      primaryFixedDim: "primaryFixedDim",
      onPrimaryFixedVariant: "onPrimaryFixedVariant",
      secondaryFixed: "secondaryFixed",
      onSecondaryFixed: "onSecondaryFixed",
      secondaryFixedDim: "secondaryFixedDim",
      onSecondaryFixedVariant: "onSecondaryFixedVariant",
      tertiaryFixed: "tertiaryFixed",
      onTertiaryFixed: "onTertiaryFixed",
      tertiaryFixedDim: "tertiaryFixedDim",
      onTertiaryFixedVariant: "onTertiaryFixedVariant",
      surfaceDim: "surfaceDim",
      surfaceBright: "surfaceBright",
      surfaceContainerLowest: "surfaceContainerLowest",
      surfaceContainerLow: "surfaceContainerLow",
      surfaceContainer: "surfaceContainer",
      surfaceContainerHigh: "surfaceContainerHigh",
      surfaceContainerHighest: "surfaceContainerHighest",
    }));

    // Mock console.log to avoid cluttering test output
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("generateScheme", () => {
    it("should generate light and dark themes from a seed color", async () => {
      const seedColor = "#1976D2";
      const contrast = 0;

      const result = await generateScheme(seedColor, contrast);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty("brightness", "light");
      expect(result[1]).toHaveProperty("brightness", "dark");

      // Each theme should have colors array
      expect(result[0]).toHaveProperty("colors");
      expect(result[1]).toHaveProperty("colors");
      expect(Array.isArray(result[0].colors)).toBe(true);
      expect(Array.isArray(result[1].colors)).toBe(true);
    });

    it("should call Material Color Utilities with correct parameters", async () => {
      const seedColor = "#FF5722";
      const contrast = 0.5;

      await generateScheme(seedColor, contrast);

      expect(argbFromHex).toHaveBeenCalledWith(seedColor);
      expect(Hct.fromInt).toHaveBeenCalledWith(0xff1976d2);
      expect(DynamicScheme).toHaveBeenCalledTimes(2); // Once for light, once for dark
    });

    it("should generate all required color tokens", async () => {
      const seedColor = "#4CAF50";
      const contrast = 0;

      const result = await generateScheme(seedColor, contrast);
      const lightTheme = result[0];
      const darkTheme = result[1];

      // Check that essential color tokens are present
      const colorNames = lightTheme.colors.map(([name]) => name);

      expect(colorNames).toContain("primary");
      expect(colorNames).toContain("onPrimary");
      expect(colorNames).toContain("primaryContainer");
      expect(colorNames).toContain("secondary");
      expect(colorNames).toContain("tertiary");
      expect(colorNames).toContain("background");
      expect(colorNames).toContain("surface");
      expect(colorNames).toContain("error");

      // Should have the same structure for both themes
      expect(lightTheme.colors).toHaveLength(darkTheme.colors.length);
    });
  });

  describe("applyColorScheme", () => {
    let mockDocumentElement;

    beforeEach(() => {
      // Setup DOM mock
      mockDocumentElement = {
        style: {
          setProperty: vi.fn(),
          getPropertyValue: vi.fn().mockReturnValue(""),
        },
      };

      globalThis.document = {
        documentElement: mockDocumentElement,
      };
    });

    it("should apply color scheme to document CSS custom properties", () => {
      const mockScheme = [
        {
          brightness: "light",
          colors: [
            ["primary", "#1976D2"],
            ["onPrimary", "#FFFFFF"],
            ["primaryContainer", "#BBDEFB"],
          ],
        },
        {
          brightness: "dark",
          colors: [
            ["primary", "#90CAF9"],
            ["onPrimary", "#003258"],
            ["primaryContainer", "#0D47A1"],
          ],
        },
      ];

      applyColorScheme(mockScheme);

      // Should set CSS custom properties for light theme
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-primary",
        "#1976D2",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-on-primary",
        "#FFFFFF",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-primary-container",
        "#BBDEFB",
      );

      // Should set CSS custom properties for dark theme
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-dark-primary",
        "#90CAF9",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-dark-on-primary",
        "#003258",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-dark-primary-container",
        "#0D47A1",
      );
    });

    it("should convert camelCase to kebab-case for CSS variables", () => {
      const mockScheme = [
        {
          brightness: "light",
          colors: [
            ["primaryContainer", "#BBDEFB"],
            ["onPrimaryContainer", "#0D47A1"],
            ["secondaryContainer", "#C5CAE9"],
            ["surfaceContainerHighest", "#E8EAF6"],
          ],
        },
      ];

      applyColorScheme(mockScheme);

      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-primary-container",
        "#BBDEFB",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-on-primary-container",
        "#0D47A1",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-secondary-container",
        "#C5CAE9",
      );
      expect(mockDocumentElement.style.setProperty).toHaveBeenCalledWith(
        "--color-light-surface-container-highest",
        "#E8EAF6",
      );
    });

    it("should handle empty color scheme", () => {
      const emptyScheme = [];

      applyColorScheme(emptyScheme);

      expect(mockDocumentElement.style.setProperty).not.toHaveBeenCalled();
    });
  });

  describe("generateThemeCss", () => {
    beforeEach(() => {
      // Mock Date for consistent testing
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2024-01-01T12:00:00.000Z"));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should generate complete CSS theme with metadata", () => {
      const mockSchema = [
        {
          brightness: "light",
          colors: [
            ["primary", "#1976D2"],
            ["onPrimary", "#FFFFFF"],
          ],
        },
        {
          brightness: "dark",
          colors: [
            ["primary", "#90CAF9"],
            ["onPrimary", "#003258"],
          ],
        },
      ];

      const seedColor = "#1976D2";
      const contrast = 0.5;

      const result = generateThemeCss(mockSchema, seedColor, contrast);

      // Should include metadata comment
      expect(result).toContain("Generated by: Xuan Paper");
      expect(result).toContain("Generated at: 2024-01-01T12:00:00.000Z");
      expect(result).toContain("Seed color  : #1976D2");
      expect(result).toContain("Contrast    : 0.50");

      // Should include @theme block
      expect(result).toContain("@theme {");
      expect(result).toContain("}");

      // Should include CSS custom properties
      expect(result).toContain("--color-light-primary: #1976D2;");
      expect(result).toContain("--color-light-on-primary: #FFFFFF;");
      expect(result).toContain("--color-dark-primary: #90CAF9;");
      expect(result).toContain("--color-dark-on-primary: #003258;");
    });

    it("should include additional form and link colors", () => {
      const mockSchema = [
        {
          brightness: "light",
          colors: [["primary", "#1976D2"]],
        },
      ];

      const result = generateThemeCss(mockSchema, "#1976D2", 0);

      // Should include additional color variables
      expect(result).toContain("--color-light-link: var(--color-blue-700);");
      expect(result).toContain("--color-dark-link: var(--color-blue-300);");
      expect(result).toContain(
        "--color-light-form: var(--color-light-surface-container-lowest);",
      );
      expect(result).toContain(
        "--color-dark-form: var(--color-light-on-surface);",
      );
    });

    it("should handle different contrast values formatting", () => {
      const mockSchema = [
        {
          brightness: "light",
          colors: [["primary", "#1976D2"]],
        },
      ];

      const result1 = generateThemeCss(mockSchema, "#1976D2", 1);
      const result2 = generateThemeCss(mockSchema, "#1976D2", 0.123456);
      const result3 = generateThemeCss(mockSchema, "#1976D2", -0.5);

      expect(result1).toContain("Contrast    : 1.00");
      expect(result2).toContain("Contrast    : 0.12");
      expect(result3).toContain("Contrast    : -0.50");
    });
  });

  describe("convertToVariables", () => {
    it("should convert scheme to CSS custom property format", () => {
      const mockScheme = [
        {
          brightness: "light",
          colors: [
            ["primary", "#1976D2"],
            ["onPrimary", "#FFFFFF"],
            ["primaryContainer", "#BBDEFB"],
          ],
        },
        {
          brightness: "dark",
          colors: [
            ["primary", "#90CAF9"],
            ["onPrimary", "#003258"],
          ],
        },
      ];

      const result = convertToVariables(mockScheme);

      expect(result).toEqual([
        ["--color-light-primary", "#1976D2"],
        ["--color-light-on-primary", "#FFFFFF"],
        ["--color-light-primary-container", "#BBDEFB"],
        ["--color-dark-primary", "#90CAF9"],
        ["--color-dark-on-primary", "#003258"],
      ]);
    });

    it("should handle complex token names with camelCase conversion", () => {
      const mockScheme = [
        {
          brightness: "light",
          colors: [
            ["surfaceContainerHighest", "#E8EAF6"],
            ["onPrimaryFixedVariant", "#0D47A1"],
            ["surfaceContainer", "#F5F5F5"],
          ],
        },
      ];

      const result = convertToVariables(mockScheme);

      expect(result).toEqual([
        ["--color-light-surface-container-highest", "#E8EAF6"],
        ["--color-light-on-primary-fixed-variant", "#0D47A1"],
        ["--color-light-surface-container", "#F5F5F5"],
      ]);
    });

    it("should handle empty scheme", () => {
      const emptyScheme = [];
      const result = convertToVariables(emptyScheme);
      expect(result).toEqual([]);
    });

    it("should handle single theme with empty colors", () => {
      const schemeWithEmptyColors = [
        {
          brightness: "light",
          colors: [],
        },
      ];

      const result = convertToVariables(schemeWithEmptyColors);
      expect(result).toEqual([]);
    });

    it("should handle token names starting with uppercase letter", () => {
      const schemeWithUppercaseTokens = [
        {
          brightness: "light",
          colors: [
            ["Primary", "#1976D2"], // Starts with uppercase
            ["OnPrimary", "#FFFFFF"], // Starts with uppercase
            ["primaryContainer", "#BBDEFB"], // Normal camelCase
          ],
        },
      ];

      const result = convertToVariables(schemeWithUppercaseTokens);
      expect(result).toEqual([
        ["--color-light-primary", "#1976D2"],
        ["--color-light-on-primary", "#FFFFFF"],
        ["--color-light-primary-container", "#BBDEFB"],
      ]);
    });
  });
});
