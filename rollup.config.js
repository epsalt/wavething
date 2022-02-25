import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
    sourcemap: !isProduction,
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    isProduction && terser(),
    copy({
      targets: [
        { src: "public/index.html", dest: "dist" },
        { src: "data", dest: "dist" },
      ],
    }),
  ],
};
