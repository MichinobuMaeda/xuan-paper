/**
 * Generates markdown documentation for all Xuan-Paper components using JSDoc comments.
 * Usage: node tools/generate-jsdoc.js
 *
 * Exports:
 * - generateDocumentation: Main function to generate docs
 * - extractJSDoc: Extracts JSDoc from a file
 * - generateMarkdown: Converts JSDoc info to markdown
 * - jsdocPlugin: Vite plugin for auto-generating docs
 */

/**
 * Configuration for JSDoc documentation generation
 *
 * @typedef {Object} JSDocConfig
 * @property {string[]} inputs - Array of paths to input directories containing components or JS files
 * @property {string} output - Path to the output markdown file
 * @property {Object} [options] - Additional options
 * @property {boolean} [options.includeFunctions=true] - Whether to include JS functions in documentation
 * @property {boolean} [options.includeModules=true] - Whether to include module-level documentation
 */

import fs from "fs";
import path from "path";
import process from "process";

/**
 * Extracts JSDoc comments from a file
 * @param {string} filePath - Path to the component or JS file
 * @returns {Object|Object[]} Parsed JSDoc information for a component or array of functions
 */
export const extractJSDoc = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const isJSFile = filePath.endsWith(".js");
    const isJSXFile = filePath.endsWith(".jsx");

    if (!isJSFile && !isJSXFile) {
      console.warn(`Skipping unsupported file type: ${filePath}`);
      return null;
    }

    // For JSX components, we typically want the first JSDoc comment (component documentation)
    // For JS files, we want to find all function JSDoc comments
    if (isJSXFile) {
      return extractComponentJSDoc(filePath, content);
    } else {
      return extractFunctionJSDocs(filePath, content);
    }
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
};

/**
 * Extracts JSDoc for a component from JSX file
 * @param {string} filePath - Path to the component file
 * @param {string} content - File content
 * @returns {Object|null} Parsed component JSDoc information
 * @private
 */
const extractComponentJSDoc = (filePath, content) => {
  // Extract JSDoc comment block - first JSDoc block in the file
  const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsdocMatch) {
    return null;
  }

  const jsdocContent = jsdocMatch[1];

  // Parse component name from file (remove .jsx extension)
  const fileName = path.basename(filePath, path.extname(filePath));

  // Extract description (first non-empty line after opening)
  const descriptionMatch = jsdocContent.match(/\*\s*([^@\n]+)/);
  const description = descriptionMatch ? descriptionMatch[1].trim() : "";

  // Extract parameters
  const paramMatches = [
    ...jsdocContent.matchAll(
      /\*\s*@param\s+\{([^}]+)\}\s+(\[?[^\s\]]+\]?)\s*-\s*([^\n*]+)/g,
    ),
  ];
  const params = paramMatches.map((match) => ({
    type: match[1],
    name: match[2],
    description: match[3].trim(),
  }));

  // Extract examples
  const exampleMatches = [
    ...jsdocContent.matchAll(/\*\s*@example\s*\n([\s\S]*?)(?=\*\s*@|\*\/|$)/g),
  ];
  const examples = exampleMatches.map((match) =>
    match[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .join("\n")
      .trim(),
  );

  // Extract return type
  const returnMatch = jsdocContent.match(
    /\*\s*@returns\s+\{([^}]+)\}\s+([^\n*]+)/,
  );
  const returns = returnMatch
    ? {
        type: returnMatch[1],
        description: returnMatch[2].trim(),
      }
    : null;

  return {
    name: fileName,
    description,
    params,
    examples,
    returns,
    filePath,
    isComponent: true,
  };
};

/**
 * Extracts all JSDoc comments for functions in a JS file
 * @param {string} filePath - Path to the JS file
 * @param {string} content - File content
 * @returns {Object[]|null} Array of parsed function JSDoc information
 * @private
 */
