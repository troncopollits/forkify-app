import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import resultsView from "./views/resultsView.js";
///////////////////////////////////////

// Primera Promesa y recoger desde una url una de las recetas
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // Guard clause o early return
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

// Controlador para buscar el resultado en la barra de búsqueda
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// controller that will be executed whenever a click on one of the buttons happens
const controlPagination = function (goToPage) {
  // 1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render NEW pagination buttons
  paginationView.render(model.state.search);
  console.log(goToPage);
};

// Se les llama controladores porque estamos utilizando el modelo MCV pero también se les podría llamar event handlers porque en el fondo es lo que son . Correran siempre y cuando algún evento ocurra.
const controlServings = function (newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
};

// publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
