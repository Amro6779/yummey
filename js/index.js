

let sidebarOpen = false;

$('.fa-bars').on('click', function () {
  sidebarOpen = !sidebarOpen;

  if (sidebarOpen) {
    $('.sidebar').animate({ 'width': '0px' }, 600);
    $('.sideIcons').animate({ 'left': '0px' }, 600);
    $('.1').slideUp(500);
    $('.2').slideUp(600);
    $('.3').slideUp(700);
    $('.4').slideUp(800);
    $('.5').slideUp(900);
  } else {
    $('.sidebar').animate({ 'width': '323px' }, 600);
    $('.sideIcons').animate({ 'left': '256px' }, 600);
    $('.1').slideDown(500);
    $('.2').slideDown(600);
    $('.3').slideDown(700);
    $('.4').slideDown(800);
    $('.5').slideDown(900);
  }
});

$('.search-links .Search').on('click', function () {

  $('#category').addClass('d-none');
  $('#area').addClass('d-none');
  $('#Ingredients').addClass('d-none');
  $('#form').addClass('d-none');
  $('#foodDisplay').addClass('d-none');
  $('#search').removeClass('d-none');

});




async function searchByName() {

  try {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let search = await response.json();
    console.log(search);
    searchName();
    
  } catch (error) {

    console.log('error' , error);
    
  }  
}
searchByName();

function searchName() {

  let searchresult = [];

  for (let i = 0; i < meals.length; i++) {
    
    if (meals[i].strMeal.toLowerCase().includes(foodName.value.toLowerCase())) {

      searchresult.push(meals[i]);
      
    }
    
  }

  displayMeals(searchresult);
  
}

async function searchByFirstLitter() {

  try {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let searchlitter = await response.json();
    console.log(searchlitter);
    searchFirstLitter();
    
  } catch (error) {

    console.log('error' , error);
    
  }  
}

searchByName();

function searchFirstLitter() {

  let searchresult = [];

  for (let i = 0; i < meals.length; i++) {
    
    if (meals[i].strMeal.toLowerCase().includes(foodName.value.toLowerCase())) {

      searchresult.push(meals[i]);
      
    }
    
  }

  displayMeals(searchresult);
  
}







let meals = [];

async function getMeals() {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    const data = await response.json();
    meals = data.meals.slice(0, 25);
    displayMeals();
  } catch (error) {
    console.error('Error fetching meals:', error);
  }
}

getMeals();


function displayMeals() {
  const rowData = document.querySelector('.row');
  rowData.innerHTML = meals.map(meal => `
    <div class="col-sm-12 col-md-3">
      <div class="food-img">
        <img src="${meal.strMealThumb}" class="rounded-3" alt="meal">
        <div class="layer rounded-3">
          <h5 class="ms-1 fs-3 fw-bold position-relative top-50 start-0">${meal.strMeal}</h5>
        </div>
      </div>
    </div>
  `).join('');
}



async function getRecipe(mealId) {
  console.log('getRecipe called with mealId:', mealId);
  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let data = await response.json();
    displayRecipe(data.meals[0]);
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
}

function displayRecipe(data) {
  const rowData = document.getElementById('rowData');
  rowData.innerHTML = `
    <div class="col-sm-12 col-md-6">
      <div class="meal-img mt-5 ms-5">
        <img src="${data.strMealThumb}" class="rounded-3" alt="meal">
      </div>
      <h5 class="fs-2 fw-bold text-white ms-5">${data.strMeal}</h5>
    </div>
    <div class="col-sm-12 col-md-6">
      <div class="meal-recipe text-white mt-5">
        <h2>Instructions</h2>
        <p>${data.strInstructions}</p>

        <p class="fs-2"><span class="fw-bold">Area :</span>${data.strArea}</p>
        <p class="fs-2"><span class="fw-bold">Category :</span>${data.strCategory}</p>
        <div class="recipes">
          <h2>Recipes :</h2>
          <div class="ingredents-list me-5">
            ${getIngredients(data)}
          </div>
        </div>

        <div class="tag">
          <span class="fs-2 fw-bold">Tags :</span>
          <p class="bg-danger-subtle text-black my-3 p-2 rounded-3 ms-3">${data.strTags}</p>
        </div>

        <div class="buttons">
          <a href="${data.strSource}"><button class="btn btn-outline-success">source</button></a>
          <a href="${data.strYoutube}"><button class="btn btn-outline-danger">youtube</button></a>
        </div>
      </div>
    </div>
  `;
}

