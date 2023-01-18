const fs = require("fs");
let str = fs
  .readFileSync("input.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n")
  .toString();

function getRock(turn, y) {
  if (turn == 0)
    return new Set([
      [2, y],
      [3, y],
      [4, y],
      [5, y],
    ]);
  else if (turn == 1)
    return new Set([
      [3, y + 2],
      [2, y + 1],
      [3, y + 1],
      [4, y + 1],
      [3, y],
    ]);
  else if (turn == 2)
    return new Set([
      [2, y],
      [3, y],
      [4, y],
      [4, y + 1],
      [4, y + 2],
    ]);
  else if (turn == 3)
    return new Set([
      [2, y],
      [2, y + 1],
      [2, y + 2],
      [2, y + 3],
    ]);
  else if (turn == 4)
    return new Set([
      [2, y + 1],
      [2, y],
      [3, y + 1],
      [3, y],
    ]);
}

function moveLeft(rock) {
  let min = Math.min(...Array.from(rock).map((arr) => arr[0]));
  let newRock = rock;
  if (min > 0) {
    newRock = new Set([...rock].map(([x, y]) => [x - 1, y]));
  }
  return newRock;
}

function moveRight(rock) {
  let max = Math.max(...Array.from(rock).map((arr) => arr[0]));
  let newRock = rock;
  if (max < 6) {
    newRock = new Set([...rock].map(([x, y]) => [x + 1, y]));
  }
  return newRock;
}

function moveDown(rock) {
  let newRock = new Set([...rock].map(([x, y]) => [x, y - 1]));
  return newRock;
}

function reachGround(rock, ground) {
  let lower = moveDown(new Set([...rock]));

  for (const [x, y] of lower) {
    const piece = JSON.stringify([x, y]);
    if (ground.has(piece)) {
      return true;
    }
  }
  return false;
}

function rockBlocked(rock, ground, side) {
  let fromRight = moveRight(new Set([...rock]));
  let fromLeft = moveLeft(new Set([...rock]));

  if (side) {
    for (const [x, y] of fromRight) {
      const piece = JSON.stringify([x, y]);
      if (ground.has(piece)) {
        return true;
      }
    }
  } else {
    for (const [x, y] of fromLeft) {
      const piece = JSON.stringify([x, y]);
      if (ground.has(piece)) {
        return true;
      }
    }
  }

  return false;
}

function simulate() {
  let turn = 0;
  let i = 0;
  let ground = new Set(Array.from({ length: 7 }, (_, i) => [i, 0]));
  ground = new Set([...ground].map((value) => JSON.stringify(value)));
  while (turn < 2022) {
    const highestY = Math.max(
      ...Array.from(ground).map((arr) => JSON.parse(arr)[1])
    );
    let rock = getRock(turn % 5, highestY + 4);
    while (true) {
      if (str[i % str.length] == ">") {
        rockBlocked(rock, ground, true) ? null : (rock = moveRight(rock));
      } else {
        rockBlocked(rock, ground, false) ? null : (rock = moveLeft(rock));
      }
      i++;

      if (reachGround(rock, ground)) {
        for (const item of rock) {
          ground.add(JSON.stringify(item));
        }
        break;
      } else {
        rock = moveDown(rock);
      }
    }
    turn++;
  }

  return Math.max(...Array.from(ground).map((arr) => JSON.parse(arr)[1]));
}

console.log(simulate());
