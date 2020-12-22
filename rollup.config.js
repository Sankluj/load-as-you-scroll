import pkg from "./package.json";

const config = {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "auto",
    },
    {
      file: pkg.module,
      format: "es",
      exports: "auto",
    },
  ],
  external: ["react"],
};

export default config;
