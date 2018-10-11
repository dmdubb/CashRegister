'use strict'

const Register = require('./cashRegister');

class ClientRegisterSettings extends Register {
    constructor(data){
        super(data);

        //handle for the modifiers as well
        this.randomModifierDenominator = null;
        if (data !== null && data !== undefined){
            if (data.randomModifierDenominator !== null && data.randomModifierDenominator !== undefined){
                this.randomModifierDenominator = data.randomModifierDenominator;
            }
        }
    }

    //override for this special client
    getChangeString(saleAmount, paidAmount){
        //convert to no decimals to decide if it is divisible
        if (this.randomModifierDenominator !== null && (Math.round(saleAmount * 100) % this.randomModifierDenominator) === 0){
            return this.getRandomChangeString(saleAmount, paidAmount)
        } else {
            return super.getChangeString(saleAmount, paidAmount);
        }
    }

    getRandomChangeString(saleAmount, paidAmount){
        //Let's sort it anyway - even though it doesn't have to be for sake of randomness
        //I would also move the sort into a common function inside the denominations object if I created one
        var clientDenoms = JSON.parse(JSON.stringify(this.denominations));
        clientDenoms.sort((a,b) => {
            if (a.denominationValue < b.denominationValue) return 1;
            if (a.denominationValue > b.denominationValue) return -1;
            return 0;
        });

        //in this case just keep going until the change is 0
        var changeNeeded = Math.round((paidAmount - saleAmount) * 100) / 100;

        while (changeNeeded > 0){
            //Get a random index
            var rnd = this.getRandomNumber(clientDenoms.length);
            //just to set this so things don't blow up.  In production the whole denominations would be an object
            if (clientDenoms[rnd].usedCount === null || clientDenoms[rnd].usedCount === undefined) clientDenoms[rnd].usedCount = 0;
            if (changeNeeded >= clientDenoms[rnd].denominationValue){
                changeNeeded -= clientDenoms[rnd].denominationValue;
                changeNeeded = Math.round(changeNeeded * 100)/100;
                clientDenoms[rnd].usedCount++;
            }
        }

        var returnString = '';
        for (var i = 0; i < clientDenoms.length; i++){
            returnString += (returnString.length > 0 ? ', ' : '') + clientDenoms[i].usedCount + ' '
                + clientDenoms[i].denominationName + (clientDenoms[i].usedCount > 1 ? '(s)' : '');
        }
        return returnString;

    }
    getRandomNumber(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
module.exports = ClientRegisterSettings;