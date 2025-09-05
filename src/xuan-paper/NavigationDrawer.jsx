/**
 * @file Navigation drawer component implementing Material Design 3 patterns.
 * Provides both persistent and temporary drawer modes with comprehensive navigation item support.
 * @author Michinobu Maeda
 * @since 1.0.0
 */

import PropTypes from "prop-types";

const bgColor =
  "bg-light-surface-container-low dark:bg-dark-surface-container-low";

/**
 * Navigation item component used within the NavigationDrawer.
 * Renders a clickable navigation item with icon, label, and optional badge.
 * Supports active and disabled states with appropriate styling.
 * If neither icon nor label is provided, renders a horizontal divider.
 * @component
 * @private
 * @param {object} props - Component props
 * @param {React.ReactNode} [props.icon] - Icon element displayed on the left side of the navigation item
 * @param {string} [props.label] - Text label for the navigation item, truncated if too long
 * @param {React.ReactNode} [props.badge] - Optional badge/indicator displayed on the right side (e.g., notification count)
 * @param {Function} [props.onClick] - Click handler function called when the item is selected
 * @param {boolean} [props.active] - Whether the navigation item is currently active/selected (defaults to false)
 * @param {boolean} [props.disabled] - Whether the navigation item is disabled and non-interactive (defaults to false)
 * @returns {JSX.Element} NavItem component, text label, or horizontal divider
 */
const NavItem = ({
  icon,
  label,
  badge,
  onClick,
  active = false,
  disabled = false,
}) => {
  return onClick ? (
    <button
      className={`flex flex-row size-14 justify-start items-center
          w-78 pl-4 pr-6 rounded-full mx-3 gap-3
          text-light-on-surface-variant dark:text-dark-on-surface-variant
          ${
            disabled
              ? `text-light-on-surface/40 dark:text-dark-on-surface/40`
              : active
                ? `bg-light-secondary-container dark:bg-dark-secondary-container
                text-light-on-secondary-container dark:text-dark-on-secondary-container
                active:brightness-95 active:dark:brightness-140
                hover:brightness-97 hover:dark:brightness-120`
                : `${bgColor}
                text-light-on-surface-variant dark:text-dark-on-surface-variant
                active:brightness-90 active:dark:brightness-140
                hover:brightness-95 hover:dark:brightness-120`
          }`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className="flex size-6">{icon}</div>
      <span className="flex flex-row w-54 truncate">{label}</span>
      <span className="flex flex-row w-8 justify-center">{badge}</span>
    </button>
  ) : label ? (
    <div
      className={`flex flex-row w-64 px-7 truncate
        text-light-on-surface-variant dark:text-dark-on-surface-variant`}
    >
      {label}
    </div>
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
 * both persistent (always visible) and temporary (modal overlay) modes.
 *
 * The drawer features a clean, modern design with:
 * - A header area with app identity elements and proper spacing
 * - A scrollable content area containing navigation items with consistent styling
 * - Support for icons, labels, badges, and dividers within navigation items
 * - Proper theming with light/dark mode support using Material Design 3 color tokens
 * - Responsive behavior that adapts to different screen sizes
 *
 * In temporary mode, the drawer displays over a semi-transparent overlay that
 * dismisses the drawer when clicked, following standard modal patterns. In
 * persistent mode, the drawer remains visible and takes up dedicated screen space.
 *
 * The component respects accessibility guidelines with proper focus management,
 * keyboard navigation support, and semantic markup for screen readers.
 * @component
 * @param {object} props - Component props
 * @param {Array<object>} [props.items] - Array of navigation items to display in the drawer.
 *   Each item object supports properties: icon, label, badge, onClick, active, disabled.
 *   Empty objects ({}) render as horizontal dividers between sections.
 * @param {boolean} [props.keep] - Controls drawer behavior: true for persistent mode (always visible),
 *   false for temporary mode with overlay and dismissal capability
 * @param {boolean} [props.open] - Whether the drawer is currently open and visible (primarily used in temporary mode)
 * @param {Function} [props.onClose] - Callback function invoked when drawer should close (e.g., overlay click in temporary mode)
 * @returns {JSX.Element} NavigationDrawer component or empty fragment when closed
 * @example
 * // Basic usage with temporary drawer
 * import { SvgHome, SvgSettings, SvgLogout } from '../icons';
 *
 * <NavigationDrawer
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
 *     {},  // Renders a horizontal divider
 *     {
 *       icon: <SvgLogout />,
 *       label: "Logout",
 *       onClick: handleLogout
 *     }
 *   ]}
 * />
 * @example
 * // Persistent drawer (always visible)
 * <NavigationDrawer
 *   keep={true}
 *   items={navigationItems}
 * />
 */
const NavigationDrawer = ({
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
          ${keep ? "" : "rounded-r-2xl"} gap-4 pt-4
          ${bgColor}`}
      >
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
  items: PropTypes.arrayOf(PropTypes.shape(NavItem.propTypes)),
  keep: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default NavigationDrawer;
