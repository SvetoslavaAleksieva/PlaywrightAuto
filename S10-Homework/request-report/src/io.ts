import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

// Thrown when the input file can't be used: missing, not valid JSON or not an array
export class InputFileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputFileError';
  }
}

// Read the file and parse it. JSON.parse returns any: treat the result as unknown.
// Throw a clear error when the file is missing, is not valid JSON or does not contain an array.
export function readRequests(path: string): unknown[] {
  let text: string;
  try {
    text = readFileSync(path, 'utf-8');
  } catch {
    throw new InputFileError(`Cannot read "${path}". Check that the file exists.`);
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new InputFileError(`"${path}" is not valid JSON.`);
  }

  if (!Array.isArray(data)) {
    throw new InputFileError(`"${path}" must contain an array of requests.`);
  }

  return data;
}

// Write the summary as pretty-printed JSON. Create the folder if it does not exist.
export function writeSummary(path: string, summary: object): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(summary, null, 2));
}
