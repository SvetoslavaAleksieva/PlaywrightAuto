const total = 40;
const failed = 6;
const skipped = 2;

const passed = total - failed - skipped;
console.log(`Passed: ${passed}`);
const passRate = Math.round((passed / total) * 100);

console.log(`Pass rate: ${passRate}%`);

const green = passRate >= 90;
console.log(`Green run: ${green}`);


