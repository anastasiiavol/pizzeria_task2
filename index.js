'use strict';

//create page elements
const container = document.querySelector(".container");
const containerList = document.querySelector(".containerList");
const filterDiv = document.querySelector(".block_filter");
const choosingView = document.querySelector(".choosingView");

//create pizza class
let pizzaArr = [];

class PizzaItem {
    name;
    calories;
    price;
    ingredients;
    picture;

    constructor(name, ingredients, calories, price, picture) {
        this.name = name;
        this.ingredients = ingredients;
        this.calories = calories;
        this.price = price;
        this.picture = picture;
    }
}

//create pizza items and push into pizzaArr
let Margherita = new PizzaItem('Margherita', ['tomatoes', 'mozzarella', 'basil'], '900', '100', 'img/margherita.jpeg');
let Marinara = new PizzaItem('Marinara', ['tomatoes', 'garlic', 'oregano'], '800', '90', 'img/Marinara.jpeg');
let Chicago = new PizzaItem('Chicago', ['beef', 'pepperoni', 'onion', 'mushrooms'], '1000', '110', 'img/chicago.jpeg');
let New_York_Style = new PizzaItem('New York-Style', ['tomatoes', 'mozzarella', 'sausage', 'mushrooms'], '1100', '120', 'img/New_York_Style.jpeg');
let Sicilian = new PizzaItem('Sicilian ', ['tomatoes', 'onion', 'anchovies', 'herbs'], '950', '135', 'img/sicilian.jpeg');

let Greek = new PizzaItem('Greek', ['tomatoes', 'oregano', 'mozzarella', 'olives'], '850', '105', 'img/greek.jpeg');
let California = new PizzaItem('California ', ['tomatoes', 'chicken', 'pepper', 'olives'], '1250', '110', 'img/california.jpeg');
let Detroit = new PizzaItem('Detroit', ['cheese', 'pepperoni', 'mushrooms', 'olives'], '1000', '140', 'img/detroid.jpeg');
let St_Louis = new PizzaItem('St. Louis', ['cheese', 'tomatoes', 'oregano', 'herbs'], '1100', '120', 'img/st_l.jpeg');
let New_Jersey = new PizzaItem('New Jersey', ['cheese', 'tomatoes ', 'oregano', 'beef'], '1150', '125', 'img/New_Jersey.jpeg');

let Calzone = new PizzaItem('Calzone', ['cheese', 'tomatoes', 'garlic', 'beef'], '1150', '125', 'img/calzone.jpeg');
let Indian = new PizzaItem('Indian', ['cheese', 'oregano', 'garlic', 'herbs'], '1120', '110', 'img/indian.jpeg');
let Mexican = new PizzaItem('Mexican', ['cheese', 'tomatoes', 'olives', 'herbs'], '1200', '100', 'img/mexican.jpeg');
let Ukrainian = new PizzaItem('Ukrainian', ['cheese', 'tomatoes', 'mushrooms', 'chicken'], '1100', '120', 'img/ukrainian.jpeg');
let Sweet = new PizzaItem('Sweet', ['cheese', 'tomatoes', 'pineapple', 'mozzarella'], '1100', '120', 'img/sweet.jpeg');

pizzaArr.push(Margherita, Marinara, Chicago, New_York_Style, Sicilian, Greek, California, Detroit, St_Louis, New_Jersey, Calzone, Indian, Mexican, Ukrainian, Sweet);

let ingredients = [
    'tomatoes',
    'mozzarella',
    'basil', 'garlic', 'oregano', 'beef', 'pepperoni', 'onion', 'mushrooms', 'mozzarella', 'sausage', 'anchovies', 'herbs', 'olives',
    'chicken', 'pepper', 'cheese', 'pineapple'
];

//Grid view  parameters
function handleGridMode() {
    showFilterList();
    hideSortList();
    getGridContent(pizzaArr);
}

//List view  parameters
function handleListMode() {
    hideFilterList();
    showSortList();
    getListContent(pizzaArr);
}

//create grid menu function
function getGridContent(pizzasGrid) {
    let output = "";
    pizzasGrid.forEach(({name, ingredients, calories, price, picture}) => (
        output += `<div class="card">
                <img class="card--avatar" alt="cardPic" src=${picture} />
                <h1 class="card--title">${name}</h1>
                <p class="card--info">${ingredients.join(", ")}</p>
                <p class="card--info">${'Calories: ' + calories}</p>
                <p class="card--info">${'Price: ' + price}</p>
                </div>`
    ));
    container.innerHTML = output;
    return output;
}

//create list menu function
function getListContent(pizzasList) {
    let output = "";
    pizzasList.forEach(
        ({name, price}) => (output += `<p><img class="logo_img" alt="logo" src=${"img/pizza.svg"} />${' Name ' + name}${' Price ' + price}</p>`)
    );
    containerList.innerHTML = output;
    return output;
}

