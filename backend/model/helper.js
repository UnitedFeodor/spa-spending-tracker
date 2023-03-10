const Dinero = require('dinero.js')
const e = require('express')

/*
    0.25 = 25*1  is 10^0     
    0.1 = 1*10   is 10^1
    1 = 100    is 10^2
    2.5 = 250  is 10^2
    3.34 = 334 is 10^2

    pow(10, 2-afterDotSymbols)
*/
function parseUSDFromFormattedString(moneyStr) { 
    let arr = moneyStr.split(".")
    let moneyAmountStr
    let afterDotSymbols
    
    if (arr.length === 1) {
        afterDotSymbols = 0
        moneyAmountStr = arr[0] // no . in input 
    } else {
        afterDotSymbols = arr[1].length // after dot symbol amount to multiply
        moneyAmountStr = arr.join('')
    }
    let multiplier = Math.pow(10, 2-afterDotSymbols)

    let centsInt = parseInt(moneyAmountStr)*multiplier
    //console.log ("centsInt = ",centsInt)
    let resultUSD = Dinero({amount: centsInt, currency: 'USD'})
    //console.log("resultUSD, =",resultUSD.toFormat("$0.00"))
    //console.log("resultUSD. =",resultUSD.toFormat("$0.00"))
    return resultUSD
   
}

function dineroToFormattedNumberUSD(amount) {
    return amount.toFormat('0.00')
}

function dineroToFormatWrapperUSD(amount) {
    return amount.toFormat('$0.00')
}

function calculateTotalSpendings(spendingsList) {
    //console.log("calculateTotalSpendings")
    let result = Dinero({amount: 0, currency: 'USD'})
    spendingsList.forEach(element => {
        
        result = result.add(element.amount);
        //console.log("result foreach el amount: " + element.amount.getAmount())
        //console.log("result foreach res amount: " + result.getAmount())
    });
    return result;
}

function dineroInvertSign(dineroNum) {
    return Dinero({ amount: -dineroNum.getAmount(),currency: dineroNum.getCurrency() })    
}

function checkLimit(currentSpendings, limit) {
    //console.log("checkLimit")
    let exceeding = currentSpendings.subtract(limit)
    //console.log("current cents = ", currentSpendings.getAmount())
    //console.log("limit cents = ", limit.getAmount())
    //console.log("exceeding cents = ", exceeding.getAmount())
    let exceedingBelowStr;
    if (exceeding.lessThan(Dinero({ amount: 0 }))) {
        exceeding = dineroInvertSign(exceeding)
        exceedingBelowStr = `Below by ${exceeding.toFormat('$0.00')}`
    } else if (exceeding.greaterThan(Dinero({ amount: 0 }))) {
        
        exceedingBelowStr = `Exceeding by ${exceeding.toFormat('$0.00')}`
    } else if (exceeding.equalsTo(Dinero({ amount: 0 }))) {
        exceedingBelowStr = `Reached`
    }

    let resultStr = `${exceedingBelowStr}`
    

    return resultStr
}

 
function setLimitsFromDaily(dailyLimit, month, year) {  // year and month are integers
    //console.log("setLimitsFromDaily")
    //console.log(dailyLimit.getAmount(),"is dailyLimit;",month,"is month;", year,"is year")
    return limits = {
        dailyLimit: dailyLimit,
        weeklyLimit: dailyLimit.multiply(7),
        monthlyLimit: dailyLimit.multiply(daysInMonth(month, year)),
        yearlyLimit: dailyLimit.multiply(daysInYear(year))
    }
}
function setLimitsFromWeekly(weeklyLimit,month,year) {
    //console.log("setLimitsFromMonthly")
    return limits = {
        dailyLimit: weeklyLimit.divide(7),
        weeklyLimit:  weeklyLimit,
        monthlyLimit: weeklyLimit.divide(7).multiply(daysInMonth(month, year)),
        yearlyLimit: weeklyLimit.divide(7).multiply(daysInYear(month, year))
    }
}

