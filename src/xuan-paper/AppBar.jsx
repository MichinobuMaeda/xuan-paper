import PropTypes from "prop-types";

import CommonTitle, { ActionItem } from "./CommonTitle.jsx";

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
 * By default, it's positioned fixed at the top of the viewport, but this behavior
 * can be customized via the optionalClass prop. The component's height (as a complete
 * Tailwind class like "h-14") and background color are also configurable to accommodate
 * different design requirements and theming options.
 *
 * The component includes responsive padding that adapts to screen sizes, with tighter
 * spacing on mobile devices and more generous spacing on larger screens.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.backArrow] - Icon/component for the back navigation button
 * @param {React.ReactNode} [props.navigationDrawer] - Icon/component for the navigation drawer toggle
 * @param {React.ReactNode} [props.appLogo] - App logo component or image
 * @param {string} [props.appName] - Name of the application to display
 * @param {React.ReactNode[]} [props.suffix] - Array of action items to display on the right side
 * @param {string} [props.optionalClass="fixed top-0"] - Additional CSS classes for positioning and styling
 * @param {string} [props.height="h-14"] - Height of the app bar as Tailwind CSS class (e.g., "h-14" = 3.5rem = 56px)
 * @param {string} [props.bgColor="bg-light-surface dark:bg-dark-surface"] - Background color CSS classes with light/dark mode variants
 * @returns {JSX.Element} AppBar component
 *
 * @example
 * // Basic usage with app name and actions
 * import { SvgMenu, SvgSettings } from '../icons';
 *
 * <AppBar
 *   navigationDrawer={<SvgMenu onClick={toggleDrawer} />}
 *   appName="My Application"
 *   suffix={[<SvgSettings onClick={openSettings} />]}
 * />
 *
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
 * />
 */
const AppBar = ({
  backArrow,
  navigationDrawer,
  appLogo,
  appName,
  suffix,
  optionalClass = "fixed top-0",
  height = "h-14",
  bgColor = "bg-light-surface dark:bg-dark-surface",
}) => {
  return (
    <div
      className={`flex flex-row w-full pt-safe items-start px-0 sm:px-1 z-20
        ${bgColor}
        text-light-on-surface dark:text-dark-on-surface
        ${optionalClass}`}
    >
      <div
        className={`flex flex-row items-center ${height} w-full gap-1 px-0 sm:px-1`}
      >
        <CommonTitle
          backArrow={backArrow}
          navigationDrawer={navigationDrawer}
          appLogo={appLogo}
          appName={appName}
        />
        <div className="flex flex-row grow justify-end items-center">
          {suffix.map((item, index) => (
            <ActionItem key={index}>{item}</ActionItem>
          ))}
        </div>
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
};

export default AppBar;
