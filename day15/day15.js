const fs = require("fs");
const array = fs
  .readFileSync("input.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const Y = 2000000;
const allIntervals = new Set([]);
const allYBeacons = new Set([]);
const ascLines = [];
const descLines = [];

for (line in array) {
  sensorCords = array[line].match(/-?\d+/g).slice(0, 2);
  beaconCords = array[line].match(/-?\d+/g).slice(2);
  sensorCords = sensorCords.map((item) => parseInt(item));
  beaconCords = beaconCords.map((item) => parseInt(item));
  mDist =
    Math.abs(beaconCords[0] - sensorCords[0]) +
    Math.abs(beaconCords[1] - sensorCords[1]);
  if (beaconCords[1] == Y) allYBeacons.add(JSON.stringify(beaconCords));
  if (sensorCords[1] > Y) {
    if (sensorCords[1] - mDist <= Y) addIntervals();
  } else {
    if (sensorCords[1] + mDist >= Y) addIntervals();
  }

  ascLines.push(
    sensorCords[0] - sensorCords[1] - mDist,
    sensorCords[0] - sensorCords[1] + mDist
  );
  descLines.push(
    sensorCords[0] + sensorCords[1] - mDist,
    sensorCords[0] + sensorCords[1] + mDist
  );
}

function addIntervals() {
  sYYdist = Math.abs(sensorCords[1] - Y);
  for (let i = sensorCords[0]; i <= sensorCords[0] + (mDist - sYYdist); i++) {
    allIntervals.add(JSON.stringify([i, Y]));
  }
  for (let i = sensorCords[0]; i >= sensorCords[0] - (mDist - sYYdist); i--) {
    allIntervals.add(JSON.stringify([i, Y]));
  }
}

function part2() {
  let asc = null;
  let desc = null;
  for (let i = 0; i < ascLines.length; i++) {
    for (let j = i + 1; j < ascLines.length; j++) {
      const a = ascLines[i];
      const b = ascLines[j];
      if (Math.abs(a - b) == 2) asc = Math.min(a, b) + 1;

      const x = descLines[i];
      const y = descLines[j];
      if (Math.abs(x - y) == 2) desc = Math.min(x, y) + 1;
    }
  }

  return Math.floor((asc + desc) / 2) * 4000000 + Math.floor((desc - asc) / 2);
}

console.log(allIntervals.size - allYBeacons.size);

console.log(part2());
