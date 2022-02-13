import React, { useEffect } from "react";

import { max } from "d3-array";
import { select } from "d3-selection";
import { scaleLinear, scaleRadial, scaleSequential } from "d3-scale";
import { arc } from "d3-shape";
import { interpolateRgb, piecewise } from "d3-interpolate";

import scaleChartOpts from "../utils/scaleChartOpts";

const RadialWaveform = ({ audioData, chartOpts, svgRef }) => {
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    if (!audioData) {
      return;
    }

    const opts = scaleChartOpts(chartOpts);

    const waveform = audioData.resample({ width: 512 * opts.barWidth });
    const channel = waveform.channel(0);
    const minChannel = channel.min_array();
    const maxChannel = channel.max_array();
    const amplitude = maxChannel.map((d, i) => Math.max(d - minChannel[i], 1));

    const width = 500;
    const height = 500;

    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius * opts.radius;

    const step = (Math.PI * 2) / amplitude.length;
    const padding = step * opts.barSpacing;

    const x = scaleLinear()
      .domain([0, amplitude.length])
      .range([0, 2 * Math.PI]);

    const y = scaleRadial()
      .domain([0, max(amplitude)])
      .range([innerRadius, outerRadius]);

    const interpolate = piecewise(
      interpolateRgb.gamma(2.2),
      opts.colors.filter((_, i) => i < opts.colorCount)
    );

    let vcolor;
    let hcolor;
    if (opts.colorCount > 1) {
      vcolor = scaleSequential()
        .domain([0, max(amplitude)])
        .interpolator(interpolate);

      hcolor = scaleSequential()
        .domain([0, amplitude.length])
        .interpolator(interpolate);
    } else {
      vcolor = (_) => opts.colors[0];
      hcolor = vcolor;
    }

    svg.attr("width", width).attr("height", height);

    const arcPath = arc()
      .innerRadius(innerRadius)
      .outerRadius((d) => y(d))
      .startAngle((_, i) => x(i))
      .endAngle((_, i) => x(i) + step)
      .padAngle(padding)
      .padRadius(innerRadius)
      .cornerRadius((d) => y(d) * step * opts.barRounding);

    svg
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
      .attr("transform", "rotate(" + opts.rotate + ")")
      .append("g")
      .attr("stroke", "none")
      .selectAll("path")
      .data(amplitude)
      .join("path")
      .attr("d", arcPath)
      .attr("fill", (d, i) =>
        opts.colorType === "vt" ? vcolor(d) : hcolor(i)
      );
  }, [audioData, chartOpts]);

  return <svg ref={svgRef} />;
};

export default RadialWaveform;
