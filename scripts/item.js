'use-strict';



// Function for checking if number is numeric and larger or equal to 0. 
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n >= 0;
}

// Function for validating input details
function validateMealDetails(price, tax, tip) {
    if (!isNumeric(price)) {
        throw new TypeError ("Meal price must be numeric and non-negative");
    } else if (!isNumeric(tax)) {
        throw new TypeError ("Tax rate must be numeric and non-negative");
    } else if (!isNumeric(tip)) {
        throw new TypeError ("Tip percentage must be numeric and non-negative");
    } else {
        return true;
    };
}

// Function for creating a meal
function createMeal(mealPrice, mealTax, mealTip) {
    return {id: cuid(),
            price: mealPrice,
            tax: mealTax,
            tip: mealTip};
}



export default {
    validateMealDetails,
    createMeal
}

