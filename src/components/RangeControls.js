import React from "react";

const GeneralRanges = ({ chartOpts, setChartOpts }) => (
  <>
    <div className="flex flex-wrap-reverse mb-3">
      <input
        className="mr-3 w-64"
        name="width"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.barWidth}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barWidth: parseInt(event.target.value),
          })
        }
      />
      <label htmlFor="width" className="sm:basis-auto basis-full">
        Bar Count <span className="text-gray-500"> - {chartOpts.barWidth}</span>
      </label>
    </div>
    <div className="flex flex-wrap-reverse mb-3">
      <input
        className="mr-3 w-64"
        name="spacing"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.barSpacing}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barSpacing: parseInt(event.target.value),
          })
        }
      />
      <label htmlFor="spacing" className="sm:basis-auto basis-full">
        Bar Spacing{" "}
        <span className="text-gray-500"> - {chartOpts.barSpacing}</span>
      </label>
    </div>
    <div className="flex flex-wrap-reverse mb-3">
      <input
        className="mr-3 w-64"
        name="rounding"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.barRounding}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            barRounding: parseInt(event.target.value),
          })
        }
      />
      <label htmlFor="rounding" className="sm:basis-auto basis-full">
        Bar Rounding{" "}
        <span className="text-gray-500"> - {chartOpts.barRounding}</span>
      </label>
    </div>
  </>
);

const LinearRanges = ({ chartOpts, setChartOpts }) => (
  <div className="flex flex-wrap-reverse mb-3">
    <input
      className="mr-3 w-64"
      name="ratio"
      type="range"
      min="0.025"
      max="1"
      step="0.025"
      value={chartOpts.ratio}
      onChange={(event) =>
        setChartOpts({
          ...chartOpts,
          ratio: parseFloat(event.target.value),
        })
      }
    />
    <label htmlFor="ratio" className="sm:basis-auto basis-full">
      Aspect Ratio <span className="text-gray-500"> - {chartOpts.ratio}</span>
    </label>
  </div>
);

const RadialRanges = ({ chartOpts, setChartOpts }) => (
  <>
    <div className="flex flex-wrap-reverse mb-3">
      <input
        className="mr-3 w-64"
        name="radius"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.radius}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            radius: parseInt(event.target.value),
          })
        }
      />
      <label htmlFor="radius" className="sm:basis-auto basis-full">
        Radius <span className="text-gray-500"> - {chartOpts.radius}</span>
      </label>
    </div>
    <div className="flex flex-wrap-reverse mb-3">
      <input
        className="mr-3 w-64"
        name="rotate"
        type="range"
        min="1"
        max="20"
        step="1"
        value={chartOpts.rotate}
        onChange={(event) =>
          setChartOpts({
            ...chartOpts,
            rotate: parseInt(event.target.value),
          })
        }
      />
      <label htmlFor="rotate" className="sm:basis-auto basis-full">
        Rotate <span className="text-gray-500"> - {chartOpts.rotate}</span>
      </label>
    </div>
  </>
);

export { GeneralRanges, LinearRanges, RadialRanges };
