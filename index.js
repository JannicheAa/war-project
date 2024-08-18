/**
 Challenge: Add a button that, when clicked, gets a new deck of cards from the deckofcards API
 
 URL: https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
 
 Log the whole response to the console
 */

const getNewDeckBtnEl = document.getElementById("get-new-deck-btn");
const drawBtnEl = document.getElementById("draw-btn");
const computerEl = document.getElementById("computer");
const meEl = document.getElementById("me");
const remainingCardsNumberEl = document.getElementById(
  "remaining-cards-number"
);
const cardValueArr = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];
const headerEl = document.getElementById("header");
const scoreMrDataEl = document.getElementById("score-mr-data");
const scoreMeEl = document.getElementById("score-me");
let numberMrData = 0;
let numberMe = 0;
let deckId = "";

async function getNewDeck() {
  const response = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  );
  const data = await response.json();
  deckId = data.deck_id;
  remainingCardsNumberEl.textContent = `Gjenværende antall kort: ${data.remaining}`;
  drawBtnEl.style.visibility = "visible";
  reset();
}

async function getTwoCards() {
  const response = await fetch(
    `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
  );
  const data = await response.json();
  computerEl.style.backgroundImage = `url("${data.cards[0].image}")`;
  meEl.style.backgroundImage = `url("${data.cards[1].image}")`;
  remainingCardsNumberEl.textContent = `Gjenværende antall kort: ${data.remaining}`;
  const resultOfDraw = getWinner(data.cards[0], data.cards[1]);
  if (data.remaining === 0) {
    drawBtnEl.disabled = true;
    if (numberMrData > numberMe) {
      headerEl.textContent = "Mr. Data vant krigen!🥲";
    } else if (numberMrData < numberMe) {
      headerEl.textContent = "Du vant krigen!🥳";
    } else {
      headerEl.textContent = "Det ble visst uavgjort!🥸";
    }
  } else {
    headerEl.textContent = resultOfDraw;
  }
}
getNewDeckBtnEl.addEventListener("click", getNewDeck);
drawBtnEl.addEventListener("click", getTwoCards);

function getWinner(card1Obj, card2Obj) {
  const index1 = cardValueArr.indexOf(card1Obj.value);
  const index2 = cardValueArr.indexOf(card2Obj.value);
  if (index1 > index2) {
    numberMrData++;
    scoreMrDataEl.textContent = numberMrData;
    return "Mr. Data vant!🤖";
  } else if (index1 < index2) {
    numberMe++;
    scoreMeEl.textContent = numberMe;
    return "Du vant!😎";
  } else {
    return "Whoops! Uavgjort!🤷🏻‍♀️";
  }
}

function reset() {
  drawBtnEl.disabled = false;
  scoreMrDataEl.textContent = 0;
  scoreMeEl.textContent = 0;
  headerEl.textContent = "Krig!";
  computerEl.style.backgroundImage = "none";
  meEl.style.backgroundImage = "none";
}
