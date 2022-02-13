import { scaleLinear } from "d3-scale";

const scaleChartOpts = (chartOpts) => {
  return {
    ...chartOpts,
    barWidth: scaleLinear().domain([1, 20]).range([0.1, 1])(
      parseFloat(chartOpts.barWidth)
    ),
    barSpacing: scaleLinear().domain([1, 20]).range([-0.1, 0.9])(
      parseFloat(chartOpts.barSpacing)
    ),
    barRounding: scaleLinear().domain([1, 20]).range([0, 0.5])(
      parseFloat(chartOpts.barRounding)
    ),
    radius: scaleLinear().domain([1, 20]).range([0, 0.9])(
      parseFloat(chartOpts.radius)
    ),
    rotate: scaleLinear().domain([1, 20]).range([0, 360])(
      parseFloat(chartOpts.rotate)
    ),
    ratio: parseFloat(chartOpts.ratio),
  };
};

export default scaleChartOpts;
