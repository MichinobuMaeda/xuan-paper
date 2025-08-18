import PropTypes from "prop-types";

import AppBarItem from "./AppBarItem.jsx";
import CommonTitle from "./CommonTitle.jsx";

/**
 * Navigation item component used within the NavigationDrawer.
 * Renders a clickable navigation item with icon, label, and optional badge.
 * Supports active and disabled states with appropriate styling.
 * If neither icon nor label is provided, renders a horizontal divider.
 *
 * @component
 * @private
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.icon] - Icon element displayed on the left side
 * @param {string} [props.label] - Text label for the navigation item
 * @param {React.ReactNode} [props.badge] - Optional badge/indicator displayed on the right side
 * @param {Function} [props.onClick=() => {}] - Click handler function
 * @param {boolean} [props.active=false] - Whether the navigation item is currently active/selected
 * @param {boolean} [props.disabled=false] - Whether the navigation item is disabled
 * @returns {JSX.Element} NavItem component or divider
 */
const NavItem = ({
  icon,
  label,
  badge,
  onClick = () => {},
  active = false,
  disabled = false,
}) => {
  return icon || label ? (
    <button
      className={`flex flex-row size-14 justify-start items-center
          w-78 pl-4 pr-6 rounded-full mx-3 gap-3
          text-light-on-surface-variant dark:text-dark-on-surface-variant
          ${
            disabled
              ? `text-light-on-surface/40 dark:text-dark-on-surface/40`
              : active
                ? `bg-light-secondary-container dark:bg-dark-secondary-container
                    hover:brightness-95 hover:dark:brightness-110
                    text-light-on-secondary-container dark:text-dark-on-secondary-container`
                : `hover:bg-light-on-secondary-container/10 hover:dark:bg-dark-on-secondary-container/10
                    text-light-on-surface-variant dark:text-dark-on-surface-variant`
          }`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className="flex size-6">{icon}</div>
      <span className="flex flex-row w-54 truncate">{label}</span>
      <span className="flex flex-row w-8 justify-center">{badge}</span>
    </button>
  ) : (
    <hr />
  );
};

NavItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  badge: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

/**
 * Navigation drawer component implementing Material Design 3 navigation drawer pattern.
 * Provides a sliding drawer interface for application navigation with support for
 * persistent (keep) and temporary modes.
 * 
 * The drawer includes a header area with app identity elements and a scrollable
 * content area containing navigation items. In temporary mode, it displays a
 * semi-transparent overlay that dismisses the drawer when clicked.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} [props.backArrow] - Back navigation icon/button for the header
 * @param {React.ReactNode} [props.appLogo] - Application logo element
 * @param {string} [props.appName] - Application name displayed in the header
 * @param {Array<Object>} [props.items=[]] - Array of navigation items to display
 *   Each item should have properties matching NavItem component props
 * @param {boolean} [props.keep] - If true, drawer is persistent (always visible)
 *   If false, drawer is temporary with overlay and close button
 * @param {boolean} [props.open=false] - Whether the drawer is currently open (for temporary mode)
 * @param {Function} [props.onClose=() => {}] - Callback when drawer should close (temporary mode)
 * @returns {JSX.Element} NavigationDrawer component
 * 
 * @example
 * // Basic usage with temporary drawer
 * import { SvgHome, SvgSettings, SvgLogout } from '../icons';
 * 
 * <NavigationDrawer
 *   appName="My Application"
 *   open={drawerOpen}
 *   onClose={() => setDrawerOpen(false)}
 *   items={[
 *     {
 *       icon: <SvgHome />,
 *       label: "Home",
 *       active: true,
 *       onClick: () => navigate('/home')
 *     },
 *     {
 *       icon: <SvgSettings />,
 *       label: "Settings",
 *       onClick: () => navigate('/settings')
 *     },
 *     {},  // Divider
 *     {
 *       icon: <SvgLogout />,
 *       label: "Logout",
 *       onClick: handleLogout
 *     }
 *   ]}
 * />
 * 
 * @example
 * // Persistent drawer (always visible)
 * <NavigationDrawer
 *   appLogo={<AppLogo />}
 *   appName="Dashboard"
 *   keep={true}
 *   items={navigationItems}
 * />
 */
const NavigationDrawer = ({
  backArrow,
  appLogo,
  appName,
  items = [],
  keep,
  open = false,
  onClose = () => {},
}) => {
  return open ? (
    <div
      className={`flex flex-row ${keep ? "w-84" : "w-full"} h-full
        fixed top-0 left-0 ${keep ? "" : "z-50"}
        bg-light-on-surface/30 dark:bg-dark-on-surface/30`}
    >
      <div
        className={`flex flex-col w-84 max-w-84 min-w-84 h-full
        ${keep ? "" : "rounded-r-2xl"} gap-4 ${keep ? "pt-18" : ""}
        bg-light-surface-container-low dark:bg-dark-surface-container-low`}
      >
        {!keep && (
          <div
            className={`flex flex-row h-14 px-0 sm:px-1
              justify-start items-center gap-1`}
          >
            <CommonTitle
              backArrow={backArrow}
              navigationDrawer={
                <AppBarItem
                  icon={
                    /* Material icon 'Menu open' */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                    >
                      <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
                    </svg>
                  }
                  onClick={() => onClose()}
                />
              }
              appLogo={appLogo}
              appName={appName}
            />
          </div>
        )}
        {items.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </div>
      {!keep && <div className={`flex w-full h-full`} onClick={onClose}></div>}
    </div>
  ) : (
    <></>
  );
};

NavigationDrawer.propTypes = {
  backArrow: PropTypes.node,
  navigationDrawer: PropTypes.node,
  appLogo: PropTypes.node,
  appName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(NavItem.propTypes)),
  keep: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default NavigationDrawer;
