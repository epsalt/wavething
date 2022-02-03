import { max } from "d3-array";
import { select } from "d3-selection";
import { scaleLinear, scaleQuantize } from "d3-scale";
import React, { useEffect } from "react";

const Waveform = ({
  audioData,
  barSpacing,
  barWidth,
  barRounding,
  colors,
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

    const width = 500;
    const height = 500;

    const step = width / amplitude.length;
    const padding = step * barSpacing;
    const bandwidth = step - padding;

    const x = scaleLinear().domain([0, amplitude.length]).range([0, width]);

    const y = scaleLinear()
      .domain([-max(amplitude), max(amplitude)])
      .range([height / 2, -height / 2]);

    const color = scaleQuantize()
      .domain([0, max(amplitude)])
      .range(colors);

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
      .attr("fill", (d) => color(d));
  }, [audioData, barSpacing, barWidth, barRounding, colors]);

  return <svg ref={svgRef} />;
};

export default Waveform;
