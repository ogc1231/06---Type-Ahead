const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
  .then((rawData) => rawData.json())
  .then((data) => cities.push(...data));

function findCityOrState(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findCityOrState(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<mark class="h1">${this.value}</mark>`
      );
      const stateName = place.state.replace(
        regex,
        `<mark class="h1">${this.value}</mark>`
      );
      return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${place.population}</span>
    </li>`;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchBarInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchBarInput.addEventListener("change", displayMatches);
searchBarInput.addEventListener("keyup", displayMatches);
