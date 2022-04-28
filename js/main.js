let nav = document.getElementById("nav")
let navLinks = nav.querySelectorAll("a")

navLinks.forEach((element) => {
    element.addEventListener("click", soFetch)
})


let currentDrinks = {};
let ul = document.getElementById("drinksList");

function soFetch() {
    let letter = this.innerHTML
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
        .then(data => {
            currentDrinks = data
            clearDrinksHTML()
            drinksByLetter(data)

        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function drinksByLetter(data) {
    let drinks = data.drinks
    drinks.forEach((element, index) => {
        let ul = document.querySelector("#drinksList");
        let li = document.createElement("li");
        li.setAttribute("data-icon", "🍹")
        li.addEventListener("click", function(e) {
            renderDrinkInfo(drinks[index])
        })
        ul.appendChild(li);
        li.innerHTML = element.strDrink;
    });

}

function clearDrinksHTML() {
    document.getElementById("drinksList").innerHTML = ""
}


function renderDrinkInfo(data) {
    let h2 = document.querySelector("h2")
    let img = document.querySelector("img")
    let p = document.querySelector("p")

    h2.innerHTML = data.strDrink;
    img.setAttribute("src", data.strDrinkThumb)
    p.innerHTML = data.strInstructions
    renderIngredients(data)
}

function renderIngredients(data) {
    //get only truthy values ingredients
    document.querySelector(".ingredients").innerHTML = ""
    document.querySelector(".measurements").innerHTML = ""
    let indgredients = [];
    for (let property in data) {

        if (property.includes("strIngredient") && data[property]) {
            indgredients.push(data[property])
            console.log(data[property])
        }
    }
    //add ingredients to DOM
    for (let i = 0; i < indgredients.length; i++) {
        let ingredientsList = document.querySelector(".ingredients")
        let li = document.createElement("li")
        li.innerHTML = indgredients[i]
        ingredientsList.appendChild(li)
    }

    //get only truthy values for measurements
    let measurements = [];
    for (let property in data) {

        if (property.includes("strMeasure") && data[property]) {
            measurements.push(data[property])
            console.log(data[property])
        }
    }

    //add ingredients to DOM
    for (let i = 0; i < indgredients.length; i++) {
        let measurementList = document.querySelector(".measurements")
        let li = document.createElement("li")
        li.innerHTML = measurements[i]
        measurementList.appendChild(li)
    }
}