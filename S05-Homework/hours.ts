const slaHours = 30;
const days = Math.floor(slaHours / 24);
const remainingHours = slaHours % 24;
const minutes = slaHours * 60;

console.log(`${slaHours} hours = ${days} day(s) and ${remainingHours} hour(s)`);
console.log(`${slaHours} hours = ${minutes} minutes`);

let openRequests = 5;
openRequests = openRequests + 3;
openRequests = openRequests - 2;

console.log(`Open requests: ${openRequests}`);