function setLimitsFromMonthly(monthlyLimit,month,year) {
    //console.log("setLimitsFromMonthly")
    return limits = {
        dailyLimit: monthlyLimit.divide(daysInMonth(month, year)),
        weeklyLimit:  monthlyLimit.divide(daysInMonth(month, year)).multiply(7),
        monthlyLimit: monthlyLimit,
        yearlyLimit: monthlyLimit.multiply(12)
    }
}

function setLimitsFromYearly(yearlyLimit,month,year) {
    //console.log("setLimitsFromMonthly")
    return limits = {
        dailyLimit: yearlyLimit.divide(12).divide(daysInMonth(month, year)),
        weeklyLimit:  yearlyLimit.divide(12).divide(daysInMonth(month, year)).multiply(7),
        monthlyLimit: yearlyLimit.divide(12),
        yearlyLimit: yearlyLimit
    }
}

function dineroLimitsToAmount(limitsObj) {
    return limits = {
        dailyLimit: limitsObj.dailyLimit.getAmount(),
        weeklyLimit: limitsObj.weeklyLimit.getAmount(),
        monthlyLimit: limitsObj.monthlyLimit.getAmount(),
        yearlyLimit: limitsObj.yearlyLimit.getAmount()
    }
}

function dineroLimitsToFormat(limitsObj) {
    return limits = {
        dailyLimit: limitsObj.dailyLimit.toFormat('$0.00'),
        weeklyLimit: limitsObj.weeklyLimit.toFormat('$0.00'),
        monthlyLimit: limitsObj.monthlyLimit.toFormat('$0.00'),
        yearlyLimit: limitsObj.yearlyLimit.toFormat('$0.00'),
    }
}

function chooseLimitFuncByInput(inputNum,amount,month,year){
    console.log("chooseLimitFuncByInput")
    //console.log(amount.getAmount(),"is dailyLimit;",month,"is month;", year,"is year")
    const functionsLimits = {
        0: setLimitsFromDaily,
        1: setLimitsFromWeekly,
        2: setLimitsFromMonthly,
        3: setLimitsFromYearly
    }
    const func = functionsLimits[inputNum]
    //console.log("func is",func)
    return functionsLimits[inputNum](amount,month,year)

}
// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}


/*
limits and stuff needed:

daily weekly monthly yearly
total spendings +
exceeding each one by how much +

*/
function getAllLimitsChecks(limits,spendingsList) {
    const totalSpendings = calculateTotalSpendings(spendingsList)
    const exceedingDaily = checkLimit(totalSpendings, limits.dailyLimit)
    const exceedingWeekly = checkLimit(totalSpendings, limits.weeklyLimit)
    const exceedingMonthly = checkLimit(totalSpendings, limits.monthlyLimit)
    const exceedingYearly = checkLimit(totalSpendings, limits.yearlyLimit)
    return {
        exceedingDaily,
        exceedingWeekly,
        exceedingMonthly,
        exceedingYearly
    }

}

function getFullLimitsInfo(limits,spendingsList) {
    const totalSpendings = calculateTotalSpendings(spendingsList).toFormat('$0.00')
    //console.log("getFullLimitsInfo limits: ",limits)
    return fullLimitsInfo = {
        limits: dineroLimitsToFormat(limits),
        checks: getAllLimitsChecks(limits, spendingsList),
        total: totalSpendings
    }


}



module.exports = {
    dineroToFormatWrapperUSD : dineroToFormatWrapperUSD,
    checkLimit: checkLimit,
    calculateTotalSpendings: calculateTotalSpendings,
    setLimitsFromDaily : setLimitsFromDaily,
    setLimitsFromMonthly : setLimitsFromMonthly,
    parseUSDFromFormattedString : parseUSDFromFormattedString,
    chooseLimitFuncByInput : chooseLimitFuncByInput,
    dineroToFormattedNumberUSD : dineroToFormattedNumberUSD,
    dineroLimitsToAmount : dineroLimitsToAmount,
    getFullLimitsInfo
}