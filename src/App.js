import React, { useEffect, useRef, useState } from "react";
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
    barRounding: 1,
    barSpacing: 9,
    barWidth: 3,
    chartType: "linear",
    colorType: "hz",
    colors: ["#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#99000d"],
    radius: 10,
    ratio: 1,
    rotate: 1,
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
    <div className="p-4 max-w-screen-sm mx-auto">
      <h1 className="text-5xl font-bold leading-normal mr-3">Wavething</h1>
      <p className="text-gray-500">
        Upload an audio file to visualize volume as a linear or radial chart.
      </p>
      <input
        className="mt-5"
        type="file"
        accept="audio/mp3,audio/*"
        name="file"
        onChange={(event) => setSelectedFile(event.target.files[0])}
      />
      <hr className="my-5" />
      <div
        className="my-3"
        onChange={(event) =>
          setChartOpts({ ...chartOpts, chartType: event.target.value })
        }
      >
        <input
          className="mr-1"
          type="radio"
          defaultChecked={true}
          value="linear"
          name="chartType"
        />
        <label className="mr-3">Linear</label>
        <input
          className="mr-1"
          type="radio"
          defaultChecked={false}
          value="radial"
          name="chartType"
        />
        <label>Radial</label>
      </div>
      <div>
        <GeneralRanges chartOpts={chartOpts} setChartOpts={setChartOpts} />
        {conditionalRange}
      </div>
      <div className="my-3">
        <Palette chartOpts={chartOpts} setChartOpts={setChartOpts} />
      </div>
      <div>
        <div
          className="my-3"
          onChange={(event) =>
            setChartOpts({ ...chartOpts, colorType: event.target.value })
          }
        >
          <label className="block text-gray-500 text-sm">Color Blending</label>
          <input
            className="mr-1"
            type="radio"
            defaultChecked={true}
            value="hz"
            name="colorType"
          />
          <label className="mr-3">Horizontal</label>
          <input
            className="mr-1"
            type="radio"
            defaultChecked={false}
            value="vt"
            name="colorType"
          />
          <label>Vertical</label>
        </div>
      </div>
      <SaveSVG label="Save SVG" name="waveform" svgRef={ref} />
      <hr className="my-5" />
      {error ? <p>{error}</p> : <div className="pb-[100px]">{waveform}</div>}
    </div>
  );
};

export default App;
