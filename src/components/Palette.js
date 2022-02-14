import React, { useCallback, useState } from "react";

import { ChromePicker } from "react-color";

import useThrottle from "../utils/useThrottle";

const Palette = ({ chartOpts, setChartOpts }) => {
  const [currentColor, setCurrentColor] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);

  const throttleColors = useThrottle(100);
  const handleChange = useCallback(
    (pickedColor) => {
      setChartOpts({
        ...chartOpts,
        colors: chartOpts.colors.map((color, i) =>
          i !== currentColor ? color : pickedColor.hex
        ),
      });
    },
    [chartOpts, currentColor]
  );

  const handleIncrement = () => {
    if (chartOpts.colorCount < chartOpts.colors.length) {
      setChartOpts({
        ...chartOpts,
        colorCount: chartOpts.colorCount + 1,
      });
    }
  };

  const handleDecrement = () => {
    if (chartOpts.colorCount > 1) {
      setChartOpts({
        ...chartOpts,
        colorCount: chartOpts.colorCount - 1,
      });
    }
  };

  const launchPicker = (i, _) => {
    setPickerOpen(true);
    setCurrentColor(i);
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          disabled={chartOpts.colorCount == 1}
          className="bg-gray-300 text-gray-600 hover:bg-gray-400 w-10 rounded-l cursor-pointer disabled:cursor-not-allowed mr-1 flex items-center"
        >
          <span className="m-auto text-2xl font-light">−</span>
        </button>
        <button
          onClick={handleIncrement}
          disabled={chartOpts.colorCount == chartOpts.colors.length}
          className="bg-gray-300 text-gray-600 hover:bg-gray-400 w-10 rounded-r cursor-pointer disabled:cursor-not-allowed mr-3 flex items-center"
        >
          <span className="m-auto text-2xl font-light">+</span>
        </button>
        {chartOpts.colors
          .filter((_, i) => i < chartOpts.colorCount)
          .map((color, i) => {
            return (
              <div
                className="inline-block border mr-2 p-1 rounded cursor-pointer"
                key={i}
                onClick={(e) => launchPicker(i, e)}
              >
                <div
                  style={{ backgroundColor: color }}
                  className="w-10 h-5 rounded"
                  onChange={(event) => throttleColors(handleChange, event, i)}
                />
              </div>
            );
          })}
      </div>
      {pickerOpen && (
        <div className="absolute z-10">
          <div
            className="fixed inset-0"
            onClick={(_) => setPickerOpen(false)}
          ></div>
          <div
            style={{ marginLeft: `${96 + currentColor * 58}px` }}
            className="mt-3"
          >
            <ChromePicker
              color={chartOpts.colors[currentColor]}
              onChange={(color) => handleChange(color)}
              disableAlpha={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Palette;
