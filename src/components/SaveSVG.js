import React, { useState } from "react";

const SaveSVG = ({ name, label, svgRef }) => {
  const [href, setHref] = useState(null);

  /* https://observablehq.com/@mbostock/saving-svg */
  const serialize = (svg) => {
    const xmlns = "http://www.w3.org/2000/xmlns/";
    const xlinkns = "http://www.w3.org/1999/xlink";
    const svgns = "http://www.w3.org/2000/svg";
    svg = svg.cloneNode(true);
    const fragment = window.location.href + "#";
    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      for (const attr of walker.currentNode.attributes) {
        if (attr.value.includes(fragment)) {
          attr.value = attr.value.replace(fragment, "#");
        }
      }
    }
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    const serializer = new window.XMLSerializer();
    const string = serializer.serializeToString(svg);

    return new Blob([string], { type: "image/svg+xml" });
  };

  const clickHandler = () => {
    setHref(URL.createObjectURL(serialize(svgRef.current)));
  };

  return (
    <div className="my-3">
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {label}
        </button>
      </a>
    </div>
  );
};

export default SaveSVG;
