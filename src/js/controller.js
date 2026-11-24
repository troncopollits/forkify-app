import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Primera Promesa y recoger desde una url una de las recetas
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id)

    // Guard clause o early return
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