function getIngredients(data) {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredients += `
        <p class="bg-info rounded-3 mx-3 p-2 text-black mt-3">${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}</p>
      `;
    }
  }
  return ingredients;
}

console.log($('.row .food-img').length);
$(document).ready(function() {
$('.row.food-img').on('click', function() {
  console.log('Event listener triggered!');
  const mealId = $(this).data('mealId');
  $('#foodDisplay').addClass('d-none');
  getRecipe(mealId);
  $('#recipeDisplay').removeClass('d-none');
})
});





let categories = [];

async function getCategory(categoryName) {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const result = await response.json();
    categories = result.categories;
    displayCategories();
    return { strCategory: categoryName };
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

getCategory();

function displayCategories() {
  const rowData = document.getElementById('row');
  let html = '';

  for (let i = 0; i < categories.length; i++) {
    html += `<div class="col-sm-12 col-md-3 data-category="${category.strCategory}">
          <div class="food-img rounded-3">
            <img src="${categories[i].strCategoryThumb}" class="rounded-3" alt="">
            <div class="layer rounded-3">
              <h5 class="ms-1 fs-3 fw-bold position-relative top-0 start-0 text-center">${categories[i].strCategory}</h5>
              <p class="text-center">${categories[i].strCategoryDescription.slice(0, 134)}</p>
            </div>
          </div>
        </div>`
  }

  rowData.innerHTML = html;
}

$('.search-links .Categories').on('click', function () {

  $('#category').removeClass('d-none');
  $('#area').addClass('d-none');
  $('#Ingredients').addClass('d-none');
  $('#form').addClass('d-none');
  $('#foodDisplay').addClass('d-none');
  $('#search').addClass('d-none');

});


let areas = [];

async function getAreas() {

  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let api = await response.json();
    areas = api.meals;
    displayAreas();
  } catch (error) {
    console.error('Error fetching areas:', error);
  }

}
getAreas();

function displayAreas() {
  const rowData = document.getElementById('area');
  const html = areas.map(area => {
    return `<div class="col-sm-12 col-md-3 w-75">
              <div class="area-icon mx-3 py-3">
                <i class="fa-solid fa-house-laptop fa-6x text-white"></i>
                <p class="text-white text-center fs-3">${area.strArea}</p>
              </div>
            </div>`
  }).join('');

  rowData.innerHTML = html;
}


$('.search-links .Area').on('click', function () {

  $('#area').removeClass('d-none');
  $('#category').addClass('d-none');
  $('#Ingredients').addClass('d-none');
  $('#form').addClass('d-none');
  $('#foodDisplay').addClass('d-none');
  $('#search').addClass('d-none');

});


let Ingredients = [];

async function getIngredients() {
  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let info = await response.json();
    Ingredients = info.meals.slice(0, 20);
    displayIngredients()
  } catch (error) {
    console.log('Error fetching Ingredients:', error);
  }
}

getIngredients();

function displayIngredients() {
  const rowData = document.getElementById('ingredient');
  let html = ``;

  for (let i = 0; i < Ingredients.length; i++) {
    html += `<div class="col-sm-12 col-md-3">
          <div class="ingredients-content text-white text-center">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h5 class="fs-3">${Ingredients[i].strIngredient}</h5>
            <p>${Ingredients[i].strDescription.slice(0, 160)}</p>
          </div>
        </div>`;

  }
  rowData.innerHTML = html;
}

$('.search-links .Ingredients').on('click', function () {

  $('#area').addClass('d-none');
  $('#category').addClass('d-none');
  $('#Ingredients').removeClass('d-none');
  $('#form').addClass('d-none');
  $('#foodDisplay').addClass('d-none');
  $('#search').addClass('d-none');

});