const extractFunctionJSDocs = (filePath, content) => {
  // Extract all JSDoc blocks followed by function declarations or exports
  const functionDocs = [];
  const moduleFileName = path.basename(filePath, path.extname(filePath));

  // Find module-level JSDoc (first JSDoc in the file)
  const moduleJsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
  let moduleDescription = "";

  if (moduleJsdocMatch) {
    const descMatch = moduleJsdocMatch[1].match(/\*\s*([^@\n]+)/);
    moduleDescription = descMatch ? descMatch[1].trim() : "";
  }

  // Match JSDoc blocks followed by function declarations, exports, or arrow functions
  const functionMatches = [
    ...content.matchAll(
      /\/\*\*([\s\S]*?)\*\/\s*(?:export\s+(?:const|function|default)\s+)?(?:function\s+)?([a-zA-Z0-9_$]+)(?:\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>|\s*\(|\s*=\s*function)/g,
    ),
  ];

  if (functionMatches.length === 0) {
    // If no functions found but we have module doc, return it as a single item
    if (moduleJsdocMatch) {
      return [
        {
          name: moduleFileName,
          description: moduleDescription,
          params: [],
          examples: [],
          returns: null,
          filePath,
          isModule: true,
        },
      ];
    }
    return null;
  }

  functionMatches.forEach((match) => {
    const jsdocContent = match[1];
    const functionName = match[2];

    // Extract description
    const descriptionMatch = jsdocContent.match(/\*\s*([^@\n]+)/);
    const description = descriptionMatch ? descriptionMatch[1].trim() : "";

    // Extract parameters
    const paramMatches = [
      ...jsdocContent.matchAll(
        /\*\s*@param\s+\{([^}]+)\}\s+(\[?[^\s\]]+\]?)\s*-?\s*([^\n*]*)/g,
      ),
    ];
    const params = paramMatches.map((match) => ({
      type: match[1],
      name: match[2],
      description: match[3] ? match[3].trim() : "",
    }));

    // Extract examples
    const exampleMatches = [
      ...jsdocContent.matchAll(
        /\*\s*@example\s*\n([\s\S]*?)(?=\*\s*@|\*\/|$)/g,
      ),
    ];
    const examples = exampleMatches.map((match) =>
      match[1]
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, ""))
        .join("\n")
        .trim(),
    );

    // Extract return type
    const returnMatch = jsdocContent.match(
      /\*\s*@returns\s+\{([^}]+)\}\s+([^\n*]*)/,
    );
    const returns = returnMatch
      ? {
          type: returnMatch[1],
          description: returnMatch[2] ? returnMatch[2].trim() : "",
        }
      : null;

    functionDocs.push({
      name: functionName,
      description,
      params,
      examples,
      returns,
      filePath,
      isFunction: true,
    });
  });

  // Add module info as first item if we found it
  if (moduleDescription) {
    functionDocs.unshift({
      name: moduleFileName,
      description: moduleDescription,
      params: [],
      examples: [],
      returns: null,
      filePath,
      isModule: true,
    });
  }

  return functionDocs.length > 0 ? functionDocs : null;
};

/**
 * Escapes special characters for markdown tables
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for markdown tables
 */
function escapeMarkdownTableText(text) {
  if (!text) return "";
  // Escape pipe characters which would break table formatting
  return text.replace(/\|/g, "\\|");
}

/**
 * Generates markdown documentation for a component or function
 * @param {Object} docItem - Component or function documentation object
 * @returns {string} Markdown formatted documentation
 */
