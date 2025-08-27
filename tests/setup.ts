/**
 * Test setup file for Vitest
 * This file is automatically loaded before running tests
 */

import { afterEach, beforeEach, vi } from "vitest";

// Mock console methods to reduce noise in tests
beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
