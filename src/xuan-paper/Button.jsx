import PropTypes from "prop-types";

/**
 * A versatile button component with multiple styles, sizes, and configurations.
 * Supports icons, different visual styles, and responsive design
 * with light/dark theme support.
 *
 * @param {Object} props - The props object
 * @param {string} [props.id] - Unique identifier for the button element
 * @param {React.ReactNode} [props.icon]
 *  - Icon element to display alongside or instead of label
 * @param {string} [props.label] - Text content to display in the button
 * @param {('filled'|'tonal'|'outlined'|'elevated'|'text'|'danger'|'error'|'embed')}
 *  [props.style='filled'] - Visual style variant of the button
 * @param {Function} [props.onClick] - Click event handler function
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.rounded='rounded-full']
 *  - Tailwind CSS class for border radius
 * @param {('xs'|'sm'|'md')} [props.size='sm'] - Size variant of the button
 * @param {string} [props.width='w-fit'] - Tailwind CSS class for button width
 * @returns {JSX.Element} Rendered button component
 *
 * @example
 * // Basic filled button
 * <Button label="Click Me" onClick={() => console.log('clicked')} />
 *
 * @example
 * // Icon button with custom styling
 * <Button
 *   icon={<SomeIcon />}
 *   style="outlined"
 *   size="md"
 *   rounded="rounded-lg"
 * />
 *
 * @example
 * // Danger button with label
 * <Button
 *   label="Delete"
 *   style="danger"
 *   onClick={handleDelete}
 *   disabled={isLoading}
 * />
 */
function Button({
  id,
  icon,
  label,
  style = "filled",
  onClick = () => null,
  disabled = false,
  rounded = "rounded-full",
  size = "sm",
  width = "w-fit",
}) {
  if (style === "embed") {
    size = "xs";
  }
  return (
    <button
      id={id}
      className={`flex flex-row justify-center items-center gap-2
${(() => {
  switch (size) {
    case "xs":
      return label ? `${width} h-8 px-3` : "size-8";
    case "md":
      return label ? `${width} h-14 px-6` : "size-14";
    default:
      return label ? `${width} h-10 px-4` : "size-10";
  }
})()}
${rounded}
text-base
${
  disabled
    ? `opacity-50 text-light-on-surface dark:text-dark-on-surface
      ${
        style === "text" ? "" : "bg-light-surface-dim dark:bg-dark-surface-dim"
      }`
    : (() => {
        switch (style) {
          case "tonal":
            return `bg-light-secondary-container dark:bg-dark-secondary-container
              text-light-on-secondary-container dark:text-dark-on-secondary-container`;
          case "outlined":
            return `outline-1
              bg-light-form dark:bg-dark-form
              outline-light-outline-variant dark:outline-dark-outline-variant`;
          case "elevated":
            return `text-light-primary dark:text-dark-primary
              bg-light-surface-container-low dark:bg-dark-surface-container-low
              shadow-2xs shadow-light-shadow dark:shadow-dark-shadow`;
          case "text":
            return "text-light-primary dark:text-dark-primary";
          case "danger":
          case "error":
            return `bg-light-error dark:bg-dark-error
              text-light-on-error dark:text-dark-on-error`;
          case "embed":
            return "";
          default:
            return `bg-light-primary dark:bg-dark-primary
               text-light-on-primary dark:text-dark-on-primary`;
        }
      })()
}
      }`}
      onClick={disabled ? () => {} : onClick}
      disabled={disabled}
    >
      {icon && <div className="size-6">{icon}</div>}
      {label}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  style: PropTypes.oneOf([
    "filled",
    "tonal",
    "outlined",
    "elevated",
    "text",
    "danger",
    "error",
    "embed",
  ]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  rounded: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  width: PropTypes.string,
};

export default Button;
