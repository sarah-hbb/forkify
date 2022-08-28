import icons from 'url:../../img/icons.svg';
//console.log(icons);
import { Fraction } from 'fractional';
import View from './View.js';

class RecipeView extends View{
  _parentElement = document.querySelector('.recipe');
  _errorMessage = `We could not find that recipe. Please try another one!`;
  _message='';

  addHandlerRender(handler) {
    const events = ['hashchange', 'load'];
    for (const ev of events) {
      window.addEventListener(ev, handler);
    }
    // window.addEventListener('hashchange',showRecipe);
    // window.addEventListener('load',showRecipe)
  }

  addHandlerServing(handler){
    this._parentElement.addEventListener('click', function(e) {
        e.preventDefault();
        const btn = e.target.closest('.recipe__measures__btn__update');
        if (!btn) return;
        //console.log(btn);
        //console.log(btn.dataset);
        const {updateTo} = btn.dataset;
        if(+updateTo >0)handler(+updateTo);
    })
  }

  addHandlerAddBookmark(handler){
    this._parentElement.addEventListener('click',function(e){
        e.preventDefault;
        const btn =e.target.closest('.btn--bookmark');
        if(!btn) return;
        handler();  
    })

  }

  _generateMarkup() {
    return `
        <div class="recipe__fig">
            <img class="recipe__picture" src="${this._data.image}" alt="${this._data.title}"  crossOrigin= "anonymous">
            <h1 class="recipe__title">
            <span>
                ${this._data.title}
            </span>
            </h1>
        </div>

        <div class="recipe__measures">
            <div class="recipe__measures__clock">
                <svg class="recipe__measures__icon">
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span recipe__measures__clock--minutes>${
                  this._data.cookingTime
                }</span>
                <span recipe__measures__clock--text> minutes</span>
            </div>

            <div class="recipe__measures__serving">
                <svg class="recipe__measures__icon">
                    <use href="${icons}#icon-users"></use>
                </svg>
                <span recipe__measures__servings--number> ${this._data.servings}</span>
                <span recipe__measures__servings--text> servings</span>
            </div>

            <div class="recipe__measures__btns">
                <button class="recipe__measures__btns--btn recipe__measures__btn__update" data-update-to="${this._data.servings-1}">
                    <svg>
                        <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                <button class="recipe__measures__btns--btn recipe__measures__btn__update" data-update-to="${this._data.servings+1}"  >
                    <svg>
                        <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
            </div>
            
            <div class="recipe__measures__user ${this._data.key ? '' : 'hidden'}">
                <svg class="recipe__measure__user--icon ">
                    <use href="${icons}#icon-user"></use>
                </svg>
            </div>

            <div class=" recipe__measures__bookmark">
                <button class="recipe__measures__bookmark--btn recipe__measures__bookmark--btn--bookmarked btn--bookmark">
                    <svg class="recipe__measures__bookmark--icon">
                        <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
                    </svg>
                </button>
            </div>
        </div>


        <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredients)
              .join('')}

        </div>

        <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. 
            Please check out directions at their website.
            </p>
            <a
            class=" recipe__directions__btn"
            href=${this._data.sourceUrl}
            target="_blank"
            >
            <span>Directions</span>
            <svg class="recipe__directions__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </a>
        </div>
        `;
  }

  _generateMarkupIngredients(ing) {
    return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
        </div>
        </li>
        `;
  }
}

export default new RecipeView();
