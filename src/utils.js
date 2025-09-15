/**
 * Determines whether a given hex color represents a dark background.
 * Uses weighted RGB luminance calculation to assess if text should be light-colored
 * when displayed on this background. The algorithm applies different weights to
 * RGB channels based on human color perception (green appears brightest, blue darkest).
 * @param {string} hex - Hex color code in format #RRGGBB (e.g., "#1976D2", "#FF5722")
 * @returns {boolean} true if the color is dark (light text recommended),
 *  false if light (dark text recommended)
 */
export function isDarkBackground(hex) {
  return (
    (Number(`0x${hex.slice(1, 3)}`) * 1.1 +
      Number(`0x${hex.slice(3, 5)}`) * 1.3 +
      Number(`0x${hex.slice(5, 7)}`) / 1.5) /
      3 <
    112
  );
}

/**
 * Triggers a file download in the browser with specified filename and content.
 * Creates a temporary blob URL and programmatically clicks a download link.
 * Automatically cleans up the created elements and URLs after download.
 * @param {string} filename - Name for the downloaded file (including extension)
 * @param {string|ArrayBuffer|Blob} content - File content to download
 * @returns {void}
 * @example
 * // Download a text file
 * const textContent = "Hello, World!\nThis is a sample file.";
 * downloadFile("sample.txt", textContent);
 */
export function downloadFile(filename, content) {
  const data = new Blob([content]);
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}
