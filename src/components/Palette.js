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

  const handleIncrement = (event) => {
    if (chartOpts.colorCount < chartOpts.colors.length) {
      setChartOpts({
        ...chartOpts,
        colorCount: chartOpts.colorCount + 1,
      });
    }
  };

  const handleDecrement = (event) => {
    if (chartOpts.colorCount > 1) {
      setChartOpts({
        ...chartOpts,
        colorCount: chartOpts.colorCount - 1,
      });
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={handleDecrement}
          disabled={chartOpts.colorCount == 1}
          className="bg-gray-300 text-gray-600 hover:bg-gray-400 w-10 rounded-l cursor-pointer disabled:cursor-not-allowed mr-1"
        >
          <span className="m-auto text-2xl font-light">−</span>
        </button>
        <button
          onClick={handleIncrement}
          disabled={chartOpts.colorCount == chartOpts.colors.length}
          className="bg-gray-300 text-gray-600 hover:bg-gray-400 w-10 rounded-r cursor-pointer disabled:cursor-not-allowed mr-3"
        >
          <span className="m-auto text-2xl font-light">+</span>
        </button>
        {chartOpts.colors
          .filter((_, i) => i < chartOpts.colorCount)
          .map((color, i) => {
            return (
              <input
                className="mr-2 cursor-pointer"
                key={i}
                type="color"
                value={color}
                onChange={(event) => throttleColors(handleChange, event, i)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Palette;
