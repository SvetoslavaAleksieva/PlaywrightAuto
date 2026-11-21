// Create request-utils.ts with at least 6 small, pure, typed functions: 
// id formatting, SLA calculation, overdue check, title validation (5–100 characters), 
// category check against an allowed list, summary text

const allowedCategories: string[] = ["Bug", "Feature", "Support", "Question"];

export function formatRequestId(id: number): string {
  let idText = "" + id;

  while (idText.length < 4) {
    idText = "0" + idText;
  }

  return `REQ-${idText}`;
}

// SLA calculation
export function calculateSlaHours(priority: number): number {
  switch (priority) {
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
      return 24;
    case 4:
      return 48;
    default:
      return 72;
  }
}

// Overdue check 
export function isOverdue(hoursOpen: number, slaHours: number): boolean {
  return hoursOpen > slaHours;
}

// Title validation (5–100 characters)
export function isValidTitle(title: string): boolean {
  return title.length >= 5 && title.length <= 100;
}

// Category check
export function isAllowedCategory(category: string): boolean {
  return allowedCategories.includes(category);
}

export function createSummary(id: number, title: string, priority: number, status: string): string {
  return `${formatRequestId(id)} | ${title} | priority ${priority} | ${status}`;
}

