const COHORT_NAME = '2306-FTB-ET-WEB-PT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function fetchData() {
  try {
    const response = await fetch(BASE_URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
