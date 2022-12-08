const fs = require("fs");
const str = fs.readFileSync("input.txt").toString();
for (i in str) {
  let arr = str.substring(i, parseInt(i) + 4).split("");
  if (!arr.some((v, i) => arr.indexOf(v) < i)) {
    console.log(parseInt(i) + 4);
    break;
  }
}
//part2

for (i in str) {
  let arr = str.substring(i, parseInt(i) + 14).split("");
  if (!arr.some((v, i) => arr.indexOf(v) < i)) {
    console.log(parseInt(i) + 14);
    break;
  }
}
