const btnNextPg = document.querySelector('button.pagination-btn__next');
const btnPrewPg = document.querySelector('button.pagination-btn__prew');

function handleButton(element) {
  if (element.classList.contains('pagination-btn__prew')) {
    valuePage.curPage--;
    handleButtonLeft();
    btnNextPg.disabled = false;
   
  } else if (element.classList.contains('pagination-btn__next')) {
    valuePage.curPage++;
    handleButtonRight();
    btnPrewPg.disabled = false;
    
  }
  
}

function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnPrewPg.disabled = true;
   
  } else {
    btnPrewPg.disabled = false;
    
  }
}

function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    console.log(valuePage.curPage);
    btnNextPg.disabled = true;
   
  } else {
    btnNextPg.disabled = false;
   
    }
}

function textCardFormat(e) {
  let textFormat = e;
  if (textFormat.length > 40) {
    textFormat = e.slice(0, 40) + '...';
  }
  return textFormat;
}

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationEl.appendChild(ulEl)
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination-btn')
    liEl.innerText = page

    if (currentPage == page) liEl.classList.add('pagination-btn--active');

    liEl.addEventListener('click', () => {
      currentPage = page
      displayList(postsData, rows, currentPage)

      let currentItemLi = document.querySelector('li.pagination-btn--active');
      currentItemLi.classList.remove('pagination-btn--active');

      liEl.classList.add('pagination-btn--active');
    })

    return liEl;
  }

  // displayList(postsData, rows, currentPage);
  // displayPagination(postsData, rows);
