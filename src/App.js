import React, { useEffect, useState } from "react";
import Waveform from "./components/Waveform";
import WaveformData from "waveform-data";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [audioData, setAudioData] = useState();
  const [error, setError] = useState();

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

  useEffect(() => {
    loadAudio();
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <p>
        <input type="file" name="file" onChange={changeHandler} />
      </p>
      {error && <p>{error}</p>}
      <div>
        <Waveform audioData={audioData} />
      </div>
    </div>
  );
};

export default App;
