const fs = require('fs')
const brackets = require('./brackets.cjs')
const csv = require('./csv.cjs')
const logger = require('./logger.cjs')

const resUnsuccess = "НЕУСПЕШНО! Смотрите логи.";
const resSuccess = "УСПЕШНО! Смотрите логи.";
const help = 
"** Программа-парсер **\n \
Аргументы:\n \
1) 3 аргумента:\n \
    -h - справка\n \
2) 5 аргументов:\n \
    * 3й агрумент:\n \
        -b - проверка на закрытие скобок, txt файлы\n \
        -с - парсер cvs файлов\n \
    * 4й и 5й аргументы - входной и выходной файлы соответственно (пути)\n \
Пример: -b {input.txt} {output.txt}\
            ";

const main = () => {
    let result;
    const [_, __, type, inputPath, outputPath] = process.argv;

    // Справка
    if(process.argv.length == 3){
        if(type == "-h"){
            console.log(help);
            return {};
        }
    // Проверка на кол-во аргументов
    } else {
        if(process.argv.length != 5){
            console.log(help);
            return {};
        }
    }

    // Проверяем введёную комманду
    if(type != "-h" && type != "-b" && type != "-c"){
        logger.wrongType(type);
        result = resUnsuccess;
    }

    // Проверяем путь входного файла
    if(!fs.existsSync(inputPath)){
        logger.wrongInputPath(inputPath);
        result = resUnsuccess;
    }
    
    // Ищем строки в закрытых скобках resSuccess
    if(type == "-b"){
        brackets.checkClosed(inputPath, outputPath);
        result = resSuccess;
    }

    // Ищем строки в закрытых скобках resSuccess
    if(type == "-c"){
        csv.parse(inputPath, outputPath);
        result = resSuccess;
    }

    console.log(result);
}

main();