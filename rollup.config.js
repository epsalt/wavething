import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
    sourcemap: "inline",
    assetFileNames: "[name]-[hash][extname]",
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    copy({
      targets: [
        { src: "public/index.html", dest: "dist" },
        { src: "data", dest: "dist" },
      ],
    }),
  ],
};
