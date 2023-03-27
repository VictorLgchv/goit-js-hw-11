const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34737052-b22dcc77d23fc25c00a98711a';
async function fetchImages(serachArray, page) {
  const resp = await fetch(`${BASE_URL}/?key=${API_KEY}&q=${serachArray}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=4`);
  const newCountry = await resp.json();
  return newCountry;
}

export default { fetchImages };

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     key: '34737052-b22dcc77d23fc25c00a98711a',
  //     q: `${value}`,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: true,
  //     page: 1,
  //     per_page: 40,
  //   },
  // }