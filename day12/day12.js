const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

const arr = [];
for (line in array) {
  arr.push(array[line].replace(/\r/g, ""));
}

for (i in arr) {
  for (item in arr[i]) {
    if (arr[i][item] == "S") {
      startingPoint = [Number(i), Number(item)];
      arr[i] = arr[i].replace("S", "a");
    }
    if (arr[i][item] == "E") {
      endingPoint = [i, item];
      arr[i] = arr[i].replace("E", "z");
    }
  }
}

function breadthFirstSearch(start, end, part) {
  const queue = [];
  for (i in arr) {
    for (item in arr[i]) {
      if (arr[i][item] == "a" && part == 2) {
        start = [Number(i), Number(item)];
        start.push(0);
        queue.push(start);
      }
    }
  }

  start.push(0);
  queue.push(start);

  const set = new Set([]);

  while (queue.length > 0) {
    let [row, col, step] = queue.shift();

    if (row == end[0] && col == end[1]) {
      return step;
    }
    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    for (const [directionsRow, directionsCol] of directions) {
      const newRow = row + directionsRow;
      const newCol = col + directionsCol;
      if (
        0 <= newRow &&
        newRow < arr.length &&
        0 <= newCol &&
        newCol < arr[0].length &&
        arr[newRow][newCol].charCodeAt(0) <= 1 + arr[row][col].charCodeAt(0)
      ) {
        if (!set.has([newRow, newCol].toString())) {
          set.add([newRow, newCol].toString());
          queue.push([newRow, newCol, step + 1]);
        }
      }
    }
  }
}

console.log(breadthFirstSearch(startingPoint, endingPoint, 1));
console.log(breadthFirstSearch(startingPoint, endingPoint, 2));