function ValidatorforSubmit(element) {
  var rgx = {
    name: /^[a-zA-Z ]{3,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
    age: /^[0-9]{1,3}$/,
    phone: /^01[0-9]{9}$/,
    repassword: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/
  };

  if (rgx[element.id]) {
    if (rgx[element.id].test(element.value)) {
      $(element).removeClass('in-valid');
      $(element).addClass('valid');
      $(element).next('.alert').addClass('d-none');
      $('button').removeClass('disabled');
    } else {
      $(element).removeClass('valid');
      $(element).addClass('in-valid');
      $(element).next('.alert').removeClass('d-none');
      $('button').addClass('disabled');
    }
  }
}

$('#name').on('input', function () {
  ValidatorforSubmit(this);
});
$('#email').on('input', function () {
  ValidatorforSubmit(this);
});
$('#password').on('input', function () {
  ValidatorforSubmit(this);
});
$('#age').on('input', function () {
  ValidatorforSubmit(this);
});
$('#phone').on('input', function () {
  ValidatorforSubmit(this);
});
$('#repassword').on('input', function () {
  ValidatorforSubmit(this);
});


$('.search-links .Contact').on('click', function () {

  $('#area').addClass('d-none');
  $('#category').addClass('d-none');
  $('#Ingredients').addClass('d-none');
  $('#form').removeClass('d-none');
  $('#foodDisplay').addClass('d-none');
  $('#search').addClass('d-none');

});


let filterCategory = [];

async function filterByCategory(Category) {
  try {
    const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    const category = await response.json();
    filterCategory = category.meals;
    displayCategorieFilter();
  } catch (error) {
    console.error('Failed to get data:', error);
  }
}

function displayCategorieFilter() {
  const rowData = document.querySelector('.row');
  rowData.innerHTML = filterCategory.map(filter => `
    <div class="col-sm-12 col-md-3">
      <div class="food-img">
        <img src="${filter.strMealThumb}" class="rounded-3" alt="meal">
        <div class="layer rounded-3">
          <h5 class="ms-1 fs-3 fw-bold position-relative top-50 start-0">${filter.strMeal}</h5>
        </div>
      </div>
    </div>
  `).join('');
}



$('#category .row').on('click', async function () {
  let categorynames = [];
  async function catNames() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    let done = await response.json();
    categorynames = done.meals;
    return categorynames;
  }
  
  categorynames = await catNames();
  const categoryName = categorynames[0].strCategory;
  console.log('Category name:', categoryName);
  $('#category').addClass('d-none');
  filterByCategory(categoryName);
  $('#foodDisplay').removeClass('d-none');
});





let filterArea = [];

async function filterByArea() {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=`);
    const area = await response.json();
    filterArea = area.meals.slice(0 , 20);
    displayAreaFilter();
  } catch (error) {
    console.error('Failed to get data:', error);
  }
}


function displayAreaFilter() {
  const rowData = document.querySelector('.row');
  rowData.innerHTML = filterArea.map(filter => `
    <div class="col-sm-12 col-md-3">
      <div class="food-img">
        <img src="${filter.strMealThumb}" class="rounded-3" alt="meal">
        <div class="layer rounded-3">
          <h5 class="ms-1 fs-3 fw-bold position-relative top-50 start-0">${filter.strMeal}</h5>
        </div>
      </div>
    </div>
  `).join('');
}


$('#area .row').on('click', async function () {
  let areanames = [];
  async function arNames() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let place = await response.json();
    areanames = place.meals;
    return areanames;
  }
  
  areanames = await arNames();
  const areaName = areanames[0].strArea;
  console.log('Area name:', areaName);
  $('#area').addClass('d-none');
  filterByArea(areaName);
  $('#foodDisplay').removeClass('d-none');
});




let filterIngredient = [];

async function filterByIngredient() {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`);
    const Ingredient = await response.json();
    filterIngredient = Ingredient.meals.slice(0 , 20);
    displayIngredientFilter();
  } catch (error) {
    console.error('Failed to get data:', error);
  }
}

function displayIngredientFilter() {
  const rowData = document.querySelector('.row');
  rowData.innerHTML = filterIngredient.map(filter => `
    <div class="col-sm-12 col-md-3">
      <div class="food-img">
        <img src="${filter.strMealThumb}" class="rounded-3" alt="meal">
        <div class="layer rounded-3">
          <h5 class="ms-1 fs-3 fw-bold position-relative top-50 start-0">${filter.strMeal}</h5>
        </div>
      </div>
    </div>
  `).join('');
}


$('#Ingredients .row').on('click', async function () {
  let ingredeantnames = [];
  async function ingNames() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let food = await response.json();
    ingredeantnames = food.meals;
    return ingredeantnames;
  }
  
  ingredeantnames = await ingNames();
  const ingredeantsname = ingredeantnames[0].strCategory;
  console.log('Category name:', ingredeantsname);
  $('#Ingredients').addClass('d-none');
  filterByIngredient(ingredeantsname);
  $('#foodDisplay').removeClass('d-none');
});