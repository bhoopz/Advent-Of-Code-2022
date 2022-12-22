const fs = require("fs");
const array = fs
  .readFileSync("input.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const rock = new Set([]);
let lowest = 0;
for (line in array) {
  let former = [];
  const arr = array[line].split("->");
  for (i in arr) {
    const x = Number(arr[i].split(",")[0]);
    const y = Number(arr[i].split(",")[1]);
    lowest = Math.max(lowest, y);
    if (former.length > 0) {
      if (x != former[0]) {
        for (
          let i = former[0];
          x > former[0] ? i <= x : i >= x;
          x > former[0] ? i++ : i--
        ) {
          rock.add(JSON.stringify([i, y]));
        }
      } else {
        for (
          let i = former[1];
          y > former[1] ? i <= y : i >= y;
          y > former[1] ? i++ : i--
        ) {
          rock.add(JSON.stringify([x, i]));
        }
      }
    }
    former = [x, y];
  }
}
function calculate(part) {
  let grainOfSand = 0;
  while (true) {
    let sand = [500, 0];
    while (true) {
      if (rock.has(JSON.stringify([500, 0]))) {
        return grainOfSand;
      }
      if (sand[1] == lowest + 1 && part == 2) {
        rock.add(JSON.stringify(sand));
        grainOfSand++;
        break;
      } else if (!rock.has(JSON.stringify([sand[0], sand[1] + 1]))) {
        sand[1]++;
        if (sand[1] >= lowest && part == 1) {
          return grainOfSand;
        }
      } else if (!rock.has(JSON.stringify([sand[0] - 1, sand[1] + 1]))) {
        sand[0]--;
        sand[1]++;
      } else if (!rock.has(JSON.stringify([sand[0] + 1, sand[1] + 1]))) {
        sand[0]++;
        sand[1]++;
      } else {
        rock.add(JSON.stringify(sand));
        grainOfSand++;
        break;
      }
    }
  }
}
console.log(calculate(1));
console.log(calculate(2));
