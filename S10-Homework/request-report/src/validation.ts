import { STATUSES } from './types';
import type { InvalidEntry, ServiceRequest } from './types';

export class ValidationError extends Error {
  constructor(public readonly field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

const minTitleLength = 5;
const minPriority = 1;
const maxPriority = 5;

// Turn one unknown value from the file into a ServiceRequest, or throw a ValidationError.
// Rules: id is an integer, title has at least 5 characters, category is a non-empty string,
// priority is an integer 1-5, status is one of the Status values, hoursOpen is a number >= 0.
export function toRequest(value: unknown): ServiceRequest {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new ValidationError('item', 'must be an object');
  }

  // Now we know it is an object, but we still don't know what is inside it
  const item = value as Record<string, unknown>;

  const id = item.id;
  if (typeof id !== 'number' || !Number.isInteger(id)) {
    throw new ValidationError('id', `must be a whole number, got ${JSON.stringify(id)}`);
  }

  const title = item.title;
  if (typeof title !== 'string' || title.trim().length < minTitleLength) {
    throw new ValidationError('title', `must have at least ${minTitleLength} characters`);
  }

  const category = item.category;
  if (typeof category !== 'string' || category.trim() === '') {
    throw new ValidationError('category', 'must be a non-empty text');
  }

  const priority = item.priority;
  if (typeof priority !== 'number' || !Number.isInteger(priority) || priority < minPriority || priority > maxPriority) {
    throw new ValidationError('priority', `must be a whole number from ${minPriority} to ${maxPriority}, got ${JSON.stringify(priority)}`);
  }

  const status = STATUSES.find((s) => s === item.status);
  if (status === undefined) {
    throw new ValidationError('status', `must be one of ${STATUSES.join(', ')}, got ${JSON.stringify(item.status)}`);
  }

  const hoursOpen = item.hoursOpen;
  if (typeof hoursOpen !== 'number' || hoursOpen < 0) {
    throw new ValidationError('hoursOpen', `must be a number >= 0, got ${JSON.stringify(hoursOpen)}`);
  }

  return { id, title, category, priority, status, hoursOpen };
}

// Validate every item. Valid ones go to `valid`, the rest to `invalid` with their index.
// Only catch ValidationError: anything else is a bug and must not be swallowed.
export function validateAll(raw: readonly unknown[]): { valid: ServiceRequest[]; invalid: InvalidEntry[] } {
  const valid: ServiceRequest[] = [];
  const invalid: InvalidEntry[] = [];

  for (let index = 0; index < raw.length; index++) {
    try {
      valid.push(toRequest(raw[index]));
    } catch (error) {
      if (error instanceof ValidationError) {
        invalid.push({ index, field: error.field, message: error.message });
      } else {
        throw error;
      }
    }
  }

  return { valid, invalid };
}
