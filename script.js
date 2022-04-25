const args = process.argv;
const mode = process.env.mode;

const a = args[2];
const b = args[3];
const c = args[4];

let nodePath = args[0].split("\\").pop(); // сделать проверку для линукса
nodePath = nodePath.replace(".exe", "");
const scriptPath = args[1].split("\\").pop();
if (a === undefined || b === undefined || c === undefined) {
  console.log(
    "Для решения квадртаного уравнения aх^2+bx+c = 0 задайте коэффициенты a, b, c, как аргументы скрипта."
  );
  console.log(
    `Наример, для решения уравнения 4x^2-16x+10=0 введите команду ${nodePath} ${scriptPath} 4 -16 10`
  );
  process.exit(1);
}

const D = Math.pow(b, 2) - 4 * a * c;
console.log(`D = ${D}`); // выводить, если параметр dev = true + добавить формулу.
if (D < 0) {
  console.log("Корней нет.");
} else if (D === 0) {
  const x = -b / (2 * a);
  console.log(`Ответ: x = ${x}.`);
} else if (D > 0) {
  const x1 = (-b + Math.sqrt(D)) / (2 * a);
  const x2 = (-b - Math.sqrt(D)) / (2 * a);
  console.log(`Ответ: x1 = ${x1}, x2 = ${x2}.`);
}

process.exit(0);
