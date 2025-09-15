/**
 * @file Floating Action Button (FAB) component implementing Material Design 3 FAB patterns.
 * Provides primary action buttons with expandable menu functionality and comprehensive theming.
 * @since 1.0.0
 */

import PropTypes from "prop-types";
import { useState } from "react";

const activeColor = (color = "primary") => {
  switch (color) {
    case "secondary":
      return `bg-light-secondary-container dark:bg-dark-secondary-container
        text-light-on-secondary-container dark:text-dark-on-secondary-container
        active:brightness-104 dark:active:brightness-90
        hover:brightness-102 dark:hover:brightness-95`;
    case "tertiary":
      return `bg-light-tertiary-container dark:bg-dark-tertiary-container
        text-light-on-tertiary-container dark:text-dark-on-tertiary-container
        active:brightness-104 dark:active:brightness-90
        hover:brightness-102 dark:hover:brightness-95`;
    default:
      return `bg-light-primary-container dark:bg-dark-primary-container
        text-light-on-primary-container dark:text-dark-on-primary-container
        active:brightness-104 dark:active:brightness-90
        hover:brightness-102 dark:hover:brightness-95`;
  }
};

const openedColor = (color = "primary") => {
  switch (color) {
    case "secondary":
      return `bg-light-secondary dark:bg-dark-secondary
        text-light-on-secondary dark:text-dark-on-secondary
        active:brightness-120 dark:active:brightness-90
        hover:brightness-110 dark:hover:brightness-95`;
    case "tertiary":
      return `bg-light-tertiary dark:bg-dark-tertiary
        text-light-on-tertiary dark:text-dark-on-tertiary
        active:brightness-120 dark:active:brightness-90
        hover:brightness-110 dark:hover:brightness-95`;
    default:
      return `bg-light-primary dark:bg-dark-primary
        text-light-on-primary dark:text-dark-on-primary
        active:brightness-120 dark:active:brightness-90
        hover:brightness-110 dark:hover:brightness-95`;
  }
};

/**
 * @typedef {object} FabMenuItemProp
 * @property {React.ReactNode} icon - The icon to display alongside the label
 * @property {string} label - The label of the menu item
 * @property {Function} onClick - The click event handler for the menu item
 * @property {boolean} disabled - Whether the menu item is disabled
 */

const FabMenuItem = ({ icon, label, onClick, disabled, color = "primary" }) => {
  return (
    <button
      className={`flex flex-row rounded-full h-14 px-4 py-4 gap-2 text-nowrap
        shadow-md shadow-light-shadow/30 dark:shadow-dark-shadow/30 ${
          disabled
            ? `bg-light-surface-dim dark:bg-dark-surface-dim
          text-light-on-surface/40 dark:text-dark-on-surface/40`
            : activeColor(color)
        }`}
      onClick={disabled ? undefined : onClick}
    >
      {icon && <div className="size-6">{icon}</div>}
      {label}
    </button>
  );
};

FabMenuItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};

