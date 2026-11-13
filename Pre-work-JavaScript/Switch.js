const status = 'skipped';
 
switch (status) {
  case 'passed': console.log('PASS'); break;
  case 'failed': console.log('FAIL'); break;
  default:       console.log('SKIP');
}
 
const label = status === 'passed' ? 'OK' : 'CHECK';
