const args = process.argv;
const mode = process.env.mode;
const platform = process.platform;
const a = args[2];
const b = args[3];
const c = args[4];
let isWindows = platform.search("win");
let nodePath = "";
let scriptPath = "";

if (isWindows === -1) {
  isWindows = false;
} else {
  isWindows = true;
}

if (isWindows) {
  nodePath = args[0].split("\\").pop();
  scriptPath = args[1].split("\\").pop();
  nodePath = nodePath.replace(".exe", "");
} else {
  nodePath = args[0].split("/").pop();
  scriptPath = args[1].split("/").pop();
}

if (a === undefined || b === undefined || c === undefined) {
  console.log(
    "Для решения квадртаного уравнения aх^2+bx+c = 0 задайте коэффициенты a, b, c, как аргументы скрипта."
  );
  console.log(
    `Наример, для решения уравнения 4x^2-16x+10=0 введите команду ${nodePath} ${scriptPath} 4 -16 10`
  );
  console.log(
    `Для детального отображения решения используйте параметр MODE=details`
  );
  process.exit(1);
}

if (a == 0) {
  const x = -c / b;
  if (mode == "details") {
    console.log(`x = ${-c} /${b} = ${x}`);
  }
  console.log(`Ответ: x = ${x}.`);
  process.exit(0);
}

const D = Math.pow(b, 2) - 4 * a * c;
if (mode == "details") {
  console.log(`D = ${b}^2 - 4*${a}*${c} = ${D}`);
}
if (D < 0) {
  console.log("Корней нет.");
} else if (D === 0) {
  const x = -b / (2 * a);
  if (mode == "details") {
    console.log(`x = -${b}/(2 * ${a}) = ${x}`);
  }
  console.log(`Ответ: x = ${x}.`);
} else if (D > 0) {
  const x1 = (-b + Math.sqrt(D)) / (2 * a);
  const x2 = (-b - Math.sqrt(D)) / (2 * a);
  if (mode == "details") {
    console.log(`x1 = -${b} + sqrt(${D})/(2 * ${a}) = ${x1}`);
    console.log(`x2 = -${b} - sqrt(${D})/(2 * ${a}) = ${x2}`);
  }
  console.log(`Ответ: x1 = ${x1}, x2 = ${x2}.`);
}

process.exit(0);
