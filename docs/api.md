# API Documentation @michinobumaeda/xuan-paper 1.0.2

## Modules

<dl>
<dt><a href="#module_material-theme">material-theme</a></dt>
<dd><p>Material Design 3 Color System Implementation
This module provides utilities for generating and applying Material Design 3 color schemes
based on a seed color. It implements Google&#39;s Material Color Utilities to create
comprehensive theme systems that follow Material Design guidelines for accessibility,
contrast, and visual hierarchy.</p>
<p>Key features:</p>
<ul>
<li>Generate complete light/dark theme pairs from a single seed color</li>
<li>Convert themes to CSS custom properties for web applications</li>
<li>Support for dynamic theme switching and contrast adjustment</li>
<li>Full Material Design 3 color token coverage including new surface variants</li>
<li>Automatic HSL to Hex color conversion utilities</li>
</ul>
<p>The color system generates 33+ semantic color tokens for each theme mode, ensuring
consistent color relationships across all UI elements while maintaining WCAG
accessibility standards.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#AppBar">AppBar(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>AppBar component that implements a Material Design 3 styled top app bar.
This component serves as the primary toolbar at the top of the application,
containing navigation controls, app identity elements, and action items.</p>
<p>The AppBar combines branding elements (logo, app name) with navigation controls
in the prefix array (back arrow, navigation drawer toggle) and action items
in the suffix array. It respects safe area insets for proper display on devices
with notches or rounded corners using the <code>pt-safe</code> class from tailwindcss-safe-area plugin.</p>
<p>Key features include:</p>
<ul>
<li>Responsive design that adapts to different screen sizes</li>
<li>Flexible positioning with customizable CSS classes</li>
<li>Support for light/dark theme variants</li>
<li>Configurable height and background colors</li>
<li>Safe area support for modern mobile devices</li>
<li>Proper accessibility with semantic markup</li>
<li>Flexible prefix/suffix arrays for navigation and action items</li>
<li>Automatic filtering of null/undefined items in prefix and suffix arrays</li>
<li>Optimized for Button components with style=&quot;embedded&quot; and size=&quot;sm&quot; in prefix/suffix arrays</li>
</ul>
<p>By default, it&#39;s positioned fixed at the top of the viewport, but this behavior
can be customized via the optionalClass prop. The component&#39;s height and background
color are fully configurable to accommodate different design requirements.</p>
<p>The component includes responsive padding that adapts to screen sizes, with tighter
spacing on mobile devices and more generous spacing on larger screens.</p>
</dd>
<dt><a href="#Button">Button(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A versatile button component implementing Material Design 3 principles with multiple
styles, sizes, and configurations. Supports icons, different visual styles, and
responsive design with comprehensive light/dark theme support.</p>
<p>The component provides eight distinct visual styles:</p>
<ul>
<li><strong>filled</strong>: High emphasis with solid background (default)</li>
<li><strong>tonal</strong>: Medium emphasis with tonal background</li>
<li><strong>outlined</strong>: Medium emphasis with outlined border</li>
<li><strong>elevated</strong>: Medium emphasis with shadow elevation</li>
<li><strong>text</strong>: Low emphasis, text-only appearance</li>
<li><strong>danger/error</strong>: High emphasis for destructive actions</li>
<li><strong>embedded</strong>: Minimal emphasis for inline actions</li>
</ul>
<p>Features include:</p>
<ul>
<li>Automatic size adjustment based on content and style</li>
<li>Hover and active state animations</li>
<li>Disabled state handling with appropriate visual feedback</li>
<li>Flexible width and border radius customization</li>
<li>Accessibility support with proper ARIA attributes</li>
<li>Icon-only or text-only configurations</li>
<li>Factory method (Button.forAppBar) for creating AppBar-optimized buttons</li>
</ul>
</dd>
<dt><a href="#ButtonGroup">ButtonGroup(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A button group component implementing Material Design 3 principles that provides
segmented control functionality with single or multi-selection capabilities.</p>
<p>This component offers a complete button group solution featuring:</p>
<ul>
<li><strong>Segmented Control</strong>: Visual grouping of related action buttons</li>
<li><strong>Selection Modes</strong>: Support for both single-select and multi-select behavior</li>
<li><strong>Material Design 3 Styling</strong>: Proper button states and transitions</li>
<li><strong>Flexible Configuration</strong>: Support for icons, labels, or icon+label combinations</li>
<li><strong>State Management</strong>: Selected buttons use &quot;filled&quot; style, others use &quot;tonal&quot; style</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
<li><strong>Responsive Design</strong>: Adapts to different screen sizes and device capabilities</li>
<li><strong>Accessibility</strong>: Proper ARIA attributes and keyboard navigation support</li>
</ul>
<p>The component automatically handles selection state visualization by applying different
button styles based on selection status. It can function as either a toggle button
group (multi-select) or a segmented control (single-select) depending on configuration.</p>
<p>All buttons within the group maintain consistent sizing and spacing while providing
clear visual feedback for user interactions and selection states.</p>
</dd>
<dt><a href="#CheckBox">CheckBox(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A customizable checkbox component implementing Material Design 3 principles
with comprehensive styling, accessibility features, and state management.</p>
<p>This component provides a complete checkbox solution featuring:</p>
<ul>
<li><strong>Material Design 3 Styling</strong>: Authentic visual appearance with proper proportions</li>
<li><strong>Label Integration</strong>: Optional text labels with proper clickable association</li>
<li><strong>State Management</strong>: Support for checked, unchecked, and indeterminate states</li>
<li><strong>Validation States</strong>: Built-in error/danger styling for form validation feedback</li>
<li><strong>Accessibility</strong>: Full ARIA support, keyboard navigation, and screen reader compatibility</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
<li><strong>Responsive Design</strong>: Adapts to different screen sizes and touch targets</li>
<li><strong>Hover Effects</strong>: Interactive feedback for better user experience</li>
</ul>
<p>The component follows controlled component patterns, requiring external state management
for the checked value. It provides smooth transitions for all state changes and
maintains consistent styling across different browsers and platforms.</p>
<p>Error states apply red color variants throughout the component for clear visual
feedback during form validation scenarios.</p>
</dd>
<dt><a href="#Fab">Fab(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Floating Action Button (FAB) component implementing Material Design 3 principles
with expandable menu functionality and comprehensive styling options.</p>
<p>This component provides a complete FAB solution featuring:</p>
<ul>
<li><strong>Primary Action Focus</strong>: Prominent circular button for the most important action</li>
<li><strong>Expandable Menu</strong>: Optional secondary actions that appear when FAB is activated</li>
<li><strong>Material Design 3 Styling</strong>: Authentic elevation, colors, and interaction patterns</li>
<li><strong>Multiple Color Variants</strong>: Primary, secondary, and tertiary color schemes</li>
<li><strong>Smooth Animations</strong>: Fluid transitions for expand/collapse and hover states</li>
<li><strong>Accessibility</strong>: Proper ARIA attributes and keyboard navigation support</li>
<li><strong>Responsive Positioning</strong>: Flexible positioning with safe area support</li>
<li><strong>State Management</strong>: Internal state handling for expand/collapse behavior</li>
</ul>
<p>The FAB follows Material Design guidelines for floating action buttons, providing
a persistent and prominent way to access primary actions. When items are provided,
it becomes an expandable FAB that reveals additional actions in a vertical menu.</p>
<p>The component automatically handles menu state transitions and provides visual
feedback for all interactions. Menu items are displayed with appropriate spacing
and follow the same design patterns as the main FAB button.</p>
</dd>
<dt><a href="#NavigationBar">NavigationBar(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A mobile-first bottom navigation bar component with responsive behavior.
Displays a row of navigation items with icons and labels.
On mobile, renders as a fixed bottom bar with vertically stacked items.
On desktop, displays a horizontal bar with inline icon+label pairs.</p>
<p>Supports active states, disabled states, and hover effects that adapt to screen size.
Follows Material Design 3 theming guidelines with proper light/dark mode support.
Includes safe area padding for devices with rounded corners or notches (e.g., iPhone).</p>
<p>The component automatically handles different visual states:</p>
<ul>
<li>Active items are highlighted with container colors and primary text</li>
<li>Active items show background highlighting on mobile, pill shape on desktop</li>
<li>Disabled items appear with reduced opacity and are non-interactive</li>
<li>Hover/active effects adapt between mobile and desktop views</li>
<li>Provides enhanced touch feedback with active states for mobile interactions</li>
</ul>
</dd>
<dt><a href="#NavigationDrawer">NavigationDrawer(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Navigation drawer component implementing Material Design 3 navigation drawer pattern.
Provides a sliding drawer interface for application navigation with support for
both persistent (always visible) and temporary (modal overlay) modes.</p>
<p>The drawer features a clean, modern design with:</p>
<ul>
<li>A header area with app identity elements and proper spacing</li>
<li>A scrollable content area containing navigation items with consistent styling</li>
<li>Support for icons, labels, badges, and dividers within navigation items</li>
<li>Proper theming with light/dark mode support using Material Design 3 color tokens</li>
<li>Responsive behavior that adapts to different screen sizes</li>
</ul>
<p>In temporary mode, the drawer displays over a semi-transparent overlay that
dismisses the drawer when clicked, following standard modal patterns. In
persistent mode, the drawer remains visible and takes up dedicated screen space.</p>
<p>The component respects accessibility guidelines with proper focus management,
keyboard navigation support, and semantic markup for screen readers.</p>
</dd>
<dt><a href="#NavigationRail">NavigationRail(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A vertical navigation rail component implementing Material Design 3 guidelines.
Displays a column of navigation items with icons and labels along the side of the screen.</p>
<p>The NavigationRail is designed for tablet and desktop layouts as a space-efficient
alternative to a full navigation drawer. It provides quick access to top-level
destinations while taking up minimal horizontal space.</p>
<p>Features:</p>
<ul>
<li>Compact mode (default) shows only icons with small labels on narrow screens</li>
<li>Expanded mode shows icons with larger labels on wider screens (lg breakpoint)</li>
<li>Supports active states with highlighted backgrounds and colors</li>
<li>Supports disabled states with reduced opacity</li>
<li>Provides hover effects that adapt based on screen size</li>
<li>Follows Material Design 3 theming guidelines with proper light/dark mode support</li>
</ul>
</dd>
<dt><a href="#PWABadge">PWABadge(props)</a> ⇒ <code>JSX.Element</code> | <code>null</code></dt>
<dd><p>PWA status notification component implementing Progressive Web App principles
that provides seamless offline capability and update management.</p>
<p>This component offers comprehensive PWA lifecycle management featuring:</p>
<ul>
<li><strong>Service Worker Integration</strong>: Built upon @vite-pwa/pwa plugin&#39;s useRegisterSW hook</li>
<li><strong>Update Notifications</strong>: Automatic detection and prompting for new app versions</li>
<li><strong>Offline Ready Status</strong>: Clear indication when content is cached and available offline</li>
<li><strong>User-Controlled Updates</strong>: Reload button for user-initiated app updates</li>
<li><strong>Customizable Messaging</strong>: Configurable notification text for different scenarios</li>
<li><strong>Automatic Monitoring</strong>: Periodic checking for app updates at configurable intervals</li>
<li><strong>Responsive Design</strong>: Notification badge adapts to different screen sizes</li>
<li><strong>Accessibility</strong>: Proper ARIA attributes and keyboard navigation support</li>
</ul>
<p>The component handles all PWA lifecycle states automatically:</p>
<ul>
<li>Silent background checking for updates</li>
<li>Notification display when updates are available</li>
<li>Clear indication when app is ready for offline use</li>
<li>Graceful handling of service worker registration failures</li>
</ul>
<p>The notification appears as a small badge/banner that doesn&#39;t interfere with
the main app interface while providing essential PWA status information.</p>
</dd>
<dt><a href="#PasswordField">PasswordField(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A specialized password input field implementing Material Design 3 principles
with integrated visibility toggle functionality for enhanced user experience.</p>
<p>This component provides a complete password input solution featuring:</p>
<ul>
<li><strong>Visibility Toggle</strong>: Built-in eye icon button for showing/hiding password text</li>
<li><strong>Security Focused</strong>: Monospace font by default for better character recognition</li>
<li><strong>TextField Integration</strong>: Built on top of TextField component for consistency</li>
<li><strong>Validation Support</strong>: Full error handling and helper text capabilities</li>
<li><strong>Accessibility</strong>: Proper ARIA attributes for screen readers and password managers</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
<li><strong>Responsive Design</strong>: Adapts to different screen sizes and device capabilities</li>
<li><strong>State Management</strong>: Internal visibility state with external value control</li>
</ul>
<p>The component uses a monospace font by default to improve password character
recognition and uses appropriate input types for browser password manager integration.
The visibility toggle provides immediate feedback and maintains security best practices
by defaulting to hidden text.</p>
<p>All styling and behavior is consistent with the base TextField component while
adding password-specific enhancements for security and usability.</p>
</dd>
<dt><a href="#RadioGroup">RadioGroup(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A radio button group component implementing Material Design 3 principles
that provides intuitive single-selection interface from multiple options.</p>
<p>This component offers a complete radio group solution featuring:</p>
<ul>
<li><strong>Single Selection</strong>: Only one option can be selected at a time within the group</li>
<li><strong>Material Design 3 Styling</strong>: Authentic radio button appearance with proper proportions</li>
<li><strong>Flexible Layout</strong>: Support for both horizontal and vertical arrangement of options</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
<li><strong>Accessibility</strong>: Full keyboard navigation and screen reader compatibility</li>
<li><strong>State Management</strong>: Controlled component pattern with external state management</li>
<li><strong>Touch Optimization</strong>: Appropriate touch targets for mobile interaction</li>
<li><strong>Label Association</strong>: Proper label-input association for improved usability</li>
</ul>
<p>The component renders as a React Fragment containing individual radio button elements,
each properly associated with its label for accessibility. All radio buttons within
the group share the same name attribute for proper browser grouping behavior.</p>
<p>The layout can be configured for different use cases - horizontal for compact
selections and vertical for longer lists or improved mobile accessibility.</p>
</dd>
<dt><a href="#Slider">Slider(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>An interactive slider component implementing Material Design 3 principles that provides
intuitive value selection through drag interactions and click positioning.</p>
<p>This component offers a comprehensive slider solution featuring:</p>
<ul>
<li><strong>Continuous and Discrete Modes</strong>: Support for 0-1 continuous values or discrete step counts</li>
<li><strong>Touch and Mouse Interaction</strong>: Responsive drag handling optimized for both desktop and mobile</li>
<li><strong>Visual Feedback</strong>: Smooth animations, hover states, and active interaction indicators</li>
<li><strong>Responsive Design</strong>: Automatic resize handling and touch-optimized interaction zones</li>
<li><strong>Accessibility</strong>: Keyboard navigation support and proper ARIA attributes</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
<li><strong>Flexible Sizing</strong>: Multiple size variants (xs, sm, md) for different use cases</li>
<li><strong>Progress Indication</strong>: Can be used as read-only progress indicators</li>
</ul>
<p>The component supports both continuous sliders (count=1, values 0-1) and discrete
step sliders (count&gt;1, integer values 0 to count). It provides immediate visual
feedback during interaction and maintains smooth performance across all devices.</p>
<p>All interactions are handled through modern pointer events for consistent behavior
across different input methods (mouse, touch, pen).</p>
</dd>
<dt><a href="#Switch">Switch(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A toggle switch component implementing Material Design 3 principles that provides
an intuitive on/off control interface with smooth visual transitions.</p>
<p>This component offers a complete switch solution featuring:</p>
<ul>
<li><strong>Material Design 3 Styling</strong>: Authentic visual appearance with proper track and thumb proportions</li>
<li><strong>Smooth Animations</strong>: Fluid transitions for thumb movement and color changes</li>
<li><strong>Visual Indicators</strong>: Checkmark icon appears when switch is in enabled state</li>
<li><strong>State Feedback</strong>: Clear visual distinction between on/off states with color coding</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
<li><strong>Accessibility</strong>: Full keyboard navigation support and screen reader compatibility</li>
<li><strong>Touch Optimization</strong>: Appropriate touch target size for mobile interaction</li>
<li><strong>Disabled States</strong>: Proper visual feedback for non-interactive switches</li>
</ul>
<p>The switch follows controlled component patterns, requiring external state management.
It provides immediate visual feedback during state transitions and maintains consistent
behavior across different platforms and browsers.</p>
<p>Commonly used for settings, preferences, feature toggles, and any binary choice
where immediate feedback is important to the user experience.</p>
</dd>
<dt><a href="#TextField">TextField(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A versatile text input field component implementing Material Design 3 principles
with floating labels, validation states, and customizable styling.</p>
<p>This component provides a comprehensive text input solution with:</p>
<ul>
<li><strong>Floating Label Animation</strong>: Labels smoothly transition above the input when focused or filled</li>
<li><strong>Validation States</strong>: Built-in error handling with visual feedback and message display</li>
<li><strong>Prefix/Suffix Elements</strong>: Support for icons, buttons, or other interactive elements</li>
<li><strong>Multiple Input Types</strong>: text, email, password, number with appropriate validation</li>
<li><strong>Responsive Design</strong>: Adapts to different screen sizes and device capabilities</li>
<li><strong>Accessibility</strong>: Proper ARIA attributes, focus management, and screen reader support</li>
<li><strong>Theme Integration</strong>: Seamless light/dark mode support with Material Design colors</li>
</ul>
<p>The component supports both filled and outlined visual styles, automatic width sizing,
and comprehensive state management for focused, filled, error, and disabled states.
It includes smooth animations for all state transitions and provides excellent
user feedback through visual and text cues.</p>
<p>All interactive prefix and suffix elements should use Button components with
style=&quot;embedded&quot; for consistent theming and behavior within the text field context.</p>
</dd>
<dt><a href="#computeMode">computeMode(systemMode, brightnessSetting)</a> ⇒ <code>boolean</code></dt>
<dd><p>Computes the actual theme mode (dark/light) based on system preference and user setting.</p>
</dd>
<dt><a href="#nextMode">nextMode(systemMode, brightnessSetting)</a> ⇒ <code>string</code></dt>
<dd><p>Determines the next mode in the cycling sequence based on current system and user settings.</p>
</dd>
<dt><a href="#ToggleDarkModeButton">ToggleDarkModeButton(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A toggle button component that cycles between system preference, light mode, and dark mode.
Automatically detects system preference via media queries and persists user&#39;s choice in localStorage.</p>
<p>The component provides intelligent theme switching with three states:</p>
<ol>
<li><strong>System preference</strong> (default) - automatically follows the device&#39;s color scheme preference</li>
<li><strong>Light mode</strong> - forces light theme regardless of system preference</li>
<li><strong>Dark mode</strong> - forces dark theme regardless of system preference</li>
</ol>
<p>Key features:</p>
<ul>
<li>Automatically detects and responds to system color scheme changes</li>
<li>Persists user preference across browser sessions using localStorage</li>
<li>Applies theme changes by adding/removing &quot;dark&quot; class on document element</li>
<li>Displays appropriate icons for each state (system/brightness/dark mode icons)</li>
<li>Integrates seamlessly with Tailwind CSS dark mode utilities</li>
<li>Supports all Button component styling options</li>
</ul>
<p>CSS Setup Required:
To enable dark mode styles in your application, add this custom variant to your CSS:
```css</p>
</dd>
<dt><a href="#initLanguage">initLanguage(langs, setLanguage)</a></dt>
<dd><p>Initializes the language from localStorage if a valid language is stored.</p>
</dd>
<dt><a href="#nextLanguage">nextLanguage(langs, currentLanguage, setLanguage)</a></dt>
<dd><p>Cycles to the next available language in the languages object.</p>
</dd>
<dt><a href="#ToggleLanguageButton">ToggleLanguageButton(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>A button component that toggles the application&#39;s language between available translations.
Cycles through languages defined in the languages object and persists the selection in localStorage.</p>
<p>The component automatically displays either:</p>
<ul>
<li>The current language&#39;s label (if defined in langs[lang].label)</li>
<li>A universal language icon (Material Design language icon) as fallback</li>
</ul>
<p>Key features:</p>
<ul>
<li>Automatically loads the previously selected language from localStorage on mount</li>
<li>Cycles through available languages in the order they appear in the languages object</li>
<li>Persists language preference across browser sessions using localStorage</li>
<li>Framework-agnostic design works with any internationalization library or custom setup</li>
<li>Provides visual feedback with either text labels or language icon</li>
<li>Supports all Button component styling options</li>
</ul>
<p>Requirements:</p>
<ul>
<li>A languages object with language codes as keys</li>
<li>Each language entry should optionally have a &#39;label&#39; property for display</li>
<li>Parent component should handle the actual language switching logic via setLang callback</li>
</ul>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FabMenuItemProp">FabMenuItemProp</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#NavigationBarItem">NavigationBarItem</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#NavigationRailItem">NavigationRailItem</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_material-theme"></a>

## material-theme
Material Design 3 Color System Implementation
This module provides utilities for generating and applying Material Design 3 color schemes
based on a seed color. It implements Google's Material Color Utilities to create
comprehensive theme systems that follow Material Design guidelines for accessibility,
contrast, and visual hierarchy.

Key features:
- Generate complete light/dark theme pairs from a single seed color
- Convert themes to CSS custom properties for web applications
- Support for dynamic theme switching and contrast adjustment
- Full Material Design 3 color token coverage including new surface variants
- Automatic HSL to Hex color conversion utilities

The color system generates 33+ semantic color tokens for each theme mode, ensuring
consistent color relationships across all UI elements while maintaining WCAG
accessibility standards.

**Since**: 1.0.0  
**Example**  
```js
// Basic theme generation
import { generateScheme, applyColorScheme } from './material-theme.js';

const scheme = await generateScheme('#1976D2', 0);
applyColorScheme(scheme); // Apply theme to document
```
**Example**  
```js
// Generate CSS for static inclusion
import { generateScheme, generateThemeCss } from './material-theme.js';

const scheme = await generateScheme('#E91E63', 0.2);
const cssContent = generateThemeCss(scheme, '#E91E63', 0.2);
// Save cssContent to a .css file
```

* [material-theme](#module_material-theme)
    * _static_
        * [.generateScheme(seedColor, contrast)](#module_material-theme.generateScheme) ⇒ <code>Promise.&lt;Array.&lt;ThemeObject&gt;&gt;</code>
        * [.convertToVariables(scheme)](#module_material-theme.convertToVariables) ⇒ <code>object</code>
        * [.applyColorScheme(scheme)](#module_material-theme.applyColorScheme) ⇒ <code>void</code>
        * [.generateThemeCss(scheme, seedColor, contrast)](#module_material-theme.generateThemeCss) ⇒ <code>string</code>
        * [.hslToHex(h, [s], [l])](#module_material-theme.hslToHex) ⇒ <code>string</code>
    * _inner_
        * [~ColorPair](#module_material-theme..ColorPair) : <code>Array.&lt;string&gt;</code>
        * [~ThemeObject](#module_material-theme..ThemeObject) : <code>object</code>

<a name="module_material-theme.generateScheme"></a>

### material-theme.generateScheme(seedColor, contrast) ⇒ <code>Promise.&lt;Array.&lt;ThemeObject&gt;&gt;</code>
Generates a comprehensive Material Design color scheme from a seed color.
Creates both light and dark theme variants with all standard Material Design
color tokens including primary, secondary, tertiary, surface, and semantic colors.

Based on Material Design 3 color system, this function uses the provided seed color
to generate harmonious color palettes for both light and dark modes that follow
accessibility guidelines. It utilizes the Material Color Utilities package to apply
proper color theory for generating tonal palettes from the seed color.

The function creates separate tokens for key UI elements following Material Design's
naming conventions like 'onPrimary' for text on primary surfaces and 'primaryContainer'
for container elements with primary color associations.

**Kind**: static method of [<code>material-theme</code>](#module_material-theme)  
**Returns**: <code>Promise.&lt;Array.&lt;ThemeObject&gt;&gt;</code> - Promise resolving to an array of theme objects:
- Each theme contains: {brightness, colors}
- brightness: "light" or "dark"
- colors: Array of [tokenName, hexColor] pairs (33+ tokens per theme)  
**Throws**:

- <code>Error</code> Throws error if seedColor is not a valid hex color format

**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| seedColor | <code>string</code> | Hex color code (e.g., "#FF5722") to use as the base for generating the entire color scheme.   Must be a valid 6-digit hexadecimal color with # prefix. Invalid colors will throw an error. |
| contrast | <code>number</code> | Contrast level for the scheme, typically ranging from -1.0 to 1.0.   - 0.0: Standard contrast (default Material Design contrast)   - Positive values: Higher contrast for improved accessibility   - Negative values: Lower contrast for softer appearance   - Values outside -1.0 to 1.0 are automatically clamped |

**Example**  
```js
// Generate a blue-based theme with standard contrast
const scheme = await generateScheme("#1976D2", 0);
// Returns: [
//   {brightness: "light", colors: [["primary", "#1976D2"], ["onPrimary", "#FFFFFF"], ...]},
//   {brightness: "dark", colors: [["primary", "#90CAF9"], ["onPrimary", "#003258"], ...]}
// ]
```
**Example**  
```js
// Generate a high-contrast green theme for accessibility
const highContrastScheme = await generateScheme("#4CAF50", 0.5);
```
**Example**  
```js
// Generate theme for brand colors with custom contrast
const brandColor = "#E91E63"; // Brand pink
const themeData = await generateScheme(brandColor, 0.2);
const [lightTheme, darkTheme] = themeData;
```
<a name="module_material-theme.convertToVariables"></a>

### material-theme.convertToVariables(scheme) ⇒ <code>object</code>
Converts a Material Design theme scheme to CSS custom properties (variables).
Transforms theme color tokens into CSS variable format with proper naming conventions.

This function processes the output from generateScheme() and formats it as CSS custom properties
that can be directly applied to stylesheets. It uses kebab-case naming for CSS variables
following CSS best practices (e.g., "primaryContainer" becomes "--primary-container").

Each color value is formatted as a hexadecimal color string suitable for CSS usage.
The generated variables follow Material Design's semantic naming system for consistent
theming across components.

**Kind**: static method of [<code>material-theme</code>](#module_material-theme)  
**Returns**: <code>object</code> - Object with brightness values as keys ("light", "dark")
  and CSS variable objects as values. Each nested object contains CSS variable names
  as keys (with -- prefix) and hex color values.  
**Throws**:

- <code>Error</code> Throws error if scheme is empty, malformed, or contains invalid color data

**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| scheme | <code>Array.&lt;ThemeObject&gt;</code> | Array of theme objects from generateScheme().   Expected format: [{brightness: "light"|"dark", colors: [[tokenName, hexColor], ...]}, ...]   - Must contain at least one theme object   - Each theme must have brightness and colors properties   - colors should be array of [string, string] tuples |

**Example**  
```js
// Convert generated scheme to CSS variables
const scheme = await generateScheme("#1976D2", 0);
const cssVars = convertToVariables(scheme);
console.log(cssVars);
// Output:
// {
//   "light": {
//     "--primary": "#1976D2",
//     "--on-primary": "#FFFFFF",
//     "--primary-container": "#90CAF9",
//     "--surface": "#FFFBFE",
//     ...
//   },
//   "dark": {
//     "--primary": "#90CAF9",
//     "--on-primary": "#003258",
//     "--primary-container": "#004881",
//     "--surface": "#121212",
//     ...
//   }
// }
```
**Example**  
```js
// Apply to stylesheet dynamically
const variables = convertToVariables(themeScheme);
const lightVars = variables.light;
Object.entries(lightVars).forEach(([prop, value]) => {
  document.documentElement.style.setProperty(prop, value);
});
```
<a name="module_material-theme.applyColorScheme"></a>

### material-theme.applyColorScheme(scheme) ⇒ <code>void</code>
Applies a Material Design color scheme directly to the document by setting
CSS variables. This function takes a color scheme generated by generateScheme()
and applies it to the current document by setting CSS custom properties
on the document root element.

This function directly modifies the DOM to apply the theme immediately,
making it useful for runtime theme switching. It processes both light and dark
theme variants from the scheme and applies them using the naming convention
of `--color-{brightness}-{token-name}` for CSS variables.

The function performs immediate DOM manipulation, so themes become active
instantly without requiring page reloads or additional CSS loading.

**Kind**: static method of [<code>material-theme</code>](#module_material-theme)  
**Returns**: <code>void</code> - This function does not return a value, it modifies the document directly.
  All CSS custom properties are set on document.documentElement for global access.  
**Throws**:

- <code>Error</code> May throw if scheme data is malformed or DOM manipulation fails

**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| scheme | <code>Array.&lt;ThemeObject&gt;</code> | Color scheme data from generateScheme().   Expected format: Array of {brightness, colors} objects where:   - brightness: "light" or "dark" string identifier   - colors: Array of [tokenName, hexColor] string pair arrays   - Must contain valid color data for proper theme application |

**Example**  
```js
// Generate a theme and apply it immediately
const scheme = await generateScheme("#1976D2", 0);
applyColorScheme(scheme);
// CSS variables like --color-light-primary and --color-dark-primary are now available
```
**Example**  
```js
// Update theme dynamically based on user selection
const userColor = getUserSelectedColor();
const newScheme = await generateScheme(userColor, 0.2);
applyColorScheme(newScheme);
```
**Example**  
```js
// Apply theme with error handling
try {
  const brandScheme = await generateScheme("#E91E63", 0);
  applyColorScheme(brandScheme);
  console.log("Theme applied successfully");
} catch (error) {
  console.error("Failed to apply theme:", error);
}
```
<a name="module_material-theme.generateThemeCss"></a>

### material-theme.generateThemeCss(scheme, seedColor, contrast) ⇒ <code>string</code>
Converts a Material Design color scheme into CSS custom properties (CSS variables).
Transforms the color scheme data into a CSS @theme block with properly named
CSS custom properties for both light and dark themes, plus additional
form-specific colors.

This function creates kebab-case CSS custom property names from camelCase token
names and adds metadata comments about the generation process. It follows a naming convention
of `--color-{brightness}-{token-name}` to organize variables by theme mode and purpose.

In addition to the colors from the schema, this function also adds supplementary color variables
for links and form elements that aren't directly provided by the Material Design scheme but
are useful for web applications. These include semantic colors for interactive elements
and form controls that maintain design consistency.

The generated CSS includes comprehensive metadata documenting when and how the theme
was created, making it easier to track theme generations and their parameters.

**Kind**: static method of [<code>material-theme</code>](#module_material-theme)  
**Returns**: <code>string</code> - CSS string containing complete @theme block with:
  - Header comment with generation metadata (timestamp, seed color, contrast)
  - All Material Design color custom properties for light and dark modes
  - Additional semantic color variables for links and forms
  - Proper CSS formatting ready for file output or style injection  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| scheme | <code>Array.&lt;ThemeObject&gt;</code> | Color scheme data from generateScheme().   Expected format: Array of {brightness, colors} objects where:   - brightness: "light" or "dark" string identifier   - colors: Array of [tokenName, hexColor] string pair arrays   - Must contain complete color token data for valid CSS generation |
| seedColor | <code>string</code> | The original seed color used to generate the scheme.   Should be a valid hex color (e.g., "#1976D2") used for theme generation metadata.   This value is included in generated CSS comments for documentation purposes. |
| contrast | <code>number</code> | The contrast level used when generating the scheme.   Typically ranges from -1.0 to 1.0, included in CSS metadata for reference.   Used to document the accessibility settings applied to the theme. |

**Example**  
```js
// Convert scheme to complete CSS theme
const scheme = await generateScheme("#1976D2", 0);
const cssTheme = generateThemeCss(scheme, "#1976D2", 0);
// Returns formatted CSS with @theme block containing color variables
```
**Example**  
```js
// Generate CSS file for build process
const brandScheme = await generateScheme("#E91E63", 0.3);
const themeCSS = generateThemeCss(brandScheme, "#E91E63", 0.3);
await fs.writeFile('theme.css', themeCSS, 'utf8');
```
**Example**  
```js
// Use with CSS injection for dynamic theming
const userScheme = await generateScheme(userPickedColor, userContrastLevel);
const themeCss = generateThemeCss(userScheme, userPickedColor, userContrastLevel);
const styleEl = document.createElement('style');
styleEl.textContent = themeCss;
document.head.appendChild(styleEl);
```
<a name="module_material-theme.hslToHex"></a>

### material-theme.hslToHex(h, [s], [l]) ⇒ <code>string</code>
Converts HSL (Hue, Saturation, Lightness) color values to hexadecimal format.
Uses the HSL color model to generate web-compatible hex color codes.

This function implements the HSL to RGB conversion algorithm and formats
the result as a hexadecimal color string. HSL provides an intuitive way
to define colors based on human color perception rather than technical
RGB components.

The conversion follows the standard HSL color space definition where:
- Hue represents the color wheel position (red=0°, green=120°, blue=240°)
- Saturation controls color purity (0% = grayscale, 100% = pure color)
- Lightness controls brightness (0% = black, 50% = pure color, 100% = white)

**Kind**: static method of [<code>material-theme</code>](#module_material-theme)  
**Returns**: <code>string</code> - Hexadecimal color code in format #RRGGBB (uppercase).
  Always returns 6-digit hex format with # prefix for CSS compatibility.  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| h | <code>number</code> | Hue value in degrees (0-360). Represents the color wheel position.   Values outside this range will be normalized using modulo operation.   - 0° = Red, 60° = Yellow, 120° = Green, 180° = Cyan, 240° = Blue, 300° = Magenta |
| [s] | <code>number</code> | Saturation percentage (0-100). Controls color intensity/purity.   Defaults to 100 if not provided.   - 0 = Completely desaturated (grayscale)   - 100 = Fully saturated (pure color)   - Values outside 0-100 are clamped to valid range |
| [l] | <code>number</code> | Lightness percentage (0-100). Controls brightness.   Defaults to 50 if not provided.   - 0 = Black (regardless of hue/saturation)   - 50 = Normal lightness (pure color at full saturation)   - 100 = White (regardless of hue/saturation) |

**Example**  
```js
// Pure red color
hslToHex(0, 100, 50); // Returns "#FF0000"
```
**Example**  
```js
// Blue with default saturation and lightness
hslToHex(240); // Returns "#0000FF" (equivalent to hslToHex(240, 100, 50))
```
**Example**  
```js
// Create a pastel pink
hslToHex(330, 50, 80); // Returns "#E6B3CC"
```
**Example**  
```js
// Generate complementary colors
const baseHue = 200; // Cyan-blue
const baseColor = hslToHex(baseHue, 70, 60);
const complementary = hslToHex(baseHue + 180, 70, 60);
```
**Example**  
```js
// Create color variations with different lightness
const hue = 90; // Yellow-green
const colors = [
  hslToHex(hue, 80, 20), // Dark variant
  hslToHex(hue, 80, 50), // Normal variant
  hslToHex(hue, 80, 80)  // Light variant
];
```
<a name="module_material-theme..ColorPair"></a>

### material-theme~ColorPair : <code>Array.&lt;string&gt;</code>
A color token pair representing a semantic color name and its hexadecimal value.
Used throughout the Material Design color system to associate meaningful names
with specific color values, enabling semantic color usage in UI components.

**Kind**: inner typedef of [<code>material-theme</code>](#module_material-theme)  
**Since**: 1.0.0  
**Example**  
```js
["primary", "#1976D2"]
```
**Example**  
```js
["onPrimary", "#FFFFFF"]
```
**Example**  
```js
["surfaceContainerHighest", "#E8EAF6"]
```
<a name="module_material-theme..ThemeObject"></a>

### material-theme~ThemeObject : <code>object</code>
Complete theme object containing brightness mode and associated color tokens.
Represents either a light or dark theme variant with all Material Design 3
semantic color tokens. Each theme object contains 33+ color pairs covering
primary, secondary, tertiary, surface, and semantic color categories.

**Kind**: inner typedef of [<code>material-theme</code>](#module_material-theme)  
**Since**: 1.0.0  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| brightness | <code>string</code> | Theme brightness mode, either "light" or "dark" |
| colors | <code>Array.&lt;ColorPair&gt;</code> | Array of semantic color token pairs |

**Example**  
```js
// Light theme example
{
  brightness: "light",
  colors: [
    ["primary", "#1976D2"],
    ["onPrimary", "#FFFFFF"],
    ["primaryContainer", "#BBDEFB"],
    ["surface", "#FEFBFF"],
    ["onSurface", "#1C1B1F"]
  ]
}
```
**Example**  
```js
// Dark theme example
{
  brightness: "dark",
  colors: [
    ["primary", "#90CAF9"],
    ["onPrimary", "#003258"],
    ["primaryContainer", "#004881"],
    ["surface", "#141218"],
    ["onSurface", "#E6E0E9"]
  ]
}
```
<a name="AppBar"></a>

## AppBar(props) ⇒ <code>JSX.Element</code>
AppBar component that implements a Material Design 3 styled top app bar.
This component serves as the primary toolbar at the top of the application,
containing navigation controls, app identity elements, and action items.

The AppBar combines branding elements (logo, app name) with navigation controls
in the prefix array (back arrow, navigation drawer toggle) and action items
in the suffix array. It respects safe area insets for proper display on devices
with notches or rounded corners using the `pt-safe` class from tailwindcss-safe-area plugin.

Key features include:
- Responsive design that adapts to different screen sizes
- Flexible positioning with customizable CSS classes
- Support for light/dark theme variants
- Configurable height and background colors
- Safe area support for modern mobile devices
- Proper accessibility with semantic markup
- Flexible prefix/suffix arrays for navigation and action items
- Automatic filtering of null/undefined items in prefix and suffix arrays
- Optimized for Button components with style="embedded" and size="sm" in prefix/suffix arrays

By default, it's positioned fixed at the top of the viewport, but this behavior
can be customized via the optionalClass prop. The component's height and background
color are fully configurable to accommodate different design requirements.

The component includes responsive padding that adapts to screen sizes, with tighter
spacing on mobile devices and more generous spacing on larger screens.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - AppBar component with configured navigation and branding elements  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.appLogo] | <code>React.ReactNode</code> | App logo component or image element to display as brand identity |
| [props.appName] | <code>string</code> | Name of the application to display next to the logo |
| [props.prefix] | <code>Array.&lt;React.ReactNode&gt;</code> | Array of elements to display on the left side (e.g., back arrow, navigation drawer toggle).   Typically contains Button.forAppBar components for consistent app bar styling. |
| [props.suffix] | <code>Array.&lt;React.ReactNode&gt;</code> | Array of action items (buttons, icons) to display on the right side of the app bar.   Typically contains Button.forAppBar components for consistent app bar styling. |
| [props.optionalClass] | <code>string</code> | Additional CSS classes for positioning and styling (defaults to "fixed top-0") |
| [props.height] | <code>string</code> | Height of the app bar as Tailwind CSS class, supports responsive classes (defaults to "h-12 sm:h-14") |
| [props.textColor] | <code>string</code> | Text color CSS classes with light/dark mode variants for app bar content (defaults to "text-light-on-surface dark:text-dark-on-surface") |
| [props.bgColor] | <code>string</code> | Background color CSS classes with light/dark mode variants for the app bar container (defaults to "bg-light-surface dark:bg-dark-surface") |

**Example**  
```js
import { SvgMenu, SvgSearch, SvgNotifications } from '../icons';
import Button from './Button';

<AppBar
  prefix={[
    <Button.forAppBar icon={<SvgArrowBackIos />} onClick={goBack} />
    <Button.forAppBar icon={<SvgMenu />} onClick={toggleDrawer} />
  ]}
  appName="My Application"
  suffix={[
    <Button.forAppBar icon={<SvgSearch />} onClick={openSearch} />,
    <Button.forAppBar icon={<SvgNotifications />} onClick={showNotifications} />
  ]}
/>
```
**Example**  
```js
// Full configuration with logo and multiple actions
import { SvgLogo, SvgMenu, SvgSearch, SvgNotifications, SvgAccount } from '../icons';
import Button from './Button';

<AppBar
  prefix={[
    <Button.forAppBar icon={<SvgMenu />} onClick={toggleDrawer} />
  ]}
  appLogo={<SvgLogo />}
  appName="Enterprise App"
  suffix={[
    <Button.forAppBar icon={<SvgSearch />} onClick={openSearch} />,
    <Button.forAppBar icon={<SvgNotifications />} onClick={showNotifications} />,
    <Button.forAppBar icon={<SvgAccount />} onClick={openProfile} />
  ]}
  height="h-16 lg:h-20"
  bgColor="bg-white dark:bg-gray-900"
  textColor="text-gray-900 dark:text-white"
/>
```
<a name="Button"></a>

## Button(props) ⇒ <code>JSX.Element</code>
A versatile button component implementing Material Design 3 principles with multiple
styles, sizes, and configurations. Supports icons, different visual styles, and
responsive design with comprehensive light/dark theme support.

The component provides eight distinct visual styles:
- **filled**: High emphasis with solid background (default)
- **tonal**: Medium emphasis with tonal background
- **outlined**: Medium emphasis with outlined border
- **elevated**: Medium emphasis with shadow elevation
- **text**: Low emphasis, text-only appearance
- **danger/error**: High emphasis for destructive actions
- **embedded**: Minimal emphasis for inline actions

Features include:
- Automatic size adjustment based on content and style
- Hover and active state animations
- Disabled state handling with appropriate visual feedback
- Flexible width and border radius customization
- Accessibility support with proper ARIA attributes
- Icon-only or text-only configurations
- Factory method (Button.forAppBar) for creating AppBar-optimized buttons

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered button component with configured styling and behavior  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | The props object |
| [props.id] | <code>string</code> | Unique identifier for the button element |
| [props.icon] | <code>React.ReactNode</code> | Icon element to display alongside or instead of label |
| [props.label] | <code>string</code> | Text content to display in the button |
| [props.style] | <code>&#x27;filled&#x27;</code> \| <code>&#x27;tonal&#x27;</code> \| <code>&#x27;outlined&#x27;</code> \| <code>&#x27;elevated&#x27;</code> \| <code>&#x27;text&#x27;</code> \| <code>&#x27;danger&#x27;</code> \| <code>&#x27;error&#x27;</code> \| <code>&#x27;embedded&#x27;</code> | Visual style variant of the button (defaults to "filled") |
| [props.onClick] | <code>function</code> | Click event handler function (defaults to empty function) |
| [props.disabled] | <code>boolean</code> | Whether the button is disabled (defaults to false) |
| [props.rounded] | <code>string</code> | Tailwind CSS class for border radius (defaults to "rounded-full") |
| [props.size] | <code>&#x27;xs&#x27;</code> \| <code>&#x27;sm&#x27;</code> \| <code>&#x27;md&#x27;</code> | Size variant of the button (defaults to "sm", auto-adjusts to "xs" for embedded style) |
| [props.width] | <code>string</code> | Tailwind CSS class for button width (defaults to "w-fit") |

**Example**  
```js
// Basic filled button (default style)
<Button label="Click Me" onClick={() => console.log('clicked')} />
```
**Example**  
```js
// Icon button with custom styling
<Button
  icon={<SomeIcon />}
  style="outlined"
  size="md"
  rounded="rounded-lg"
/>
```
**Example**  
```js
// Danger button with label
<Button
  label="Delete"
  style="danger"
  onClick={handleDelete}
  disabled={isLoading}
/>
```
**Example**  
```js
// Icon-only button with custom width
<Button
  icon={<SvgAdd />}
  style="tonal"
  size="md"
  width="w-12"
/>
```
**Example**  
```js
// Embedded text button for inline actions
<Button
  label="Learn more"
  style="embedded"
  onClick={showDetails}
/>
```
**Example**  
```js
// AppBar button using factory method
import { SvgMenu } from '../icons';

const menuButton = Button.forAppBar({
  icon: <SvgMenu />,
  onClick: toggleMenu
});
```
<a name="Button.forAppBar"></a>

### Button.forAppBar(props) ⇒ <code>JSX.Element</code>
Factory method to create a Button optimized for AppBar usage.
Automatically applies style="embedded" and size="sm" which are the recommended
settings for buttons used in AppBar prefix and suffix arrays.

**Kind**: static method of [<code>Button</code>](#Button)  
**Returns**: <code>JSX.Element</code> - Button component optimized for AppBar usage  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Button props (excluding style and size which are preset) |
| [props.id] | <code>string</code> | Unique identifier for the button element |
| [props.icon] | <code>React.ReactNode</code> | Icon element to display |
| [props.label] | <code>string</code> | Text content to display in the button |
| [props.onClick] | <code>function</code> | Click event handler function |
| [props.disabled] | <code>boolean</code> | Whether the button is disabled |

**Example**  
```js
// Create an AppBar navigation button
import { SvgMenu } from '../icons';

const navigationButton = Button.forAppBar({
  icon: <SvgMenu />,
  onClick: () => setDrawerOpen(true)
});
```
**Example**  
```js
// Create an AppBar action button
import { SvgSettings } from '../icons';

const settingsButton = Button.forAppBar({
  icon: <SvgSettings />,
  onClick: openSettings,
  disabled: isLoading
});
```
<a name="ButtonGroup"></a>

## ButtonGroup(props) ⇒ <code>JSX.Element</code>
A button group component implementing Material Design 3 principles that provides
segmented control functionality with single or multi-selection capabilities.

This component offers a complete button group solution featuring:
- **Segmented Control**: Visual grouping of related action buttons
- **Selection Modes**: Support for both single-select and multi-select behavior
- **Material Design 3 Styling**: Proper button states and transitions
- **Flexible Configuration**: Support for icons, labels, or icon+label combinations
- **State Management**: Selected buttons use "filled" style, others use "tonal" style
- **Theme Integration**: Seamless light/dark mode support with Material Design colors
- **Responsive Design**: Adapts to different screen sizes and device capabilities
- **Accessibility**: Proper ARIA attributes and keyboard navigation support

The component automatically handles selection state visualization by applying different
button styles based on selection status. It can function as either a toggle button
group (multi-select) or a segmented control (single-select) depending on configuration.

All buttons within the group maintain consistent sizing and spacing while providing
clear visual feedback for user interactions and selection states.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered button group component with all configured buttons  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| props.name | <code>string</code> | Unique name identifier for the button group.   Used for generating DOM IDs and maintaining component identity.   Required for proper form integration and accessibility. |
| [props.value] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Currently selected button value(s).   For single-select mode: string value matching one of the item values.   For multi-select mode: array of strings matching selected item values.   This is a controlled component requiring external state management. |
| [props.items] | <code>Array.&lt;object&gt;</code> | Array of button configuration objects.   Each item should have:   - value: string - Unique identifier for the button (required)   - label: string - Text to display on the button (optional)   - icon: React.ReactNode - Icon element to display on the button (optional)   At least one of label or icon should be provided for each item. |
| [props.multiSelect] | <code>boolean</code> | Selection mode configuration.   Defaults to false (single-select mode).   - false: Only one button can be selected at a time (radio button behavior)   - true: Multiple buttons can be selected simultaneously (checkbox behavior) |
| [props.onChange] | <code>function</code> | Callback function invoked when button selection changes.   For single-select: receives the selected value as a string parameter.   For multi-select: receives an array of selected values as parameter.   Required for controlled component behavior and state updates. |
| [props.disabled] | <code>boolean</code> | When true, disables the entire button group.   Defaults to false. Prevents all user interaction and applies disabled styling.   Individual buttons cannot be disabled separately within the group. |
| [props.size] | <code>&#x27;xs&#x27;</code> \| <code>&#x27;sm&#x27;</code> \| <code>&#x27;md&#x27;</code> | Size variant applied to all buttons in the group.   Defaults to 'sm'. All buttons within the group will use the same size for consistency.   - 'xs': Compact size for tight layouts   - 'sm': Standard size for most use cases   - 'md': Larger size for prominent controls |

**Example**  
```js
// Single-select view mode switcher
<ButtonGroup
  name="viewMode"
  value={currentView}
  items={[
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' },
    { value: 'card', label: 'Card View' }
  ]}
  onChange={(value) => setCurrentView(value)}
/>
```
**Example**  
```js
// Multi-select filter options
<ButtonGroup
  name="filters"
  value={selectedFilters}
  multiSelect={true}
  items={[
    { value: 'new', label: 'New' },
    { value: 'popular', label: 'Popular' },
    { value: 'featured', label: 'Featured' }
  ]}
  onChange={(values) => setSelectedFilters(values)}
/>
```
**Example**  
```js
// Icon-only button group for formatting
import { SvgFormatBold, SvgFormatItalic, SvgFormatUnderline } from '../icons';

<ButtonGroup
  name="formatting"
  value={formatOptions}
  multiSelect={true}
  size="sm"
  items={[
    { value: 'bold', icon: <SvgFormatBold /> },
    { value: 'italic', icon: <SvgFormatItalic /> },
    { value: 'underline', icon: <SvgFormatUnderline /> }
  ]}
  onChange={setFormatOptions}
/>
```
**Example**  
```js
// Mixed icon and label button group
import { SvgDashboard, SvgList, SvgSettings } from '../icons';

<ButtonGroup
  name="sidebar"
  value={activeSidebar}
  items={[
    { value: 'dashboard', icon: <SvgDashboard />, label: 'Dashboard' },
    { value: 'files', icon: <SvgList />, label: 'Files' },
    { value: 'settings', icon: <SvgSettings />, label: 'Settings' }
  ]}
  size="md"
  onChange={setActiveSidebar}
/>
```
<a name="CheckBox"></a>

## CheckBox(props) ⇒ <code>JSX.Element</code>
A customizable checkbox component implementing Material Design 3 principles
with comprehensive styling, accessibility features, and state management.

This component provides a complete checkbox solution featuring:
- **Material Design 3 Styling**: Authentic visual appearance with proper proportions
- **Label Integration**: Optional text labels with proper clickable association
- **State Management**: Support for checked, unchecked, and indeterminate states
- **Validation States**: Built-in error/danger styling for form validation feedback
- **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **Theme Integration**: Seamless light/dark mode support with Material Design colors
- **Responsive Design**: Adapts to different screen sizes and touch targets
- **Hover Effects**: Interactive feedback for better user experience

The component follows controlled component patterns, requiring external state management
for the checked value. It provides smooth transitions for all state changes and
maintains consistent styling across different browsers and platforms.

Error states apply red color variants throughout the component for clear visual
feedback during form validation scenarios.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered checkbox component with all configured features and styling  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  | Component props |
| [props.id] | <code>string</code> |  | Unique identifier for the checkbox input element.   Used for accessibility, form association, and programmatic access.   Automatically links the label to the input for proper click behavior. |
| props.value | <code>boolean</code> |  | Current checked state of the checkbox.   This is a controlled component requiring external state management.   True indicates checked, false indicates unchecked state. |
| [props.label] | <code>string</code> |  | Text label to display next to the checkbox.   Clicking the label will toggle the checkbox state for improved usability.   Provides context and meaning for the checkbox selection. |
| [props.style] | <code>string</code> |  | Visual style variant for different use cases.   Use "danger" to apply error/validation styling with red color variants.   Default style uses standard Material Design checkbox colors. |
| [props.onChange] | <code>function</code> |  | Callback function invoked when checkbox state changes.   Receives the new checked state as a boolean parameter.   Required for controlled component behavior and form integration. |
| [props.disabled] | <code>boolean</code> | <code>false</code> | When true, disables the checkbox interaction.   Applies disabled styling with reduced opacity and prevents all user interaction.   Use for checkboxes that are temporarily unavailable or not applicable. |

**Example**  
```js
// Basic checkbox with label
<CheckBox
  value={isChecked}
  label="Accept terms and conditions"
  onChange={(checked) => setIsChecked(checked)}
/>
```
**Example**  
```js
// Checkbox with danger/error styling for validation
<CheckBox
  id="error-checkbox"
  value={hasError}
  label="This has an error"
  style="danger"
  onChange={setHasError}
/>
```
**Example**  
```js
// Disabled checkbox for read-only state
<CheckBox
  value={isReadOnly}
  label="This option is not available"
  disabled={true}
  onChange={() => {}} // No-op since it's disabled
/>
```
**Example**  
```js
// Checkbox in a form with controlled state
const [preferences, setPreferences] = useState({
  newsletter: false,
  notifications: true,
  analytics: false
});

<CheckBox
  id="newsletter"
  value={preferences.newsletter}
  label="Subscribe to newsletter"
  onChange={(checked) =>
    setPreferences(prev => ({ ...prev, newsletter: checked }))
  }
/>
```
**Example**  
```js
// Checkbox with validation in form context
<CheckBox
  value={agreedToTerms}
  label="I agree to the terms and conditions"
  style={termsError ? "danger" : undefined}
  onChange={setAgreedToTerms}
/>
```
<a name="Fab"></a>

## Fab(props) ⇒ <code>JSX.Element</code>
Floating Action Button (FAB) component implementing Material Design 3 principles
with expandable menu functionality and comprehensive styling options.

This component provides a complete FAB solution featuring:
- **Primary Action Focus**: Prominent circular button for the most important action
- **Expandable Menu**: Optional secondary actions that appear when FAB is activated
- **Material Design 3 Styling**: Authentic elevation, colors, and interaction patterns
- **Multiple Color Variants**: Primary, secondary, and tertiary color schemes
- **Smooth Animations**: Fluid transitions for expand/collapse and hover states
- **Accessibility**: Proper ARIA attributes and keyboard navigation support
- **Responsive Positioning**: Flexible positioning with safe area support
- **State Management**: Internal state handling for expand/collapse behavior

The FAB follows Material Design guidelines for floating action buttons, providing
a persistent and prominent way to access primary actions. When items are provided,
it becomes an expandable FAB that reveals additional actions in a vertical menu.

The component automatically handles menu state transitions and provides visual
feedback for all interactions. Menu items are displayed with appropriate spacing
and follow the same design patterns as the main FAB button.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - FAB component with configured styling and optional expandable menu  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.id] | <code>string</code> | HTML ID attribute for the FAB button element.   Used for accessibility and programmatic access to the component. |
| [props.icon] | <code>React.ReactNode</code> | Icon element to display in the center of the FAB.   Should be an appropriately sized icon (typically 24x24px) for clear recognition. |
| [props.label] | <code>string</code> | Text label for the FAB button.   Provides accessibility context and may be displayed as tooltip or extended FAB text. |
| [props.items] | <code>Array</code> | Array of menu item objects for expandable functionality.   Each item should have: {icon, label, onClick, disabled} properties.   Defaults to empty array. When empty, FAB behaves as simple action button without expansion. |
| [props.hidden] | <code>boolean</code> | When true, hides the FAB from view.   Defaults to false. Useful for conditionally showing/hiding based on context. |
| [props.color] | <code>&#x27;primary&#x27;</code> \| <code>&#x27;secondary&#x27;</code> \| <code>&#x27;tertiary&#x27;</code> | Color variant for theming.   Defaults to 'primary'.   - 'primary': Uses primary color scheme for most important actions   - 'secondary': Uses secondary color scheme for alternative actions   - 'tertiary': Uses tertiary color scheme for supporting actions |
| [props.position] | <code>string</code> | CSS positioning classes.   Defaults to bottom-right positioning with safe area support.   Can be customized for different layouts (e.g., 'fixed bottom-4 left-4' for bottom-left). |
| [props.onClick] | <code>function</code> | Click handler for the main FAB button.   Called when FAB is clicked. For expandable FABs, this is called in addition to menu toggle.   Defaults to no-op function if not provided. |

**Example**  
```js
// Simple FAB for primary action
import { SvgAdd } from '../icons';

<Fab
  icon={<SvgAdd />}
  label="Add new item"
  onClick={handleAddItem}
/>
```
**Example**  
```js
// Expandable FAB with multiple actions
import { SvgAdd, SvgEdit, SvgShare, SvgDelete } from '../icons';

<Fab
  icon={<SvgAdd />}
  label="Actions"
  color="primary"
  items={[
    {
      icon: <SvgEdit />,
      label: "Edit",
      onClick: handleEdit
    },
    {
      icon: <SvgShare />,
      label: "Share",
      onClick: handleShare
    },
    {
      icon: <SvgDelete />,
      label: "Delete",
      onClick: handleDelete,
      disabled: !canDelete
    }
  ]}
/>
```
**Example**  
```js
// Conditionally hidden FAB based on scroll
<Fab
  icon={<SvgArrowUp />}
  label="Scroll to top"
  hidden={!showScrollToTop}
  onClick={scrollToTop}
  position="fixed bottom-4 right-4 z-50"
/>
```
**Example**  
```js
// Secondary color FAB in custom position
<Fab
  icon={<SvgHelp />}
  label="Help"
  color="secondary"
  position="fixed bottom-4 left-4"
  onClick={showHelpDialog}
/>
```
<a name="NavigationBar"></a>

## NavigationBar(props) ⇒ <code>JSX.Element</code>
A mobile-first bottom navigation bar component with responsive behavior.
Displays a row of navigation items with icons and labels.
On mobile, renders as a fixed bottom bar with vertically stacked items.
On desktop, displays a horizontal bar with inline icon+label pairs.

Supports active states, disabled states, and hover effects that adapt to screen size.
Follows Material Design 3 theming guidelines with proper light/dark mode support.
Includes safe area padding for devices with rounded corners or notches (e.g., iPhone).

The component automatically handles different visual states:
- Active items are highlighted with container colors and primary text
- Active items show background highlighting on mobile, pill shape on desktop
- Disabled items appear with reduced opacity and are non-interactive
- Hover/active effects adapt between mobile and desktop views
- Provides enhanced touch feedback with active states for mobile interactions

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered navigation bar component  
**Since**: 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  | Component props |
| props.items | [<code>Array.&lt;NavigationBarItem&gt;</code>](#NavigationBarItem) |  | Array of navigation items to display |
| [props.optionalClass] | <code>string</code> | <code>&quot;\&quot;fixed bottom-0\&quot;&quot;</code> | Additional CSS classes for positioning and styling |

**Example**  
```js
// Basic usage with icons and labels
<NavigationBar
  items={[
    {
      icon: <HomeIcon />,
      label: "Home",
      active: true,
      onClick: () => navigate('/home')
    },
    {
      icon: <SearchIcon />,
      label: "Search",
      onClick: () => navigate('/search')
    },
    {
      icon: <ProfileIcon />,
      label: "Profile",
      onClick: () => navigate('/profile')
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      disabled: true,
      onClick: () => {}
    }
  ]}
/>
```
**Example**  
```js
// With custom positioning as a top navigation bar
<NavigationBar
  items={navigationItems}
  optionalClass="sticky top-0 shadow-lg"
/>
```
<a name="NavigationDrawer"></a>

## NavigationDrawer(props) ⇒ <code>JSX.Element</code>
Navigation drawer component implementing Material Design 3 navigation drawer pattern.
Provides a sliding drawer interface for application navigation with support for
both persistent (always visible) and temporary (modal overlay) modes.

The drawer features a clean, modern design with:
- A header area with app identity elements and proper spacing
- A scrollable content area containing navigation items with consistent styling
- Support for icons, labels, badges, and dividers within navigation items
- Proper theming with light/dark mode support using Material Design 3 color tokens
- Responsive behavior that adapts to different screen sizes

In temporary mode, the drawer displays over a semi-transparent overlay that
dismisses the drawer when clicked, following standard modal patterns. In
persistent mode, the drawer remains visible and takes up dedicated screen space.

The component respects accessibility guidelines with proper focus management,
keyboard navigation support, and semantic markup for screen readers.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - NavigationDrawer component or empty fragment when closed  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.items] | <code>Array.&lt;object&gt;</code> | Array of navigation items to display in the drawer (defaults to []).   Each item object supports properties: icon, label, badge, onClick, active, disabled.   Empty objects ({}) render as horizontal dividers between sections. |
| [props.open] | <code>boolean</code> | Whether the drawer is currently open and visible (defaults to false) |
| [props.keep] | <code>boolean</code> | Controls drawer behavior: true for persistent mode (always visible),   false for temporary mode with overlay and dismissal capability |
| [props.onClose] | <code>function</code> | Callback function invoked when drawer should close (defaults to empty function) |
| [props.width] | <code>string</code> | Width of the drawer using Tailwind CSS class (defaults to "w-84") |
| [props.bgColor] | <code>string</code> | Background color CSS classes for the drawer container (defaults to "bg-light-surface-container-low dark:bg-dark-surface-container-low") |

**Example**  
```js
// Basic usage with temporary drawer
import { SvgHome, SvgSettings, SvgLogout } from '../icons';

<NavigationDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  items={[
    {
      icon: <SvgHome />,
      label: "Home",
      active: true,
      onClick: () => navigate('/home')
    },
    {
      icon: <SvgSettings />,
      label: "Settings",
      onClick: () => navigate('/settings')
    },
    {},  // Renders a horizontal divider
    {
      icon: <SvgLogout />,
      label: "Logout",
      onClick: handleLogout
    }
  ]}
/>
```
**Example**  
```js
// Persistent drawer (always visible)
<NavigationDrawer
  keep={true}
  items={navigationItems}
/>
```
**Example**  
```js
// Custom width drawer
<NavigationDrawer
  open={isOpen}
  width="w-72"
  items={menuItems}
  onClose={() => setIsOpen(false)}
/>
```
**Example**  
```js
// Custom styling with background color
<NavigationDrawer
  open={drawerVisible}
  items={navigationItems}
  bgColor="bg-white dark:bg-gray-800"
  width="w-80"
  onClose={closeDrawer}
/>
```
<a name="NavigationRail"></a>

## NavigationRail(props) ⇒ <code>JSX.Element</code>
A vertical navigation rail component implementing Material Design 3 guidelines.
Displays a column of navigation items with icons and labels along the side of the screen.

The NavigationRail is designed for tablet and desktop layouts as a space-efficient
alternative to a full navigation drawer. It provides quick access to top-level
destinations while taking up minimal horizontal space.

Features:
- Compact mode (default) shows only icons with small labels on narrow screens
- Expanded mode shows icons with larger labels on wider screens (lg breakpoint)
- Supports active states with highlighted backgrounds and colors
- Supports disabled states with reduced opacity
- Provides hover effects that adapt based on screen size
- Follows Material Design 3 theming guidelines with proper light/dark mode support

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered navigation rail component  
**Since**: 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  | Component props |
| props.items | [<code>Array.&lt;NavigationRailItem&gt;</code>](#NavigationRailItem) |  | Array of navigation items to display |
| [props.optionalClass] | <code>string</code> | <code>&quot;\&quot;h-full w-24 lg:w-56 fixed top-0 py-4\&quot;&quot;</code> | Additional CSS classes for positioning and styling |

**Example**  
```js
// Basic usage with icons and labels
<NavigationRail
  items={[
    {
      icon: <HomeIcon />,
      label: "Home",
      active: true,
      onClick: () => navigate('/home')
    },
    {
      icon: <SearchIcon />,
      label: "Search",
      onClick: () => navigate('/search')
    },
    {
      icon: <ProfileIcon />,
      label: "Profile",
      onClick: () => navigate('/profile')
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      disabled: true,
      onClick: () => {}
    }
  ]}
/>
```
**Example**  
```js
// With custom positioning and width
<NavigationRail
  items={navigationItems}
  optionalClass="h-full w-20 lg:w-48 fixed left-0 top-16 py-2"
/>
```
<a name="PWABadge"></a>

## PWABadge(props) ⇒ <code>JSX.Element</code> \| <code>null</code>
PWA status notification component implementing Progressive Web App principles
that provides seamless offline capability and update management.

This component offers comprehensive PWA lifecycle management featuring:
- **Service Worker Integration**: Built upon @vite-pwa/pwa plugin's useRegisterSW hook
- **Update Notifications**: Automatic detection and prompting for new app versions
- **Offline Ready Status**: Clear indication when content is cached and available offline
- **User-Controlled Updates**: Reload button for user-initiated app updates
- **Customizable Messaging**: Configurable notification text for different scenarios
- **Automatic Monitoring**: Periodic checking for app updates at configurable intervals
- **Responsive Design**: Notification badge adapts to different screen sizes
- **Accessibility**: Proper ARIA attributes and keyboard navigation support

The component handles all PWA lifecycle states automatically:
- Silent background checking for updates
- Notification display when updates are available
- Clear indication when app is ready for offline use
- Graceful handling of service worker registration failures

The notification appears as a small badge/banner that doesn't interfere with
the main app interface while providing essential PWA status information.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> \| <code>null</code> - Notification badge component or null when no notifications needed  
**Component**:   
**Generated**: Based on @vite-pwa/pwa plugin setup with customized Material Design UI  
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.checkForUpdateInterval] | <code>number</code> | Interval in milliseconds to check for PWA updates.   Defaults to 60*60*1000 (1 hour). Controls how frequently the app checks for new versions.   Shorter intervals provide faster update detection but consume more resources. |
| [props.offlineReadyMessage] | <code>string</code> | Message displayed when app is ready for offline use.   Defaults to "App ready to work offline". Shown when service worker has cached   all necessary resources for offline functionality. |
| [props.needRefreshMessage] | <code>string</code> | Message displayed when a new version is available. |
| props.useRegisterSW | <code>function</code> | The useRegisterSW hook from @vite-pwa/pwa, injected for service worker lifecycle management. Required.   Defaults to the imported useRegisterSW if not provided. Allows for dependency injection in testing or advanced usage. |

**Example**  
```js
// Basic usage in application layout
import PWABadge from '../components/PWABadge';

function AppLayout({ children }) {
  return (
    <div>
      <header>
        <h1>My PWA Application</h1>
        <PWABadge />
      </header>
      <main>{children}</main>
    </div>
  );
}
```
**Example**  
```js
// With custom messages and faster update checking
<PWABadge
  checkForUpdateInterval={30 * 60 * 1000}
  offlineReadyMessage="Your app is now available offline!"
  needRefreshMessage="Update available! Click to refresh and get the latest features."
/>
```
**Example**  
```js
// In a PWA-focused component with longer intervals
<PWABadge
  checkForUpdateInterval={2 * 60 * 60 * 1000}
  offlineReadyMessage="✓ Ready for offline use"
  needRefreshMessage="🆕 New version ready - tap to update"
/>
```
**Example**  
```js
// Integration with notification system
function NotificationArea() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <PWABadge
        offlineReadyMessage="App cached successfully"
        needRefreshMessage="Update downloaded - restart to apply"
      />
    </div>
  );
}
```
<a name="PWABadge..close"></a>

### PWABadge~close() ⇒ <code>void</code>
Closes the PWA notification badge by resetting offline ready and need refresh states.

**Kind**: inner method of [<code>PWABadge</code>](#PWABadge)  
<a name="PasswordField"></a>

## PasswordField(props) ⇒ <code>JSX.Element</code>
A specialized password input field implementing Material Design 3 principles
with integrated visibility toggle functionality for enhanced user experience.

This component provides a complete password input solution featuring:
- **Visibility Toggle**: Built-in eye icon button for showing/hiding password text
- **Security Focused**: Monospace font by default for better character recognition
- **TextField Integration**: Built on top of TextField component for consistency
- **Validation Support**: Full error handling and helper text capabilities
- **Accessibility**: Proper ARIA attributes for screen readers and password managers
- **Theme Integration**: Seamless light/dark mode support with Material Design colors
- **Responsive Design**: Adapts to different screen sizes and device capabilities
- **State Management**: Internal visibility state with external value control

The component uses a monospace font by default to improve password character
recognition and uses appropriate input types for browser password manager integration.
The visibility toggle provides immediate feedback and maintains security best practices
by defaulting to hidden text.

All styling and behavior is consistent with the base TextField component while
adding password-specific enhancements for security and usability.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered password field component with integrated visibility toggle  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.id] | <code>string</code> | Unique identifier for the password input element.   Used for accessibility, form association, and browser password manager integration. |
| [props.value] | <code>string</code> | Current value of the password field.   Defaults to empty string. This is a controlled component requiring external state management. |
| [props.label] | <code>string</code> | Floating label text that appears above the input when focused or filled.   Provides context about the password requirement (e.g., "Password", "New Password"). |
| [props.message] | <code>string</code> | Helper text displayed below the input field.   Can provide password requirements, security tips, or additional guidance. |
| [props.error] | <code>string</code> | Error message that overrides helper text and applies error styling.   Used for validation feedback when password doesn't meet requirements. |
| [props.style] | <code>string</code> | Visual style variant matching TextField options.   Use "filled" for filled background style, or omit for outlined style. |
| [props.width] | <code>string</code> | Tailwind CSS width class for the input field.   Defaults to 'w-48'. Supports responsive width classes for adaptive layouts. |
| [props.fontFamily] | <code>string</code> | Tailwind CSS font family class.   Defaults to 'font-mono' for better password character distinction.   Monospace fonts help users identify similar characters more easily. |
| [props.onChange] | <code>function</code> | Callback function invoked when password value changes.   Receives the new password value as a string parameter for state updates. |

**Example**  
```js
// Basic password field with label
<PasswordField
  label="Password"
  value={password}
  onChange={(value) => setPassword(value)}
/>
```
**Example**  
```js
// Password field with validation and requirements
<PasswordField
  id="user-password"
  label="Enter Password"
  value={password}
  error={passwordError}
  message="Must be at least 8 characters with numbers and symbols"
  width="w-80"
  onChange={setPassword}
/>
```
**Example**  
```js
// Filled style password field with custom font
<PasswordField
  label="New Password"
  style="filled"
  fontFamily="font-sans"
  value={newPassword}
  width="w-full"
  onChange={setNewPassword}
/>
```
**Example**  
```js
// Registration form password with strength validation
<PasswordField
  id="register-password"
  label="Create Password"
  value={password}
  error={passwordStrengthError}
  message={getPasswordStrengthMessage(password)}
  onChange={(value) => {
    setPassword(value);
    validatePasswordStrength(value);
  }}
/>
```
<a name="RadioGroup"></a>

## RadioGroup(props) ⇒ <code>JSX.Element</code>
A radio button group component implementing Material Design 3 principles
that provides intuitive single-selection interface from multiple options.

This component offers a complete radio group solution featuring:
- **Single Selection**: Only one option can be selected at a time within the group
- **Material Design 3 Styling**: Authentic radio button appearance with proper proportions
- **Flexible Layout**: Support for both horizontal and vertical arrangement of options
- **Theme Integration**: Seamless light/dark mode support with Material Design colors
- **Accessibility**: Full keyboard navigation and screen reader compatibility
- **State Management**: Controlled component pattern with external state management
- **Touch Optimization**: Appropriate touch targets for mobile interaction
- **Label Association**: Proper label-input association for improved usability

The component renders as a React Fragment containing individual radio button elements,
each properly associated with its label for accessibility. All radio buttons within
the group share the same name attribute for proper browser grouping behavior.

The layout can be configured for different use cases - horizontal for compact
selections and vertical for longer lists or improved mobile accessibility.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered radio group component (React Fragment containing radio buttons)  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| props.name | <code>string</code> | Unique name for the radio group (required).   Used for proper radio button grouping behavior and form submission.   All radio buttons in the group will share this name attribute. |
| [props.value] | <code>string</code> | Currently selected radio button value.   Should match one of the item values to indicate the selected state.   This is a controlled component requiring external state management. |
| [props.items] | <code>Array.&lt;{value: string, label: string}&gt;</code> | Array of radio button option objects.   Each item should have:   - value: Unique identifier for the option   - label: Display text shown next to the radio button   Defaults to empty array if not provided. |
| [props.onChange] | <code>function</code> | Callback function invoked when a radio button is selected.   Receives the selected item's value as a string parameter.   Required for controlled component behavior and state updates. |
| [props.layout] | <code>&#x27;vertical&#x27;</code> \| <code>&#x27;horizontal&#x27;</code> | Layout direction for the radio buttons.   Defaults to 'horizontal'.   - 'horizontal': Arranges radio buttons in a row (compact for short lists)   - 'vertical': Arranges radio buttons in a column (better for longer lists) |

**Example**  
```js
// Basic radio group for size selection
<RadioGroup
  name="size"
  value={selectedSize}
  items={[
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]}
  onChange={(value) => setSelectedSize(value)}
/>
```
**Example**  
```js
// Vertical radio group for theme preferences
<RadioGroup
  name="theme"
  value={currentTheme}
  layout="vertical"
  items={[
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'auto', label: 'System Default' }
  ]}
  onChange={handleThemeChange}
/>
```
**Example**  
```js
// Radio group for payment methods
<RadioGroup
  name="payment"
  value={selectedPayment}
  items={[
    { value: 'credit', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'apple', label: 'Apple Pay' },
    { value: 'google', label: 'Google Pay' }
  ]}
  layout="vertical"
  onChange={setSelectedPayment}
/>
```
**Example**  
```js
// Settings radio group with controlled state
const [notification, setNotification] = useState('email');

<RadioGroup
  name="notifications"
  value={notification}
  items={[
    { value: 'email', label: 'Email notifications' },
    { value: 'push', label: 'Push notifications' },
    { value: 'none', label: 'No notifications' }
  ]}
  onChange={setNotification}
/>
```
<a name="Slider"></a>

## Slider(props) ⇒ <code>JSX.Element</code>
An interactive slider component implementing Material Design 3 principles that provides
intuitive value selection through drag interactions and click positioning.

This component offers a comprehensive slider solution featuring:
- **Continuous and Discrete Modes**: Support for 0-1 continuous values or discrete step counts
- **Touch and Mouse Interaction**: Responsive drag handling optimized for both desktop and mobile
- **Visual Feedback**: Smooth animations, hover states, and active interaction indicators
- **Responsive Design**: Automatic resize handling and touch-optimized interaction zones
- **Accessibility**: Keyboard navigation support and proper ARIA attributes
- **Theme Integration**: Seamless light/dark mode support with Material Design colors
- **Flexible Sizing**: Multiple size variants (xs, sm, md) for different use cases
- **Progress Indication**: Can be used as read-only progress indicators

The component supports both continuous sliders (count=1, values 0-1) and discrete
step sliders (count>1, integer values 0 to count). It provides immediate visual
feedback during interaction and maintains smooth performance across all devices.

All interactions are handled through modern pointer events for consistent behavior
across different input methods (mouse, touch, pen).

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered interactive slider component with all configured features  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.id] | <code>string</code> | Unique identifier for the slider element.   Auto-generated using React's useId hook if not provided.   Used for accessibility and programmatic access. |
| [props.value] | <code>number</code> | Current value of the slider.   For continuous mode (count=1): accepts decimal values in 0-1 range.   For discrete mode (count>1): accepts integer values from 0 to count.   This is a controlled component requiring external state management. |
| [props.count] | <code>number</code> | Number of discrete steps or mode selector.   Use 1 for continuous slider with 0-1 decimal values.   Use values >1 for stepped slider with integer values from 0 to count.   Determines the interaction behavior and value constraints. |
| [props.size] | <code>&#x27;xs&#x27;</code> \| <code>&#x27;sm&#x27;</code> \| <code>&#x27;md&#x27;</code> | Visual size variant affecting dimensions.   - 'xs': Minimal height for compact layouts and progress indicators   - 'sm': Standard size for most interactive sliders   - 'md': Larger size for prominent controls requiring easier interaction |
| [props.width] | <code>string</code> | Tailwind CSS width class controlling slider container width.   Supports responsive width classes (e.g., 'w-full md:w-80') for adaptive layouts. |
| [props.onChange] | <code>function</code> | Callback function invoked when slider value changes.   Receives the new value as a number parameter matching the slider mode.   Omitting this prop creates a read-only slider suitable for progress indication. |

**Example**  
```js
// Continuous volume slider (0-1 range)
<Slider
  value={volume}
  onChange={(newValue) => setVolume(newValue)}
  width="w-64"
  size="sm"
/>
```
**Example**  
```js
// Discrete rating slider (0-10 integer values)
<Slider
  id="rating-slider"
  value={rating}
  count={10}
  onChange={(newRating) => setRating(newRating)}
  size="md"
  width="w-80"
/>
```
**Example**  
```js
// Progress indicator (read-only, no interaction)
<Slider
  value={downloadProgress}
  size="xs"
  width="w-full"
  // No onChange = read-only mode
/>
```
**Example**  
```js
// Settings panel brightness control
<Slider
  id="brightness"
  value={brightness}
  onChange={(value) => {
    setBrightness(value);
    adjustScreenBrightness(value);
  }}
  width="w-56"
  size="sm"
/>
```
**Example**  
```js
// Discrete step selector for quantities
<Slider
  value={quantity}
  count={50}
  onChange={setQuantity}
  width="w-72"
  size="md"
/>
```
<a name="Switch"></a>

## Switch(props) ⇒ <code>JSX.Element</code>
A toggle switch component implementing Material Design 3 principles that provides
an intuitive on/off control interface with smooth visual transitions.

This component offers a complete switch solution featuring:
- **Material Design 3 Styling**: Authentic visual appearance with proper track and thumb proportions
- **Smooth Animations**: Fluid transitions for thumb movement and color changes
- **Visual Indicators**: Checkmark icon appears when switch is in enabled state
- **State Feedback**: Clear visual distinction between on/off states with color coding
- **Theme Integration**: Seamless light/dark mode support with Material Design colors
- **Accessibility**: Full keyboard navigation support and screen reader compatibility
- **Touch Optimization**: Appropriate touch target size for mobile interaction
- **Disabled States**: Proper visual feedback for non-interactive switches

The switch follows controlled component patterns, requiring external state management.
It provides immediate visual feedback during state transitions and maintains consistent
behavior across different platforms and browsers.

Commonly used for settings, preferences, feature toggles, and any binary choice
where immediate feedback is important to the user experience.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered switch component with all configured features and styling  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  | Component props |
| [props.id] | <code>string</code> |  | Unique identifier for the switch input element.   Used for accessibility, form association, and programmatic access.   Enables proper keyboard navigation and screen reader support. |
| props.value | <code>boolean</code> |  | Current state of the switch.   True indicates enabled/on state, false indicates disabled/off state.   This is a controlled component requiring external state management. |
| [props.onChange] | <code>function</code> |  | Callback function invoked when switch state changes.   Receives the new state as a boolean parameter for state updates.   Required for controlled component behavior and user interaction. |
| [props.disabled] | <code>boolean</code> | <code>false</code> | When true, disables switch interaction.   Applies disabled styling with reduced opacity and prevents all user interaction.   Use for switches that are temporarily unavailable or not applicable. |

**Example**  
```js
// Basic switch for notifications
<Switch
  id="notifications"
  value={notificationsEnabled}
  onChange={(enabled) => setNotificationsEnabled(enabled)}
/>
```
**Example**  
```js
// Switch with disabled state for premium features
<Switch
  id="premium-feature"
  value={premiumEnabled}
  onChange={setPremiumEnabled}
  disabled={!isPremiumUser}
/>
```
**Example**  
```js
// Dark mode toggle switch with theme application
<Switch
  id="dark-mode"
  value={isDarkMode}
  onChange={(enabled) => {
    setIsDarkMode(enabled);
    document.documentElement.classList.toggle('dark', enabled);
  }}
/>
```
**Example**  
```js
// Settings panel with multiple switches
const [settings, setSettings] = useState({
  notifications: true,
  autoSave: false,
  syncData: true
});

<Switch
  id="auto-save"
  value={settings.autoSave}
  onChange={(enabled) =>
    setSettings(prev => ({ ...prev, autoSave: enabled }))
  }
/>
```
**Example**  
```js
// Switch with form integration and validation
<Switch
  id="terms-agreement"
  value={agreedToTerms}
  disabled={formSubmitting}
  onChange={setAgreedToTerms}
/>
```
<a name="TextField"></a>

## TextField(props) ⇒ <code>JSX.Element</code>
A versatile text input field component implementing Material Design 3 principles
with floating labels, validation states, and customizable styling.

This component provides a comprehensive text input solution with:
- **Floating Label Animation**: Labels smoothly transition above the input when focused or filled
- **Validation States**: Built-in error handling with visual feedback and message display
- **Prefix/Suffix Elements**: Support for icons, buttons, or other interactive elements
- **Multiple Input Types**: text, email, password, number with appropriate validation
- **Responsive Design**: Adapts to different screen sizes and device capabilities
- **Accessibility**: Proper ARIA attributes, focus management, and screen reader support
- **Theme Integration**: Seamless light/dark mode support with Material Design colors

The component supports both filled and outlined visual styles, automatic width sizing,
and comprehensive state management for focused, filled, error, and disabled states.
It includes smooth animations for all state transitions and provides excellent
user feedback through visual and text cues.

All interactive prefix and suffix elements should use Button components with
style="embedded" for consistent theming and behavior within the text field context.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - Rendered text field component with all configured features and styling  
**Component**:   
**Since**: 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  | Component props |
| [props.id] | <code>string</code> |  | Unique identifier for the input element. Used for accessibility and form association. |
| [props.type] | <code>&#x27;text&#x27;</code> \| <code>&#x27;email&#x27;</code> \| <code>&#x27;password&#x27;</code> \| <code>&#x27;number&#x27;</code> | <code>&#x27;text&#x27;</code> | HTML input type that determines input behavior and validation.   - 'text': Standard text input for general content   - 'email': Email input with built-in validation patterns   - 'password': Password input with hidden character display   - 'number': Numeric input with appropriate keyboard on mobile devices |
| [props.value] | <code>string</code> \| <code>number</code> |  | Current value of the input field. This is a controlled component requiring external state management. |
| [props.label] | <code>string</code> |  | Floating label text that appears above the input when focused or filled.   Provides context and guidance to users about the expected input content. |
| [props.message] | <code>string</code> |  | Helper text displayed below the input field to provide additional context or guidance.   Appears in secondary text color and is overridden by error messages when present. |
| [props.error] | <code>string</code> |  | Error message that overrides helper text and applies error styling throughout the component.   When present, the entire field displays in error colors (red variants) for clear feedback. |
| [props.prefix] | <code>React.ReactNode</code> |  | Element to display at the start of the input field.   Typically contains icons or buttons using Button component with style="embedded" for proper integration.   Examples: search icons, currency symbols, or action buttons. |
| [props.suffix] | <code>React.ReactNode</code> |  | Element to display at the end of the input field.   Typically contains action buttons, clear buttons, or status indicators using Button component with style="embedded".   Examples: clear button, visibility toggle for passwords, or submission buttons. |
| [props.style] | <code>string</code> |  | Visual style variant for the text field appearance.   Use "filled" for filled background style with subtle background color.   Default style provides clean outlined appearance. |
| [props.width] | <code>string</code> | <code>&quot;&#x27;w-48&#x27;&quot;</code> | Tailwind CSS width class controlling the overall field width.   Supports responsive width classes (e.g., 'w-full md:w-96') for adaptive layouts. |
| [props.fontFamily] | <code>string</code> | <code>&quot;&#x27;font-sans&#x27;&quot;</code> | Tailwind CSS font family class for input text styling.   Should match the application's typography system for consistency. |
| [props.onChange] | <code>function</code> |  | Callback function invoked when input value changes.   Receives the new input value as a string parameter for state updates.   Required for controlled component behavior and form validation. |
| [props.readOnly] | <code>boolean</code> |  | When true, makes the input read-only.   Users can select and copy text but cannot modify the content.   Useful for displaying editable-looking data that shouldn't be changed. |
| [props.disabled] | <code>boolean</code> |  | When true, completely disables the input field.   Defaults to false. Prevents all user interaction and applies disabled styling with reduced opacity.   Use for fields that are temporarily unavailable or not applicable. |

**Example**  
```js
// Basic text input with floating label
<TextField
  id="username"
  label="Username"
  value={username}
  onChange={setUsername}
/>
```
**Example**  
```js
// Email field with validation and helper text
<TextField
  type="email"
  label="Email Address"
  message="We'll use this for account recovery"
  value={email}
  error={emailError}
  onChange={setEmail}
/>
```
**Example**  
```js
// Password field with visibility toggle
import { SvgVisibility, SvgVisibilityOff } from '../icons';
import Button from './Button';

<TextField
  type={showPassword ? "text" : "password"}
  label="Password"
  value={password}
  suffix={
    <Button
      style="embedded"
      icon={showPassword ? <SvgVisibilityOff /> : <SvgVisibility />}
      onClick={() => setShowPassword(!showPassword)}
    />
  }
  onChange={setPassword}
/>
```
**Example**  
```js
// Search field with prefix icon and clear button
import { SvgSearch, SvgClose } from '../icons';
import Button from './Button';

<TextField
  label="Search"
  value={searchQuery}
  prefix={<SvgSearch className="w-5 h-5 text-gray-500" />}
  suffix={
    searchQuery && (
      <Button
        style="embedded"
        icon={<SvgClose />}
        onClick={() => setSearchQuery('')}
      />
    )
  }
  width="w-full"
  onChange={setSearchQuery}
/>
```
**Example**  
```js
// Filled style numeric input with custom width
<TextField
  type="number"
  style="filled"
  label="Price"
  prefix={<span className="text-gray-500">$</span>}
  value={price}
  width="w-32"
  onChange={setPrice}
/>
```
<a name="computeMode"></a>

## computeMode(systemMode, brightnessSetting) ⇒ <code>boolean</code>
Computes the actual theme mode (dark/light) based on system preference and user setting.

**Kind**: global function  
**Returns**: <code>boolean</code> - True for dark mode, false for light mode  

| Param | Type | Description |
| --- | --- | --- |
| systemMode | <code>string</code> | The system's preferred color scheme ("light" or "dark") |
| brightnessSetting | <code>string</code> | The user's brightness setting ("system", "light", or "dark") |

<a name="nextMode"></a>

## nextMode(systemMode, brightnessSetting) ⇒ <code>string</code>
Determines the next mode in the cycling sequence based on current system and user settings.

**Kind**: global function  
**Returns**: <code>string</code> - The next brightness setting in the cycle  

| Param | Type | Description |
| --- | --- | --- |
| systemMode | <code>string</code> | The system's preferred color scheme ("light" or "dark") |
| brightnessSetting | <code>string</code> | The current user brightness setting |

<a name="ToggleDarkModeButton"></a>

## ToggleDarkModeButton(props) ⇒ <code>JSX.Element</code>
A toggle button component that cycles between system preference, light mode, and dark mode.
Automatically detects system preference via media queries and persists user's choice in localStorage.

The component provides intelligent theme switching with three states:
1. **System preference** (default) - automatically follows the device's color scheme preference
2. **Light mode** - forces light theme regardless of system preference
3. **Dark mode** - forces dark theme regardless of system preference

Key features:
- Automatically detects and responds to system color scheme changes
- Persists user preference across browser sessions using localStorage
- Applies theme changes by adding/removing "dark" class on document element
- Displays appropriate icons for each state (system/brightness/dark mode icons)
- Integrates seamlessly with Tailwind CSS dark mode utilities
- Supports all Button component styling options

CSS Setup Required:
To enable dark mode styles in your application, add this custom variant to your CSS:
```css

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - A button with dynamic icon that reflects current theme mode  
**Custom-variant**: dark (&:where(.dark, .dark *));
```

The component automatically manages the "dark" class on the document element,
allowing Tailwind CSS dark: modifiers to work correctly.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| [props.style] | <code>string</code> | Visual style variant for the button (defaults to "embedded") |
| [props.size] | <code>string</code> | Size variant for the button (defaults to "sm") |

**Example**  
```js
// Basic usage in a header component
import ToggleDarkModeButton from '../xuan-paper/ToggleDarkModeButton';

const Header = () => (
  <header className="flex justify-between items-center p-4">
    <h1>My App</h1>
    <div className="flex gap-2">
      <ToggleDarkModeButton />
      <UserMenuButton />
    </div>
  </header>
);
```
**Example**  
```js
// Custom styling with different button appearance
<ToggleDarkModeButton style="outlined" size="md" />
```
**Example**  
```js
// Usage in a settings panel
const SettingsPanel = () => (
  <div className="p-4">
    <h2>Appearance Settings</h2>
    <div className="flex items-center gap-3">
      <span>Theme:</span>
      <ToggleDarkModeButton style="tonal" />
    </div>
  </div>
);
```
<a name="initLanguage"></a>

## initLanguage(langs, setLanguage)
Initializes the language from localStorage if a valid language is stored.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| langs | <code>object</code> | Languages object mapping language codes to language configurations. |
| setLanguage | <code>function</code> | Function to set the current language |

<a name="nextLanguage"></a>

## nextLanguage(langs, currentLanguage, setLanguage)
Cycles to the next available language in the languages object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| langs | <code>object</code> | Languages object mapping language codes to language configurations. |
| currentLanguage | <code>string</code> | The currently active language code |
| setLanguage | <code>function</code> | Function to set the new language |

<a name="ToggleLanguageButton"></a>

## ToggleLanguageButton(props) ⇒ <code>JSX.Element</code>
A button component that toggles the application's language between available translations.
Cycles through languages defined in the languages object and persists the selection in localStorage.

The component automatically displays either:
- The current language's label (if defined in langs[lang].label)
- A universal language icon (Material Design language icon) as fallback

Key features:
- Automatically loads the previously selected language from localStorage on mount
- Cycles through available languages in the order they appear in the languages object
- Persists language preference across browser sessions using localStorage
- Framework-agnostic design works with any internationalization library or custom setup
- Provides visual feedback with either text labels or language icon
- Supports all Button component styling options

Requirements:
- A languages object with language codes as keys
- Each language entry should optionally have a 'label' property for display
- Parent component should handle the actual language switching logic via setLang callback

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - A button displaying the current language label or a language icon.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Component props |
| props.langs | <code>object</code> | Languages object mapping language codes to language configurations (e.g., { en: {label: 'En'}, ja: {label: '日'} }). Each entry may have a 'label' property for display. |
| props.lang | <code>string</code> | The currently active language code. |
| props.setLang | <code>function</code> | Callback to update the current language code. |
| [props.style] | <code>string</code> | Visual style variant for the button (e.g., "embedded", "outlined"). Defaults to "embedded". |
| [props.size] | <code>string</code> | Size variant for the button (e.g., "sm", "md"). Defaults to "sm". |

**Example**  
```js
// Basic usage in a header component
import ToggleLanguageButton from '../xuan-paper/ToggleLanguageButton';

const Header = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const languages = {
    en: { label: 'En' },
    ja: { label: '日' },
    es: { label: 'Es' }
  };

  return (
    <header className="flex justify-between items-center p-4">
      <h1>My App</h1>
      <div className="flex gap-2">
        <ToggleLanguageButton
          langs={languages}
          lang={currentLang}
          setLang={setCurrentLang}
        />
        <SettingsButton />
      </div>
    </header>
  );
};
```
**Example**  
```js
// Custom styling with different button styles
<ToggleLanguageButton
  langs={languages}
  lang={currentLang}
  setLang={setCurrentLang}
  style="outlined"
  size="md"
/>
```
**Example**  
```js
// Example languages object structure
const languages = {
  en: {
    label: "En"
  },
  ja: {
    label: "日"
  },
  es: {
    label: "Es"
  },
  fr: {
    label: "Fr"
  }
};

// Use with any internationalization setup
const handleLanguageChange = (newLang) => {
  setCurrentLanguage(newLang);
  // Update your app's language however you prefer:
  // - i18next: i18n.changeLanguage(newLang)
  // - react-intl: setLocale(newLang)
  // - custom solution: updateTranslations(newLang)
};
```
<a name="FabMenuItemProp"></a>

## FabMenuItemProp : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| icon | <code>React.ReactNode</code> | The icon to display alongside the label |
| label | <code>string</code> | The label of the menu item |
| onClick | <code>function</code> | The click event handler for the menu item |
| disabled | <code>boolean</code> | Whether the menu item is disabled |

<a name="NavigationBarItem"></a>

## NavigationBarItem : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| icon | <code>React.ReactNode</code> |  | Icon element to display for the navigation item |
| label | <code>string</code> |  | Text label shown below/beside the icon |
| [active] | <code>boolean</code> | <code>false</code> | Whether the navigation item is currently active/selected |
| [disabled] | <code>boolean</code> | <code>false</code> | Whether the navigation item is disabled and non-interactive |
| onClick | <code>function</code> |  | Callback function triggered when the navigation item is clicked |

<a name="NavigationRailItem"></a>

## NavigationRailItem : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| icon | <code>React.ReactNode</code> |  | Icon element to display for the navigation item |
| label | <code>string</code> |  | Text label shown below the icon in compact mode or beside the icon in expanded mode |
| [active] | <code>boolean</code> | <code>false</code> | Whether the navigation item is currently active/selected |
| [disabled] | <code>boolean</code> | <code>false</code> | Whether the navigation item is disabled and non-interactive |
| onClick | <code>function</code> |  | Callback function triggered when the navigation item is clicked |

