import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmark__list');
  _errorMessage = 'No bookmarks yet! find a nice recipe and bookmark it :)';
  _message='';

  addHandlerRender(handler){
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    //console.log(this._data);
    return this._data.map(bookmark=> previewView.render(bookmark,false)).join('');
  };


}

export default new bookmarkView();

