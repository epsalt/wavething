import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const Waveform = ({ audioData }) => {
  const ref = useRef();

  useEffect(() => {
    if (!audioData) {
      return;
    }

    audioData.then((wf) => {
      const waveform = wf.resample({ width: 300 });
      const channel = waveform.channel(0);

      const min = channel.min_array();
      const max = channel.max_array();

      const width = 500;
      const height = 500;
      const padding = 1;
      const bandwidth = width / max.length - padding;

      const x = d3.scaleLinear().domain([0, waveform.length]).range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([d3.min(min), d3.max(max)])
        .rangeRound([height / 2, -height / 2]);

      const svg = d3
        .select(ref.current)
        .attr("width", width)
        .attr("height", height);

      svg.selectAll("*").remove();

      svg
        .append("g")
        .attr("transform", () => `translate(0, ${height / 2})`)
        .attr("fill", "blue")
        .selectAll("rect")
        .data(max)
        .join("rect")
        .attr("x", (_, i) => x(i))
        .attr("y", (_, i) => y(max[i]))
        .attr("height", (d, i) => Math.max(y(min[i]) - y(d), y(0) - y(1)))
        .attr("width", bandwidth);
    });
  }, [audioData]);

  return <svg ref={ref} />;
};

export default Waveform;
