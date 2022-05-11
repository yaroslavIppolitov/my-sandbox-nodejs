const args = process.argv;
const mode = process.env.mode;
const platform = process.platform;
let a, b, c;
let isWindows = platform.search("win");
let nodePath = "";
let scriptPath = "";
const path = require("path");
const fs = require("fs");
const resultFilePath = path.join(path.dirname(process.argv[1]), "log.txt");

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkOS() {
  if (isWindows === -1) {
    isWindows = false;
  } else {
    isWindows = true;
  }
}

function fullfillPaths() {
  if (isWindows) {
    nodePath = args[0].split("\\").pop();
    scriptPath = args[1].split("\\").pop();
    nodePath = nodePath.replace(".exe", "");
  } else {
    nodePath = args[0].split("/").pop();
    scriptPath = args[1].split("/").pop();
  }
}

function printGreeting() {
  // console.log(
  //   "Для решения квадртаного уравнения aх^2+bx+c = 0 задайте коэффициенты a, b, c, как аргументы скрипта."
  // );
  console.log(
    `Для решения квадртаного уравнения  введите команду ${nodePath} ${scriptPath}`
  );
  console.log(
    `Для детального отображения решения используйте параметр MODE=details`
  );
}

function calculateEquation() {
  if (a === undefined || b === undefined || c === undefined) {
    process.exit(1);
  }
  if (a == 0) {
    if (b == 0) {
      result = `Заданы некорректные параметры.`;
      console.log(result);
      writeToLog(result);
      process.exit(3);
    }
    const x = -c / b;
    if (mode == "details") {
      console.log(`x = ${-c} /${b} = ${x}`);
    }
    result = `Ответ: x = ${x}.`;
    console.log(result);
    writeToLog(result);

    process.exit(0);
  }

  const D = Math.pow(b, 2) - 4 * a * c;
  if (mode == "details") {
    console.log(`D = ${b}^2 - 4*${a}*${c} = ${D}`);
  }
  if (D < 0) {
    result = "Корней нет.";
    console.log(result);
    writeToLog(result);
  } else if (D === 0) {
    const x = -b / (2 * a);
    if (mode == "details") {
      console.log(`x = -${b}/(2 * ${a}) = ${x}`);
    }
    result = `Ответ: x = ${x}.`;
    console.log(result);
    writeToLog(result);
  } else if (D > 0) {
    const x1 = (-b + Math.sqrt(D)) / (2 * a);
    const x2 = (-b - Math.sqrt(D)) / (2 * a);
    if (mode == "details") {
      console.log(`x1 = -${b} + sqrt(${D})/(2 * ${a}) = ${x1}`);
      console.log(`x2 = -${b} - sqrt(${D})/(2 * ${a}) = ${x2}`);
    }
    result = `Ответ: x1 = ${x1}, x2 = ${x2}.`;
    console.log(result);
    writeToLog(result);
  }
  process.exit(0);
}
function writeToLog(logString) {
  logString = logString + "\n";
  fs.writeFileSync(resultFilePath, logString, { flag: "a" });
}
function fullfullA(answer) {
  a = answer;
  const logA = `a = ${a}`;
  writeToLog(logA);
  rl.question("Enter b:", fullfullB);
}

function fullfullB(answer) {
  b = answer;
  const logB = `b = ${b}`;
  writeToLog(logB);
  rl.question("Enter c:", fullfullC);
}

function fullfullC(answer) {
  c = answer;
  const logC = `c = ${c}`;
  writeToLog(logC);

  calculateEquation();
  rl.on("close", () => {
    console.log(`Done. Result file: ${resultFilePath}`);
  });
}

function showUserDialog() {
  fs.unlinkSync(resultFilePath);
  rl.question("Enter a:", fullfullA);
}

function main() {
  checkOS();
  fullfillPaths();
  printGreeting();
  showUserDialog();
}

main();
