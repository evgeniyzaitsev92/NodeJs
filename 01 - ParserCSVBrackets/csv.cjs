const fs = require("fs");
const readline = require("readline");
const logger = require('./logger.cjs');

const parse = (inputCSV, outputJSON) => {
    if(!fs.existsSync(outputJSON)){
        fs.writeFileSync(outputJSON, "");
    }

    const input = fs.createReadStream(inputCSV);
    const file = readline.createInterface({input});

    let data = [];
    file.on("line", (line) => {
        data.push(line.split(";"));
    });

    file.on("close", () => {
        for(let i=0; i<data.length; i++){
            const json = JSON.stringify(Object.assign({}, data[i]));
            fs.appendFileSync(outputJSON, json+"\n", "utf-8");
        }
    });
}

module.exports.parse = parse;