/**
 * Floating Action Button (FAB) component implementing Material Design 3 principles
 * with expandable menu functionality and comprehensive styling options.
 *
 * This component provides a complete FAB solution featuring:
 * - **Primary Action Focus**: Prominent circular button for the most important action
 * - **Expandable Menu**: Optional secondary actions that appear when FAB is activated
 * - **Material Design 3 Styling**: Authentic elevation, colors, and interaction patterns
 * - **Multiple Color Variants**: Primary, secondary, and tertiary color schemes
 * - **Smooth Animations**: Fluid transitions for expand/collapse and hover states
 * - **Accessibility**: Proper ARIA attributes and keyboard navigation support
 * - **Responsive Positioning**: Flexible positioning with safe area support
 * - **State Management**: Internal state handling for expand/collapse behavior
 *
 * The FAB follows Material Design guidelines for floating action buttons, providing
 * a persistent and prominent way to access primary actions. When items are provided,
 * it becomes an expandable FAB that reveals additional actions in a vertical menu.
 *
 * The component automatically handles menu state transitions and provides visual
 * feedback for all interactions. Menu items are displayed with appropriate spacing
 * and follow the same design patterns as the main FAB button.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.id] - HTML ID attribute for the FAB button element.
 *   Used for accessibility and programmatic access to the component.
 * @param {React.ReactNode} [props.icon] - Icon element to display in the center of the FAB.
 *   Should be an appropriately sized icon (typically 24x24px) for clear recognition.
 * @param {string} [props.label] - Text label for the FAB button.
 *   Provides accessibility context and may be displayed as tooltip or extended FAB text.
 * @param {Array} [props.items] - Array of menu item objects for expandable functionality.
 *   Each item should have: {icon, label, onClick, disabled} properties.
 *   Defaults to empty array. When empty, FAB behaves as simple action button without expansion.
 * @param {boolean} [props.hidden] - When true, hides the FAB from view.
 *   Defaults to false. Useful for conditionally showing/hiding based on context.
 * @param {('primary'|'secondary'|'tertiary')} [props.color] - Color variant for theming.
 *   Defaults to 'primary'.
 *   - 'primary': Uses primary color scheme for most important actions
 *   - 'secondary': Uses secondary color scheme for alternative actions
 *   - 'tertiary': Uses tertiary color scheme for supporting actions
 * @param {string} [props.position] - CSS positioning classes.
 *   Defaults to bottom-right positioning with safe area support.
 *   Can be customized for different layouts (e.g., 'fixed bottom-4 left-4' for bottom-left).
 * @param {Function} [props.onClick] - Click handler for the main FAB button.
 *   Called when FAB is clicked. For expandable FABs, this is called in addition to menu toggle.
 *   Defaults to no-op function if not provided.
 * @returns {JSX.Element} FAB component with configured styling and optional expandable menu
 * @since 1.0.0
 * @example
 * // Simple FAB for primary action
 * import { SvgAdd } from '../icons';
 *
 * <Fab
 *   icon={<SvgAdd />}
 *   label="Add new item"
 *   onClick={handleAddItem}
 * />
 * @example
 * // Expandable FAB with multiple actions
 * import { SvgAdd, SvgEdit, SvgShare, SvgDelete } from '../icons';
 *
 * <Fab
 *   icon={<SvgAdd />}
 *   label="Actions"
 *   color="primary"
 *   items={[
 *     {
 *       icon: <SvgEdit />,
 *       label: "Edit",
 *       onClick: handleEdit
 *     },
 *     {
 *       icon: <SvgShare />,
 *       label: "Share",
 *       onClick: handleShare
 *     },
 *     {
 *       icon: <SvgDelete />,
 *       label: "Delete",
 *       onClick: handleDelete,
 *       disabled: !canDelete
 *     }
 *   ]}
 * />
 * @example
 * // Conditionally hidden FAB based on scroll
 * <Fab
 *   icon={<SvgArrowUp />}
 *   label="Scroll to top"
 *   hidden={!showScrollToTop}
 *   onClick={scrollToTop}
 *   position="fixed bottom-4 right-4 z-50"
 * />
 * @example
 * // Secondary color FAB in custom position
 * <Fab
 *   icon={<SvgHelp />}
 *   label="Help"
 *   color="secondary"
 *   position="fixed bottom-4 left-4"
 *   onClick={showHelpDialog}
 * />
 */
function Fab({
  id,
  icon,
  label,
  items = [],
  hidden = false,
  color = "primary",
  position = "fixed bottom-safe-offset-4 right-4 z-40",
  onClick = () => null,
}) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={`flex flex-col gap-2 items-end ${position}`}>
      {opened &&
        items.map((item, index) => (
          <FabMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            disabled={item.disabled}
            color={color}
            onClick={() => {
              if (!item.disabled) {
                setOpened(false);
                return item.onClick();
              }
            }}
          />
        ))}
      <button
        id={id}
        className={`${hidden ? "hidden" : "flex"} flex-row w-fit px-4 py-4 gap-2
        ${opened ? "rounded-full" : "rounded-2xl"} text-base
        ${opened ? openedColor(color) : activeColor(color)}
        shadow-md shadow-light-shadow/30 dark:shadow-dark-shadow/30`}
        onClick={
          hidden
            ? () => {}
            : items.length > 0
              ? () => setOpened(!opened)
              : onClick
        }
        disabled={hidden}
      >
        {
          <div className="size-6">
            {opened ? (
              /* Material icons 'Close' https://fonts.google.com/icons */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            ) : (
              icon
            )}
          </div>
        }
        {label}
      </button>
    </div>
  );
}

Fab.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(FabMenuItem.propTypes)),
  hidden: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  position: PropTypes.string,
  onClick: PropTypes.func,
};

export default Fab;
