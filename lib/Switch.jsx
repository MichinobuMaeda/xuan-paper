/**
 * @file A toggle switch component implementing Material Design 3 switch patterns.
 * Provides an intuitive on/off control interface with smooth animations and theming.
 * @since 1.0.0
 */

import PropTypes from "prop-types";

/**
 * A toggle switch component implementing Material Design 3 principles that provides
 * an intuitive on/off control interface with smooth visual transitions.
 *
 * This component offers a complete switch solution featuring:
 * - **Material Design 3 Styling**: Authentic visual appearance with proper track and thumb proportions
 * - **Smooth Animations**: Fluid transitions for thumb movement and color changes
 * - **Visual Indicators**: Checkmark icon appears when switch is in enabled state
 * - **State Feedback**: Clear visual distinction between on/off states with color coding
 * - **Theme Integration**: Seamless light/dark mode support with Material Design colors
 * - **Accessibility**: Full keyboard navigation support and screen reader compatibility
 * - **Touch Optimization**: Appropriate touch target size for mobile interaction
 * - **Disabled States**: Proper visual feedback for non-interactive switches
 *
 * The switch follows controlled component patterns, requiring external state management.
 * It provides immediate visual feedback during state transitions and maintains consistent
 * behavior across different platforms and browsers.
 *
 * Commonly used for settings, preferences, feature toggles, and any binary choice
 * where immediate feedback is important to the user experience.
 * @component
 * @param {object} props - Component props
 * @param {string} [props.id] - Unique identifier for the switch input element.
 *   Used for accessibility, form association, and programmatic access.
 *   Enables proper keyboard navigation and screen reader support.
 * @param {boolean} props.value - Current state of the switch.
 *   True indicates enabled/on state, false indicates disabled/off state.
 *   This is a controlled component requiring external state management.
 * @param {Function} [props.onChange] - Callback function invoked when switch state changes.
 *   Receives the new state as a boolean parameter for state updates.
 *   Required for controlled component behavior and user interaction.
 * @param {boolean} [props.disabled=false] - When true, disables switch interaction.
 *   Applies disabled styling with reduced opacity and prevents all user interaction.
 *   Use for switches that are temporarily unavailable or not applicable.
 * @returns {JSX.Element} Rendered switch component with all configured features and styling
 * @since 1.0.0
 * @example
 * // Basic switch for notifications
 * <Switch
 *   id="notifications"
 *   value={notificationsEnabled}
 *   onChange={(enabled) => setNotificationsEnabled(enabled)}
 * />
 * @example
 * // Switch with disabled state for premium features
 * <Switch
 *   id="premium-feature"
 *   value={premiumEnabled}
 *   onChange={setPremiumEnabled}
 *   disabled={!isPremiumUser}
 * />
 * @example
 * // Dark mode toggle switch with theme application
 * <Switch
 *   id="dark-mode"
 *   value={isDarkMode}
 *   onChange={(enabled) => {
 *     setIsDarkMode(enabled);
 *     document.documentElement.classList.toggle('dark', enabled);
 *   }}
 * />
 * @example
 * // Settings panel with multiple switches
 * const [settings, setSettings] = useState({
 *   notifications: true,
 *   autoSave: false,
 *   syncData: true
 * });
 *
 * <Switch
 *   id="auto-save"
 *   value={settings.autoSave}
 *   onChange={(enabled) =>
 *     setSettings(prev => ({ ...prev, autoSave: enabled }))
 *   }
 * />
 * @example
 * // Switch with form integration and validation
 * <Switch
 *   id="terms-agreement"
 *   value={agreedToTerms}
 *   disabled={formSubmitting}
 *   onChange={setAgreedToTerms}
 * />
 */

const Switch = ({ id, value = false, onChange, disabled }) => {
  return (
    <div className="flex flex-row relative">
      <input
        type="checkbox"
        id={id}
        checked={value}
        value={id}
        className={`appearance-none h-8 w-14 rounded-full transition-all duration-200
${disabled ? "" : "cursor-pointer"}
${
  value
    ? disabled
      ? "opacity-50 bg-light-on-surface dark:bg-dark-on-surface"
      : `bg-light-primary dark:bg-dark-primary
         hover:bg-light-primary/90 dark:hover:bg-dark-primary/90
         active:bg-light-primary/80 dark:active:bg-dark-primary/80`
    : `border-2
      ${
        disabled
          ? `opacity-50 bg-light-on-surface dark:bg-dark-on-surface
            border-light-on-surface dark:border-dark-on-surface`
          : `bg-light-surface-container-highest dark:bg-dark-surface-container-highest
            border-light-outline dark:border-dark-outline
            hover:bg-light-surface-container-high dark:hover:bg-dark-surface-container-high
            hover:border-light-outline/80 dark:hover:border-dark-outline/80
            active:bg-light-surface-container dark:active:bg-dark-surface-container`
      }`
}`}
        onChange={() => {
          value = !value;
          onChange(value);
        }}
        disabled={disabled}
      />
      {value ? (
        /* Material icons 'Check' https://fonts.google.com/icons */
        <svg
          className={`absolute inset-x-7 inset-y-1 size-6 rounded-full
      pointer-events-none transition-all duration-200
      ${
        disabled
          ? `opacity-50 bg-light-surface dark:bg-dark-surface
            text-light-on-surface dark:text-dark-on-surface`
          : `bg-light-on-primary dark:bg-dark-on-primary
            text-light-on-primary-container dark:text-dark-on-primary-container`
      }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      ) : (
        <div
          className={`absolute inset-2 size-4 rounded-full
            pointer-events-none transition-all duration-200
            ${
              disabled
                ? "opacity-50 bg-light-on-surface dark:bg-dark-on-surface"
                : `bg-light-outline dark:bg-dark-outline
                   group-hover:bg-light-outline/80 dark:group-hover:bg-dark-outline/80`
            }`}
        ></div>
      )}
    </div>
  );
};

Switch.propTypes = {
  id: PropTypes.string,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Switch;
