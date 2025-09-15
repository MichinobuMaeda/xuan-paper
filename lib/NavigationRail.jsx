/**
 * @file NavigationRail component implementing Material Design 3 side navigation rail patterns.
 * Provides vertical navigation for primary app destinations with compact and expanded modes.
 * @since 1.0.0
 */

import PropTypes from "prop-types";

/**
 * @typedef {object} NavigationRailItem
 * @property {React.ReactNode} icon - Icon element to display for the navigation item
 * @property {string} label - Text label shown below the icon in compact mode or beside the icon in expanded mode
 * @property {boolean} [active=false] - Whether the navigation item is currently active/selected
 * @property {boolean} [disabled=false] - Whether the navigation item is disabled and non-interactive
 * @property {Function} onClick - Callback function triggered when the navigation item is clicked
 */

/**
 * A vertical navigation rail component implementing Material Design 3 guidelines.
 * Displays a column of navigation items with icons and labels along the side of the screen.
 *
 * The NavigationRail is designed for tablet and desktop layouts as a space-efficient
 * alternative to a full navigation drawer. It provides quick access to top-level
 * destinations while taking up minimal horizontal space.
 *
 * Features:
 * - Compact mode (default) shows only icons with small labels on narrow screens
 * - Expanded mode shows icons with larger labels on wider screens (lg breakpoint)
 * - Supports active states with highlighted backgrounds and colors
 * - Supports disabled states with reduced opacity
 * - Provides hover effects that adapt based on screen size
 * - Follows Material Design 3 theming guidelines with proper light/dark mode support
 * @since 1.0.0
 * @param {object} props - Component props
 * @param {Array<NavigationRailItem>} props.items - Array of navigation items to display
 * @param {string} [props.optionalClass="h-full w-24 lg:w-56 fixed top-0 py-4"] - Additional CSS classes for positioning and styling
 * @returns {JSX.Element} Rendered navigation rail component
 * @example
 * // Basic usage with icons and labels
 * <NavigationRail
 *   items={[
 *     {
 *       icon: <HomeIcon />,
 *       label: "Home",
 *       active: true,
 *       onClick: () => navigate('/home')
 *     },
 *     {
 *       icon: <SearchIcon />,
 *       label: "Search",
 *       onClick: () => navigate('/search')
 *     },
 *     {
 *       icon: <ProfileIcon />,
 *       label: "Profile",
 *       onClick: () => navigate('/profile')
 *     },
 *     {
 *       icon: <SettingsIcon />,
 *       label: "Settings",
 *       disabled: true,
 *       onClick: () => {}
 *     }
 *   ]}
 * />
 * @example
 * // With custom positioning and width
 * <NavigationRail
 *   items={navigationItems}
 *   optionalClass="h-full w-20 lg:w-48 fixed left-0 top-16 py-2"
 * />
 */

const NavigationRail = ({
  items = [],
  optionalClass = "h-full w-24 lg:w-56 fixed top-0 py-4",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-start
        ${optionalClass} px-2 gap-2 z-20
        bg-light-surface-container dark:bg-dark-surface-container
        shadow-sm shadow-light-shadow dark:shadow-dark-shadow`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={`flex flex-col lg:flex-row h-14 w-full rounded-full
            items-center px-2 lg:px-4 lg:gap-2
            ${item.disabled ? "" : "cursor-pointer"} ${
              item.disabled
                ? ""
                : item.active
                  ? `
                  lg:bg-light-secondary-container lg:dark:bg-dark-secondary-container
                  lg:hover:brightness-95 lg:hover:dark:brightness-110`
                  : `lg:hover:bg-light-on-secondary-container/10 lg:hover:dark:bg-dark-on-secondary-container/10`
            }`}
          onClick={item.onClick}
        >
          <div
            className={`flex flex-row justify-center items-center
              w-14 lg:w-fit h-8 lg:h-fit rounded-full ${
                item.disabled
                  ? `text-light-on-surface/40 dark:text-dark-on-surface/40`
                  : item.active
                    ? `bg-light-secondary-container dark:bg-dark-secondary-container
                    text-light-on-secondary-container dark:text-dark-on-secondary-container
                    active:brightness-95 active:dark:brightness-120
                    hover:brightness-97 hover:dark:brightness-110`
                    : `text-light-on-surface-variant dark:text-dark-on-surface-variant
                    active:bg-light-on-secondary-container/10 active:dark:bg-dark-on-secondary-container/10
                    hover:bg-light-on-secondary-container/5 hover:dark:bg-dark-on-secondary-container/5`
              }
              lg:bg-transparent lg:dark:bg-transparent
              lg:hover:bg-transparent lg:dark:hover:bg-transparent`}
          >
            <div className={`size-6`}>{item.icon}</div>
          </div>
          <div
            className={`text-xs lg:text-base py-1 ${
              item.disabled
                ? `text-light-on-surface/40 dark:text-dark-on-surface/40`
                : item.active
                  ? `text-light-secondary dark:text-dark-secondary`
                  : `text-light-on-surface-variant dark:text-dark-on-surface-variant`
            }`}
          >
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
};

NavigationRail.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
    }),
  ),
  optionalClass: PropTypes.string,
};

export default NavigationRail;
