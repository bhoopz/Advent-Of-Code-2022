const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");
let score = 0;
for (line in array) {
  if (array[line]) {
    const first = array[line].substring(0, array[line].length / 2).split("");
    const second = array[line].substring(array[line].length / 2).split("");
    const char = first.filter((value) => second.includes(value))[0];

    if (char == char.toLocaleLowerCase()) {
      score += char.charCodeAt() - 96;
    } else {
      score += char.charCodeAt() - 38;
    }
  }
}
console.log(score);
//part2
let score2 = 0;
for (let i = 0; i < array.length; i++) {
  if (i % 3 == 0 && array[i]) {
    const first = array[i].split("");
    const second = array[i + 1].split("");
    const third = array[i + 2].split("");

    const char = first.filter((value1) =>
      second.filter((value2) => third.includes(value2)).includes(value1)
    )[0];
    if (char == char.toLocaleLowerCase()) {
      score2 += char.charCodeAt() - 96;
    } else {
      score2 += char.charCodeAt() - 38;
    }
  }
}
console.log(score2);
