function validateSpendingForm() {
    console.log("validateSpendingForm")
    let addForm = document.forms.addForm
    console.log("addform",addForm)
    let amount = addForm.amount.value
    console.log("amount",amount)
    
    return validateInputUSD(amount,false)
}
// TODO negative number and 0 check

function validateLimitsForm() {
    console.log("validateLimitsForm")
    let addForm = document.forms.limitsForm
    console.log("limitsForm",limitsForm)
    let amount = limitsForm.amount.value
    console.log("amount",amount)
    
    return validateInputUSD(amount,true)

    
}

function validateInputUSD(amount,isPositive) {
    if(!isNumeric(amount)) {
        alert("AMOUNT must be a number!")
        return false 
    }
    if (isPositive) {
        if (parseFloat(amount) <= 0) {
            alert("AMOUNT must be positive!")
            return false
        }
    }

    let afterDotSymbols = 0
    let arr = amount.split(".")
    if (arr.length === 1) {
        afterDotSymbols = 0
    } else {
        afterDotSymbols = arr[1].length // after dot symbol amount to multiply
    }
    
    if (arr.length !== 1 && afterDotSymbols > 2) {
        alert("2 or less symbols after dot are allowed in AMOUNT!")
        return false
    } 
    return true

}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}



function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }