import React, { useEffect, useRef, useState } from "react";
import Palette from "./components/Palette";
import SaveSVG from "./components/SaveSVG";
import Waveform from "./components/Waveform";
import RadialWaveform from "./components/RadialWaveform";
import WaveformData from "waveform-data";

const App = () => {
  const [chartType, setChartType] = useState("linear");
  const [barWidth, setBarWidth] = useState(0.2);
  const [barSpacing, setBarSpacing] = useState(0.5);
  const [barRounding, setBarRounding] = useState(0);
  const [ratio, setRatio] = useState(1);
  const [radius, setInnerRadius] = useState(0.25);
  const [rotate, setRotate] = useState(0);
  const [colors, setColors] = useState([
    "#fc9272",
    "#fb6a4a",
    "#ef3b2c",
    "#cb181d",
    "#99000d",
  ]);
  const [colorType, setColorType] = useState(["hz"]);
  const [selectedFile, setSelectedFile] = useState();
  const [audioData, setAudioData] = useState();
  const [error, setError] = useState();
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

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" name="file" onChange={fileChangeHandler} />
      <div>
        <div onChange={(event) => setChartType(event.target.value)}>
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
        <div>
          <input
            name="width"
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={barWidth}
            onChange={(event) => setBarWidth(parseFloat(event.target.value))}
          />
          <label htmlFor="width">Bar Width</label>
        </div>
      </div>
      <div>
        <input
          name="spacing"
          type="range"
          min="-0.2"
          max="0.9"
          step="0.1"
          value={barSpacing}
          onChange={(event) => setBarSpacing(parseFloat(event.target.value))}
        />
        <label htmlFor="spacing">Bar Spacing</label>
      </div>
      <div>
        <input
          name="rounding"
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={barRounding}
          onChange={(event) => setBarRounding(parseFloat(event.target.value))}
        />
        <label htmlFor="rounding">Bar Rounding</label>
      </div>
      {chartType === "linear" ? (
        <div>
          <input
            name="ratio"
            type="range"
            min="0.1"
            max="5"
            step="0.25"
            value={ratio}
            onChange={(event) => setRatio(parseFloat(event.target.value))}
          />
          <label htmlFor="ratio"> Aspect Ratio</label>
        </div>
      ) : (
        <>
          <div>
            <input
              name="radius"
              type="range"
              min="0"
              max="0.9"
              step="0.05"
              value={radius}
              onChange={(event) =>
                setInnerRadius(parseFloat(event.target.value))
              }
            />
            <label htmlFor="radius"> Radius</label>
          </div>
          <div>
            <input
              name="rotate"
              type="range"
              min="0"
              max="360"
              step="5"
              value={rotate}
              onChange={(event) => setRotate(parseFloat(event.target.value))}
            />
            <label htmlFor="rotate"> Rotate</label>
          </div>
        </>
      )}
      <div>
        <Palette colors={colors} setColors={setColors} />
      </div>
      <div onChange={(event) => setColorType(event.target.value)}>
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
          <div>
            {chartType === "linear" ? (
              <Waveform
                audioData={audioData}
                barSpacing={barSpacing}
                barWidth={barWidth}
                barRounding={barRounding}
                ratio={ratio}
                colors={colors}
                colorType={colorType}
                svgRef={ref}
              />
            ) : (
              <RadialWaveform
                audioData={audioData}
                barSpacing={barSpacing}
                barWidth={barWidth}
                barRounding={barRounding}
                ratio={ratio}
                radius={radius}
                rotate={rotate}
                colors={colors}
                colorType={colorType}
                svgRef={ref}
              />
            )}
          </div>
          <div>
            <SaveSVG label="Save SVG" name="waveform" svgRef={ref} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
