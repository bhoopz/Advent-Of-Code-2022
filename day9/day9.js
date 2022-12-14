const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

let HCords = [0, 0];
let TCords = Array.from({ length: 9 }, () => [0, 0]);
const set1 = new Set();
const set2 = new Set();
for (line in array) {
  let direction = array[line].split(" ")[0];
  let steps = array[line].split(" ")[1];

  for (let i = 0; i < steps; i++) {
    for (let item = 0; item < TCords.length; item++) {
      if (direction == "L") {
        if (item == 0) {
          HCords[0]--;
          TCords[item] = fixLocation(HCords, TCords[item]);
        } else TCords[item] = fixLocation(TCords[item - 1], TCords[item]);
      }
      if (direction == "R") {
        if (item == 0) {
          HCords[0]++;
          TCords[item] = fixLocation(HCords, TCords[item]);
        } else TCords[item] = fixLocation(TCords[item - 1], TCords[item]);
      }
      if (direction == "U") {
        if (item == 0) {
          HCords[1]++;
          TCords[item] = fixLocation(HCords, TCords[item]);
        } else TCords[item] = fixLocation(TCords[item - 1], TCords[item]);
      }
      if (direction == "D") {
        if (item == 0) {
          HCords[1]--;
          TCords[item] = fixLocation(HCords, TCords[item]);
        } else TCords[item] = fixLocation(TCords[item - 1], TCords[item]);
      }

      set1.add(TCords[0].toString());
      set2.add(TCords[8].toString());
    }
  }
}

console.log(set1.size);
console.log(set2.size);

function fixLocation(HCords, TCords) {
  horizontalDifference = Math.abs(HCords[0] - TCords[0]);
  verticalDifference = Math.abs(HCords[1] - TCords[1]);

  if (horizontalDifference >= 2 && verticalDifference >= 2) {
    if (TCords[0] < HCords[0]) TCords[0] = HCords[0] - 1;
    else TCords[0] = HCords[0] + 1;
    if (TCords[1] < HCords[1]) TCords[1] = HCords[1] - 1;
    else TCords[1] = HCords[1] + 1;
  } else if (horizontalDifference >= 2) {
    if (TCords[0] < HCords[0]) TCords[0] = HCords[0] - 1;
    else TCords[0] = HCords[0] + 1;
    TCords[1] = HCords[1];
  } else if (verticalDifference >= 2) {
    if (TCords[1] < HCords[1]) TCords[1] = HCords[1] - 1;
    else TCords[1] = HCords[1] + 1;
    TCords[0] = HCords[0];
  }
  return TCords;
}
