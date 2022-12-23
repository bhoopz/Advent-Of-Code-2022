const fs = require("fs");
const array = fs
  .readFileSync("test.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const Y = 10;
const allIntervals = new Set([]);
const allYBeacons = new Set([]);
const allDiagonals = new Set([]);
for (line in array) {
  sensorCords = array[line].match(/\d+/g).slice(0, 2);
  beaconCords = array[line].match(/\d+/g).slice(2);
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
  //   for (let x = sensorCords[0] - mDist; x <= sensorCords[0] + mDist; x++) {
  //     for (let y = sensorCords[1] - mDist; y <= sensorCords[1] + mDist; y++) {
  //       if (
  //         Math.abs(x - sensorCords[0]) + Math.abs(y - sensorCords[1]) ==
  //         mDist
  //       ) {
  //         allDiagonals.add(JSON.stringify([x, y]));
  //       }
  //     }
  //   }
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

// function part2() {
//   let maxPoint = null;
//   let maxCount = 0;
//   const array = Array.from(allDiagonals);
//   const direction = [
//     [1, 0],
//     [0, 1],
//     [-1, 0],
//     [0, -1],
//   ];
//   //console.log(array);
//   for (const point of array) {
//     let count = 0;
//     for (const dir of direction) {
//       const newPoint = [
//         JSON.parse(point)[0] + dir[0],
//         JSON.parse(point)[1] + dir[1],
//       ];

//       if (allDiagonals.has(JSON.stringify(newPoint))) {
//         console.log(newPoint);
//         count++;
//       }
//     }
//     if (count > maxCount) {
//       maxCount = count;
//       maxPoint = point;
//     }
//   }

//   return maxPoint;
// }
// console.log(part2());
console.log(allIntervals.size - allYBeacons.size);
