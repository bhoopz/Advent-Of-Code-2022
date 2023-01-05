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
let part2 = 0;
for (item of set) {
  JSON.parse(item).map((i, index) => {
    for (d of [-1, 1]) {
      let newI = i + d;
      if (index == 0) {
        let temp = [newI, JSON.parse(item)[1], JSON.parse(item)[2]];
        if (set.has(JSON.stringify(temp))) walls--;
        if (bfs(temp)) part2++;
      } else if (index == 1) {
        let temp = [JSON.parse(item)[0], newI, JSON.parse(item)[2]];
        if (set.has(JSON.stringify(temp))) walls--;
        if (bfs(temp)) part2++;
      } else {
        let temp = [JSON.parse(item)[0], JSON.parse(item)[1], newI];
        if (set.has(JSON.stringify(temp))) walls--;
        if (bfs(temp)) part2++;
      }
    }
  });
}

function bfs(start) {
  const queue = [];
  queue.push(start);
  const seen = new Set();
  while (queue.length > 0) {
    let [x, y, z] = queue.shift();
    if (
      set.has(JSON.stringify([x, y, z])) ||
      seen.has(JSON.stringify([x, y, z]))
    )
      continue;
    seen.add(JSON.stringify([x, y, z]));
    if (seen.size > 1400) return true;
    queue.push([x - 1, y, z]);
    queue.push([x + 1, y, z]);
    queue.push([x, y - 1, z]);
    queue.push([x, y + 1, z]);
    queue.push([x, y, z - 1]);
    queue.push([x, y, z + 1]);
  }
  return false;
}

console.log(walls);
console.log(part2);