export const generateMarkdown = (docItem) => {
  if (!docItem) return "";

  let md = `## ${docItem.name}\n\n`;

  if (docItem.description) {
    md += `${docItem.description}\n\n`;
  }

  // Add file path as source information
  if (docItem.filePath) {
    const relativePath = path.relative(process.cwd(), docItem.filePath);
    md += `*Source: \`${relativePath}\`*\n\n`;
  }

  // Parameters section - different heading for components vs functions
  if (docItem.params && docItem.params.length > 0) {
    if (docItem.isComponent) {
      md += `### Props\n\n`;
    } else if (docItem.isFunction || docItem.isModule) {
      md += `### Parameters\n\n`;
    }

    md += `| Name | Type | Description |\n`;
    md += `|------|------|-------------|\n`;

    docItem.params.forEach((param) => {
      const name = param.name.replace(/\[|\]/g, "");
      const isOptional = param.name.includes("[");
      const displayName = isOptional ? `${name} *(optional)*` : `**${name}**`;

      // Escape pipe characters in all fields to prevent breaking markdown tables
      const escapedType = escapeMarkdownTableText(param.type);
      const escapedDescription = escapeMarkdownTableText(param.description);

      md += `| ${displayName} | \`${escapedType}\` | ${escapedDescription} |\n`;
    });
    md += "\n";
  }

  // Return type section
  if (docItem.returns) {
    md += `### Returns\n\n`;
    // Escape pipe characters in return type
    const escapedReturnType = escapeMarkdownTableText(docItem.returns.type);
    md += `**Type:** \`${escapedReturnType}\`\n\n`;

    // Escape pipe characters in description
    const escapedReturnDescription = escapeMarkdownTableText(
      docItem.returns.description,
    );
    md += `${escapedReturnDescription}\n\n`;
  }

  // Examples section
  if (docItem.examples && docItem.examples.length > 0) {
    md += `### Examples\n\n`;
    docItem.examples.forEach((example, index) => {
      md += `#### Example ${index + 1}\n\n`;
      // Use jsx for components, js for functions
      const codeLanguage = docItem.isComponent ? "jsx" : "js";
      md += `\`\`\`${codeLanguage}\n`;
      md += example;
      md += "\n```\n\n";
    });
  }

  md += `---\n\n`;
  return md;
};

/**
 * Creates the documentation index with navigation
 * @param {Array} components - Array of component documentation objects
 * @returns {string} Index markdown content
 */
export const generateIndex = (components) => {
  let index = `# Xuan-Paper Components Documentation\n\n`;
  index += `Generated on: ${new Date().toISOString().split("T")[0]}\n\n`;
  index += `## Components\n\n`;

  components.forEach((comp) => {
    if (comp) {
      index += `- [${comp.name}](#${comp.name.toLowerCase()})\n`;
    }
  });

  index += `\n---\n\n`;
  return index;
};

/**
 * Main function to generate documentation
 *
 * @param {JSDocConfig} config - Configuration for documentation generation
 * @returns {Promise<void>} A promise that resolves when documentation is generated
 */
