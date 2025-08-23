/**
 * Generate version file for Xuan-Paper
 *
 * This module extracts the version from package.json and creates a JavaScript module
 * that exports the version as a string. It can be used as a Vite plugin to automatically
 * update the version file during builds or in development mode.
 *
 * @module generate-version
 */

/**
 * Configuration for version generation
 *
 * @typedef {Object} VersionConfig
 * @property {string} input - The path to the input file (usually package.json)
 * @property {string} output - The path to the output version file
 */

import * as fs from "node:fs/promises";
import path from "path";
import process from "process";

/**
 * Converts a relative path to an absolute normalized path
 *
 * @param {string} relativePath - The relative path to convert
 * @returns {string} The absolute path normalized for the current OS
 */
export const absolutePath = (relativePath) =>
  path.normalize(path.resolve(process.cwd(), relativePath));

/**
 * Generates a version file by extracting the version from a JSON file (typically package.json)
 * and writing it to a JavaScript module file
 *
 * @param {VersionConfig} options - The configuration options
 * @returns {Promise<void>} A promise that resolves when the file is written
 */
export const generateVersionFile = async ({ input, output }) => {
  const source = await fs.readFile(absolutePath(input), "utf-8");
  const version = JSON.parse(source).version;
  await fs.writeFile(absolutePath(output), `export default "${version}";`);
};

/**
 * Creates a Vite plugin that automatically generates a version file
 * during build and when the input file changes in development mode
 *
 * @param {VersionConfig} config - The plugin configuration
 * @returns {import('vite').Plugin} A Vite plugin object
 *
 * @example
 * // In vite.config.js
 * import versionPlugin from './tools/generate-version.js';
 *
 * export default defineConfig({
 *   plugins: [
 *     versionPlugin({
 *       input: 'package.json',
 *       output: path.join('src', 'version.js')
 *     })
 *   ]
 * });
 */
export const versionPlugin = (config) => {
  return {
    name: "version-generator",
    /**
     * Called when the build starts
     * Generates the version file at the beginning of the build process
     *
     * @returns {Promise<void>}
     */
    async buildStart() {
      console.log("Generating version file...");
      try {
        await generateVersionFile(config);
        console.log("[v] Version file generated successfully");
      } catch (error) {
        console.error("[x] Failed to generate version file:", error);
      }
    },
    /**
     * Handles hot updates in development mode
     * Regenerates the version file if the input file changes
     *
     * @param {Object} context - Hot update context
     * @param {string} context.file - The file that was changed
     * @returns {void}
     */
    handleHotUpdate({ file }) {
      if (file === absolutePath(config.input)) {
        console.log(`File changed: ${file}, regenerating version file...`);
        generateVersionFile(config).catch(console.error);
      }
    },
  };
};
