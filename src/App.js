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
import SaveConfig from "./components/SaveConfig";
import LoadConfig from "./components/LoadConfig";
import LoadAudio from "./components/LoadAudio";
import Waveform from "./components/Waveform";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [audioData, setAudioData] = useState();
  const [error, setError] = useState([]);
  const [chartOpts, setChartOpts] = useState({
    configVersion: "0.1",
    barRounding: 1,
    barSpacing: 9,
    barWidth: 3,
    chartType: "linear",
    colorType: "hz",
    colors: [
      "#ff4040",
      "#f47218",
      "#d5a703",
      "#a7d503",
      "#72f418",
      "#40ff40",
      "#18f472",
      "#03d5a7",
      "#03a7d5",
      "#1872f4",
      "#4040ff",
      "#7218f4",
      "#a703d5",
      "#d503a7",
      "#f41872",
      "#ff4040",
    ],
    colorCount: 3,
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
        setError([...error, "Could not read audio file"]);
        setAudioData(null);
        return;
      }
      setError(error.filter((error) => error != "Could not read audio file"));

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

  const errors = (
    <div role="alert">
      {error.map((e, i) => (
        <div class="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700 mb-2">
          <p>{e}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-screen-sm mx-auto pb-[100px]">
      <h1 className="text-5xl font-bold leading-normal mr-3">Wavething</h1>
      <LoadAudio setSelectedFile={setSelectedFile} />
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
        <div className="my-3">
          <label className="block text-gray-500 text-sm">Color Blending</label>
          <input
            className="mr-1"
            type="radio"
            checked={chartOpts.colorType == "hz"}
            value="hz"
            name="colorType"
            onChange={(event) =>
              setChartOpts({ ...chartOpts, colorType: event.target.value })
            }
          />
          <label className="mr-3">Horizontal</label>
          <input
            className="mr-1"
            type="radio"
            checked={chartOpts.colorType == "vt"}
            value="vt"
            name="colorType"
            onChange={(event) =>
              setChartOpts({ ...chartOpts, colorType: event.target.value })
            }
          />
          <label>Vertical</label>
        </div>
      </div>
      <hr className="my-3" />
      <LoadConfig
        chartOpts={chartOpts}
        setChartOpts={setChartOpts}
        error={error}
        setError={setError}
      />
      <div className="flex gap-2">
        <SaveSVG label="Save SVG" name="waveform" svgRef={ref} />
        <SaveConfig label="Save Config" name="wavething" obj={chartOpts} />
      </div>
      <hr className="my-5" />
      {error.length > 0 ? errors : <div className="pb-[100px]">{waveform}</div>}
    </div>
  );
};

export default App;
