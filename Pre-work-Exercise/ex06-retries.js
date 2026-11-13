for (let run = 1; run <= 5; run++) {
 console.log(`Run ${run} of 5`);
}


let attempt  = 1;
while (attempt <= 5) {
    const ok = attempt === 4;
    console.log(`Attempt ${attempt}:` , ok);
    if(ok) {
        break;
    }
    attempt++;
}