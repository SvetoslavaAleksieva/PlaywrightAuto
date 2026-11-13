const durations = [1200, 800, 4300, 950];
let slowCount = 0;
 
for (const ms of durations) {
  if (ms > 1000) {
    slowCount++;
  }
}
console.log('Slow tests:', slowCount);   // 2
