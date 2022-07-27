import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(hadnler){
    this._parentElement.addEventListener('click', function(e){
        e.preventDefault();
        const btn = e.target.closest('.pagination__btn');
        console.log(btn);
        if (!btn) return;
        const goToPage = +btn.dataset.goto;
        //console.log(goToPage);
        hadnler(goToPage);
    })
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    //console.log(numPages);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      //console.log('you are on first page and other pages are on the way :)) her her');
      return `
      <button data-goto="${curPage+1}" class="pagination__btn pagination__btn--right"> page ${curPage+1}
            <svg class="pagination__icon pagination__icon--right">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>
      `;
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      //console.log(`Your are on the last page googooli :P`);
      return `
      <button data-goto="${curPage-1}" class="pagination__btn pagination__btn--left"> 
              <svg class="pagination__icon pagination__icon--left">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>page ${curPage-1}
        </button>
      `;
    }

    // Other pages
    if (curPage < numPages && curPage > 1) {
      //console.log(` you are at the middle of pages`);
      return `
    <button data-goto="${curPage+1}" class="pagination__btn pagination__btn--right">page ${curPage+1}
      <svg class="pagination__icon pagination__icon--right">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>

    <button data-goto="${curPage -1}" class="pagination__btn pagination__btn--left"> 
      <svg class="pagination__icon pagination__icon--left">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>page ${curPage-1}
    </button>
      `;
    }


    // Page 1, and there NO other pages
    if (numPages === 1) {
      //console.log(`there are only one page`);
      return `
      `
    }
  }

}
export default new PaginationView();
