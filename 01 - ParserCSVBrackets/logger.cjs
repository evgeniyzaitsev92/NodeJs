const fs = require("fs")

const pathLogs = "./logs.txt";

// Если logs.txt не существует, создаём его
function createLogs(){
    if(!fs.existsSync(pathLogs)){
        fs.writeFileSync(pathLogs, "<<< *** LOGS *** >>>\n");
    }
}

// Компоновка сообщения
let createMes = (type, name) => {
    let mes, body;
    let dateTime = new Date();

    if(type == "command"){
        body = `Неправильная команда \"${name}\"! Доступные команды: \"-b\" и \"-c\". Введите \"-h\" для справки.\n`;
    } else if(type == "inputPath"){
        body = `Путь входного файла \"${name}\" невалидный или не существует!\n`;
    } else if(type == "outputPath"){
        body = `Путь выходного файла \"${name}\" невалидный или не существует!\n`;
    } else if(type == "brackets"){
        body = name+"\n";
    }

   return mes = "- [" + dateTime.toLocaleString() + "]: " + body;
}

// Если введена неверная команда
const wrongType = (type) => {
    createLogs();
    fs.appendFileSync(pathLogs, createMes("command", type), "utf-8");
}

// Если путь входного файла невалидный
const wrongInputPath = (inputPath) => {
    createLogs();
    fs.appendFileSync(pathLogs, createMes("inputPath", inputPath), "utf-8");
}

const bracketsFound = (round, square, figure) => {
    createLogs();
    mes = `Найдено пар скобок: ${String(round)} круглых, ${String(square)} квадратных, ${String(figure)} фигурных.`;
    fs.appendFileSync(pathLogs, createMes("brackets", mes), "utf-8");
}

module.exports.wrongType = wrongType;
module.exports.wrongInputPath = wrongInputPath;
module.exports.bracketsFound = bracketsFound;