const fs = require("fs");
const array = fs.readFileSync("input.txt").toString().split("\n");
let array2 = [[], [], [], [], [], [], [], [], []];
for (let i = 7; i >= 0; i--) {
  let index = 0;
  for (j = 1; j <= array[i].length; j = j + 4) {
    if (array[i].charAt(j) != " ") {
      array2[index].push(array[i].charAt(j));
    }
    index++;
  }
}

for (let i = 10; i < array.length; i++) {
  let temp = [];
  for (let j = 0; j < array[i].split(" ")[1]; j++) {
    let poped = array2[array[i].split(" ")[3] - 1].pop();
    temp.push(poped);
  }
  const tempLength = temp.length;
  for (let j = 0; j < tempLength; j++) {
    let poped2 = temp.shift();
    //part2 change  ^ shift to pop ^
    array2[array[i].split(" ")[5] - 1].push(poped2);
  }
}
let s = "";
for (let i = 0; i <= array2.length; i++) {
  if (array2[i] != undefined) {
    let p = array2[i].pop();
    s += p;
  }
}
console.log(s);
