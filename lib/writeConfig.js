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

import { writeFileSync, existsSync } from "fs";

/**
 * Write PostCSS config file for Next.js, React, Angular
 * Tailwind 4 uses CSS-first approach, tailwind.config.js is optional
 */
export default function writeConfig(framework) {
  if (framework === "nextjs") {
    const filename = "postcss.config.mjs";
    const content = `
      export default {
        plugins: ["@tailwindcss/postcss"],
      };
    `.trim();

    writeFileSync(filename, content, "utf8");
    console.log(`✅ ${filename} created for Next.js`);

  } else if (framework === "react") {
    const filename = "postcss.config.cjs";
    const content = `
      module.exports = {
        plugins: ["@tailwindcss/postcss"],
      };
    `.trim();

    writeFileSync(filename, content, "utf8");
    console.log(`✅ ${filename} created for React`);

  } else if (framework === "angular") {
    const filename = ".postcssrc.json";
    const content = {
      plugins: {
        "@tailwindcss/postcss": {}
      }
    };

    if (!existsSync(filename)) {
      writeFileSync(filename, JSON.stringify(content, null, 2), "utf8");
      console.log(`✅ ${filename} created for Angular`);
    } else {
      console.log(`ℹ️ ${filename} already exists`);
    }
  }
}
