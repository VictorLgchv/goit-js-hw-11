import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34737052-b22dcc77d23fc25c00a98711a';
async function fetchImages(serachArray, page) {
  const options = {
    params: {
      key: `${API_KEY}`,
      q: `${serachArray}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: `${page}`,
      per_page: 40,
    },
  };
  const { data } = await axios.get(`${BASE_URL}`, options);
  return data;
}

export default { fetchImages };

// const options = {
//   params: {
//     key: '34737052-b22dcc77d23fc25c00a98711a',
//     q: `${value}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: 1,
//     per_page: 40,
//   },
// }

// fetch(`${BASE_URL}/?key=${API_KEY}&q=${serachArray}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
