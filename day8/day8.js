const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

let arr = [];
let visibleTrees = 0;
let maxRange = 0;
for (line in array) {
  arr.push(array[line].replaceAll("\r", "").split(""));
}
for (i in arr) {
  for (j in arr[i]) {
    if (i == 0 || j == 0 || i == arr.length - 1 || j == arr[i].length - 1)
      visibleTrees++;
    else {
      if (
        horizontalCheck(arr, arr[i][j], parseInt(i), parseInt(j))[0] ||
        verticalCheck(arr, arr[i][j], parseInt(i), parseInt(j))[0]
      ) {
        visibleTrees++;
        maxRange = Math.max(
          maxRange,
          horizontalCheck(arr, arr[i][j], parseInt(i), parseInt(j))[1] *
            verticalCheck(arr, arr[i][j], parseInt(i), parseInt(j))[1]
        );
      }
    }
  }
}

function horizontalCheck(arr, point, pointY, pointX) {
  leftRange = 1;
  rightRange = 1;
  for (var left = pointX - 1; left > -1; left--) {
    if (point > arr[pointY][left]) leftRange++;
    else break;
  }
  for (var right = pointX + 1; right < arr[pointY].length; right++) {
    if (point > arr[pointY][right]) rightRange++;
    else break;
  }
  if (left == -1) leftRange--;
  if (right == arr[pointY].length) rightRange--;
  if (left == -1 || right == arr[pointY].length)
    return [true, leftRange * rightRange];
  else return [false, leftRange * rightRange];
}
function verticalCheck(arr, point, pointY, pointX) {
  upRange = 1;
  downRange = 1;
  for (var up = pointY - 1; up > -1; up--) {
    if (point > arr[up][pointX]) upRange++;
    else break;
  }
  for (var down = pointY + 1; down < arr.length; down++) {
    if (point > arr[down][pointX]) downRange++;
    else break;
  }
  if (up == -1) upRange--;
  if (down == arr.length) downRange--;
  if (up == -1 || down == arr.length) return [true, upRange * downRange];
  else return [false, upRange * downRange];
}
console.log(visibleTrees);
console.log(maxRange);
