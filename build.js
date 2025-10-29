#!/usr/bin/env node
const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["index.src.js"],
    bundle: true,
    outfile: "index.js",
    format: "iife",
    target: "es2020",
    platform: "browser",
    banner: {
      js: "// @ts-check\n",
    },
  })
  .catch(() => process.exit(1));
