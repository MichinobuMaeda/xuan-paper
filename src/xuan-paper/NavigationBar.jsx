import PropTypes from "prop-types";

/**
 * @typedef {Object} NavigationBarItem
 * @property {React.ReactNode} icon - Icon element to display for the navigation item
 * @property {string} label - Text label shown below/beside the icon
 * @property {boolean} [active=false] - Whether the navigation item is currently active/selected
 * @property {boolean} [disabled=false] - Whether the navigation item is disabled and non-interactive
 * @property {Function} onClick - Callback function triggered when the navigation item is clicked
 */

/**
 * A mobile-first bottom navigation bar component with responsive behavior.
 * Displays a row of navigation items with icons and labels.
 * On mobile, renders as a fixed bottom bar with vertically stacked items.
 * On desktop, displays a horizontal bar with inline icon+label pairs.
 *
 * Supports active states, disabled states, and hover effects that adapt to screen size.
 * Follows Material Design 3 theming guidelines with proper light/dark mode support.
 *
 * The component automatically handles different visual states:
 * - Active items are highlighted with container colors and primary text
 * - Disabled items appear with reduced opacity and are non-interactive
 * - Hover effects are applied differently for mobile and desktop views
 *
 * @param {Object} props - Component props
 * @param {Array<NavigationBarItem>} props.items - Array of navigation items to display
 * @param {string} [props.optionalClass="h-16 w-full fixed bottom-0"] - Additional CSS classes for positioning and styling
 * @returns {JSX.Element} Rendered navigation bar component
 *
 * @example
 * // Basic usage with icons and labels
 * <NavigationBar
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
 *
 * @example
 * // With custom positioning as a top navigation bar
 * <NavigationBar
 *   items={navigationItems}
 *   optionalClass="h-16 w-full sticky top-0 shadow-lg"
 * />
 */

const NavigationBar = ({
  items = [],
  optionalClass = "h-16 w-full fixed bottom-0",
}) => {
  return (
    <div
      className={`flex flex-row items-center justify-evenly
        py-1.5 z-20 ${optionalClass}
        bg-light-surface-container dark:bg-dark-surface-container
        shadow-sm shadow-light-shadow dark:shadow-dark-shadow`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={`flex flex-col md:flex-row gap-1 items-center
            md:h-10 md:px-5 md:rounded-full
            ${item.disabled ? "" : "cursor-pointer"} ${
              item.disabled
                ? ""
                : item.active
                  ? `
                  md:bg-light-secondary-container md:dark:bg-dark-secondary-container
                  md:hover:brightness-95 md:hover:dark:brightness-110`
                  : `md:hover:bg-light-on-secondary-container/10 md:hover:dark:bg-dark-on-secondary-container/10`
            }`}
          onClick={item.onClick}
        >
          <div
            className={`flex flex-row justify-center items-center
              w-14 md:w-fit h-8 md:h-fit rounded-full ${
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
              md:bg-transparent md:dark:bg-transparent
              md:hover:bg-transparent md:dark:hover:bg-transparent`}
          >
            <div className={`size-6`}>{item.icon}</div>
          </div>
          <div
            className={`text-xs ${
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

NavigationBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
    }),
  ).isRequired,
  optionalClass: PropTypes.string,
};

export default NavigationBar;
