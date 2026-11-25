import * as fs from "node:fs";
import * as path from "node:path";

// One short, funny rant about a concrete everyday annoyance:
// the office printer that only breaks when you actually need it.
const RANT =
  "The office printer has one job and it refuses to do it. It prints fine all week, then the second you need a boarding pass it flashes 'paper jam' with no paper inside, demands a cartridge that is somehow empty and full at the same time, and beeps at you like YOU did something wrong. I have apologized to a machine that cannot read. Twice.";

function main(): void {
  const rant = RANT.trim();
  if (rant.length < 1 || rant.length > 400) {
    throw new Error(
      `Rant must be 1-400 characters, got ${rant.length}.`
    );
  }
  if (!/[^\s]/.test(rant)) {
    throw new Error("Rant must contain non-whitespace characters.");
  }
  if (/[\r\n]/.test(rant)) {
    throw new Error("Rant must be a single line (no newline characters).");
  }
  for (const ch of rant) {
    if (ch.charCodeAt(0) > 127) {
      throw new Error("Rant must be plain ASCII.");
    }
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), rant, "utf8");
}

main();
