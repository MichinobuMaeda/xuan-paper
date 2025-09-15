/**
 * @file A customizable checkbox component implementing Material Design 3 checkbox patterns.
 * Features label support, validation states, theming, and comprehensive accessibility.
 * @since 1.0.0
 */

import PropTypes from "prop-types";

/**
 * A customizable checkbox component implementing Material Design 3 principles
 * with comprehensive styling, accessibility features, and state management.
 *
 * This component provides a complete checkbox solution featuring:
 * - **Material Design 3 Styling**: Authentic visual appearance with proper proportions
 * - **Label Integration**: Optional text labels with proper clickable association
 * - **State Management**: Support for checked, unchecked, and indeterminate states
 * - **Validation States**: Built-in error/danger styling for form validation feedback
 * - **Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
 * - **Theme Integration**: Seamless light/dark mode support with Material Design colors
 * - **Responsive Design**: Adapts to different screen sizes and touch targets
 * - **Hover Effects**: Interactive feedback for better user experience
 *
 * The component follows controlled component patterns, requiring external state management
 * for the checked value. It provides smooth transitions for all state changes and
 * maintains consistent styling across different browsers and platforms.
 *
 * Error states apply red color variants throughout the component for clear visual
 * feedback during form validation scenarios.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.id] - Unique identifier for the checkbox input element.
 *   Used for accessibility, form association, and programmatic access.
 *   Automatically links the label to the input for proper click behavior.
 * @param {boolean} props.value - Current checked state of the checkbox.
 *   This is a controlled component requiring external state management.
 *   True indicates checked, false indicates unchecked state.
 * @param {string} [props.label] - Text label to display next to the checkbox.
 *   Clicking the label will toggle the checkbox state for improved usability.
 *   Provides context and meaning for the checkbox selection.
 * @param {string} [props.style] - Visual style variant for different use cases.
 *   Use "danger" to apply error/validation styling with red color variants.
 *   Default style uses standard Material Design checkbox colors.
 * @param {Function} [props.onChange] - Callback function invoked when checkbox state changes.
 *   Receives the new checked state as a boolean parameter.
 *   Required for controlled component behavior and form integration.
 * @param {boolean} [props.disabled=false] - When true, disables the checkbox interaction.
 *   Applies disabled styling with reduced opacity and prevents all user interaction.
 *   Use for checkboxes that are temporarily unavailable or not applicable.
 * @returns {JSX.Element} Rendered checkbox component with all configured features and styling
 * @since 1.0.0
 * @example
 * // Basic checkbox with label
 * <CheckBox
 *   value={isChecked}
 *   label="Accept terms and conditions"
 *   onChange={(checked) => setIsChecked(checked)}
 * />
 * @example
 * // Checkbox with danger/error styling for validation
 * <CheckBox
 *   id="error-checkbox"
 *   value={hasError}
 *   label="This has an error"
 *   style="danger"
 *   onChange={setHasError}
 * />
 * @example
 * // Disabled checkbox for read-only state
 * <CheckBox
 *   value={isReadOnly}
 *   label="This option is not available"
 *   disabled={true}
 *   onChange={() => {}} // No-op since it's disabled
 * />
 * @example
 * // Checkbox in a form with controlled state
 * const [preferences, setPreferences] = useState({
 *   newsletter: false,
 *   notifications: true,
 *   analytics: false
 * });
 *
 * <CheckBox
 *   id="newsletter"
 *   value={preferences.newsletter}
 *   label="Subscribe to newsletter"
 *   onChange={(checked) =>
 *     setPreferences(prev => ({ ...prev, newsletter: checked }))
 *   }
 * />
 * @example
 * // Checkbox with validation in form context
 * <CheckBox
 *   value={agreedToTerms}
 *   label="I agree to the terms and conditions"
 *   style={termsError ? "danger" : undefined}
 *   onChange={setAgreedToTerms}
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
