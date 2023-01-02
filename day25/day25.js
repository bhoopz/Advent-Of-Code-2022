const fs = require("fs");
const array = fs
  .readFileSync("input.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const everyChar = "=-012";
let sum = 0;
for (line of array) {
  sum += line
    .split("")
    .map((c) => everyChar.indexOf(c) - 2)
    .reduce((a, b) => 5 * a + b);
}

let s = "";
function decToSnaf(dec) {
  if (dec == 0) return s;
  s = "012=-"[dec % 5] + s;
  dec % 5 < 3 ? (dec -= dec % 5) : (dec += (dec % 5) - 1);
  dec = Math.floor(dec / 5);
  decToSnaf(dec);
  return s;
}
console.log(decToSnaf(sum));
