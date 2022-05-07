import React, { useState } from "react";

const configVersion = "0.1";

const SaveConfig = ({ name, label, obj }) => {
  const [href, setHref] = useState(null);

  const serialize = (obj) => {
    obj.configVersion = configVersion;
    const data = JSON.stringify(obj, null, 2);

    return new Blob([data], { type: "application/json" });
  };

  const clickHandler = () => {
    setHref(URL.createObjectURL(serialize(obj)));
  };

  return (
    <a download={name} href={href}>
      <button
        type="button"
        onClick={clickHandler}
        className="inline-block px-6 pt-2.5 pb-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded flex align-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        {label}
      </button>
    </a>
  );
};

export default SaveConfig;
