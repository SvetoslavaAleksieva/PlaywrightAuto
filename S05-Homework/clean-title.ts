const text = '   broken STREET light   '.trim();
const lower = text.toLowerCase();
const upper = text.toUpperCase();
const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
const hasLight = lower.includes('light');
const replaced = lower.replace('street', 'road');

console.log(`Trimmed: ${text}`);
console.log(`Lower case: ${lower}`);
console.log(`Upper case: ${upper}`);
console.log(`Capitalized: ${capitalized}`);
console.log(`Mentions "light": ${hasLight}`);
console.log(`Replaced: ${replaced}`);