//create grid menu button
let btnDiv = document.createElement('div');
btnDiv.className = "choosingView";
choosingView.append(btnDiv);

let gridBtn = document.createElement("button");
gridBtn.className = "button-choose_view";
gridBtn.innerHTML = "Grid";

let bodyGrid = document.getElementsByTagName("bodyGrid")[0];
btnDiv.appendChild(gridBtn);

//adding listener on Grid View Button
gridBtn.addEventListener("click", function () {
    document.querySelector(".containerList").innerHTML = "";
    handleGridMode();

});


//create list menu button
let listBtn = document.createElement("button");
listBtn.className = "button-choose_view";
listBtn.innerHTML = "List";
createSortList();
createCheckBoxes(ingredients);

let bodysList = document.getElementsByTagName("bodyList")[0];
btnDiv.appendChild(listBtn);

//adding listener on List View Button
listBtn.addEventListener("click", function () {
    document.querySelector(".container").innerHTML = "";
    handleListMode();
});


//create area for sort buttons
function createSortList() {
    let sortArea = document.createElement("div");
    sortArea.className = "sortArea";
    filterDiv.appendChild(sortArea);

    //create "sort by names" button
    let sortByNamesButton = document.createElement("button");
    sortByNamesButton.className = "button-sort_list";
    sortArea.appendChild(sortByNamesButton);
    sortByNamesButton.innerHTML = "Sort By Names";

    //create "sort by prices" button
    let sortByPricesButton = document.createElement("button");
    sortByPricesButton.className = "button-sort_list";
    sortArea.appendChild(sortByPricesButton);
    sortByPricesButton.innerHTML = "Sort By Prices";

    //adding listener on sortByNamesButton
    sortByNamesButton.addEventListener("click", function () {
        document.querySelector(".container").innerHTML = "";
        let pizzasList = sortByNames(pizzaArr);
        getListContent(pizzasList);
    });

    //adding listener on sortByPricesButton
    sortByPricesButton.addEventListener("click", function () {
        document.querySelector(".container").innerHTML = "";
        let pizzasList = sortByPrices(pizzaArr);
        getListContent(pizzasList);
    });
}

//create functions for hiding and showing sort/filter areas
function hideSortList() {
    let elements = filterDiv.getElementsByClassName("button-sort_list");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "hidden";
    }
}

function showSortList() {
    let elements = filterDiv.getElementsByClassName("button-sort_list");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "visible";
    }
}

function hideFilterList() {
    let elements = filterDiv.getElementsByClassName("filterArea");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "hidden";
    }
}

function showFilterList() {
    let elements = filterDiv.getElementsByClassName("filterArea");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "visible";
    }
}

//list sort by prices
function sortByPrices(pizzas) {
    let sortedList = [...pizzas];
    sortedList.sort(function (a, b) {
        return a.price - b.price
    });
    return sortedList;
}

//list sort by names
function sortByNames(pizzas) {
    let sortedList = [...pizzas];
    sortedList.sort(function (a, b) {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    });
    return sortedList;
}

//create sort by ingredients function
function filterByIngredients(pizzas, ingredients) {
    if (ingredients.length === 0) {
        return [...pizzas];
    }
    let filtered = [];
    for (let i = 0; i < pizzas.length; i++) {
        let pizza = pizzas[i];
        let contains = true;
        for (let j = 0; j < ingredients.length; j++) {
            if (!pizza.ingredients.includes(ingredients[j])) {
                contains = false;
            }
        }
        if (contains) {
            filtered.push(pizza);
        }
    }
    return filtered;
}



//create checkboxes for ingredients
function createCheckBoxes(ingredients) {
    let filterArea = document.createElement("div");
    filterArea.className = "filterArea";
    filterDiv.appendChild(filterArea);


    ingredients.forEach((ingredient) => {
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => {
            let chosenIngredients = [];
            let checkBoxes = filterDiv.getElementsByClassName("checkbox");
            for (let i = 0; i < checkBoxes.length; i++) {
                if (checkBoxes[i].checked) {
                    chosenIngredients.push(ingredients[i]);
                }
            }
            let filteredPizzas = filterByIngredients(pizzaArr, chosenIngredients);
            getGridContent(filteredPizzas);
        });

        let checkboxLabel = document.createElement("label");
        checkboxLabel.className = "checkbox_label";
        filterArea.appendChild(checkboxLabel);
        let node = document.createTextNode(ingredient);
        checkboxLabel.className = "checkbox_title";
        checkboxLabel.appendChild(node);


        filterArea.appendChild(checkbox);

    });
}

//grid or list view confirm window
function selectView() {
    let view = confirm("Do you want to display the page as a grid?");
    if (view === true) {
        document.addEventListener("DOMContentLoaded", () => handleGridMode());
    } else {
        document.addEventListener("DOMContentLoaded", () => handleListMode());
    }
}

selectView();

