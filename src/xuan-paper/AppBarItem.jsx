import PropTypes from "prop-types";

/**
 * AppBarItem component that represents an action button in the AppBar.
 * This component renders a circular button with an icon, following Material Design 3 guidelines
 * for top app bar action items.
 *
 * The button has hover effects and can be disabled. When disabled, it appears with reduced
 * opacity and doesn't respond to click events.
 *
 * Each AppBarItem is designed to be used within the suffix array of the AppBar component
 * to create action buttons on the right side of the app bar.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - The icon to display within the button (required)
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {Function} [props.onClick=() => {}] - Click handler function
 * @returns {JSX.Element} AppBarItem button component
 *
 * @example
 * // Basic usage with an icon
 * import { SvgSettings } from '../icons';
 *
 * <AppBarItem
 *   icon={<SvgSettings />}
 *   onClick={() => console.log('Settings clicked')}
 * />
 *
 * @example
 * // Disabled state
 * import { SvgDownload } from '../icons';
 *
 * <AppBarItem
 *   icon={<SvgDownload />}
 *   disabled={true}
 * />
 */
const AppBarItem = ({
  icon,
  disabled = false,
  onClick = () => {},
  bgColor = "bg-light-surface dark:bg-dark-surface",
}) => {
  return (
    <button
      className={`flex flex-row  w-10 h-10 justify-center items-center
        rounded-full mx-1
        ${disabled ? "" : "cursor-pointer"}
        ${bgColor}
        ${
          disabled
            ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
            : `text-light-on-surface dark:text-dark-on-surface
            active:brightness-95 active:dark:brightness-140
            hover:brightness-97 hover:dark:brightness-120`
        }`}
      onClick={disabled ? () => {} : onClick}
    >
      <div className="flex size-6">{icon}</div>
    </button>
  );
};

AppBarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
};

export default AppBarItem;
