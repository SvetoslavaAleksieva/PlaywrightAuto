// Generate test data: 10 request titles "Test request 01" … "Test request 10" with priorities cycling 1–5
let priority = 1;

for (let number = 1; number <= 10; number++) {  
  let numberText = "";
  if (number < 10) {
    numberText = "0" + number;
  } else {
    numberText = "" + number;
  }

  const title = `Test request ${numberText}`;
  console.log(`${title} - priority ${priority}`);

  priority = priority + 1;
  if (priority > 5) {
    priority = 1;
  }
}