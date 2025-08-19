import PropTypes from "prop-types";

import CommonTitle, { ActionItem } from "./CommonTitle.jsx";

/**
 * AppBar component that implements a Material Design 3 styled top app bar.
 * This component serves as the primary toolbar at the top of the application,
 * containing navigation controls, app identity elements, and action items.
 *
 * The AppBar combines branding elements (logo, app name) with navigation controls
 * (back arrow, navigation drawer toggle) and action items (suffix).
 *
 * By default, it's positioned fixed at the top of the viewport, but this behavior
 * can be customized via the optionalClass prop.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.backArrow] - Icon/component for the back navigation button
 * @param {React.ReactNode} [props.navigationDrawer] - Icon/component for the navigation drawer toggle
 * @param {React.ReactNode} [props.appLogo] - App logo component or image
 * @param {string} [props.appName] - Name of the application to display
 * @param {React.ReactNode[]} [props.suffix] - Array of action items to display on the right side
 * @param {string} [props.optionalClass="fixed top-0 w-full h-14"] - Additional CSS classes for positioning and styling
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
 *   optionalClass="sticky top-0 w-full h-16 shadow-md"
 * />
 */
const AppBar = ({
  backArrow,
  navigationDrawer,
  appLogo,
  appName,
  suffix,
  optionalClass = "fixed top-0 w-full h-14",
  bgColor = "bg-light-surface dark:bg-dark-surface",
}) => {
  return (
    <div
      className={`flex flex-row
        ${bgColor}
        text-light-on-surface dark:text-dark-on-surface
        items-center gap-1 px-0 sm:px-1
        ${optionalClass}`}
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
  );
};

AppBar.propTypes = {
  backArrow: PropTypes.node,
  navigationDrawer: PropTypes.node,
  appLogo: PropTypes.node,
  appName: PropTypes.string,
  suffix: PropTypes.arrayOf(PropTypes.node),
  optionalClass: PropTypes.string,
  bgColor: PropTypes.string,
};

export default AppBar;
