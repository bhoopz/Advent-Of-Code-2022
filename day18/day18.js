const fs = require("fs");
const array = fs
  .readFileSync("input.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const set = new Set([]);
for (line of array) {
  set.add(JSON.stringify(line.split(",").map((x) => parseInt(x))));
}
let walls = set.size * 6;

for (item of set) {
  JSON.parse(item).map((i, index) => {
    for (d of [-1, 1]) {
      let newI = i + d;
      if (index == 0) {
        let temp = [newI, JSON.parse(item)[1], JSON.parse(item)[2]];
        if (set.has(JSON.stringify(temp))) walls--;
      } else if (index == 1) {
        let temp = [JSON.parse(item)[0], newI, JSON.parse(item)[2]];
        if (set.has(JSON.stringify(temp))) walls--;
      } else {
        let temp = [JSON.parse(item)[0], JSON.parse(item)[1], newI];
        if (set.has(JSON.stringify(temp))) walls--;
      }
    }
  });
}
let xd = 0;
for (let x = 0; x <= 21; x++) {
  for (let y = 0; y <= 21; y++) {
    for (let z = 0; z <= 21; z++) {
      if (
        !set.has(JSON.stringify([x, y, z])) //&&
        // set.has(JSON.stringify([x - 1, y, z])) &&
        // set.has(JSON.stringify([x + 1, y, z])) &&
        // set.has(JSON.stringify([x, y - 1, z])) &&
        // set.has(JSON.stringify([x, y + 1, z])) &&
        // set.has(JSON.stringify([x, y, z - 1])) &&
        // set.has(JSON.stringify([x, y, z + 1]))
      )
        xd++;
    }
  }
}

console.log(walls);
console.log(walls - xd * 6);
