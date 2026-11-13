//1
console.log('hi'); //Error: consol is not defined , line 1

//2

const results = [
  { name: 'Login', status: 'passed', durationMs: 1800 },
  { name: 'Search', status: 'failed', durationMs: 4200 },
  { name: 'Profile', status: 'skipped', durationMs: 0 },
  { name: 'Checkout', status: 'passed', durationMs: 3500 },
  { name: 'Logout', status: 'passed', durationMs: 600 },
];

const r = results[1]; //Note: The array has 5 elemets 0 to 4
console.log(r.status);  // Error: Cannot read properties of undefined (reading 'status') , line 11

//3
if (1 > 0) {console.log('yes')}; //Unexpected token '{' , line ???

//4
for (let i = 1; i <=5; i++) {
    console.log(i);
}  //Using i < 5 missed the 5
