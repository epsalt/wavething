import React from "react";

const GeneralRanges = ({ chartOpts, setChartOpts }) => (
  <>
    <div>
      <input
        className="mb-3 mr-3 w-64"
        name="width"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.barWidth}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barWidth: event.target.value,
          })
        }
      />
      <label htmlFor="width">
        Bar Width <span className="text-gray-500"> - {chartOpts.barWidth}</span>
      </label>
    </div>
    <div>
      <input
        className="mb-3 mr-3 w-64"
        name="spacing"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.barSpacing}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barSpacing: event.target.value,
          })
        }
      />
      <label htmlFor="spacing">
        Bar Spacing{" "}
        <span className="text-gray-500"> - {chartOpts.barSpacing}</span>
      </label>
    </div>
    <div>
      <input
        className="mb-3 mr-3 w-64"
        name="rounding"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.barRounding}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barRounding: event.target.value,
          })
        }
      />
      <label htmlFor="rounding">
        Bar Rounding{" "}
        <span className="text-gray-500"> - {chartOpts.barRounding}</span>
      </label>
    </div>
  </>
);

const LinearRanges = ({ chartOpts, setChartOpts }) => (
  <div>
    <input
      className="mb-3 mr-3 w-64"
      name="ratio"
      type="range"
      min="0.025"
      max="1"
      step="0.025"
      value={chartOpts.ratio}
      onChange={(event) =>
        setChartOpts({
          ...chartOpts,
          ratio: event.target.value,
        })
      }
    />
    <label htmlFor="ratio">
      Aspect Ratio <span className="text-gray-500"> - {chartOpts.ratio}</span>
    </label>
  </div>
);

const RadialRanges = ({ chartOpts, setChartOpts }) => (
  <>
    <div>
      <input
        className="mb-3 mr-3 w-64"
        name="radius"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.radius}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            radius: event.target.value,
          })
        }
      />
      <label htmlFor="radius">
        Radius <span className="text-gray-500"> - {chartOpts.radius}</span>
      </label>
    </div>
    <div>
      <input
        className="mb-3 mr-3 w-64"
        name="rotate"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.rotate}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            rotate: event.target.value,
          })
        }
      />
      <label htmlFor="rotate">
        Rotate <span className="text-gray-500"> - {chartOpts.rotate}</span>
      </label>
    </div>
  </>
);

export { GeneralRanges, LinearRanges, RadialRanges };
