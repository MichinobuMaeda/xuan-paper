import PropTypes from "prop-types";

/**
 * ActionItem component that provides a standardized container for action elements
 * in the AppBar and NavigationDrawer.
 *
 * This is an internal component not intended to be used directly by developers.
 * It creates a fixed-size container (12x12 units) with centered content,
 * designed to ensure consistent spacing and alignment of interactive elements
 * like buttons and icons within the header components.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to render within the action item container (required)
 * @returns {JSX.Element} ActionItem component
 *
 * @example
 * // Basic usage with an icon
 * import { SvgMenu } from '../icons';
 *
 * <ActionItem>
 *   <SvgMenu onClick={toggleDrawer} />
 * </ActionItem>
 */
export const ActionItem = ({ children }) => {
  return (
    <div className="flex flex-row w-12 h-12 justify-center items-center">
      {children}
    </div>
  );
};

ActionItem.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * CommonTitle component that renders the leading section of app bars and navigation drawer.
 * This component combines navigation controls (back arrow, drawer toggle) with app
 * identity elements (logo, app name) in a standardized layout.
 *
 * This is an internal component that is not intended to be used directly by developers.
 * It is used internally by the AppBar and NavigationDrawer components to create consistent
 * header structures across different navigation contexts.
 *
 * It automatically handles the presence/absence of optional elements (backArrow,
 * navigationDrawer, appLogo) and maintains proper spacing and alignment.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.backArrow] - Icon/component for the back navigation button
 * @param {React.ReactNode} [props.navigationDrawer] - Icon/component for the navigation drawer toggle
 * @param {React.ReactNode} [props.appLogo] - App logo component or image
 * @param {string} [props.appName] - Name of the application to display
 * @returns {JSX.Element} CommonTitle component
 *
 * @example
 * // Basic usage with navigation drawer and app name
 * import { SvgMenu } from '../icons';
 *
 * <CommonTitle
 *   navigationDrawer={<SvgMenu onClick={toggleDrawer} />}
 *   appName="My Application"
 * />
 *
 * @example
 * // With back navigation and logo
 * import { SvgArrowBackIos } from '../icons';
 * import AppLogo from '../AppLogo';
 *
 * <CommonTitle
 *   backArrow={<SvgArrowBackIos onClick={goBack} />}
 *   appLogo={<AppLogo />}
 *   appName="Details Page"
 * />
 */
const CommonTitle = ({ backArrow, navigationDrawer, appLogo, appName }) => {
  return (
    <>
      {backArrow && <ActionItem>{backArrow}</ActionItem>}
      {navigationDrawer && <ActionItem>{navigationDrawer}</ActionItem>}
      <div className="flex mx-2">{appLogo}</div>
      <div className="flex text-xl sm:text-2xl truncate">{appName}</div>
    </>
  );
};

CommonTitle.propTypes = {
  backArrow: PropTypes.node,
  navigationDrawer: PropTypes.node,
  appLogo: PropTypes.node,
  appName: PropTypes.string,
};

export default CommonTitle;
