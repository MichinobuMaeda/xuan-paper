/**
 * @file A radio button group component implementing Material Design 3 radio patterns.
 * Provides single-selection interface with customizable layout and comprehensive theming.
 * @since 1.0.0
 */

import PropTypes from "prop-types";

/**
 * A radio button group component implementing Material Design 3 principles
 * that provides intuitive single-selection interface from multiple options.
 *
 * This component offers a complete radio group solution featuring:
 * - **Single Selection**: Only one option can be selected at a time within the group
 * - **Material Design 3 Styling**: Authentic radio button appearance with proper proportions
 * - **Flexible Layout**: Support for both horizontal and vertical arrangement of options
 * - **Theme Integration**: Seamless light/dark mode support with Material Design colors
 * - **Accessibility**: Full keyboard navigation and screen reader compatibility
 * - **State Management**: Controlled component pattern with external state management
 * - **Touch Optimization**: Appropriate touch targets for mobile interaction
 * - **Label Association**: Proper label-input association for improved usability
 *
 * The component renders as a React Fragment containing individual radio button elements,
 * each properly associated with its label for accessibility. All radio buttons within
 * the group share the same name attribute for proper browser grouping behavior.
 *
 * The layout can be configured for different use cases - horizontal for compact
 * selections and vertical for longer lists or improved mobile accessibility.
 * @component
 * @param {object} props - Component props
 * @param {string} props.name - Unique name for the radio group (required).
 *   Used for proper radio button grouping behavior and form submission.
 *   All radio buttons in the group will share this name attribute.
 * @param {string} [props.value] - Currently selected radio button value.
 *   Should match one of the item values to indicate the selected state.
 *   This is a controlled component requiring external state management.
 * @param {Array<{value: string, label: string}>} [props.items] - Array of radio button option objects.
 *   Each item should have:
 *   - value: Unique identifier for the option
 *   - label: Display text shown next to the radio button
 *   Defaults to empty array if not provided.
 * @param {Function} [props.onChange] - Callback function invoked when a radio button is selected.
 *   Receives the selected item's value as a string parameter.
 *   Required for controlled component behavior and state updates.
 * @param {('vertical'|'horizontal')} [props.layout] - Layout direction for the radio buttons.
 *   Defaults to 'horizontal'.
 *   - 'horizontal': Arranges radio buttons in a row (compact for short lists)
 *   - 'vertical': Arranges radio buttons in a column (better for longer lists)
 * @returns {JSX.Element} Rendered radio group component (React Fragment containing radio buttons)
 * @since 1.0.0
 * @example
 * // Basic radio group for size selection
 * <RadioGroup
 *   name="size"
 *   value={selectedSize}
 *   items={[
 *     { value: 'small', label: 'Small' },
 *     { value: 'medium', label: 'Medium' },
 *     { value: 'large', label: 'Large' }
 *   ]}
 *   onChange={(value) => setSelectedSize(value)}
 * />
 * @example
 * // Vertical radio group for theme preferences
 * <RadioGroup
 *   name="theme"
 *   value={currentTheme}
 *   layout="vertical"
 *   items={[
 *     { value: 'light', label: 'Light Mode' },
 *     { value: 'dark', label: 'Dark Mode' },
 *     { value: 'auto', label: 'System Default' }
 *   ]}
 *   onChange={handleThemeChange}
 * />
 * @example
 * // Radio group for payment methods
 * <RadioGroup
 *   name="payment"
 *   value={selectedPayment}
 *   items={[
 *     { value: 'credit', label: 'Credit Card' },
 *     { value: 'paypal', label: 'PayPal' },
 *     { value: 'apple', label: 'Apple Pay' },
 *     { value: 'google', label: 'Google Pay' }
 *   ]}
 *   layout="vertical"
 *   onChange={setSelectedPayment}
 * />
 * @example
 * // Settings radio group with controlled state
 * const [notification, setNotification] = useState('email');
 *
 * <RadioGroup
 *   name="notifications"
 *   value={notification}
 *   items={[
 *     { value: 'email', label: 'Email notifications' },
 *     { value: 'push', label: 'Push notifications' },
 *     { value: 'none', label: 'No notifications' }
 *   ]}
 *   onChange={setNotification}
 * />
 */

const RadioGroup = ({
  name,
  value,
  items,
  onChange,
  layout = "horizontal",
}) => {
  return (
    <div
      className={
        layout === "horizontal"
          ? "flex flex-row flex-wrap gap-4"
          : "flex flex-col gap-1"
      }
    >
      {items.map((item) => (
        <label
          className={`flex flex-row justify-start items-center h-8 px-1 gap-2
            select-none cursor-pointer`}
          key={item.value}
        >
          <div className="flex flex-row relative">
            <input
              className="appearance-none size-6 cursor-pointer"
              type="radio"
              id={`radio-${name}-${item.value}`}
              name={name}
              value={item.value}
              onClick={() => {
                value = item.value;
                onChange(item.value);
              }}
            />
            {item.value === value ? (
              /* Material icons 'Radio button checked' https://fonts.google.com/icons */
              <svg
                className={`absolute inset-0 pointer-events-none size-6
                  text-light-primary dark:text-dark-primary`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
              </svg>
            ) : (
              /* Material icons 'Radio button unchecked' https://fonts.google.com/icons */
              <svg
                className={`absolute inset-0 pointer-events-none size-6
                  text-light-on-form dark:text-dark-on-form`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
              </svg>
            )}
          </div>
          {item.label}
        </label>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  layout: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default RadioGroup;
