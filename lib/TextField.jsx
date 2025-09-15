/**
 * @file A versatile text input field component implementing Material Design 3 text field patterns.
 * Features floating labels, validation states, prefix/suffix elements, and comprehensive theming.
 * @since 1.0.0
 */

import PropTypes from "prop-types";

/**
 * A versatile text input field component implementing Material Design 3 principles
 * with floating labels, validation states, and customizable styling.
 *
 * This component provides a comprehensive text input solution with:
 * - **Floating Label Animation**: Labels smoothly transition above the input when focused or filled
 * - **Validation States**: Built-in error handling with visual feedback and message display
 * - **Prefix/Suffix Elements**: Support for icons, buttons, or other interactive elements
 * - **Multiple Input Types**: text, email, password, number with appropriate validation
 * - **Responsive Design**: Adapts to different screen sizes and device capabilities
 * - **Accessibility**: Proper ARIA attributes, focus management, and screen reader support
 * - **Theme Integration**: Seamless light/dark mode support with Material Design colors
 *
 * The component supports both filled and outlined visual styles, automatic width sizing,
 * and comprehensive state management for focused, filled, error, and disabled states.
 * It includes smooth animations for all state transitions and provides excellent
 * user feedback through visual and text cues.
 *
 * All interactive prefix and suffix elements should use Button components with
 * style="embedded" for consistent theming and behavior within the text field context.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.id] - Unique identifier for the input element. Used for accessibility and form association.
 * @param {('text'|'email'|'password'|'number')} [props.type='text'] - HTML input type that determines input behavior and validation.
 *   - 'text': Standard text input for general content
 *   - 'email': Email input with built-in validation patterns
 *   - 'password': Password input with hidden character display
 *   - 'number': Numeric input with appropriate keyboard on mobile devices
 * @param {string|number} [props.value] - Current value of the input field. This is a controlled component requiring external state management.
 * @param {string} [props.label] - Floating label text that appears above the input when focused or filled.
 *   Provides context and guidance to users about the expected input content.
 * @param {string} [props.message] - Helper text displayed below the input field to provide additional context or guidance.
 *   Appears in secondary text color and is overridden by error messages when present.
 * @param {string} [props.error] - Error message that overrides helper text and applies error styling throughout the component.
 *   When present, the entire field displays in error colors (red variants) for clear feedback.
 * @param {React.ReactNode} [props.prefix] - Element to display at the start of the input field.
 *   Typically contains icons or buttons using Button component with style="embedded" for proper integration.
 *   Examples: search icons, currency symbols, or action buttons.
 * @param {React.ReactNode} [props.suffix] - Element to display at the end of the input field.
 *   Typically contains action buttons, clear buttons, or status indicators using Button component with style="embedded".
 *   Examples: clear button, visibility toggle for passwords, or submission buttons.
 * @param {string} [props.style] - Visual style variant for the text field appearance.
 *   Use "filled" for filled background style with subtle background color.
 *   Default style provides clean outlined appearance.
 * @param {string} [props.width='w-48'] - Tailwind CSS width class controlling the overall field width.
 *   Supports responsive width classes (e.g., 'w-full md:w-96') for adaptive layouts.
 * @param {string} [props.fontFamily='font-sans'] - Tailwind CSS font family class for input text styling.
 *   Should match the application's typography system for consistency.
 * @param {Function} [props.onChange] - Callback function invoked when input value changes.
 *   Receives the new input value as a string parameter for state updates.
 *   Required for controlled component behavior and form validation.
 * @param {boolean} [props.readOnly] - When true, makes the input read-only.
 *   Users can select and copy text but cannot modify the content.
 *   Useful for displaying editable-looking data that shouldn't be changed.
 * @param {boolean} [props.disabled] - When true, completely disables the input field.
 *   Defaults to false. Prevents all user interaction and applies disabled styling with reduced opacity.
 *   Use for fields that are temporarily unavailable or not applicable.
 * @returns {JSX.Element} Rendered text field component with all configured features and styling
 * @since 1.0.0
 * @example
 * // Basic text input with floating label
 * <TextField
 *   id="username"
 *   label="Username"
 *   value={username}
 *   onChange={setUsername}
 * />
 * @example
 * // Email field with validation and helper text
 * <TextField
 *   type="email"
 *   label="Email Address"
 *   message="We'll use this for account recovery"
 *   value={email}
 *   error={emailError}
 *   onChange={setEmail}
 * />
 * @example
 * // Password field with visibility toggle
 * import { SvgVisibility, SvgVisibilityOff } from '../icons';
 * import Button from './Button';
 *
 * <TextField
 *   type={showPassword ? "text" : "password"}
 *   label="Password"
 *   value={password}
 *   suffix={
 *     <Button
 *       style="embedded"
 *       icon={showPassword ? <SvgVisibilityOff /> : <SvgVisibility />}
 *       onClick={() => setShowPassword(!showPassword)}
 *     />
 *   }
 *   onChange={setPassword}
 * />
 * @example
 * // Search field with prefix icon and clear button
 * import { SvgSearch, SvgClose } from '../icons';
 * import Button from './Button';
 *
 * <TextField
 *   label="Search"
 *   value={searchQuery}
 *   prefix={<SvgSearch className="w-5 h-5 text-gray-500" />}
 *   suffix={
 *     searchQuery && (
 *       <Button
 *         style="embedded"
 *         icon={<SvgClose />}
 *         onClick={() => setSearchQuery('')}
 *       />
 *     )
 *   }
 *   width="w-full"
 *   onChange={setSearchQuery}
 * />
 * @example
 * // Filled style numeric input with custom width
 * <TextField
 *   type="number"
 *   style="filled"
 *   label="Price"
 *   prefix={<span className="text-gray-500">$</span>}
 *   value={price}
 *   width="w-32"
 *   onChange={setPrice}
 * />
 */

