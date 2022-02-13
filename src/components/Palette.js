import React, { useCallback } from "react";
import useThrottle from "../utils/useThrottle";

const Palette = ({ chartOpts, setChartOpts }) => {
  const throttleColors = useThrottle(100);
  const handleChange = useCallback(
    (event, id) => {
      setChartOpts({
        ...chartOpts,
        colors: chartOpts.colors.map((color, i) =>
          i !== id ? color : event.target.value
        ),
      });
    },
    [chartOpts]
  );

  return (
    <div>
      <form name="palette">
        {chartOpts.colors.map((color, i) => {
          return (
            <input
              key={i}
              type="color"
              value={color}
              onChange={(event) => throttleColors(handleChange, event, i)}
            />
          );
        })}
      </form>
    </div>
  );
};

export default Palette;
