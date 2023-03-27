import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchImages';
const refs = {
  formEl: document.querySelector('.search__form'),
  listEl: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
let numberPage = 1;
refs.btnLoadMore.classList.add('btn__hidden');
refs.formEl.addEventListener('submit', onFormSubmit);



function onFormSubmit(evt) {
  evt.preventDefault();
  refs.listEl.innerHTML = '';
  numberPage = 1;
  refs.btnLoadMore.addEventListener('click', onBtnLoadMoreClick);
  const { searchQuery } = evt.target.elements;
  const searchName = searchQuery.value.trim();

  callFetchImages(searchName, numberPage);
}

async function callFetchImages(searchName, numberPage) {

  try {
    const { hits } = await API.fetchImages(searchName, numberPage);
    const serachArray = hits;

    if (serachArray.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
   
    if (serachArray.length < 40) {
      refs.btnLoadMore.classList.remove('btn__hidden');
    }
    
    renderImages(serachArray);
  } catch (error) {
    console.log(error);
  }
}

function createImages(serachArray) {
  return serachArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
}

function renderImages(serachArray) {
  refs.listEl.insertAdjacentHTML('beforeend', createImages(serachArray));
}

async function onBtnLoadMoreClick(evt) {
  numberPage += 1;
  refs.btnLoadMore.classList.add('btn__hidden');
  const searchValue = refs.formEl.searchQuery.value.trim()
  try {
    const { hits } = await API.fetchImages(searchValue, numberPage);
    const serachArray = hits;
   
    if (serachArray.length < 40) {
      refs.btnLoadMore.classList.remove('btn__hidden');
    }
    
    renderImages(serachArray);
  } catch (error) {
    console.log(error);
  }
  // callFetchImages(searchName, numberPage);
  console.log(numberPage);
}