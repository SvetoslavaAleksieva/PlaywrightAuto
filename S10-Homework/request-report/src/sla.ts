import type { ServiceRequest } from './types';

// SLA rules: priority 1 → 4 hours, priority 2-3 → 24 hours, priority 4-5 → 72 hours.
// Resolved requests are never overdue.

const urgentPriority = 1;
const normalPriorityMax = 3;

const urgentSlaHours = 4;
const normalSlaHours = 24;
const lowSlaHours = 72;

export function slaHours(priority: number): number {
  if (priority === urgentPriority) {
    return urgentSlaHours;
  } else if (priority <= normalPriorityMax) {
    return normalSlaHours;
  } else {
    return lowSlaHours;
  }
}

// How many hours past its SLA the request is (0 when on time or resolved)
export function overdueHours(r: ServiceRequest): number {
  if (r.status === 'Resolved') {
    return 0;
  }

  const hoursOver = r.hoursOpen - slaHours(r.priority);

  if (hoursOver > 0) {
    return hoursOver;
  } else {
    return 0;
  }
}
