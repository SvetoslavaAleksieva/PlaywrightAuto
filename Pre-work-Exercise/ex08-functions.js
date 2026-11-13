//1
/*
function isPassed(status) {
    return status === 'passed';
}
console.log(isPassed('passed'));
console.log(isPassed('failed'));
console.log(isPassed('skipped'));
console.log(isPassed('PASSED'));
*/
//2
function classifyDuration(duration){
    if (duration > 3000) {
       return 'Slow';
    } else if (duration < 1000) {
       return 'Fast';
    } else {
       return 'OK';
    }
}

console.log(classifyDuration(800));
console.log(classifyDuration(1000));
console.log(classifyDuration(3000));
console.log(classifyDuration(3001));

//3
function formatResult(name, status = 'passed') {
    return `${name}: ${status.toUpperCase()}`;
}

console.log(formatResult ('Login'));

//4

const isPassed = (status) => status === 'passed';

console.log(isPassed('passed'));
console.log(isPassed('failed'));
console.log(isPassed('skipped'));
console.log(isPassed('PASSED'));