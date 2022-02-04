import { max } from "d3-array";
import { select } from "d3-selection";
import { scaleLinear, scaleQuantize, scaleSequential } from "d3-scale";
import { interpolateRgb, piecewise } from "d3-interpolate";
import React, { useEffect } from "react";

const Waveform = ({
  audioData,
  barSpacing,
  barWidth,
  barRounding,
  ratio,
  colors,
  colorType,
  svgRef,
}) => {
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    if (!audioData) {
      return;
    }

    const waveform = audioData.resample({ width: 512 * barWidth });
    const channel = waveform.channel(0);
    const minChannel = channel.min_array();
    const maxChannel = channel.max_array();
    const amplitude = maxChannel.map((d, i) => Math.max(d - minChannel[i], 1));

    const width = ratio * 500;
    const height = 500;

    const step = width / amplitude.length;
    const padding = step * barSpacing;
    const bandwidth = step - padding;

    const x = scaleLinear().domain([0, amplitude.length]).range([0, width]);

    const y = scaleLinear()
      .domain([-max(amplitude), max(amplitude)])
      .range([height / 2, -height / 2]);

    const vcolor = scaleQuantize()
      .domain([0, max(amplitude)])
      .range(colors);

    const interpolate = piecewise(interpolateRgb.gamma(2.2), colors);
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
      .attr("rx", (d) => -y(d) * barRounding)
      .attr("height", (d) => -y(d) * 2)
      .attr("width", bandwidth)
      .attr("fill", (d, i) => (colorType === "vt" ? vcolor(d) : hcolor(i)));
  }, [audioData, barSpacing, barWidth, barRounding, colors, colorType, ratio]);

  return <svg ref={svgRef} />;
};

export default Waveform;
