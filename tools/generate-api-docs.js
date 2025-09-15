import * as fs from "node:fs/promises";
import { globSync } from "node:fs";
import path from "path";
import process from "process";
import jsdoc2md from "jsdoc-to-markdown";

/**
 * Generate API documentation from JSDoc comments in JavaScript files
 *
 * This module extracts JSDoc comments from JavaScript source files and generates
 * markdown documentation using the jsdoc-to-markdown library. It can be used as
 * a standalone function or as a Vite plugin to automatically generate API docs
 * during builds or when source files change in development mode.
 *
 * The generated documentation includes all public APIs with their parameters,
 * return values, examples, and other JSDoc annotations. It's useful for creating
 * comprehensive API documentation for libraries and components.
 *
 * Usage:
 * - As a standalone function: Call generateApiDocs() with file paths and options
 * - As a Vite plugin: Import apiDocsPlugin in vite.config.js
 * @module generate-api-docs
 * @exports generateApiDocs - Generates API documentation from source files
 * @exports absolutePath - Utility for path normalization
 * @exports apiDocsPlugin - Vite plugin for automatic API documentation generation
 */

/**
 * Configuration for API documentation generation
 * @typedef {object} ApiDocsConfig
 * @property {string} [name] - The name of the project/library for documentation header
 * @property {string} [version] - The version of the project/library for documentation header
 * @property {string[]} files - Array of file paths to extract documentation from
 *   These files should contain JSDoc comments for functions, classes, and modules
 * @property {string} output - The path to the output markdown file
 *   The generated documentation will be written to this file
 * @property {object} [options] - Additional options passed to jsdoc-to-markdown
 * @property {boolean} [options.private=false] - Whether to include private members
 * @property {string[]} [options.configure] - Path to JSDoc configuration file
 * @property {string} [options.template] - Custom template for documentation generation
 */

/**
 * Plugin configuration for Vite integration
 * @typedef {object} ApiDocsPluginConfig
 * @property {string} [name] - The name of the project/library for documentation header
 * @property {string} [version] - The version of the project/library for documentation header
 * @property {string[]} inputs - Array of glob patterns for input files
 *   Files matching these patterns will be processed for JSDoc extraction
 * @property {string} output - The path to the output markdown file
 * @property {object} [options] - Additional options (see ApiDocsConfig)
 */

/**
 * Converts a relative path to an absolute path, normalized for the current OS
 *
 * This utility function takes a relative path and converts it to an absolute path
 * by resolving it against the current working directory. It handles various path
 * formats including those with dots (. and ..) and normalizes the result.
 * If the path is already absolute, it returns the normalized absolute path.
 * @param {string} relativePath - The relative path to convert
 * @returns {string} The absolute path normalized for the current OS
 * @example
 * // On Unix systems
 * absolutePath('src/version.js') // Returns '/path/to/project/src/version.js'
 *
 * // Works with paths containing . or ..
 * absolutePath('./config/../src/version.js') // Normalizes to '/path/to/project/src/version.js'
 */
export const absolutePath = (relativePath) => {
  // If path is already absolute, just normalize it
  if (path.isAbsolute && path.isAbsolute(relativePath)) {
    return path.normalize(relativePath);
  }
  return path.normalize(path.resolve(process.cwd(), relativePath));
};

/**
 * Generates API documentation from JavaScript files with JSDoc comments
 *
 * This function processes JavaScript source files to extract JSDoc comments
 * and generates markdown documentation using the jsdoc-to-markdown library.
 * It automatically creates the output directory if it doesn't exist.
 *
 * The function:
 * 1. Renders JSDoc comments from the specified files into markdown format
 * 2. Creates a documentation header with project name and version (if provided)
 * 3. Creates the output directory structure if needed
 * 4. Writes the generated markdown to the specified output file
 *
 * The generated documentation includes all exported functions, classes,
 * modules, and their associated JSDoc annotations including parameters,
 * return values, examples, and type information.
 * @param {ApiDocsConfig} config - The configuration object
 * @param {string} [config.name] - Name of the project/library for documentation header
 * @param {string} [config.version] - Version of the project/library for documentation header
 * @param {string[]} config.files - Array of file paths to process for JSDoc extraction
 * @param {string} config.output - Path where the generated markdown will be written
 * @param {object} [config.options] - Additional options passed to jsdoc-to-markdown
 * @returns {Promise<void>} A promise that resolves when documentation is generated
 * @throws {Error} If files cannot be read or output cannot be written
 * @example
 * // Generate docs from specific files with project info
 * await generateApiDocs({
 *   name: 'My Library',
 *   version: '1.0.0',
 *   files: ['src/utils.js', 'src/components.js'],
 *   output: 'docs/api.md',
 *   options: { private: false }
 * });
 * @example
 * // Generate docs with custom options
 * await generateApiDocs({
 *   name: 'My API',
 *   version: '2.1.0',
 *   files: ['src/index.js', 'src/lib.js'],
 *   output: 'docs/api.md',
 *   options: {
 *     template: '{{>main}}',
 *     configure: './jsdoc.conf.json'
 *   }
 * });
 */
