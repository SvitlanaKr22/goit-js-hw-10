// Напиши функцію fetchCountries(name), яка робить HTTP-запит на ресурс name і повертає проміс з масивом країн - результатом запиту.

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
