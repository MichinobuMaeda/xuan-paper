import { useState, useId, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * An interactive slider component with drag functionality and responsive design.
 * Supports both continuous values (0-1 range) and discrete step values (integer count).
 * Features hover and active states, automatic resize handling, and customizable sizing.
 * @param {object} props - The props object
 * @param {string} [props.id] - Unique identifier for the slider element (auto-generated if not provided)
 * @param {number} [props.value] - Current value of the slider. For continuous mode (count=1): 0-1 range. For discrete mode: 0 to count
 * @param {number} [props.count] - Number of discrete steps. Use 1 for continuous slider, >1 for stepped slider
 * @param {('xs'|'sm'|'md')} [props.size] - Visual size variant affecting track height and thumb size
 * @param {string} [props.width] - Tailwind CSS width class for the slider container
 * @param {Function} [props.onChange] - Callback function called when slider value changes
 * @returns {JSX.Element} Rendered interactive slider component
 * @example
 * // Continuous slider (0-1 range)
 * <Slider
 *   value={volume}
 *   onChange={(newValue) => setVolume(newValue)}
 *   width="w-64"
 *   size="sm"
 * />
 * @example
 * // Discrete step slider (0-10 range)
 * <Slider
 *   id="rating-slider"
 *   value={rating}
 *   count={10}
 *   onChange={(newRating) => setRating(newRating)}
 *   size="md"
 *   width="w-80"
 * />
 * @example
 * // Progress indicator (read-only)
 * <Slider
 *   value={downloadProgress}
 *   size="xs"
 *   width="w-full"
 *   // No onChange = read-only mode
 * />
 * @example
 * // Temperature control with custom sizing
 * <Slider
 *   id="temperature"
 *   value={currentTemp}
 *   count={100}
 *   size="md"
 *   width="w-96"
 *   onChange={(temp) => {
 *     setCurrentTemp(temp);
 *     adjustTemperature(temp);
 *   }}
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
