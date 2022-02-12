import React, { useEffect, useRef, useReducer, useState } from "react";
import WaveformData from "waveform-data";

import {
  GeneralRanges,
  LinearRanges,
  RadialRanges,
} from "./components/RangeControls";
import Palette from "./components/Palette";
import RadialWaveform from "./components/RadialWaveform";
import SaveSVG from "./components/SaveSVG";
import Waveform from "./components/Waveform";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [audioData, setAudioData] = useState();
  const [error, setError] = useState();
  const [chartOpts, setChartOpts] = useState({
    barRounding: 0,
    barSpacing: 0.5,
    barWidth: 0.2,
    chartType: "linear",
    colorType: "hz",
    colors: ["#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d"],
    radius: 0.25,
    ratio: 1,
    rotate: 0,
  });
  const ref = useRef(null);

  useEffect(() => {
    loadAudio();
  }, [selectedFile]);

  const loadAudio = async () => {
    const audio = selectedFile ? selectedFile : await fetch("data/chirp.mp3");
    const buffer = await audio.arrayBuffer();

    const options = {
      audio_context: new AudioContext(),
      array_buffer: buffer,
      scale: 1,
    };

    WaveformData.createFromAudio(options, (err, waveform) => {
      if (err) {
        setError("Could not read audio file");
        setAudioData(null);
        return;
      }
      setError(null);

      if (waveform.length > 1000) {
        waveform = waveform.resample({ width: 1000 });
      }
      setAudioData(waveform);
    });
  };

  let waveform;
  let conditionalRange;
  if (chartOpts.chartType === "linear") {
    waveform = (
      <Waveform audioData={audioData} chartOpts={chartOpts} svgRef={ref} />
    );
    conditionalRange = (
      <LinearRanges chartOpts={chartOpts} setChartOpts={setChartOpts} />
    );
  } else {
    waveform = (
      <RadialWaveform
        audioData={audioData}
        chartOpts={chartOpts}
        svgRef={ref}
      />
    );
    conditionalRange = (
      <RadialRanges chartOpts={chartOpts} setChartOpts={setChartOpts} />
    );
  }

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(event) => setSelectedFile(event.target.files[0])}
      />
      <div
        onChange={(event) =>
          setChartOpts({ ...chartOpts, chartType: event.target.value })
        }
      >
        <input
          type="radio"
          defaultChecked={true}
          value="linear"
          name="chartType"
        />
        Linear
        <input
          type="radio"
          defaultChecked={false}
          value="radial"
          name="chartType"
        />
        Radial
      </div>
      <GeneralRanges chartOpts={chartOpts} setChartOpts={setChartOpts} />
      {conditionalRange}
      <Palette
        colors={chartOpts.colors}
        setColors={(colors) => setChartOpts({ ...chartOpts, colors: colors })}
      />
      <div
        onChange={(event) =>
          setChartOpts({ ...chartOpts, colorType: event.target.value })
        }
      >
        <input type="radio" defaultChecked={true} value="hz" name="colorType" />
        Horizontal
        <input
          type="radio"
          defaultChecked={false}
          value="vt"
          name="colorType"
        />
        Vertical
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {waveform}
          <SaveSVG label="Save SVG" name="waveform" svgRef={ref} />
        </div>
      )}
    </div>
  );
};

export default App;
