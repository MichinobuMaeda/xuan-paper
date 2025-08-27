/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs/promises";
import {
  generateVersionFile,
  absolutePath,
  extractVersionInfo,
  versionPlugin,
} from "../../tools/generate-version.js";

// Mock the entire fs/promises module
vi.mock("node:fs/promises", () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

// Mock path module
vi.mock("path", () => ({
  default: {
    normalize: vi.fn((p) => p),
    resolve: vi.fn((cwd, relativePath) => `/mock/project/${relativePath}`),
  },
}));

// Mock process
vi.mock("process", () => ({
  default: {
    cwd: vi.fn(() => "/mock/project"),
  },
}));

describe("generate-version utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("absolutePath", () => {
    it("should convert relative path to absolute path", () => {
      const result = absolutePath("src/version.js");
      expect(result).toBe("/mock/project/src/version.js");
    });
  });

  describe("generateVersionFile", () => {
    it("should generate version file successfully", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.2.3" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const result = await generateVersionFile({
        input: "package.json",
        output: "src/version.js",
        options: { silent: true },
      });

      expect(result).toBe("1.2.3");
      expect(fs.readFile).toHaveBeenCalledWith(
        "/mock/project/package.json",
        "utf-8",
      );
      expect(fs.writeFile).toHaveBeenCalledWith(
        "/mock/project/src/version.js",
        'export default "1.2.3";',
      );
    });

    it("should handle custom template", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.2.3" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const template = 'export const VERSION = "{version}";';
      await generateVersionFile({
        input: "package.json",
        output: "src/version.js",
        options: { silent: true, template },
      });

      expect(fs.writeFile).toHaveBeenCalledWith(
        "/mock/project/src/version.js",
        'export const VERSION = "1.2.3";',
      );
    });

    it("should add named export when specified", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.2.3" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      await generateVersionFile({
        input: "package.json",
        output: "src/version.js",
        options: { silent: true, exportName: "VERSION" },
      });

      expect(fs.writeFile).toHaveBeenCalledWith(
        "/mock/project/src/version.js",
        'export default "1.2.3";\nexport const VERSION = "1.2.3";',
      );
    });

    it("should handle console output when not silent", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.2.3" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const result = await generateVersionFile({
        input: "package.json",
        output: "src/version.js",
        options: { silent: false },
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Version 1.2.3 extracted and written to src/version.js",
      );
      expect(result).toBe("1.2.3");

      consoleSpy.mockRestore();
    });

    it("should handle console error output when not silent", async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error("Test error"));

      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await expect(
        generateVersionFile({
          input: "package.json",
          output: "src/version.js",
          options: { silent: false },
        }),
      ).rejects.toThrow("Test error");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error generating version file: Test error",
      );

      consoleErrorSpy.mockRestore();
    });

    it("should throw error when version field is missing", async () => {
      const mockPackageJson = JSON.stringify({ name: "test-package" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);

      await expect(
        generateVersionFile({
          input: "package.json",
          output: "src/version.js",
          options: { silent: true },
        }),
      ).rejects.toThrow("No version field found in package.json");
    });

    it("should handle file write errors", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.2.3" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockRejectedValue(new Error("Permission denied"));

      await expect(
        generateVersionFile({
          input: "package.json",
          output: "src/version.js",
          options: { silent: true },
        }),
      ).rejects.toThrow("Permission denied");
    });
  });

  describe("extractVersionInfo", () => {
    it("should extract version info successfully", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.2.3" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);

      const result = await extractVersionInfo("package.json");

      expect(result).toEqual({
        version: "1.2.3",
        source: "package.json",
      });
    });

    it("should use fallback version when file is missing", async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error("File not found"));

      const result = await extractVersionInfo("missing.json", {
        fallback: "0.0.1",
      });

      expect(result).toEqual({
        version: "0.0.1",
        source: "fallback",
      });
    });

    it("should use custom version field", async () => {
      const mockFile = JSON.stringify({ appVersion: "2.0.0" });
      vi.mocked(fs.readFile).mockResolvedValue(mockFile);

      const result = await extractVersionInfo("config.json", {
        versionField: "appVersion",
      });

      expect(result).toEqual({
        version: "2.0.0",
        source: "config.json",
      });
    });

    it("should throw error when version field is missing and no fallback", async () => {
      const mockFile = JSON.stringify({ name: "test-package" });
      vi.mocked(fs.readFile).mockResolvedValue(mockFile);

      await expect(extractVersionInfo("package.json")).rejects.toThrow(
        "No version field found in package.json",
      );
    });

    it("should use fallback when version field is missing", async () => {
      const mockFile = JSON.stringify({ name: "test-package" });
      vi.mocked(fs.readFile).mockResolvedValue(mockFile);

      const result = await extractVersionInfo("package.json", {
        fallback: "1.0.0",
      });

      expect(result).toEqual({
        version: "1.0.0",
        source: "fallback",
      });
    });

    it("should throw error when file read fails and no fallback", async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error("File not found"));

      await expect(extractVersionInfo("missing.json")).rejects.toThrow(
        "Failed to extract version from missing.json: File not found",
      );
    });
  });

  describe("versionPlugin", () => {
    it("should create vite plugin with buildStart hook", () => {
      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: true },
      });

      expect(plugin.name).toBe("version-generator");
      expect(typeof plugin.buildStart).toBe("function");
      expect(typeof plugin.handleHotUpdate).toBe("function");
    });

    it("should create vite plugin without options", () => {
      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
      });

      expect(plugin.name).toBe("version-generator");
      expect(typeof plugin.buildStart).toBe("function");
      expect(typeof plugin.handleHotUpdate).toBe("function");
    });

    it("should call generateVersionFile on buildStart", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.0.0" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: false },
      });

      await plugin.buildStart();

      expect(consoleSpy).toHaveBeenCalledWith("Generating version file...");
      expect(consoleSpy).toHaveBeenCalledWith(
        "[v] Version file (v1.0.0) generated successfully",
      );

      consoleSpy.mockRestore();
    });

    it("should handle buildStart errors", async () => {
      vi.mocked(fs.readFile).mockRejectedValue(new Error("Build error"));

      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: false },
      });

      await plugin.buildStart();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[x] Failed to generate version file:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });

    it("should handle hot updates for input file", () => {
      const mockPackageJson = JSON.stringify({ version: "1.0.0" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: false },
      });

      plugin.handleHotUpdate({ file: "/mock/project/package.json" });

      expect(consoleSpy).toHaveBeenCalledWith(
        "File changed: /mock/project/package.json, regenerating version file...",
      );

      consoleSpy.mockRestore();
    });

    it("should ignore hot updates for other files", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: false },
      });

      plugin.handleHotUpdate({ file: "/mock/project/src/other.js" });

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should handle silent mode in buildStart", async () => {
      const mockPackageJson = JSON.stringify({ version: "1.0.0" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: true },
      });

      await plugin.buildStart();

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it("should handle silent mode in handleHotUpdate", () => {
      const mockPackageJson = JSON.stringify({ version: "1.0.0" });
      vi.mocked(fs.readFile).mockResolvedValue(mockPackageJson);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);

      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      const plugin = versionPlugin({
        input: "package.json",
        output: "src/version.js",
        options: { silent: true },
      });

      plugin.handleHotUpdate({ file: "/mock/project/package.json" });

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
