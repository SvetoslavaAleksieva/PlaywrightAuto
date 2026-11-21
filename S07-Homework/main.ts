//Use them from a separate main.ts to process an array of 8 hard-coded requests and print a report

import { calculateSlaHours, createSummary, isAllowedCategory, isOverdue, isValidTitle } from "./request-utils";

const requests = [
  { id: 1, title: "Login page is broken", category: "Bug", priority: 1, status: "In Review", hoursOpen: 6 },
  { id: 2, title: "Add dark mode", category: "Feature", priority: 4, status: "Submitted", hoursOpen: 20 },
  { id: 3, title: "Fix typo on homepage", category: "Bug", priority: 3, status: "Resolved", hoursOpen: 10 },
  { id: 4, title: "Export report to PDF", category: "Feature", priority: 2, status: "Waiting for Info", hoursOpen: 30 },
  { id: 5, title: "Help", category: "Support", priority: 3, status: "Submitted", hoursOpen: 2 },
  { id: 6, title: "How do I reset my password?", category: "Question", priority: 5, status: "In Review", hoursOpen: 80 },
  { id: 7, title: "Change company logo", category: "Design", priority: 4, status: "Submitted", hoursOpen: 5 },
  { id: 8, title: "Server is very slow", category: "Bug", priority: 1, status: "In Review", hoursOpen: 3 },
];

console.log("Request report");

for (const request of requests) {
  console.log(createSummary(request.id, request.title, request.priority, request.status));

  if (isOverdue(request.hoursOpen, calculateSlaHours(request.priority))) {
    console.log("   - overdue");
  }

  if (!isValidTitle(request.title)) {
    console.log("   - title is too short or too long");
  }

  if (!isAllowedCategory(request.category)) {
    console.log("   - category is not allowed");
  }
}

console.log(`Total requests: ${requests.length}`);