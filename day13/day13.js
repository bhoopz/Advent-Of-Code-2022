const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

let pair = 1;
let sum = 0;
const allPackets = [];
for (line in array) {
  if (line % 3 == 0) {
    var left = JSON.parse(array[line]);
    var right = JSON.parse(array[Number(line) + 1]);
  } else if (line % 3 == 1) {
    if (compare(left, right)) {
      sum += pair;
    }
    pair++;
    allPackets.push(left);
    allPackets.push(right);
  }
}
allPackets.push([[2]]);
allPackets.push([[6]]);

function compare(left, right) {
  if (typeof left == "object" && typeof right == "object") {
    let l = Math.max(left.length, right.length);
    for (let i = 0; i < l; i++) {
      result = compare(left[i], right[i]);
      if (result == true) return result;
      else if (result == false) return result;
      else if (result == -1) continue;
    }
  } else if (typeof left == "object" && typeof right == "number") {
    return compare(left, [right]);
  } else if (typeof left == "number" && typeof right == "object") {
    return compare([left], right);
  } else {
    if (left > right) return false;
    else if (left < right) return true;
    else if (right == undefined) return false;
    else if (left == undefined) return true;
    else return -1;
  }
}

console.log(sum);

allPackets.sort((a, b) => {
  return compare(a, b) ? -1 : 1;
});
let a = 0;
let b = 0;
allPackets.map((item, index) => {
  if (item.toString() == [[2]].toString()) a = index + 1;
  if (item.toString() == [[6]].toString()) b = index + 1;
});
console.log(a * b);
