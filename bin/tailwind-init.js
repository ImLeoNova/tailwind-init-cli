#!/usr/bin/env node

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

import detectFramework from "../lib/detectFramework.js";
import detectStyle from "../lib/detectStyle.js";
import installDeps from "../lib/installDeps.js";
import writeConfig from "../lib/writeConfig.js";
import injectDirectives from "../lib/injectDirectives.js";
import { log, exitWithError } from "../lib/utils.js";

// Parse CLI arguments (optional: --nextjs, --react, --angular)
const args = process.argv.slice(2);
let targetFramework = null;
if (args.length > 0) {
  const flag = args[0].replace(/^--/, "").toLowerCase();
  if (["nextjs", "react", "angular"].includes(flag)) {
    targetFramework = flag;
  } else {
    exitWithError(`Unsupported target "${flag}". Use one of: nextjs, react, angular`);
  }
}

// Auto detect if not provided
if (!targetFramework) {
  targetFramework = detectFramework();
  if (targetFramework === "unknown") {
    exitWithError("Could not detect framework automatically. Please specify with --nextjs, --react, or --angular");
  }
}

// Detect style type (CSS or SCSS)
const styleType = detectStyle();

log.info(`🚀 Setting up Tailwind for ${targetFramework.toUpperCase()} + ${styleType.toUpperCase()}`);

// Step 1: Install dependencies
installDeps(targetFramework, styleType);

// Step 2: Write PostCSS config
writeConfig(targetFramework);

// Step 3: Inject Tailwind directives into main style file
injectDirectives(targetFramework, styleType);

log.success(`🎯 Done! Tailwind configured for ${targetFramework.toUpperCase()}+ ${styleType.toUpperCase()}`);
