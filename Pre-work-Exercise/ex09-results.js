const results = [
    { name: 'Login', status: 'passed', durationMs: 1800 },
    { name: 'Search', status: 'failed', durationMs: 4200},
    { name: 'Profile', status: 'skipped', durationMs: 0},
    { name: 'Checkout', status: 'passed', durationMs: 3500 },
    { name: 'Logout', status: 'passed', durationMs: 600 },
];

function summarise(testResults) {
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    for (const test of testResults) {
        if (test.status === 'passed') passed++;
        else if (test.status === 'failed') failed++;
        else if (test.status === 'skipped') skipped++;
    }
    
    return { passed, failed, skipped };
}

function slowestTest(testResults) {
    if (testResults.length === 0) return null;

    let slowest = testResults[0];

    for (const test of testResults) {
        if (test.durationMs > slowest.durationMs) {
            slowest = test;
        }
    }

    return slowest.name;
}

console.log(summarise(results));
console.log(`Slowest: ${slowestTest(results)}`);