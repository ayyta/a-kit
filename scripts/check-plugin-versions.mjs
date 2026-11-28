#!/usr/bin/env node
// Fails when a plugin under plugins/ changed but its plugin.json version did not go up.
// Claude Code caches installed plugins by version, so an unbumped change never reaches
// people who already have the plugin installed.
//
// Usage: node scripts/check-plugin-versions.mjs [base-ref]   (default: origin/main)

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const base = process.argv[2] ?? "origin/main";
const inCI = process.env.GITHUB_ACTIONS === "true";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const lines = (s) => s.split("\n").filter(Boolean);

const mergeBase = git("merge-base", base, "HEAD");
const changed = [
  ...lines(git("diff", "--name-only", mergeBase)),
  ...lines(git("ls-files", "--others", "--exclude-standard")),
];

const plugins = new Set(
  changed.map((f) => f.match(/^plugins\/([^/]+)\//)?.[1]).filter(Boolean),
);

const parse = (v) => {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v ?? "");
  return m && m.slice(1).map(Number);
};
const greater = (a, b) => {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return false;
};

let failures = 0;
const fail = (file, msg) => {
  failures++;
  console.log(inCI ? `::error file=${file}::${msg}` : `✗ ${file}: ${msg}`);
};

for (const name of [...plugins].sort()) {
  const manifest = `plugins/${name}/.claude-plugin/plugin.json`;
  if (!existsSync(manifest)) continue;

  let before;
  try {
    before = JSON.parse(git("show", `${mergeBase}:${manifest}`)).version;
  } catch {
    console.log(`• ${name}: new plugin, nothing to compare`);
    continue;
  }
  const after = JSON.parse(readFileSync(manifest, "utf8")).version;

  const [a, b] = [parse(after), parse(before)];
  if (!a) {
    fail(manifest, `version "${after}" is not MAJOR.MINOR.PATCH`);
  } else if (!b || greater(a, b)) {
    console.log(`✓ ${name}: ${before} → ${after}`);
  } else {
    fail(
      manifest,
      `${name} changed but its version is still ${after} (was ${before}). ` +
        `Bump "version" in ${manifest}: patch for fixes and wording, minor for new skills or agents, major for removals or renames. ` +
        `Installed copies only update when the version goes up.`,
    );
  }
}

if (plugins.size === 0) console.log("No plugin files changed.");
process.exit(failures ? 1 : 0);
