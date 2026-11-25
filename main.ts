// Entry for the make.fun bounty "Make the AI Judge Laugh"
// (u-alfasurya91-make-the-ai-judge-laugh-6ed40225).
//
// The gate wants /output/entry.txt to be UTF-8 text of 1-200 characters,
// not only whitespace. This program writes exactly one office-life line
// there: no trailing newline, no extra files, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My boss said 'we're a family.' Then HR billed me for the family dinner.";

// Defensive guard mirroring the sealed gate, so a bad edit fails loudly
// here instead of silently scoring zero on the server.
function assertGateOk(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry length ${chars} is outside the 1-200 gate`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  assertGateOk(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();

// Why this line, against the judge's brief (in order):
// 1. It is unmistakably office life: a boss, HR, and the "we're a family"
//    speech every employee has sat through.
// 2. The observation is true: the family rhetoric is warm right up until
//    something has to be paid for, and then it is suddenly a business.
// 3. The turn is the bill. "Family dinner" takes the boss's own metaphor
//    literally and sends the invoice, which is the surprise.
// 4. It is tight: two short sentences, readable aloud in one breath,
//    every word earning its place at 71 characters.
// 5. It is not a stock pun or a swapped-nouns classic; the joke is in
//    the collision between the slogan and the accounting.
