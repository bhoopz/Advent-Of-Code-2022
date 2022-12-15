const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

let cycle = 0;
let x = 1;
let signalStrength = 0;
const set = new Set([20, 60, 100, 140, 180, 220]);
const arr = [...Array(6)].map(() => [...Array(40)]);
for (line in array) {
  if (array[line].replaceAll("\r", "").split(" ")[0] == "noop") {
    cycle++;
    if (set.has(cycle)) {
      signalStrength += cycle * x;
    }
    checker(cycle, x, arr);
  } else {
    for (let i = 0; i < 2; i++) {
      cycle++;
      if (set.has(cycle)) {
        signalStrength += cycle * x;
      }
      checker(cycle, x, arr);
    }
    x += parseInt(array[line].split(" ")[1]);
  }
}

function checker(cycle, x, arr) {
  const c = cycle - 1;
  if (x == c % 40 || x + 1 == c % 40 || x - 1 == c % 40) {
    arr[Math.floor(c / 40)][c % 40] = "#";
  } else arr[Math.floor(c / 40)][c % 40] = ".";
}
console.log(signalStrength);
for (i in arr) {
  console.log(arr[i].join(""));
}
