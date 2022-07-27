import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _parentElement ='';
  

  _generateMarkup(){
    const id = window.location.hash.slice(1);
      return`
      <li class="result">
        <a class="result__preview__link  ${this._data.id === id ? 'result__preview__link__active':'' }" href="#${this._data.id}">
                <img src="${this._data.image}"  class="result__pic"  crossOrigin= "anonymous">
                <div class="result__text">
                    <h4 class="result__text__title">${this._data.title}</h4>
                    <h6 class="result__text__description">${this._data.publisher}</h6>
                </div>
                <button class="result__user--btn">
                    <svg class="result__user--btn--icon">
                        <use href="${icons}#icon-user"></use>
                    </svg>
                </button>
        </a>
      </li>
      `
  };
}

export default new PreviewView();

