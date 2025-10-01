/*!
 * MIT License
 * 
 * Copyright (c) 2025 LeoNova
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

/**
 * Inject Tailwind directives into the main style file
 * Handles CSS and SCSS for Next.js, React, Angular
 */
export default function injectDirectives(framework, style) {
  let cssRelPath = "src/styles.css";

  if (framework === "react") {
    cssRelPath = style === "scss" ? "src/index.scss" : "src/index.css";
  }

  if (framework === "nextjs") {
    cssRelPath = style === "scss" ? "src/app/globals.scss" : "src/app/globals.css";
  }

  if (framework === "angular") {
    cssRelPath = style === "scss" ? "src/styles.scss" : "src/styles.css";
  }

  const cssPath = path.join(cssRelPath);

  // Ensure directory exists
  if (!existsSync(path.dirname(cssPath))) {
    mkdirSync(path.dirname(cssPath), { recursive: true });
  }

  let existing = "";
  if (existsSync(cssPath)) {
    existing = readFileSync(cssPath, "utf8");
  }

  const directive =
    style === "scss"
      ? `@use "tailwindcss";\n`
      : `@import "tailwindcss/base";\n@import "tailwindcss/components";\n@import "tailwindcss/utilities";\n`;

  if (!existing.includes("tailwindcss")) {
    writeFileSync(cssPath, directive + existing, "utf8");
    console.log(`✅ Tailwind directives added to ${cssRelPath}`);
  } else {
    console.log(`ℹ️ ${cssRelPath} already contains Tailwind directives`);
  }
}
