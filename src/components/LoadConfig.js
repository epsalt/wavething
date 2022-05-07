import React, { useState, useEffect } from "react";

const loadConfig = ({ chartOpts, setChartOpts, error, setError }) => {
  const [selectedConfig, setSelectedConfig] = useState(null);

  useEffect(() => {
    setError(
      error.filter((error) => error != "Could not read configuration file")
    );
    if (selectedConfig) {
      const reader = new FileReader();
      reader.readAsText(selectedConfig);
      reader.onload = () => {
        const updated = { ...chartOpts };
        try {
          const data = JSON.parse(reader.result);
          for (const [key, value] of Object.entries(data)) {
            if (
              chartOpts.hasOwnProperty(key) &&
              typeof chartOpts[key] == typeof value
            ) {
              updated[key] = value;
            }
          }
          setChartOpts(updated);
        } catch (e) {
          setError([...error, "Could not read configuration file"]);
        }
      };
      reader.onerror = function () {
        setError([...error, "Could not read configuration file"]);
      };
    }
  }, [selectedConfig]);

  return (
    <div className="mb-3">
      <label
        htmlFor="configInput"
        className="form-label mb-1 inline-block text-gray-500"
      >
        Upload a configuration file:
      </label>
      <input
        id="configInput"
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
        accept="application/JSON"
        name="file"
        onChange={(event) => setSelectedConfig(event.target.files[0])}
      />
    </div>
  );
};

export default loadConfig;
