/**
 * Toggles between supported languages in the internationalization system.
 * Cycles through the provided languages array in order, wrapping back to the first
 * language when reaching the end of the array.
 *
 * @param {Object} i18n - The i18next instance with language switching capability
 * @param {string[]} languages - Array of supported language codes to cycle through
 * @returns {void}
 *
 * @example
 * // Toggle between Japanese and English
 * import { useTranslation } from 'react-i18next';
 * const { i18n } = useTranslation();
 * toggleLanguage(i18n, ['ja', 'en']); // Switches from 'ja' to 'en' or 'en' to 'ja'
 */
export const toggleLanguage = (i18n, languages) => {
  let index = languages.indexOf(i18n.language);
  i18n.changeLanguage(languages[++index < languages.length ? index : 0]);
};

/**
 * Converts HSL (Hue, Saturation, Lightness) color values to hexadecimal format.
 * Uses the HSL color model to generate web-compatible hex color codes.
 *
 * @param {number} h - Hue value in degrees (0-360). Represents the color wheel position
 * @param {number} [s=100] - Saturation percentage (0-100). Controls color intensity/purity
 * @param {number} [l=50] - Lightness percentage (0-100). Controls brightness (0=black, 100=white)
 * @returns {string} Hexadecimal color code in format #RRGGBB
 *
 * @example
 * // Pure red color
 * hslToHex(0, 100, 50); // Returns "#ff0000"
 *
 * @example
 * // Blue with default saturation and lightness
 * hslToHex(240); // Returns "#0000ff"
 */
export const hslToHex = (h, s = 100, l = 50) => {
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

/**
 * Determines whether a given hex color represents a dark background.
 * Uses weighted RGB luminance calculation to assess if text should be light-colored
 * when displayed on this background. The algorithm applies different weights to
 * RGB channels based on human color perception (green appears brightest, blue darkest).
 *
 * @param {string} hex - Hex color code in format #RRGGBB (e.g., "#1976D2", "#FF5722")
 * @returns {boolean} true if the color is dark (light text recommended),
 *  false if light (dark text recommended)
 */
export const isDarkBackground = (hex) =>
  (Number(`0x${hex.slice(1, 3)}`) * 1.1 +
    Number(`0x${hex.slice(3, 5)}`) * 1.3 +
    Number(`0x${hex.slice(5, 7)}`) / 1.5) /
    3 <
  112;

/**
 * Triggers a file download in the browser with specified filename and content.
 * Creates a temporary blob URL and programmatically clicks a download link.
 * Automatically cleans up the created elements and URLs after download.
 *
 * @param {string} filename - Name for the downloaded file (including extension)
 * @param {string|ArrayBuffer|Blob} content - File content to download
 * @returns {void}
 *
 * @example
 * // Download a text file
 * const textContent = "Hello, World!\nThis is a sample file.";
 * downloadFile("sample.txt", textContent);
 */
export const downloadFile = (filename, content) => {
  const data = new Blob([content]);
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
