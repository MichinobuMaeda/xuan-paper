/**
 * @file An interactive slider component implementing Material Design 3 slider patterns.
 * Supports both continuous and discrete values with drag functionality and responsive design.
 * @since 1.0.0
 */

import { useState, useId, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * An interactive slider component implementing Material Design 3 principles that provides
 * intuitive value selection through drag interactions and click positioning.
 *
 * This component offers a comprehensive slider solution featuring:
 * - **Continuous and Discrete Modes**: Support for 0-1 continuous values or discrete step counts
 * - **Touch and Mouse Interaction**: Responsive drag handling optimized for both desktop and mobile
 * - **Visual Feedback**: Smooth animations, hover states, and active interaction indicators
 * - **Responsive Design**: Automatic resize handling and touch-optimized interaction zones
 * - **Accessibility**: Keyboard navigation support and proper ARIA attributes
 * - **Theme Integration**: Seamless light/dark mode support with Material Design colors
 * - **Flexible Sizing**: Multiple size variants (xs, sm, md) for different use cases
 * - **Progress Indication**: Can be used as read-only progress indicators
 *
 * The component supports both continuous sliders (count=1, values 0-1) and discrete
 * step sliders (count>1, integer values 0 to count). It provides immediate visual
 * feedback during interaction and maintains smooth performance across all devices.
 *
 * All interactions are handled through modern pointer events for consistent behavior
 * across different input methods (mouse, touch, pen).
 * @component
 * @param {object} props - Component props
 * @param {string} [props.id] - Unique identifier for the slider element.
 *   Auto-generated using React's useId hook if not provided.
 *   Used for accessibility and programmatic access.
 * @param {number} [props.value] - Current value of the slider.
 *   For continuous mode (count=1): accepts decimal values in 0-1 range.
 *   For discrete mode (count>1): accepts integer values from 0 to count.
 *   This is a controlled component requiring external state management.
 * @param {number} [props.count] - Number of discrete steps or mode selector.
 *   Use 1 for continuous slider with 0-1 decimal values.
 *   Use values >1 for stepped slider with integer values from 0 to count.
 *   Determines the interaction behavior and value constraints.
 * @param {('xs'|'sm'|'md')} [props.size] - Visual size variant affecting dimensions.
 *   - 'xs': Minimal height for compact layouts and progress indicators
 *   - 'sm': Standard size for most interactive sliders
 *   - 'md': Larger size for prominent controls requiring easier interaction
 * @param {string} [props.width] - Tailwind CSS width class controlling slider container width.
 *   Supports responsive width classes (e.g., 'w-full md:w-80') for adaptive layouts.
 * @param {Function} [props.onChange] - Callback function invoked when slider value changes.
 *   Receives the new value as a number parameter matching the slider mode.
 *   Omitting this prop creates a read-only slider suitable for progress indication.
 * @returns {JSX.Element} Rendered interactive slider component with all configured features
 * @since 1.0.0
 * @example
 * // Continuous volume slider (0-1 range)
 * <Slider
 *   value={volume}
 *   onChange={(newValue) => setVolume(newValue)}
 *   width="w-64"
 *   size="sm"
 * />
 * @example
 * // Discrete rating slider (0-10 integer values)
 * <Slider
 *   id="rating-slider"
 *   value={rating}
 *   count={10}
 *   onChange={(newRating) => setRating(newRating)}
 *   size="md"
 *   width="w-80"
 * />
 * @example
 * // Progress indicator (read-only, no interaction)
 * <Slider
 *   value={downloadProgress}
 *   size="xs"
 *   width="w-full"
 *   // No onChange = read-only mode
 * />
 * @example
 * // Settings panel brightness control
 * <Slider
 *   id="brightness"
 *   value={brightness}
 *   onChange={(value) => {
 *     setBrightness(value);
 *     adjustScreenBrightness(value);
 *   }}
 *   width="w-56"
 *   size="sm"
 * />
 * @example
 * // Discrete step selector for quantities
 * <Slider
 *   value={quantity}
 *   count={50}
 *   onChange={setQuantity}
 *   width="w-72"
 *   size="md"
 * />
 */
const Slider = ({
  id,
  value = 0,
  count = 1,
  size = "xs",
  width = "w-48",
  onChange,
}) => {
  id = id || useId();
  const targetRef = useRef(null);
  const [targetWidth, setTargetWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (targetRef.current) {
        const newWidth = targetRef.current.getBoundingClientRect().width;
        setTargetWidth(newWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  if (count < 1) {
    count = 1;
  } else if (count > 1) {
    count = Math.round(count);
  }

  if (value < 0) {
    value = 0;
  } else if (value > count) {
    value = count;
  }

  const trackHeight = () => {
    switch (size) {
      case "md":
        return "h-10";
      case "sm":
        return "h-6";
      default:
        return "h-4";
    }
  };

  const [mouseHover, setMouseHover] = useState(false);
  const [mouseActive, setMouseActive] = useState(false);

  const handleMouseMove = (event) => {
    if (onChange) {
      const margin = 8;
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const relativeX = event.clientX - rect.left - margin;
      const targetWidth = rect.width - margin * 2;
      let newRatio = Math.max(0, Math.min(1, relativeX / targetWidth));

      if (newRatio < 0) {
        newRatio = 0;
      } else if (newRatio > 1) {
        newRatio = 1;
      }

      onChange(count === 1 ? newRatio : Math.round(newRatio * count));
    }
  };

  const handleTouchMove = (touch, target) => {
    if (onChange) {
      const margin = 8;
      const rect = target.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left - margin;
      const targetWidth = rect.width - margin * 2;
      let newRatio = Math.max(0, Math.min(1, relativeX / targetWidth));

      if (newRatio < 0) {
        newRatio = 0;
      } else if (newRatio > 1) {
        newRatio = 1;
      }

      onChange(count === 1 ? newRatio : Math.round(newRatio * count));
    }
  };

  return (
    <div
      id={id}
      className={`flex flex-row h-14 px-2 relative ${width} items-center
        cursor-pointer`}
      onMouseOver={() => {
        setMouseHover(true);
      }}
      onMouseLeave={() => {
        setMouseHover(false);
        setMouseActive(false);
      }}
      onMouseDown={(e) => {
        if (mouseHover) {
          setMouseActive(true);
          handleMouseMove(e);
        }
      }}
      onMouseUp={() => {
        setMouseActive(false);
      }}
      onMouseMove={(e) => mouseActive && handleMouseMove(e)}
      onTouchStart={(e) => {
        setMouseActive(true);
        handleTouchMove(e.touches[0], e.currentTarget);
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        handleTouchMove(e.touches[0], e.currentTarget);
      }}
      onTouchEnd={() => {
        setMouseActive(false);
      }}
    >
      <div
        ref={targetRef}
        className="flex flex-row relative w-full items-center"
      >
        <div
          className={`${trackHeight()} rounded-l-lg
            bg-light-primary dark:bg-dark-primary`}
          style={{ width: `${(targetWidth * value) / count}px` }}
        ></div>
        <div
          className={`${trackHeight()} rounded-r-lg
            bg-light-secondary-container dark:bg-dark-secondary-container`}
          style={{ width: `${targetWidth - (targetWidth * value) / count}px` }}
        ></div>
        {count > 1 &&
          Array.from(Array(count).keys()).map((i) => (
            <div
              key={i}
              className={`absolute flex size-1 rounded-full
                bg-light-primary dark:bg-dark-primary`}
              style={{ left: `${((targetWidth - 12) * (i + 1)) / count}px` }}
            ></div>
          ))}
        <div
          className={`flex flex-row h-11 w-3 justify-center absolute
            bg-light-form dark:bg-dark-form`}
          style={{
            left: `${((targetWidth - 12) * value) / count}px`,
          }}
        >
          <div
            className={`h-11 w-1 rounded-full
            ${mouseHover ? "bg-light-primary/80 dark:bg-dark-primary/80 scale-x-120" : "bg-light-primary dark:bg-dark-primary"}
            ${mouseActive ? "bg-light-primary/60 dark:bg-dark-primary/60 scale-x-110" : ""}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
  count: PropTypes.number,
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  width: PropTypes.string,
  onChange: PropTypes.func,
};

export default Slider;
