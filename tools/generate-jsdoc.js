/**
 * JSDoc Documentation Generator for Xuan-Paper Components
 *
 * This script generates comprehensive JSDoc documentation for all xuan-paper components
 * and outputs them to the /docs directory with proper organization and styling.
 *
 * @author Xuan-Paper Team
 * @version 1.0.0
 */

import fs from "fs";
import path from "path";
import process from "process";

/**
 * Extracts JSDoc comments from a file
 * @param {string} filePath - Path to the component file
 * @returns {Object} Parsed JSDoc information
 */
function extractJSDoc(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract JSDoc comment block
    const jsdocMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
    if (!jsdocMatch) {
      return null;
    }

    const jsdocContent = jsdocMatch[1];

    // Parse component name from file
    const fileName = path.basename(filePath, ".jsx");

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
      // Leave the original type as is - we'll escape when generating markdown
      type: match[1],
      name: match[2],
      description: match[3].trim(),
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
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Escapes special characters for markdown tables
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for markdown tables
 */
function escapeMarkdownTableText(text) {
  if (!text) return '';
  // Escape pipe characters which would break table formatting
  return text.replace(/\|/g, '\\|');
}

/**
 * Generates markdown documentation for a component
 * @param {Object} componentDoc - Component documentation object
 * @returns {string} Markdown formatted documentation
 */
function generateMarkdown(componentDoc) {
  if (!componentDoc) return "";

  let md = `## ${componentDoc.name}\n\n`;

  if (componentDoc.description) {
    md += `${componentDoc.description}\n\n`;
  }

  // Parameters section
  if (componentDoc.params && componentDoc.params.length > 0) {
    md += `### Props\n\n`;
    md += `| Name | Type | Description |\n`;
    md += `|------|------|-------------|\n`;

    componentDoc.params.forEach((param) => {
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
  if (componentDoc.returns) {
    md += `### Returns\n\n`;
    // Escape pipe characters in return type
    const escapedReturnType = escapeMarkdownTableText(componentDoc.returns.type);
    md += `**Type:** \`${escapedReturnType}\`\n\n`;
    
    // Escape pipe characters in description
    const escapedReturnDescription = escapeMarkdownTableText(componentDoc.returns.description);
    md += `${escapedReturnDescription}\n\n`;
  }

  // Examples section
  if (componentDoc.examples && componentDoc.examples.length > 0) {
    md += `### Examples\n\n`;
    componentDoc.examples.forEach((example, index) => {
      md += `#### Example ${index + 1}\n\n`;
      md += "```jsx\n";
      md += example;
      md += "\n```\n\n";
    });
  }

  md += `---\n\n`;
  return md;
}

/**
 * Creates the documentation index with navigation
 * @param {Array} components - Array of component documentation objects
 * @returns {string} Index markdown content
 */
function generateIndex(components) {
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
}

/**
 * Main function to generate documentation
 */
async function generateDocumentation(config) {
  try {
    console.log("🚀 Starting JSDoc generation for xuan-paper components...");

    // Ensure docs directory exists
    if (!fs.existsSync(config.docsDir)) {
      fs.mkdirSync(config.docsDir, { recursive: true });
      console.log("📁 Created docs directory");
    }

    // Get all component files
    const componentFiles = fs
      .readdirSync(config.componentsDir)
      .filter((file) => file.endsWith(".jsx") && file !== "Style.js")
      .map((file) => path.join(config.componentsDir, file));

    console.log(`📋 Found ${componentFiles.length} component files`);

    // Extract JSDoc from each component
    const componentDocs = componentFiles
      .map((filePath) => {
        console.log(`📝 Processing ${path.basename(filePath)}...`);
        return extractJSDoc(filePath);
      })
      .filter(Boolean);

    console.log(`✅ Successfully parsed ${componentDocs.length} components`);

    // Generate markdown content
    let markdownContent = generateIndex(componentDocs);

    componentDocs.forEach((componentDoc) => {
      markdownContent += generateMarkdown(componentDoc);
    });

    // Write to docs file
    const outputPath = path.join(config.docsDir, config.outputFile);
    fs.writeFileSync(outputPath, markdownContent, "utf-8");

    console.log(`📚 Documentation generated successfully!`);
    console.log(`📍 Output: ${outputPath}`);
    console.log(
      `🎉 Generated docs for: ${componentDocs.map((c) => c.name).join(", ")}`,
    );
  } catch (error) {
    console.error("❌ Error generating documentation:", error);
    process.exit(1);
  }
}

/**
 * Vite plugin for generating JSDoc documentation
 * Automatically generates component documentation during build and development
 */
function jsdocPlugin(config) {
  return {
    name: "jsdoc-generator",
    async buildStart() {
      console.log("🚀 Generating JSDoc documentation...");
      try {
        await generateDocumentation(config);
        console.log("✅ JSDoc documentation generated successfully");
      } catch (error) {
        console.error("❌ Failed to generate JSDoc documentation:", error);
      }
    },
    // Also generate docs when files change in development
    handleHotUpdate({ file }) {
      if (file.includes("/xuan-paper/") && file.endsWith(".jsx")) {
        console.log(
          `📝 Component changed: ${file.split("/").pop()}, regenerating docs...`,
        );
        generateDocumentation(config).catch(console.error);
      }
    },
  };
}

export { generateDocumentation, extractJSDoc, generateMarkdown, jsdocPlugin };
