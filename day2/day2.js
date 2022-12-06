const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");
let score = 0;
let score2 = 0;
const allConditions = {
  "A X": 3,
  "A Y": 6,
  "A Z": 0,
  "B X": 0,
  "B Y": 3,
  "B Z": 6,
  "C X": 6,
  "C Y": 0,
  "C Z": 3,
};

const allConditions2 = {
  "A X": 3,
  "A Y": 1,
  "A Z": 2,
  "B X": 1,
  "B Y": 2,
  "B Z": 3,
  "C X": 2,
  "C Y": 3,
  "C Z": 1,
};
for (line in array) {
  if (array[line] != "") {
    score += allConditions[array[line]];
    if (array[line].includes("X")) score += 1;
    if (array[line].includes("Y")) score += 2;
    if (array[line].includes("Z")) score += 3;

    score2 += allConditions2[array[line]];
    if (array[line].includes("X")) score2 += 0;
    if (array[line].includes("Y")) score2 += 3;
    if (array[line].includes("Z")) score2 += 6;
  }
}

console.log(score);
console.log(score2);
