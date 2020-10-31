'use-strict';

// Import statements
import store from "./store.js";
import item from "./item.js";




// Function for adding a meal
function addMealToList(mealPrice, taxRate, tipPercentage) {
    item.validateMealDetails(mealPrice, taxRate, tipPercentage);
    const newMeal = item.createMeal(mealPrice, taxRate, tipPercentage);
    store.meals.push(newMeal);
}

function calculateSubTotal(meal) {
    return parseFloat((meal.price * (1 + meal.tax/100)).toFixed(2));
}

function calculateTip(meal) {
    const subTotal = calculateSubTotal(meal);
    return parseFloat((subTotal * meal.tip/100).toFixed(2));
}

function generateCustomerChargesElement(meal) {
    // Function for generating the customer charges html element
    const subTotal = calculateSubTotal(meal);
    const addedTip = calculateTip(meal);
    const total = (parseFloat(subTotal)+parseFloat(addedTip)).toFixed(2);
    return `<p>${subTotal}€</p>
            <p>${addedTip}€</p>
            <p class="bold">${total}€</p>`;
}

function calculateTotalTip() {
    // Function for calculating total tip on all meals
    let totalTip = 0;
    store.meals.forEach(meal => {
        const thisTip = calculateTip(meal);
        totalTip += thisTip;
    });
    return parseFloat(totalTip.toFixed(2));
}

function calculateTotalMealCount() {
    // Function for calculating the total amount of meals
    return store.meals.length;
}

function calculateAverageTip() {
    return parseFloat((calculateTotalTip() / calculateTotalMealCount()).toFixed(2));
}

function generateMyEarningsInfoElement() {
    // Function for generating the earnings info html element
    const totalTip = calculateTotalTip();
    const mealCount = calculateTotalMealCount();
    const averageTip = calculateAverageTip();
    return `<p>${totalTip}€</p>
            <p>${mealCount}</p>
            <p>${averageTip}€</p>`;
}

// Function for rendering the DOM
function render() {
    // Get the meals list content. Create a copy to not risk altering the original
    const items = [ ...store.meals ];

    if (items.length > 0) {
        // Generate customer charges and earnings info strings
        const customerChargesString = generateCustomerChargesElement(items[items.length-1]);
        const myEarningsInfoString = generateMyEarningsInfoElement();

        $('.js-chargesR').html(customerChargesString);
        $('.js-earningsR').html(myEarningsInfoString);
    } else {
        $('.js-chargesR').html('');
        $('.js-earningsR').html('');
    };
}

// Function for handling when the Submit button is clicked. 
function handleSubmitClicked() {
    $('#js-meals-list-submit').submit(function (event) {
        event.preventDefault();
        const mealPrice = $('#js-meal-price').val();
        const taxRate = $('#js-tax-rate').val();
        const tipPerc = $('#js-tip-perc').val();
        addMealToList(mealPrice, taxRate, tipPerc);
        $('#js-meal-price').val('');
        $('#js-tax-rate').val('');
        $('#js-tip-perc').val('');
        render();
    });
}

// Functionality for when the Reset button is clicked. 
function handleResetClicked() {
    $('.js-reset-btn').on('click', event => {
        // Remove all meals from the list
        store.meals.splice(0, store.meals.length);
        render();
    });
}



function bindEventListeners() {
    handleSubmitClicked();
    handleResetClicked();
}



export default {
    bindEventListeners
}
