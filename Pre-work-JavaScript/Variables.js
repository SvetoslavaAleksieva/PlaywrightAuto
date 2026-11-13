//Variables: let and const
const testName = 'Login with valid user';
let retries = 0;
retries = retries + 1;        // OK: let can change
console.log(retries);         // Ще отпечата: 1
 
testName = 'Another test';    // TypeError: Assignment
                              //   to constant variable.
