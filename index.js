const readlines = require('n-readlines');
const minimist = require('minimist');
const fs = require('fs');
const clientRegister = require('./lib/clientRegister');

console.log("Cash Register Program Starting");

//get the file name
const args = minimist(process.argv.slice(2));
if (args.input === null || args.input === undefined || args.input === true){
    console.log("No Input File Provided - Exiting Application");
    return;
}

var file = null;
try {
    file = new readlines(args.input)
} catch (err) {
    console.log("Error opening and reading from input file - Exiting Application");
    return;
}

//get the client config (hard coded for this example)
//each customer would have their own config - database call, etc
//This is just reading a json file for now - simple and basic

try {
    var jsonObj = JSON.parse(fs.readFileSync('exampleClientConfig.json', 'utf8'));
    //Intialize the Client Cash Register Object
    //In production would get this back from a factory based
    var register = new clientRegister(jsonObj);
} catch (err) {
    console.log(err);
    console.log("Unable to get client's configuration - Exiting Application");
    return;
}



//loop all the lines
while (line = file.next()){
    var values = line.toString('utf8').split(',');
    var saleAmount = parseFloat(values[0]);
    var paidAmount = parseFloat(values[1]);

    //Pass the line to the register to get the amount of change string
    //We could move the config passing out and into the Cash Register Constructor
    //But the way it is envisioned is that the object is more generic
    var changeString = register.getChangeString(saleAmount, paidAmount);
    console.log(changeString);
}


console.log("Cash Register Program Completed");