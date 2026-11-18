//Print a text table of requests: id, title padded to 25 characters, priority, status

function addSpaces(text: string, width: number): string {
  let result = text;

  while (result.length < width) {
    result = result + " ";
  }

  return result;
}

function printRow(id: string, title: string, priority: string, status: string): void {
  const idText = addSpaces(id, 5);
  const titleText = addSpaces(title, 25);
  const priorityText = addSpaces(priority, 10);

  console.log(`${idText}${titleText}${priorityText}${status}`);
}


printRow("ID", "Title", "Priority", "Status");
console.log("-------------------------------------------------------");

// Requests
printRow("1", "Login page is broken", "High", "Submitted");
printRow("2", "Add dark mode", "Low", "In Review");
printRow("3", "Fix typo on homepage", "Medium", "Resolved");
