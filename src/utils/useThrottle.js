import React, { useCallback } from "react";
import throttle from "lodash/throttle";

export function useThrottle(timeout = 300, opts = {}) {
  return useCallback(
    throttle(
      (fn, ...args) => {
        fn(...args);
      },
      timeout,
      opts
    ),
    [timeout]
  );
}

export default useThrottle;
