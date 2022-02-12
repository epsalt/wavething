import { max } from "d3-array";
import { select } from "d3-selection";
import { scaleLinear, scaleSequential } from "d3-scale";
import { interpolateRgb, piecewise } from "d3-interpolate";
import React, { useEffect } from "react";

const Waveform = ({ audioData, chartOpts, svgRef }) => {
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    if (!audioData) {
      return;
    }

    const waveform = audioData.resample({ width: 512 * chartOpts.barWidth });
    const channel = waveform.channel(0);
    const minChannel = channel.min_array();
    const maxChannel = channel.max_array();
    const amplitude = maxChannel.map((d, i) => Math.max(d - minChannel[i], 1));

    const width = chartOpts.ratio * 500;
    const height = 500;

    const step = width / amplitude.length;
    const padding = step * chartOpts.barSpacing;
    const bandwidth = step - padding;

    const x = scaleLinear().domain([0, amplitude.length]).range([0, width]);

    const y = scaleLinear()
      .domain([-max(amplitude), max(amplitude)])
      .range([height / 2, -height / 2]);

    const interpolate = piecewise(interpolateRgb.gamma(2.2), chartOpts.colors);

    const vcolor = scaleSequential()
      .domain([0, max(amplitude)])
      .interpolator(interpolate);

    const hcolor = scaleSequential()
      .domain([0, amplitude.length])
      .interpolator(interpolate);

    svg.attr("width", width).attr("height", height);

    svg
      .append("g")
      .attr("transform", () => `translate(0, ${height / 2})`)
      .attr("stroke", "none")
      .selectAll("rect")
      .data(amplitude)
      .join("rect")
      .attr("x", (_, i) => x(i))
      .attr("y", (d) => y(d))
      .attr("rx", (d) => -y(d) * chartOpts.barRounding)
      .attr("height", (d) => -y(d) * 2)
      .attr("width", bandwidth)
      .attr("fill", (d, i) =>
        chartOpts.colorType === "vt" ? vcolor(d) : hcolor(i)
      );
  }, [audioData, chartOpts]);

  return <svg ref={svgRef} />;
};

export default Waveform;
