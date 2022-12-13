const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

let HCords = [0, 0];
let TCords = [0, 0];
let allTCords = [];
for (line in array) {
  let direction = array[line].split(" ")[0];
  let steps = array[line].split(" ")[1];
  for (let i = 0; i < steps; i++) {
    if (direction == "L") {
      HCords[0]--;
      if (distanceCalculate(HCords, TCords) == 2) TCords[0]--;
      else if (distanceCalculate(HCords, TCords) > 2) {
        TCords[0] = HCords[0] + 1;
        TCords[1] = HCords[1];
      }
    }
    if (direction == "R") {
      HCords[0]++;
      if (distanceCalculate(HCords, TCords) == 2) TCords[0]++;
      else if (distanceCalculate(HCords, TCords) > 2) {
        TCords[0] = HCords[0] - 1;
        TCords[1] = HCords[1];
      }
    }
    if (direction == "U") {
      HCords[1]++;
      if (distanceCalculate(HCords, TCords) == 2) TCords[1]++;
      else if (distanceCalculate(HCords, TCords) > 2) {
        TCords[0] = HCords[0];
        TCords[1] = HCords[1] - 1;
      }
    }
    if (direction == "D") {
      HCords[1]--;
      if (distanceCalculate(HCords, TCords) == 2) TCords[1]--;
      else if (distanceCalculate(HCords, TCords) > 2) {
        TCords[0] = HCords[0];
        TCords[1] = HCords[1] + 1;
      }
    }

    if (!allTCords.some((row) => row.toString() === TCords.toString()))
      allTCords.push(JSON.parse(JSON.stringify(TCords)));
  }
}

function distanceCalculate(HCords, TCords) {
  let distance = Math.sqrt(
    Math.pow(HCords[0] - TCords[0], 2) + Math.pow(HCords[1] - TCords[1], 2)
  );
  return distance;
}

console.log(allTCords.length);
