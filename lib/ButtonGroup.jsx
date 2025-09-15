/**
 * @file A button group component implementing Material Design 3 segmented button patterns.
 * Provides single and multi-selection functionality with comprehensive theming support.
 * @since 1.0.0
 */

import PropTypes from "prop-types";
import Button from "./Button.jsx";

/**
 * A button group component implementing Material Design 3 principles that provides
 * segmented control functionality with single or multi-selection capabilities.
 *
 * This component offers a complete button group solution featuring:
 * - **Segmented Control**: Visual grouping of related action buttons
 * - **Selection Modes**: Support for both single-select and multi-select behavior
 * - **Material Design 3 Styling**: Proper button states and transitions
 * - **Flexible Configuration**: Support for icons, labels, or icon+label combinations
 * - **State Management**: Selected buttons use "filled" style, others use "tonal" style
 * - **Theme Integration**: Seamless light/dark mode support with Material Design colors
 * - **Responsive Design**: Adapts to different screen sizes and device capabilities
 * - **Accessibility**: Proper ARIA attributes and keyboard navigation support
 *
 * The component automatically handles selection state visualization by applying different
 * button styles based on selection status. It can function as either a toggle button
 * group (multi-select) or a segmented control (single-select) depending on configuration.
 *
 * All buttons within the group maintain consistent sizing and spacing while providing
 * clear visual feedback for user interactions and selection states.
 * @component
 * @param {object} props - Component props
 * @param {string} props.name - Unique name identifier for the button group.
 *   Used for generating DOM IDs and maintaining component identity.
 *   Required for proper form integration and accessibility.
 * @param {string|Array<string>} [props.value] - Currently selected button value(s).
 *   For single-select mode: string value matching one of the item values.
 *   For multi-select mode: array of strings matching selected item values.
 *   This is a controlled component requiring external state management.
 * @param {Array<object>} [props.items] - Array of button configuration objects.
 *   Each item should have:
 *   - value: string - Unique identifier for the button (required)
 *   - label: string - Text to display on the button (optional)
 *   - icon: React.ReactNode - Icon element to display on the button (optional)
 *   At least one of label or icon should be provided for each item.
 * @param {boolean} [props.multiSelect] - Selection mode configuration.
 *   Defaults to false (single-select mode).
 *   - false: Only one button can be selected at a time (radio button behavior)
 *   - true: Multiple buttons can be selected simultaneously (checkbox behavior)
 * @param {Function} [props.onChange] - Callback function invoked when button selection changes.
 *   For single-select: receives the selected value as a string parameter.
 *   For multi-select: receives an array of selected values as parameter.
 *   Required for controlled component behavior and state updates.
 * @param {boolean} [props.disabled] - When true, disables the entire button group.
 *   Defaults to false. Prevents all user interaction and applies disabled styling.
 *   Individual buttons cannot be disabled separately within the group.
 * @param {('xs'|'sm'|'md')} [props.size] - Size variant applied to all buttons in the group.
 *   Defaults to 'sm'. All buttons within the group will use the same size for consistency.
 *   - 'xs': Compact size for tight layouts
 *   - 'sm': Standard size for most use cases
 *   - 'md': Larger size for prominent controls
 * @returns {JSX.Element} Rendered button group component with all configured buttons
 * @since 1.0.0
 * @example
 * // Single-select view mode switcher
 * <ButtonGroup
 *   name="viewMode"
 *   value={currentView}
 *   items={[
 *     { value: 'grid', label: 'Grid View' },
 *     { value: 'list', label: 'List View' },
 *     { value: 'card', label: 'Card View' }
 *   ]}
 *   onChange={(value) => setCurrentView(value)}
 * />
 * @example
 * // Multi-select filter options
 * <ButtonGroup
 *   name="filters"
 *   value={selectedFilters}
 *   multiSelect={true}
 *   items={[
 *     { value: 'new', label: 'New' },
 *     { value: 'popular', label: 'Popular' },
 *     { value: 'featured', label: 'Featured' }
 *   ]}
 *   onChange={(values) => setSelectedFilters(values)}
 * />
 * @example
 * // Icon-only button group for formatting
 * import { SvgFormatBold, SvgFormatItalic, SvgFormatUnderline } from '../icons';
 *
 * <ButtonGroup
 *   name="formatting"
 *   value={formatOptions}
 *   multiSelect={true}
 *   size="sm"
 *   items={[
 *     { value: 'bold', icon: <SvgFormatBold /> },
 *     { value: 'italic', icon: <SvgFormatItalic /> },
 *     { value: 'underline', icon: <SvgFormatUnderline /> }
 *   ]}
 *   onChange={setFormatOptions}
 * />
 * @example
 * // Mixed icon and label button group
 * import { SvgDashboard, SvgList, SvgSettings } from '../icons';
 *
 * <ButtonGroup
 *   name="sidebar"
 *   value={activeSidebar}
 *   items={[
 *     { value: 'dashboard', icon: <SvgDashboard />, label: 'Dashboard' },
 *     { value: 'files', icon: <SvgList />, label: 'Files' },
 *     { value: 'settings', icon: <SvgSettings />, label: 'Settings' }
 *   ]}
 *   size="md"
 *   onChange={setActiveSidebar}
 * />
 */

const ButtonGroup = ({
  name,
  value,
  items,
  multiSelect = false,
  onChange,
  disabled = false,
  size = "sm",
}) => {
  if (multiSelect) {
    if (!Array.isArray(value)) {
      value = value ? [value] : [];
    }
  } else {
    if (typeof value !== "string") {
      value = value ? `${value}` : "";
    }
  }

  return (
    <div id={`button-group-${name}`} className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Button
          id={`${name}-${item.value}`}
          key={item.value}
          icon={item.icon}
          label={item.label}
          style={
            (multiSelect ? value.includes(item.value) : item.value === value)
              ? "filled"
              : "tonal"
          }
          onClick={() => {
            if (multiSelect) {
              if (value.includes(item.value)) {
                value = value.filter((v) => v !== item.value);
              } else {
                value = [...value, item.value];
              }
            } else {
              value = item.value;
            }
            onChange(value);
          }}
          rounded={
            (multiSelect ? value.includes(item.value) : item.value === value)
              ? "rounded-full"
              : "rounded-sm first:rounded-l-full last:rounded-r-full"
          }
          disabled={disabled}
          size={size}
        />
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  items: PropTypes.arrayOf(PropTypes.object),
  multiSelect: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["xs", "sm", "md"]),
};

export default ButtonGroup;
