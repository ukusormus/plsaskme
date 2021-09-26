global.luckyNum = 3;
console.log(global.luckyNum);

// console.log(process);
// process.env["my_custom_env_var"] = "my name is jeff";
// console.log(process.platform + " " + Object.keys(process.env));
// console.log(process.env["my_custom_env_var"])

process.on("exit", () => {
    console.log("Node process is exiting. Bye!")
})

const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("connection", () => {
    console.log("\n" + "Somebody connected." + "\n")
})

eventEmitter.emit("connection");

const { readFile } = require("fs").promises;

async function main() {
    const txt = await readFile('hello.txt', 'utf8');
    console.log(txt)
}
main();
console.log("i am called after main, but displayed before main: non-blocking, baby!")