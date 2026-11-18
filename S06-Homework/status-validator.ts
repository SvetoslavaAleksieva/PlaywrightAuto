// Write a request status validator: given the current and the next status
// print whether the transition is allowed (Submitted → In Review → Resolved; In Review → Waiting for Info → In Review)

const submitted = "Submitted";
const inReview = "In Review";
const waitingForInfo = "Waiting for Info";
const resolved = "Resolved";

function checkTransition(current: string, next: string): void {
  let allowed = false;

  if (current === "Submitted") {   
    if (next === "In Review") {
      allowed = true;
    }
  } else if (current === "In Review") {    
    if (next === "Resolved" || next === "Waiting for Info") {
      allowed = true;
    }
  } else if (current === "Waiting for Info") {   
    if (next === "In Review") {
      allowed = true;
    }
  } else if (current === "Resolved") {
      allowed = false;
  }

  if (allowed) {
    console.log(`${current} -> ${next}: allowed`);
  } else {
    console.log(`${current} -> ${next}: not allowed`);
  }
}

// Examples
checkTransition(submitted, inReview);      // allowed
checkTransition(inReview, waitingForInfo); // allowed
checkTransition(submitted, resolved);      // not allowed
