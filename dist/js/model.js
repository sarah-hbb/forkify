import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper';
import { RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results:[],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks:[],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    //console.log(data.data);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    //console.log(state.recipe);
    if(state.bookmarks.some(bookmark => bookmark.id ===id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

  } catch (err) {
    console.error(`${err} 🎃🎃🎃🎃`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    //console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });
    state.search.page =1;
    //console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};


export const getSearchResultsPage= function(page = state.search.page) {
  state.search.page = page;
  const start = (page-1)*state.search.resultsPerPage;
  const end = page*state.search.resultsPerPage;
  return state.search.results.slice(start,end);
}

export const updateServings= function(newServings){
  state.recipe.ingredients.forEach(ing => {
    // //newQt = oldQt* newServings / oldServing
    ing.quantity = (ing.quantity *newServings)/state.recipe.serving;
  });
  state.recipe.serving=newServings;
}

// Save bookmarks in a local storage
const persistBookmark = function(){
  localStorage.setItem('bookmark',JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmarked
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmark();
}

export const deleteBookmark = function(id) {
  // delet bookmark
  const index = state.bookmarks.findIndex(el=> el.id === id)
  state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    if(id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmark();
};

const init = function() {
  const storage = localStorage.getItem('bookmark');
  if(storage) state.bookmarks = JSON.parse(storage);
}

init();
console.log(state.bookmarks);

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
//clearBookmarks();