import { InputFileError, readRequests, writeSummary } from './io';
import { buildCategoryReport, buildReport, printCategoryReport, printReport } from './report';
import { validateAll } from './validation';

// Run with: npx tsx src/main.ts [path]   (default: data/requests.json)
const INPUT_PATH = process.argv[2] ?? 'data/requests.json';

function main(): void {
  const raw = readRequests(INPUT_PATH); // unknown[]
  const { valid, invalid } = validateAll(raw);
  const report = buildReport(valid);
  printReport(report, invalid);
  printCategoryReport(buildCategoryReport(valid));
  writeSummary('out/summary.json', report);
  process.exitCode = invalid.length > 0 ? 1 : 0;
}

// A bad input file prints a short message instead of a stack trace
try {
  main();
} catch (error) {
  if (error instanceof InputFileError) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
