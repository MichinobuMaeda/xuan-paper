/**
 * @file Main entry point for the xuan-paper component library.
 * Exports all components and utility functions for external consumption.
 * @since 1.0.0
 */

// Export all React components
export { default as AppBar } from "./lib/AppBar.jsx";
export { default as Button } from "./lib/Button.js";
export { default as ButtonGroup } from "./lib/ButtonGroup.jsx";
export { default as CheckBox } from "./lib/CheckBox.jsx";
export { default as Fab } from "./lib/Fab.jsx";
export { default as NavigationBar } from "./lib/NavigationBar.jsx";
export { default as NavigationDrawer } from "./lib/NavigationDrawer.jsx";
export { default as NavigationRail } from "./lib/NavigationRail.jsx";
export { default as PasswordField } from "./lib/PasswordField.jsx";
export { default as PWABadge } from "./lib/PWABadge.js";
export { default as RadioGroup } from "./lib/RadioGroup.jsx";
export { default as Slider } from "./lib/Slider.jsx";
export { default as Switch } from "./lib/Switch.js";
export { default as TextField } from "./lib/TextField.js";
export { default as ToggleDarkModeButton } from "./lib/ToggleDarkModeButton.jsx";
export { default as ToggleLanguageButton } from "./lib/ToggleLanguageButton.jsx";

// Export theme utilities
export {
  generateScheme,
  convertToVariables,
  applyColorScheme,
  generateThemeCss,
} from "./lib/material-theme.js";

// Note: xuan-paper.css should be imported separately by the consuming application
// Example: import 'xuan-paper/lib/xuan-paper.css';
