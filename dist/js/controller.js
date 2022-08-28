import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot){
//   module.hot.accept();
// }
/////////////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //const id =`5ed6604591c37cdc054bc886`;
    //console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    // 0) Update results view ta marked selected search result
    resultView.update(model.getSearchResultsPage());
    // 1. Updating bookmarks view
    bookmarkView.update(model.state.bookmarks);

    // 2. Loading Recipe
    await model.loadRecipe(id);

    // 3. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Rendering the spinner
    resultView.renderSpinner();
    // 1. Getting the quey
    const query = searchView.getQuery();
    //console.log(query);
    if (!query) return;
    // 2. loading search result
    await model.loadSearchResults(query);
    // 3. rendering search results
    //console.log(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    //4.render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //console.log(goToPage);
  // rendering NEW search results
  resultView.render(model.getSearchResultsPage(goToPage));

  //render NEW initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  //console.log(newServings);
  model.updateServings(newServings);
  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //console.log(model.state.recipe);

  //Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe =async (newRecipe )=> {
  try {
    console.log(newRecipe);
    // Load spinenr
    addRecipeView.renderSpinner();
    //Upload the new recipe data
   await model.uploadRecipe(newRecipe);
  //console.log(model.state.recipe);

  // Render recipe
  recipeView.render(model.state.recipe)
  // Render success message
  addRecipeView.renderMessage();

  // Render Bookmark view
  bookmarkView.render(model.state.bookmarks)
  //change ID in url
  window.history.pushState(null,'',`#${model.state.recipe.id}`)
  //close the form
  setTimeout(function(){
    addRecipeView.toggleWindow();
    addRecipeView.resetForm();
  },MODAL_CLOSE_SEC*1000)

  // Clear modal and reset form
    

  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err)}
};


const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