export const generateDocumentation = async (config) => {
  try {
    console.log("🚀 Starting JSDoc generation for xuan-paper components...");

    const inputs = config.inputs.map((input) =>
      path.normalize(path.join(process.cwd(), input)),
    );
    const output = path.normalize(path.join(process.cwd(), config.output));
    const outputDir = path.dirname(output);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log("📁 Created output directory");
    }

    // Get all component files
    const sources = inputs
      .map((input) =>
        fs
          .readdirSync(input)
          .filter(
            (file) =>
              (file.endsWith(".js") || file.endsWith(".jsx")) &&
              file !== "Style.js",
          )
          .map((file) => path.join(input, file)),
      )
      .flatMap((file) => file);

    console.log(`📋 Found ${sources.length} component files`);

    // Extract JSDoc from each file
    let allDocs = [];

    for (const filePath of sources) {
      console.log(`📝 Processing ${path.basename(filePath)}...`);
      const docs = extractJSDoc(filePath);

      if (docs) {
        // If it's an array (from JS file with multiple functions), add each item
        if (Array.isArray(docs)) {
          allDocs = [...allDocs, ...docs];
        } else {
          // For component docs (single object)
          allDocs.push(docs);
        }
      }
    }

    // Group docs by type for better organization in the output
    const components = allDocs.filter((doc) => doc.isComponent);
    const functions = allDocs.filter((doc) => doc.isFunction);
    const modules = allDocs.filter((doc) => doc.isModule);

    console.log(`✅ Successfully parsed ${allDocs.length} items:`);
    console.log(`   - ${components.length} components`);
    console.log(`   - ${functions.length} functions`);
    console.log(`   - ${modules.length} modules`);

    // Generate markdown content - components first, then functions by module
    let markdownContent = `# Xuan-Paper Documentation\n\n`;
    markdownContent += `Generated on: ${new Date().toISOString().split("T")[0]}\n\n`;

    // Table of contents
    markdownContent += `## Table of Contents\n\n`;

    if (components.length > 0) {
      markdownContent += `- [Components](#components)\n`;
    }

    // Group functions by module (file)
    const moduleGroups = {};
    [...modules, ...functions].forEach((doc) => {
      const moduleName = path.basename(
        doc.filePath,
        path.extname(doc.filePath),
      );
      if (!moduleGroups[moduleName]) {
        moduleGroups[moduleName] = [];
      }
      moduleGroups[moduleName].push(doc);
    });

    if (Object.keys(moduleGroups).length > 0) {
      markdownContent += `- [Modules & Functions](#modules--functions)\n`;
      Object.keys(moduleGroups).forEach((moduleName) => {
        markdownContent += `  - [${moduleName}](#${moduleName.toLowerCase()})\n`;
      });
    }

    markdownContent += `\n`;

    // Components section
    if (components.length > 0) {
      markdownContent += `## Components\n\n`;
      components.forEach((component) => {
        markdownContent += generateMarkdown(component);
      });
    }

    // Modules and Functions section
    if (Object.keys(moduleGroups).length > 0) {
      markdownContent += `## Modules & Functions\n\n`;

      Object.entries(moduleGroups).forEach(([moduleName, docs]) => {
        // Find module doc if any
        const moduleDoc = docs.find((doc) => doc.isModule);

        markdownContent += `### ${moduleName}\n\n`;

        if (moduleDoc) {
          markdownContent += `${moduleDoc.description}\n\n`;
          markdownContent += `*Source: \`${path.relative(process.cwd(), moduleDoc.filePath)}\`*\n\n`;
        }

        // Output all functions for this module
        docs
          .filter((doc) => doc.isFunction)
          .forEach((func) => {
            markdownContent += generateMarkdown(func);
          });
      });
    }

    // Write to docs file
    fs.writeFileSync(output, markdownContent, "utf-8");

    console.log(`📚 Documentation generated successfully!`);
    console.log(`📍 Output: ${output}`);
    console.log(
      `🎉 Generated docs for: ${allDocs.length} items (${components.length} components, ${functions.length} functions)`,
    );
  } catch (error) {
    console.error("❌ Error generating documentation:", error);
    process.exit(1);
  }
};

/**
 * Vite plugin for generating JSDoc documentation
 * Automatically generates component documentation during build and development
 *
 * @param {JSDocConfig} config - Configuration for documentation generation
 * @returns {import('vite').Plugin} A Vite plugin object
 *
 * @example
 * // In vite.config.js
 * import jsdocPlugin from './tools/generate-jsdoc.js';
 *
 * export default defineConfig({
 *   plugins: [
 *     jsdocPlugin({
 *       inputs: [path.join('src', 'xuan-paper'), 'tools'],
 *       output: path.join('docs', 'components.md')
 *     })
 *   ]
 * });
 */
export const jsdocPlugin = (config) => {
  return {
    name: "jsdoc-generator",
    /**
     * Called when the build starts
     * Generates JSDoc documentation at the beginning of the build process
     *
     * @returns {Promise<void>}
     */
    async buildStart() {
      console.log("🚀 Generating JSDoc documentation...");
      try {
        await generateDocumentation(config);
        console.log("✅ JSDoc documentation generated successfully");
      } catch (error) {
        console.error("❌ Failed to generate JSDoc documentation:", error);
      }
    },
    /**
     * Handles hot updates in development mode
     * Regenerates documentation if a component file changes
     *
     * @param {Object} context - Hot update context
     * @param {string} context.file - The file that was changed
     * @returns {void}
     */
    handleHotUpdate({ file }) {
      console.log(file);
      const inputs = config.inputs.map((input) =>
        path.normalize(path.join(process.cwd(), input)),
      );
      if (
        inputs.some((input) => file.startsWith(input)) &&
        (file.endsWith(".js") || file.endsWith(".jsx"))
      ) {
        console.log(
          `📝 Component changed: ${file.split("/").pop()}, regenerating docs...`,
        );
        generateDocumentation(config).catch(console.error);
      }
    },
  };
};
