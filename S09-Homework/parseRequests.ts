//Write parseRequests.ts: read a JSON file with 10 requests (3 of them broken)
// parse it, validate every request and print which ones are invalid and why

import { readFileSync } from 'node:fs';

type ServiceRequest = {
  id: number;
  title: string;
  priority: number;
  status: string;
};

const allowedStatuses: string[] = ['Submitted', 'In Review', 'Waiting for Info', 'Resolved'];

// ===== Custom error classes =====

// Problem 1: the file can't be read or is not valid JSON
class FileLoadError extends Error {
  fileName: string;

  constructor(fileName: string) {
    super(`Could not read or parse ${fileName}`);
    this.name = 'FileLoadError';
    this.fileName = fileName;
  }
}

// Problem 2: a request has wrong or missing data
class ValidationError extends Error {
  requestId: number;
  problems: string[];

  constructor(requestId: number, problems: string[]) {
    super(`Request ${requestId} is invalid`);
    this.name = 'ValidationError';
    this.requestId = requestId;
    this.problems = problems;
  }
}

// ===== Functions =====

function loadRequests(fileName: string): ServiceRequest[] {
  try {
    const text = readFileSync(fileName, 'utf-8');
    // Careful: JSON.parse does NOT check the types, that's why we validate below
    return JSON.parse(text);
  } catch {
    throw new FileLoadError(fileName);
  }
}

// Throws a ValidationError if something is wrong with the request
function validateRequest(request: ServiceRequest): void {
  const problems: string[] = [];

  if (typeof request.title !== 'string') {
    problems.push('title is missing');
  } else if (request.title.length < 5) {
    problems.push('title is shorter than 5 characters');
  }

  if (typeof request.priority !== 'number') {
    problems.push(`priority must be a number, got "${request.priority}"`);
  } else if (request.priority < 1 || request.priority > 5) {
    problems.push('priority must be from 1 to 5');
  }

  if (!allowedStatuses.includes(request.status)) {
    problems.push(`status "${request.status}" is not allowed`);
  }

  if (problems.length > 0) {    
    throw new ValidationError(request.id, problems);
  }
}

// ===== Main program =====

// 1. Read and parse the file
let requests: ServiceRequest[] = [];

try {
  requests = loadRequests('requests.json');
} catch (error) {
  if (error instanceof FileLoadError) {
    console.log(`${error.name}: ${error.message}`);
  } else {
    throw error;
  }
}

// 2. Validate every request
let invalidCount = 0;

console.log(`Checking ${requests.length} requests...`);
console.log('');

for (const request of requests) {
  try {
    validateRequest(request);
  } catch (error) {
    if (error instanceof ValidationError) {
      invalidCount = invalidCount + 1;
      console.log(`${error.name}: ${error.message}`);
      for (const problem of error.problems) {
        console.log(`  - ${problem}`);
      }
    } else {
      throw error;
    }
  }
}

// 3. Summary
console.log('');
console.log(`Valid: ${requests.length - invalidCount}, invalid: ${invalidCount}`);