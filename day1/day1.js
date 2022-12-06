const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");
let calories = 0;
let arrayOfCalories = [];
for (line in array) {
  if (array[line] != "") {
    calories += parseInt(array[line]);
  } else {
    arrayOfCalories.push(calories);
    calories = 0;
  }
}
arrayOfCalories.sort(function (a, b) {
  return b - a;
});
console.log(arrayOfCalories[0]);
console.log(arrayOfCalories[0] + arrayOfCalories[1] + arrayOfCalories[2]);
