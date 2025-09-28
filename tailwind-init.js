import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

// ---- Parse CLI arguments ----
const args = process.argv.slice(2);
const supported = ["angular", "nextjs", "react"];
let target = "angular";
if (args.length > 0) {
  const flag = args[0].replace(/^--/, "");
  if (supported.includes(flag)) {
    target = flag;
  } else {
    console.error(
      `❌ Unsupported target "${flag}". Use one of: ${supported.join(", ")}`,
    );
    process.exit(1);
  }
}

console.log(`🚀 Setting up Tailwind for: ${target.toUpperCase()}\n`);

// ---- Step 1: Install dependencies ----
console.log("Installing Tailwind & friends...");
execSync("npm install tailwindcss @tailwindcss/postcss postcss --force", {
  stdio: "inherit",
});

// ---- Step 2: Write PostCSS config ----
if (target === "nextjs") {
  const content = `
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`.trim();
  writeFileSync("postcss.config.mjs", content, "utf8");
  console.log("✅ postcss.config.mjs created for Next.js");
} else if (target === "react") {
  const content = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`.trim();
  writeFileSync("postcss.config.cjs", content, "utf8");
  console.log("✅ postcss.config.cjs created for React");
} else {
  // Angular
  const content = {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  writeFileSync(".postcssrc.json", JSON.stringify(content, null, 2), "utf8");
  console.log("✅ .postcssrc.json created for Angular");
}

// ---- Step 3: Inject Tailwind import directive into CSS file ----
let cssRelativePath = "src/styles.css";
if (target === "react") {
  cssRelativePath = "src/index.css";
}
if (target === "nextjs") {
  cssRelativePath = "src/app/globals.css";
}

const cssPath = path.join(cssRelativePath);
const tailwindDirective = `@import "tailwindcss";\n`;

if (!existsSync(path.dirname(cssPath))) {
  mkdirSync(path.dirname(cssPath), {
    recursive: true,
  });
}

let existing = "";
if (existsSync(cssPath)) {
  existing = readFileSync(cssPath, "utf8");
}

if (!existing.includes('@import "tailwindcss"')) {
  writeFileSync(cssPath, tailwindDirective + existing, "utf8");
  console.log(`✅ Tailwind directive added to ${cssRelativePath}`);
} else {
  console.log(`ℹ️ ${cssRelativePath} already contains Tailwind directive`);
}

console.log(`\n🎯 Done! Tailwind configured for ${target.toUpperCase()}`);
