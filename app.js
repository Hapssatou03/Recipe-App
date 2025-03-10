
"use strict"
//Affectation des variables

const serachBtn = document.querySelector('.search-btn');
const mealList = document.querySelector('#meal');
const mealDetailContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// event listnners

serachBtn.addEventListener('click', getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',()=>{
  mealDetailContent.parentElement.classList.remove('showRecip')
});
// funtion get meal list that matches with the ingredients

function getMealList() {
  let searchInputText = document.querySelector('#search-input').value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
  .then(response => response.json())
  .then(data => {
      //création de la variable card
      let html = ""
      if (data.meals) {
        data.meals.forEach(meal=> {
          html += `
                    <div class="meal-item" data-id=${meal.idMeal}>
                        <div class="meal-img">
                        <img src="${meal.strMealThumb} "alt="meal">
                        </div>
                        <div class="meal-name">
                           <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                 `
        });
      }else{
        html = " Sorry !! We didn't fond any maeal"
        mealList.classList.add('notfound')
       };
      mealList.innerHTML = html
  });
}
//function get recipe of the Meal

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  };
}

//Create a modal

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = ` <h2 class="recipe-tittle">${meal.strMeal}</h2>
                        <p class="recipe-category"> ${meal.strCategory}</p>
                        <div class = recipe-instruct>
                          <h3 class ="recipe-instruction">Instructions :</h3>
                          <p> ${meal.strInstructions}</p>
                       </div>
                      </div>
                     <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                     </div>
                     <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                     </div>`;
                     mealDetailContent.innerHTML = html;
                     mealDetailContent.parentElement.classList.add("showRecip");
}