const TextField = ({
  id,
  type = "text",
  value,
  label,
  message,
  error,
  prefix,
  suffix,
  style,
  width = "w-48",
  fontFamily = "font-sans",
  onChange,
  readonly = false,
  disabled = false,
}) => {
  const isValue = () => value || value === 0;
  const isFilled = () => style === "filled";

  return (
    <div className={`flex flex-col h-[76px] ${width}`}>
      <div
        className={`flex flex-row px-2 items-center
${isFilled() ? "h-14 rounded-t-sm " : "h-12 mt-2 rounded-sm"}
${
  isFilled()
    ? readonly
      ? `border-b-1
        outline-light-outline-variant dark:outline-dark-outline-variant`
      : `border-b-1 focus-within:border-b-2
      ${
        error
          ? "border-light-error dark:border-dark-error"
          : `border-light-on-surface-variant dark:border-dark-on-surface-variant
          focus-within:border-light-primary dark:focus-within:border-dark-primary`
      }`
    : readonly
      ? `outline-1
        outline-light-outline-variant dark:outline-dark-outline-variant`
      : `outline-1 focus-within:outline-2
      ${
        error
          ? "outline-light-error dark:outline-dark-error"
          : `outline-light-outline-variant dark:outline-dark-outline-variant
          focus-within:outline-light-primary dark:focus-within:outline-dark-primary`
      }`
}
${
  isFilled()
    ? disabled
      ? "bg-light-on-surface/10 dark:bg-dark-on-surface/10"
      : "bg-light-surface-container-highest dark:bg-dark-surface-container-highest"
    : "bg-light-surface-container-lowest dark:bg-dark-surface-container-lowest"
}
${
  disabled
    ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
    : error
      ? "text-light-error dark:text-dark-error"
      : "text-light-on-surface-variant dark:text-dark-on-surface-variant"
}`}
      >
        {prefix && (
          <div
            className={`flex size-8
              ${
                disabled
                  ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
                  : "text-light-on-surface-variant dark:text-dark-on-surface-variant"
              }`}
          >
            {prefix}
          </div>
        )}
        <div className="flex flex-col-reverse relative w-full">
          <input
            id={id}
            className={`peer h-6 w-full px-2 outline-0
              ${
                disabled
                  ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
                  : "text-light-on-surface dark:text-dark-on-surface"
              }
              ${isValue() ? " " : " absolute focus:static "}
              ${fontFamily}`}
            type={type}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            readOnly={readonly}
            disabled={disabled}
          />
          <div
            className={`${isValue() ? "hidden" : "peer-focus:hidden"} select-none px-2`}
          >
            {label}
          </div>
          <div
            className={`${isValue() ? "flex" : "hidden peer-focus:flex"} ${
              disabled
                ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
                : readonly
                  ? "text-light-on-surface dark:text-dark-on-surface"
                  : error
                    ? "text-light-error dark:text-dark-error"
                    : "text-light-primary dark:text-dark-primary"
            } select-none text-xs bottom-7 ${
              isFilled()
                ? "px-2"
                : `px-1 absolute
                bg-light-surface-container-lowest dark:bg-dark-surface-container-lowest
                ${prefix ? "-left-7" : "left-1"}`
            }`}
          >
            {label}
          </div>
        </div>
        {suffix && (
          <div
            className={`flex size-8
          ${
            disabled
              ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
              : error
                ? "text-light-error dark:text-dark-error"
                : "text-light-on-surface-variant dark:text-dark-on-surface-variant"
          }`}
          >
            {suffix}
          </div>
        )}
      </div>
      <div
        className={`text-xs px-4 pt-1 h-2 text-nowrap ${
          disabled
            ? "text-light-on-surface/40 dark:text-dark-on-surface/40"
            : error
              ? "text-light-error dark:text-dark-error"
              : ""
        }`}
      >
        {error ? error : message}
      </div>
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf([
    "text",
    "date",
    "month",
    "time",
    "datetime-local",
    "email",
    "tel",
    "url",
    "password",
    "number",
  ]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  style: PropTypes.string,
  width: PropTypes.string.isRequired,
  fontFamily: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TextField;
