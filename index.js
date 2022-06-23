const renderData = ({ name, abilities, stats, sprites }) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  const card = document.createElement("section");
  card.classList.add("card");
  const cardTitle = document.createElement("h2");
  cardTitle.textContent = name;
  const image = document.createElement("img");
  image.src = sprites.front_default;
  const abilitiesTitle = document.createElement("h3");
  abilitiesTitle.textContent = "Abilities";
  const abilitiesEl = document.createElement("ul");
  abilities.forEach(({ ability }) => {
    const listItem = document.createElement("li");
    listItem.textContent = ability.name;
    abilitiesEl.appendChild(listItem);
  });
  const statsTitle = document.createElement("h3");
  statsTitle.textContent = "Stats";
  const statsEl = document.createElement("ul");
  stats.forEach((stat) => {
    const listItem = document.createElement("li");
    listItem.classList.add("stat-el");
    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;
    const baseStat = document.createElement("p");
    baseStat.textContent = stat.base_stat;
    listItem.append(statName, baseStat);
    statsEl.appendChild(listItem);
  });
  card.append(
    cardTitle,
    image,
    abilitiesTitle,
    abilitiesEl,
    statsTitle,
    statsEl
  );
  main.appendChild(card);
};

const getData = (pokName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokName}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      const main = document.querySelector("main");
      main.innerHTML = "";
      const errorMes = document.createElement("p");
      errorMes.style.cssText = "color: red; font-size: 2rem;";
      errorMes.textContent = `There is no information about ${pokName}! Try again.`;
      document.body.append(errorMes);
      setTimeout(() => {
        errorMes.remove();
      }, 5000);
    });
};

const searchPokemon = () => {
  const pokName = document.querySelector("#pokname").value.trim();
  if (!pokName) {
    const errorMes = document.createElement("p");
    errorMes.style.cssText = "color: red; font-size: 2rem;";
    errorMes.textContent = "Enter pokemon name please!";
    document.body.append(errorMes);
    setTimeout(() => {
      errorMes.remove();
    }, 5000);
  } else {
    getData(pokName);
  }
};

const searchPokemonKey = (event) => {
  if (event.key == "Enter") {
    searchPokemon();
  }
};

const searchBtn = document.querySelector("#searchBtn");
const searchInput = document.querySelector("#pokname");
searchInput.addEventListener("keyup", searchPokemonKey);
searchBtn.addEventListener("click", searchPokemon);
