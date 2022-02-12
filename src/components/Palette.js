import React, { useCallback } from "react";
import useThrottle from "../utils/useThrottle";

const Palette = ({ colors, setColors }) => {
  const throttleColors = useThrottle(100);
  const handleChange = useCallback(
    (event, id) => {
      setColors(
        colors.map((color, i) => (i !== id ? color : event.target.value))
      );
    },
    [colors]
  );

  return (
    <div>
      <form name="palette">
        {colors.map((color, i) => {
          return (
            <input
              key={i}
              type="color"
              value={color}
              onChange={(event) => throttleColors(handleChange, event, i)}
            />
          );
        })}
        <label htmlFor="palette"> Color Palette</label>
      </form>
    </div>
  );
};

export default Palette;
