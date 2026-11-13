const durationMs = 800 // test with 800, 1000, 3000 and 3001

 if (durationMs > 3000) {
    console.log('Slow');
} else if (durationMs < 1000) {
    console.log('Fast');
} else {
    console.log('OK');
}

const status ='test'; 

switch (status) {
    case 'passed': console.log('PASS'); break;
    case 'failed': console.log('FAIL'); break;
    case 'skipped': console.log('SKIP'); break;
    default: console.log('UNKNOWN');
}

