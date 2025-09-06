/**
 * @file AppBar component implementing Material Design 3 top app bar patterns.
 * Provides a configurable top navigation bar with branding, actions, and responsive design.
 * @author Michinobu Maeda
 * @since 1.0.0
 */

import PropTypes from "prop-types";

/**
 * AppBar component that implements a Material Design 3 styled top app bar.
 * This component serves as the primary toolbar at the top of the application,
 * containing navigation controls, app identity elements, and action items.
 *
 * The AppBar combines branding elements (logo, app name) with navigation controls
 * (back arrow, navigation drawer toggle) and action items (suffix). It respects
 * safe area insets for proper display on devices with notches or rounded corners
 * using the `pt-safe` class from tailwindcss-safe-area plugin.
 *
 * Key features include:
 * - Responsive design that adapts to different screen sizes
 * - Flexible positioning with customizable CSS classes
 * - Support for light/dark theme variants
 * - Configurable height and background colors
 * - Safe area support for modern mobile devices
 * - Proper accessibility with semantic markup
 *
 * By default, it's positioned fixed at the top of the viewport, but this behavior
 * can be customized via the optionalClass prop. The component's height and background
 * color are fully configurable to accommodate different design requirements.
 *
 * The component includes responsive padding that adapts to screen sizes, with tighter
 * spacing on mobile devices and more generous spacing on larger screens.
 * @component
 * @param {object} props - Component props
 * @param {React.ReactNode} [props.backArrow] - Icon/component for the back navigation button, typically an arrow pointing left
 * @param {React.ReactNode} [props.navigationDrawer] - Icon/component for the navigation drawer toggle, usually a hamburger menu icon
 * @param {React.ReactNode} [props.appLogo] - App logo component or image element to display as brand identity
 * @param {string} [props.appName] - Name of the application to display next to the logo
 * @param {React.ReactNode[]} [props.suffix] - Array of action items (buttons, icons) to display on the right side of the app bar
 * @param {string} [props.optionalClass] - Additional CSS classes for positioning and styling (defaults to "fixed top-0")
 * @param {string} [props.height] - Height of the app bar as Tailwind CSS class, supports responsive classes (defaults to "h-12 sm:h-14")
 * @param {string} [props.textColor] - Text color CSS classes with light/dark mode variants for app bar content (defaults to "text-light-on-surface dark:text-dark-on-surface")
 * @param {string} [props.bgColor] - Background color CSS classes with light/dark mode variants for the app bar container (defaults to "bg-light-surface dark:bg-dark-surface")
 * @returns {JSX.Element} AppBar component with configured navigation and branding elements
 * @example
 * // Basic usage with app name and actions
 * import { SvgMenu, SvgSettings } from '../icons';
 *
 * <AppBar
 *   navigationDrawer={<SvgMenu onClick={toggleDrawer} />}
 *   appName="My Application"
 *   suffix={[<SvgSettings onClick={openSettings} />]}
 * />
 * @example
 * // With back navigation and custom styling
 * import { SvgArrowBackIos } from '../icons';
 *
 * <AppBar
 *   backArrow={<SvgArrowBackIos onClick={goBack} />}
 *   appName="Details Page"
 *   suffix={[]}
 *   optionalClass="sticky top-0 shadow-md"
 *   height="h-16"
 *   bgColor="bg-light-primary-container dark:bg-dark-primary-container"
 *   textColor="text-light-on-primary-container dark:text-dark-on-primary-container"
 * />
 * @example
 * // Full configuration with logo and multiple actions
 * import { SvgLogo, SvgSearch, SvgNotifications, SvgAccount } from '../icons';
 *
 * <AppBar
 *   appLogo={<SvgLogo />}
 *   appName="Enterprise App"
 *   suffix={[
 *     <SvgSearch onClick={openSearch} />,
 *     <SvgNotifications onClick={showNotifications} />,
 *     <SvgAccount onClick={openProfile} />
 *   ]}
 *   height="h-16 lg:h-20"
 *   bgColor="bg-white dark:bg-gray-900"
 *   textColor="text-gray-900 dark:text-white"
 * />
 */
const AppBar = ({
  backArrow,
  navigationDrawer,
  appLogo,
  appName,
  suffix,
  optionalClass = "fixed top-0",
  height = "h-12 sm:h-14",
  bgColor = "bg-light-surface dark:bg-dark-surface",
  textColor = "text-light-on-surface dark:text-dark-on-surface",
}) => {
  return (
    <div
      className={`flex flex-row w-full pt-safe items-start z-30
        ${bgColor} ${textColor} ${optionalClass}`}
    >
      <div
        className={`flex flex-row items-center ${height} w-full
          px-0.5 sm:px-1 lg:px-2 gap-0.5 sm:gap-1 lg:gap-2`}
      >
        {backArrow}
        {navigationDrawer}
        <div className="flex mx-1 sm:mx-2 size-8 sm:size-10 min-w-6">
          {appLogo}
        </div>
        <div className="flex text-xl sm:text-2xl truncate">{appName}</div>
        <div className="flex flex-row grow"></div>
        {suffix && suffix.map((item, index) => <div key={index}>{item}</div>)}
      </div>
    </div>
  );
};

AppBar.propTypes = {
  backArrow: PropTypes.node,
  navigationDrawer: PropTypes.node,
  appLogo: PropTypes.node,
  appName: PropTypes.string,
  suffix: PropTypes.arrayOf(PropTypes.node),
  optionalClass: PropTypes.string,
  height: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default AppBar;
