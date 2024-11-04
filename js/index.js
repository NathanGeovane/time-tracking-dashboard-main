let timeframe = "weekly";
const cardsContainer = document.querySelector(".cards");
let allCards;

const menu = document.querySelectorAll(".profile-btn");

menu.forEach((element) => {
  element.addEventListener("click", menuOnClick);
});

let data = {};

fetch("./data.json")
  .then((response) => response.json())
  .then((dataJson) => {
    console.log(dataJson);
    dataJson.forEach((element) => {
      cardsContainer.insertAdjacentHTML(
        "beforeend",
        createRegularCard(element, timeframe)
      );
    });
    dataJson.forEach((element) => {
      data[element.title] = element.timeframes;
    });

    allCards = document.querySelectorAll(".card");
    console.log(allCards);
  });

function menuOnClick(event) {
  menu.forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
  timeframe = event.target.innerText.toLowerCase();

  updateCards(timeframe);
}

function updateCards(timeframe) {
  allCards.forEach((card) => {
    updateCard(card, timeframe);
  });
}

function updateCard(card, timeframe) {
  const title = card.querySelector(".card__title").innerText;
  const current = data[title][timeframe]["current"];
  const previous = data[title][timeframe]["previous"];

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  const hoursElement = card.querySelector(".card__hours");
  hoursElement.innerText = `${current}hrs`;
  const msgElement = card.querySelector(".card__last-hours");
  msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs   `;
}

function createRegularCard(element, timeframe) {
  let title = element["title"];
  let current = element["timeframes"][timeframe]["current"];
  let previous = element["timeframes"][timeframe]["previous"];

  const timeframeMsg = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  return `
   <div class="card card--${title.toLowerCase().replace(" ", "")}">
          <div class="card__top"></div>
          <div class="card__content">
            <div class="card__title-btn-wrapper">
              <span class="card__title">${title}</span>
              <button class="three-dot-btn">
                <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill="#BBC0FF"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="card__stats-wrapper">
              <h2 class="card__hours">${current}hrs</h2>
              <span class="card__last-hours"> Last Month -${previous}hrs</span>
            </div>
          </div>
        </div>`;
}
