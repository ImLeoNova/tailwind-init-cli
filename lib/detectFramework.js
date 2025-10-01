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

import { existsSync, readFileSync } from "fs";

/**
 * Detect framework based on common project files
 * Supports: Next.js, Angular, React
 */
export default function detectFramework() {
  // Next.js projects usually contain next.config.js or next.config.mjs
  if (existsSync("next.config.js") || existsSync("next.config.mjs")) {
    return "nextjs";
  }

  // Angular projects contain angular.json
  if (existsSync("angular.json")) {
    return "angular";
  }

  // React detection via package.json dependencies
  if (existsSync("package.json")) {
    try {
      const pkg = JSON.parse(readFileSync("package.json", "utf8"));
      if (pkg.dependencies && pkg.dependencies["react"]) {
        return "react";
      }
    } catch (e) {
      return "unknown";
    }
  }

  return "unknown";
}
