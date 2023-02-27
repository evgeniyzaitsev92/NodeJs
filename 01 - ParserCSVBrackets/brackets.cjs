const fs = require("fs");
const readline = require("readline");
const logger = require('./logger.cjs');

const checkClosed = (inputPath, outputPath) => {
    if(!fs.existsSync(outputPath)){
        fs.writeFileSync(outputPath, "");
    }
    let currentLine = 0;
    let count = 0;
    let countRound = 0;
    let countSquare = 0;
    let countFigure = 0;
    let hasFoundRoundBracket = false;
    let isCheckingNextLineRoundBracket = false;
    let strFinalRoundBracket = "";
    let hasFoundSquareBracket = false;
    let isCheckingNextLineSquareBracket = false;
    let strFinalSquareBracket = "";
    let hasFoundFigureBracket = false;
    let isCheckingNextLineFigureBracket = false;
    let strFinalFigureBracket = "";

    const forLinesCount = fs.readFileSync(inputPath).toString();
    const lines = forLinesCount.split('\n');
    let linesCount = lines.length;

    const file = readline.createInterface({
        input: fs.createReadStream(inputPath),
        output: process.stdout,
        terminal: false
    });

    file.on("line", (line) => {
        currentLine++;
        numRoundBracket = 0;
        numSquareBracket = 0;
        numFigureBracket = 0;

        // Если строка пустая
        if(line.length === 0 && isCheckingNextLineRoundBracket == true){
            strFinalRoundBracket += "\n";
        }
        if(line.length === 0 && isCheckingNextLineSquareBracket == true){
            strFinalSquareBracket += "\n";
        }
        if(line.length === 0 && isCheckingNextLineFigureBracket == true){
            strFinalFigureBracket += "\n";
        }

        // Идём по каждой строке
        for(let i=0; i<line.length; i++){
            /*** КРУГЛЫЕ СКОБКИ ***/
            // Ищем первую открывающую скобку
            if(hasFoundRoundBracket == false){
                if(line[i] == "("){
                    hasFoundRoundBracket = true;
                    numRoundBracket = i;
                }

            // Первая открывающая скобка найдена
            } else {
                if(line.includes(")")){
                    if(line[i] == ")" && i > numRoundBracket){
                        if(isCheckingNextLineRoundBracket == false){
                            strFinalRoundBracket += line.slice(numRoundBracket, i+1);
                        } else {
                            strFinalRoundBracket += line.slice(0, i+1);
                            isCheckingNextLineRoundBracket = false;
                        }
                        strFinalRoundBracket = "**"+String(count++)+"**: "+strFinalRoundBracket;
                        fs.appendFileSync(outputPath, strFinalRoundBracket+"\n********************************\n\n", "utf-8");
                        hasFoundRoundBracket = false;
                        strFinalRoundBracket = "";
                        countRound++;
                        continue;
                    }
                } else {
                    if(i == line.length-1){
                        strFinalRoundBracket += line.slice(numRoundBracket, line.length)+"\n";
                    }
                    isCheckingNextLineRoundBracket = true;
                }
            }

            /*** КВАДРАТНЫЕ СКОБКИ ***/
            // Ищем первую открывающую скобку
            if(hasFoundSquareBracket == false){
                if(line[i] == "["){
                    hasFoundSquareBracket = true;
                    numSquareBracket = i;
                }

            // Первая открывающая скобка найдена
            } else {
                if(line.includes("]")){
                    if(line[i] == "]" && i > numSquareBracket){
                        if(isCheckingNextLineSquareBracket == false){
                            strFinalSquareBracket += line.slice(numSquareBracket, i+1);
                        } else {
                            strFinalSquareBracket += line.slice(0, i+1);
                            isCheckingNextLineSquareBracket = false;
                        }
                        strFinalSquareBracket = "**"+String(count++)+"**: "+strFinalSquareBracket;
                        fs.appendFileSync(outputPath, strFinalSquareBracket+"\n********************************\n\n", "utf-8");
                        hasFoundSquareBracket = false;
                        strFinalSquareBracket = "";
                        countSquare++;
                        continue;
                    }
                } else {
                    if(i == line.length-1){
                        strFinalSquareBracket += line.slice(numSquareBracket, line.length)+"\n";
                    }
                    isCheckingNextLineSquareBracket = true;
                }
            }

            /*** ФИГУРНЫЕ СКОБКИ ***/
            // Ищем первую открывающую скобку
            if(hasFoundFigureBracket == false){
                if(line[i] == "{"){
                    hasFoundFigureBracket = true;
                    numFigureBracket = i;
                }

            // Первая открывающая скобка найдена
            } else {
                if(line.includes("}")){
                    if(line[i] == "}" && i > numFigureBracket){
                        if(isCheckingNextLineFigureBracket == false){
                            strFinalFigureBracket += line.slice(numFigureBracket, i+1);
                        } else {
                            strFinalFigureBracket += line.slice(0, i+1);
                            isCheckingNextLineFigureBracket = false;
                        }
                        strFinalFigureBracket = "**"+String(count++)+"**: "+strFinalFigureBracket;
                        fs.appendFileSync(outputPath, strFinalFigureBracket+"\n********************************\n\n", "utf-8");
                        hasFoundFigureBracket = false;
                        strFinalFigureBracket = "";
                        countFigure++;
                        continue;
                    }
                } else {
                    if(i == line.length-1){
                        strFinalFigureBracket += line.slice(numFigureBracket, line.length)+"\n";
                    }
                    isCheckingNextLineFigureBracket = true;
                }
            }
        }

        if(currentLine == linesCount){
            logger.bracketsFound(countRound, countSquare, countFigure);
        }      
    }); 
}

module.exports.checkClosed = checkClosed;