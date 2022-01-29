import React, { useEffect, useState } from "react";
import Waveform from "./components/Waveform";
import WaveformData from "waveform-data";

const App = () => {
  const [barWidth, setBarWidth] = useState(0.8);
  const [barSpacing, setBarSpacing] = useState(0.5);
  const [selectedFile, setSelectedFile] = useState();
  const [audioData, setAudioData] = useState();
  const [error, setError] = useState();

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
      setAudioData(waveform);
    });
  };

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <p>
        <input type="file" name="file" onChange={fileChangeHandler} />
      </p>
      <p>
        <input
          type="range"
          min="0"
          max="0.9"
          step="0.1"
          value={barWidth}
          onChange={(event) => setBarWidth(parseFloat(event.target.value))}
        />
        Bar Count
      </p>
      <p>
        <input
          type="range"
          min="0"
          max="0.9"
          step="0.1"
          value={barSpacing}
          onChange={(event) => setBarSpacing(parseFloat(event.target.value))}
        />
        Bar Spacing
      </p>
      {error && <p>{error}</p>}
      <div>
        <Waveform
          audioData={audioData}
          barSpacing={barSpacing}
          barWidth={barWidth}
        />
      </div>
    </div>
  );
};

export default App;
