import React, { useEffect, useState } from "react";
import Waveform from "./components/Waveform";
import WaveformData from "waveform-data";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [audioData, setAudioData] = useState();

  useEffect(() => {
    const audioContext = new AudioContext();

    const audio = selectedFile
      ? Promise.resolve(selectedFile)
      : fetch("data/chirp.mp3");

    setAudioData(
      audio
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          const options = {
            audio_context: audioContext,
            array_buffer: buffer,
            scale: 1,
          };

          return new Promise((resolve, reject) => {
            WaveformData.createFromAudio(options, (err, waveform) => {
              if (err) {
                reject(err);
              } else {
                resolve(waveform);
              }
            });
          });
        })
    );
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div>
      <div>
        <input type="file" name="file" onChange={changeHandler} />
      </div>
      <div>
        <Waveform audioData={audioData} />
      </div>
    </div>
  );
};

export default App;
