const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");
let pairs = 0;
let overlaps = 0;
for (line in array) {
  if (array[line]) {
    const aA = parseInt(array[line].split(",")[0].split("-")[0]);
    const aB = parseInt(array[line].split(",")[0].split("-")[1]);
    const bA = parseInt(array[line].split(",")[1].split("-")[0]);
    const bB = parseInt(array[line].split(",")[1].split("-")[1]);
    if ((aA >= bA && aB <= bB) || (bA >= aA && bB <= aB)) pairs++;

    //part2
    if (aB >= bA && bB >= aA) overlaps++;
  }
}

console.log(pairs);
console.log(overlaps);
