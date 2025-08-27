import PropTypes from "prop-types";

/**
 * A customizable checkbox component with label support, theming,
 * and accessibility features.
 * Supports different visual styles including danger/error states, disabled state,
 * and automatic light/dark theme adaptation.
 * @param {object} props - The props object
 * @param {string} [props.id] - Unique identifier for the checkbox input element
 * @param {boolean} props.value - Current checked state of the checkbox (controlled component)
 * @param {string} [props.label] - Text label to display next to the checkbox
 * @param {string} [props.style] - Visual style variant, use "danger" for error states
 * @param {Function} [props.onChange] - Callback function called when checkbox state changes
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @returns {JSX.Element} Rendered checkbox component
 * @example
 * // Basic checkbox with label
 * <CheckBox
 *   value={isChecked}
 *   label="Accept terms and conditions"
 *   onChange={(checked) => setIsChecked(checked)}
 * />
 * @example
 * // Checkbox with danger/error styling
 * <CheckBox
 *   id="error-checkbox"
 *   value={hasError}
 *   label="This has an error"
 *   style="danger"
 *   onChange={setHasError}
 * />
 * @example
 * // Disabled checkbox
 * <CheckBox
 *   value={readOnlyValue}
 *   label="Read-only option"
 *   disabled={true}
 *   onChange={() => {}} // No-op for disabled state
 * />
 * @example
 * // Checkbox without label (icon only)
 * <CheckBox
 *   id="standalone-checkbox"
 *   value={isSelected}
 *   onChange={handleSelection}
 * />
 */

const CheckBox = ({ id, value = false, label, style, onChange, disabled }) => {
  return (
    <label
      htmlFor={id || label ? `checkbox-${label}` : undefined}
      className={`flex flex-row justify-start items-center gap-2 px-2 h-8  ${
        disabled ? " opacity-50" : ""
      } ${disabled ? "" : "cursor-pointer"} select-none ${
        disabled
          ? "text-light-on-surface dark:text-dark-on-surface"
          : style === "danger"
            ? "text-base text-light-error dark:text-dark-error"
            : "text-base text-light-on-surface dark:text-dark-on-surface"
      }`}
    >
      <div className="flex flex-row relative">
        <input
          type="checkbox"
          id={id || label ? `checkbox-${label}` : undefined}
          checked={value}
          value={id || label}
          className={`appearance-none size-5 rounded-xs
${disabled ? "" : "cursor-pointer"}
${
  value
    ? disabled
      ? "bg-light-on-surface dark:bg-dark-on-surface"
      : style === "danger"
        ? "bg-light-error dark:bg-dark-error"
        : "bg-light-primary dark:bg-dark-primary"
    : `border-2
      ${
        disabled
          ? "border-light-on-surface dark:border-dark-on-surface"
          : style === "danger"
            ? "border-light-error dark:border-dark-error"
            : "border-light-on-surface-variant dark:border-dark-on-surface-variant"
      }`
}`}
          onChange={() => {
            value = !value;
            onChange(value);
          }}
          disabled={disabled}
        />
        {value && (
          /* Material icons 'Check' https://fonts.google.com/icons */
          <svg
            className={`absolute inset-0 pointer-events-none size-5 ${
              disabled
                ? "text-light-surface dark:text-dark-surface"
                : style === "danger"
                  ? "text-light-on-error dark:text-dark-on-error"
                  : "text-light-on-primary dark:text-dark-on-primary"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        )}
      </div>
      {label}
    </label>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string,
  value: PropTypes.bool.isRequired,
  label: PropTypes.string,
  style: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CheckBox;
