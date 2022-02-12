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
    <div>
      <a download={name} href={href}>
        <button onClick={clickHandler}>{label}</button>
      </a>
    </div>
  );
};

export default SaveSVG;