export const generateApiDocs = async ({
  name,
  version,
  files,
  output,
  options,
}) => {
  const body = await jsdoc2md.render({ files, ...options });
  const md = `# API Documentation ${name} ${version}

${body}`;
  await fs.mkdir(path.dirname(absolutePath(output)), { recursive: true });
  await fs.writeFile(absolutePath(output), md);
};

/**
 * Creates a Vite plugin that automatically generates API documentation
 * during build and when source files change in development mode
 *
 * This plugin integrates with Vite's build process to:
 * 1. Generate API documentation at the beginning of each build
 * 2. Watch for changes to source files during development
 * 3. Automatically regenerate documentation when source files change
 *
 * The plugin uses glob patterns to find source files and processes them
 * through the generateApiDocs function. It properly normalizes all paths
 * to work across different operating systems.
 * @param {ApiDocsPluginConfig} config - The plugin configuration
 * @param {string[]} config.inputs - Array of glob patterns for input files
 * @param {string} config.output - Path for the generated documentation file
 * @param {object} [config.options] - Additional options (see ApiDocsConfig)
 * @returns {object} A Vite plugin object with name, buildStart, and handleHotUpdate methods
 * @example
 * // Basic usage in vite.config.js
 * import { apiDocsPlugin } from './tools/generate-api-docs.js';
 *
 * export default defineConfig({
 *   plugins: [
 *     apiDocsPlugin({
 *       inputs: ['src/*.js'],
 *       output: 'docs/api.md'
 *     })
 *   ]
 * });
 * @example
 * // Advanced usage with options
 * apiDocsPlugin({
 *   inputs: ['src/utils.js', 'src/components/*.js'],
 *   output: 'docs/api.md',
 *   options: {
 *     private: false,
 *     template: 'custom-template.hbs'
 *   }
 * })
 */
export const apiDocsPlugin = (config) => {
  const name = config.name;
  const version = config.version;
  const inputs = (config.inputs || []).map((input) => absolutePath(input));
  const outputPath = absolutePath(config.output);
  const options = config.options || {};

  const files = [];
  inputs.map(async (input) => {
    for (const file of globSync(input)) {
      files.push(file);
    }
  });

  console.info(`API Docs Plugin:
  Inputs: ${path.relative(process.cwd(), inputs.join(", "))}
  Output: ${path.relative(process.cwd(), outputPath)}
  Options: ${JSON.stringify(options, null, 2)}
  Files: ${JSON.stringify(
    files.map((file) => path.relative(process.cwd(), file)),
    null,
    2,
  )}
`);

  return {
    name: "api-doc-generator",
    /**
     * Called when the build starts
     * Generates API documentation at the beginning of the build process
     *
     * This method is invoked by Vite at the start of both development and production builds.
     * It ensures that the API documentation is always up-to-date with the current source
     * code by processing all matched files and generating fresh documentation.
     * @returns {Promise<void>} A promise that resolves when documentation is generated
     */
    async buildStart() {
      generateApiDocs({ name, version, files, output: outputPath, options });
    },
    /**
     * Handles hot updates in development mode
     * Regenerates API documentation if a source file changes
     *
     * This method is called by Vite when any file in the project changes during development.
     * It checks if the changed file is one of the source files being monitored for
     * documentation generation and triggers a regeneration if it is.
     * @param {object} context - Hot update context provided by Vite
     * @param {string} context.file - The absolute path of the file that was changed
     * @returns {void}
     */
    handleHotUpdate({ file }) {
      const path = absolutePath(file);
      if (files.includes(path)) {
        console.log(`Regenerating API docs due to change in ${file}`);
        generateApiDocs({ name, version, files, output: outputPath, options });
      }
    },
  };
};
