import { overdueHours, slaHours } from './sla';
import { STATUSES } from './types';
import type { CategoryLine, InvalidEntry, Report, ReportLine, ServiceRequest } from './types';

// Group the valid requests by status. Inside each group, overdue requests come first.
// Do not mutate the input array.
export function buildReport(valid: readonly ServiceRequest[]): Report {
  const report: Report = { 'Submitted': [], 'In Review': [], 'Resolved': [] };

  for (const request of valid) {
    report[request.status].push({
      request,
      slaHours: slaHours(request.priority),
      overdueHours: overdueHours(request),
    });
  }

  // Most overdue first. Requests that are on time keep their original order.
  for (const status of STATUSES) {
    report[status].sort((a, b) => b.overdueHours - a.overdueHours);
  }

  return report;
}

function describeTime(line: ReportLine): string {
  if (line.request.status === 'Resolved') {
    return 'resolved';
  } else if (line.overdueHours > 0) {
    return `OVERDUE by ${line.overdueHours}h`;
  } else {
    return `${line.slaHours - line.request.hoursOpen}h left`;
  }
}

// Print every status group with its requests, then the invalid items with index, field and message.
export function printReport(report: Report, invalid: readonly InvalidEntry[]): void {
  for (const status of STATUSES) {
    const lines = report[status];
    console.log(`=== ${status} (${lines.length}) ===`);

    for (const line of lines) {
      const r = line.request;
      console.log(`  #${r.id} | P${r.priority} | ${describeTime(line)} | ${r.title}`);
    }

    console.log('');
  }

  if (invalid.length > 0) {
    console.log(`=== Invalid items (${invalid.length}) ===`);
    for (const entry of invalid) {
      console.log(`  item ${entry.index} | ${entry.field}: ${entry.message}`);
    }
    console.log('');
  }
}

// ===== Second report: requests per category =====

// Count the requests in each category and work out the average hours open.
// Do not mutate the input array.
export function buildCategoryReport(valid: readonly ServiceRequest[]): CategoryLine[] {
  // 1. Collect every category once, in alphabetical order
  const categories: string[] = [];
  for (const request of valid) {
    if (!categories.includes(request.category)) {
      categories.push(request.category);
    }
  }
  categories.sort();

  // 2. For each category: count the requests and work out the average hours open
  const lines: CategoryLine[] = [];
  for (const category of categories) {
    const inCategory = valid.filter((r) => r.category === category);

    let totalHours = 0;
    for (const request of inCategory) {
      totalHours = totalHours + request.hoursOpen;
    }

    lines.push({
      category,
      count: inCategory.length,
      averageHoursOpen: roundToOneDecimal(totalHours / inCategory.length),
    });
  }

  return lines;
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function printCategoryReport(lines: readonly CategoryLine[]): void {
  console.log('=== Requests per category ===');

  for (const line of lines) {
    const word = line.count === 1 ? 'request' : 'requests';
    console.log(`  ${line.category} | ${line.count} ${word} | average ${line.averageHoursOpen}h open`);
  }

  console.log('');
}
