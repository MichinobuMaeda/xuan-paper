import PropTypes from "prop-types";

/**
 * A radio button group component that allows single selection
 * from a list of options. Renders a collection of radio buttons
 * with custom styling and automatic light/dark theme support.
 * Only one option can be selected at a time within the group.
 *
 * @param {Object} props - The props object
 * @param {string} props.name - Unique name for the radio group (required for proper radio button grouping)
 * @param {string} [props.value] - Currently selected radio button value
 * @param {Array<Object>} [props.items] - Array of radio button option objects
 * @param {string} props.items[].value - Unique value for the radio button option
 * @param {string} props.items[].label - Text label to display next to the radio button
 * @param {Function} [props.onChange] - Callback function called when a radio button is selected
 * @param {('vertical'|'horizontal')} [props.layout='horizontal'] - Layout direction for the radio buttons
 * @returns {JSX.Element} Rendered radio group component (React Fragment containing radio buttons)
 *
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
 *
 * @example
 * // Radio group for theme preferences
 * <RadioGroup
 *   name="theme"
 *   value={currentTheme}
 *   items={[
 *     { value: 'light', label: 'Light Mode' },
 *     { value: 'dark', label: 'Dark Mode' },
 *     { value: 'auto', label: 'System Default' }
 *   ]}
 *   onChange={handleThemeChange}
 * />
 *
 * @example
 * // Radio group for payment methods with Horizontal layout for compact display
 * <RadioGroup
 *   name="payment"
 *   value={paymentMethod}
 *   layout="horizontal"
 *   items={[
 *     { value: 'credit', label: 'Credit Card' },
 *     { value: 'debit', label: 'Debit Card' },
 *     { value: 'paypal', label: 'PayPal' },
 *     { value: 'bank', label: 'Bank Transfer' }
 *   ]}
 *   onChange={setPaymentMethod}
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
              <svg
                className={`absolute inset-0 pointer-events-none size-6
                  text-light-primary dark:text-dark-primary-primary`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
              >
                <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
              </svg>
            ) : (
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
