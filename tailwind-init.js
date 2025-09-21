#!/usr/bin/env node
// tailwind-init.js

import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

// ---- Parse CLI arguments ----
const args = process.argv.slice(2);
const supported = ["angular", "nextjs", "react"];
let target = "angular"; // default

if (args.length > 0) {
  const flag = args[0].replace(/^--/, "");
  if (supported.includes(flag)) {
    target = flag;
  } else {
    console.error(`❌ Unsupported target "${flag}". Use one of: ${supported.join(", ")}`);
    process.exit(1);
  }
}

console.log(`🚀 Setting up Tailwind for: ${target.toUpperCase()}\n`);

// ---- Step 1: Install dependencies ----
console.log("Installing Tailwind & friends...");
if (target === "nextjs") {
  execSync("npm install tailwindcss @tailwindcss/postcss postcss --force", { stdio: "inherit" });
} else if (target === "react") {
  execSync("npm install tailwindcss postcss autoprefixer --force", { stdio: "inherit" });
} else {
  execSync("npm install tailwindcss @tailwindcss/postcss postcss --force", { stdio: "inherit" });
}

// ---- Step 2: Framework-specific PostCSS ----
if (target === "nextjs") {
  const content = `
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`;
  writeFileSync("postcss.config.mjs", content.trim(), "utf8");
  console.log("✅ postcss.config.mjs created for Next.js");
} else if (target === "react") {
  const content = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
  writeFileSync("postcss.config.cjs", content.trim(), "utf8");
  console.log("✅ postcss.config.cjs created for React");
} else {
  const postcssConfig = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  writeFileSync(".postcssrc.json", JSON.stringify(postcssConfig, null, 2));
  console.log("✅ .postcssrc.json created for Angular");
}

// ---- Step 3: Inject into proper CSS file ----
let cssFile = "src/styles.css";
let tailwindLine = '@import "tailwindcss";\n\n';

if (target === "react") cssFile = "src/index.css";
if (target === "nextjs") cssFile = "src/app/globals.css";

const cssPath = path.join(cssFile);
let content = "";

if (!existsSync(path.dirname(cssPath))) {
  mkdirSync(path.dirname(cssPath), { recursive: true });
}

if (existsSync(cssPath)) {
  content = readFileSync(cssPath, "utf8");
}

if (!content.includes(tailwindLine.trim())) {
  writeFileSync(cssPath, tailwindLine + content, "utf8");
  console.log(`✅ Tailwind directives added to ${cssFile}`);
} else {
  console.log(`ℹ️ ${cssFile} already contains Tailwind directives.`);
}

console.log(`\n🎯 Done! Tailwind configured for ${target}`);
