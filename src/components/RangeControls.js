import React from "react";

const GeneralRanges = ({ chartOpts, setChartOpts }) => (
  <>
    <div>
      <input
        name="width"
        type="range"
        min="0.1"
        max="1"
        step="0.1"
        value={chartOpts.barWidth}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barWidth: parseFloat(event.target.value),
          })
        }
      />
      <label htmlFor="width">Bar Width</label>
    </div>
    <div>
      <input
        name="spacing"
        type="range"
        min="-0.2"
        max="0.9"
        step="0.1"
        value={chartOpts.barSpacing}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barSpacing: parseFloat(event.target.value),
          })
        }
      />
      <label htmlFor="spacing">Bar Spacing</label>
    </div>
    <div>
      <input
        name="rounding"
        type="range"
        min="0"
        max="0.5"
        step="0.01"
        value={chartOpts.barRounding}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barRounding: parseFloat(event.target.value),
          })
        }
      />
      <label htmlFor="rounding">Bar Rounding</label>
    </div>
  </>
);

const LinearRanges = ({ chartOpts, setChartOpts }) => (
  <div>
    <input
      name="ratio"
      type="range"
      min="0.1"
      max="5"
      step="0.25"
      value={chartOpts.ratio}
      onChange={(event) =>
        setChartOpts({
          ...chartOpts,
          ratio: parseFloat(event.target.value),
        })
      }
    />
    <label htmlFor="ratio"> Aspect Ratio</label>
  </div>
);

const RadialRanges = ({ chartOpts, setChartOpts }) => (
  <>
    <div>
      <input
        name="radius"
        type="range"
        min="0"
        max="0.9"
        step="0.05"
        value={chartOpts.radius}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            radius: parseFloat(event.target.value),
          })
        }
      />
      <label htmlFor="radius"> Radius</label>
    </div>
    <div>
      <input
        name="rotate"
        type="range"
        min="0"
        max="360"
        step="5"
        value={chartOpts.rotate}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            rotate: event.target.value,
          })
        }
      />
      <label htmlFor="rotate"> Rotate</label>
    </div>
  </>
);

export { GeneralRanges, LinearRanges, RadialRanges };
