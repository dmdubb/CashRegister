'use strict'

class CashRegister {
    constructor(data){
        this.denominations = [];

        if (data === undefined || data === null) return;

        if (data.denominationsAvail !== null && data.denominationsAvail !== undefined
            && data.denominationsAvail.length > 0){
            for (var i = 0; i < data.denominationsAvail.length; i++){
                this.denominations.push(data.denominationsAvail[i]);
            }
        }
    }


    getChangeString(saleAmount, paidAmount){
        //order the denominations descending
        //deep clone the array of objects
        var clientDenoms = JSON.parse(JSON.stringify(this.denominations));
        clientDenoms.sort((a,b) => {
            if (a.denominationValue < b.denominationValue) return 1;
            if (a.denominationValue > b.denominationValue) return -1;
            return 0;
        });

        //There should be some more error checking in here - make sure there is enough to pay, etc
        var changeNeeded = Math.round((paidAmount - saleAmount) * 100) / 100;

        //main loop to get the change denominations
        var returnString = '';
        for (var i = 0; i < clientDenoms.length; i++){
            clientDenoms[i].usedCount = 0;
            while (changeNeeded >= clientDenoms[i].denominationValue){
                changeNeeded -= clientDenoms[i].denominationValue;
                changeNeeded = Math.round(changeNeeded * 100)/100;
                clientDenoms[i].usedCount++;
            }
            if (clientDenoms[i].usedCount > 0){
                returnString += (returnString.length > 0 ? ', ' : '') + clientDenoms[i].usedCount + ' '
                                + clientDenoms[i].denominationName + (clientDenoms[i].usedCount > 1 ? '(s)' : '');
            }
        }

        return returnString;

    }
}

module.exports = CashRegister;