let nav = document.getElementById("nav")
let navLinks = nav.querySelectorAll("a")

navLinks.forEach((element) => {
    element.addEventListener("click", soFetch)
})

// navLinks.forEach(element=>{
//   let letter = element.innerHTML;
//   element.addEventListener("click", console.log(letter))
// })



function soFetch() {
    let letter = this.innerHTML
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
        .then(data => {
            clearDrinks()
            drinksByLetter(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function drinksByLetter(data) {
    console.log(data)
    console.log(data.drinks)
    let letterDrinks = data.drinks
    letterDrinks.forEach((element) => {
        let ul = document.getElementById("list");
        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = element.strDrink;
        console.log(element.strDrink)
    })
}

function clearDrinks() {
    document.getElementById("list").innerHTML = ""
}