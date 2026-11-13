const durations = [1200, 800, 4300, 950, 2700];
durations.push(3100);
console.log(`First: ${durations [0]}, Last: ${durations [durations.length-1]}, Total: ${durations.length} `);

let totalDuration = 0;
let slowestDuration = 0;

for (const duration of durations) {
    totalDuration += duration;
    if (duration > slowestDuration) {
        slowestDuration = duration;
    }
    
}

const averageDuration = totalDuration / durations.length;

console.log(`Total: ${totalDuration} ms`);
console.log(`Average: ${averageDuration} ms`);
console.log(`Slowest: ${slowestDuration} ms`);