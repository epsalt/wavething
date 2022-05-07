import React from "react";

const LoadAudio = ({ setSelectedFile }) => {
  return (
    <div>
      <label
        htmlFor="audioInput"
        className="form-label mb-1 inline-block text-gray-500"
      >
        Upload an audio file to visualize volume as a linear or radial chart:
      </label>
      <input
        id="audioInput"
        className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="file"
        accept="audio/mp3,audio/*"
        name="file"
        onChange={(event) => setSelectedFile(event.target.files[0])}
      />
    </div>
  );
};

export default LoadAudio;
