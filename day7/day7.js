const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");

let path = [];
let all = [];
let s = "";
for (line in array) {
  let words = array[line].replaceAll("\r", "").split(" ");
  if (words[1] == "cd") {
    if (words[2] == "..") {
      path.pop();
    } else {
      path.push(words[2]);
    }
  } else if (words[1] == "ls") continue;
  else if (words[0] == "dir") continue;
  else {
    sum = parseInt(words[0]);
    for (let i = 0; i < path.length; i++) {
      s += path[i] + "/";
      for (item in all) {
        if (s == all[item][0]) {
          all[item][1] += sum;
        }
      }
      if (!all.some((row) => row[0] === s)) all.push([s, sum]);
    }
    s = "";
  }
}
let ans = 0;
let ans2 = Infinity;
const needDelete = all[0][1] - (70000000 - 30000000);

for (i in all) {
  if (all[i][1] <= 100000) ans += all[i][1];
  if (all[i][1] >= needDelete) ans2 = Math.min(ans2, all[i][1]);
}
console.log(ans);
console.log(ans2);
