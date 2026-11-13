let attempt = 1;
while (attempt <= 5) {
  const ok = attempt === 3;
  console.log(`Attempt ${attempt}:`, ok);
  if (ok) {
    break;               // stop retrying
  }
  attempt++;
}
