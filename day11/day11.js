const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

const startingItems = [];
const operation = [];
const divisibility = [];
const ifTrue = [];
const ifFalse = [];
const inspections = [];
let n = 0;
for (line in array) {
  if (line % 7 == 1) {
    startingItems.push(array[line].match(/\d+/g));
    inspections.push(0);
  }
  if (line % 7 == 2) {
    operation.push(array[line].split("= ")[1]);
  }
  if (line % 7 == 3) {
    divisibility.push(array[line].match(/\d+/g));
  }
  if (line % 7 == 4) {
    ifTrue.push(array[line].match(/\d+/g));
  }
  if (line % 7 == 5) {
    ifFalse.push(array[line].match(/\d+/g));
  }
}

let leastCommonMultiple = 1;
for (item of divisibility) {
  leastCommonMultiple *= item;
}
let y = 1337;
for (part of [1, 2]) {
  if (part == 1) y = 20;
  else y = 10000;

  for (let x = 0; x < y; x++) {
    for (i in startingItems) {
      for (item of startingItems[i]) {
        n = eval(operation[i].replace(/old/g, item));
        if (part == 1) n = Math.floor(n / 3);
        n %= leastCommonMultiple;
        if (n % divisibility[i] == 0) startingItems[ifTrue[i]].push(n);
        else startingItems[ifFalse[i]].push(n);
        inspections[i]++;
      }
      startingItems[i] = [];
    }
  }
  inspections.sort((a, b) => b - a);
  console.log(inspections[0] * inspections[1]);
}
