document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const englishWord = document.getElementById("englishWord").value;
    const czechTranslation = document.getElementById("czechTranslation").value;
    const explanation = document.getElementById("explanation").value;
    const card = {
      englishWord: englishWord,
      czechTranslation: czechTranslation,
      explanation: explanation
    };
    saveCard(card);
   });
   document.addEventListener("DOMContentLoaded", function() {
    loadCards();
   });
   function saveCard(card) {
    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(card);
    localStorage.setItem("cards", JSON.stringify(cards));
    displayCards(cards);
   }
   function loadCards() {
    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    displayCards(cards);
   }
   function displayCards(cards) {
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";
    cards.forEach(function(card, index) {
      const cardElement = createCardElement(card, index);
      cardsContainer.appendChild(cardElement);
    });
   }
   function createCardElement(card, index) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const flipContainer = document.createElement("div");
    flipContainer.classList.add("flip-container");
    const flipper = document.createElement("div");
    flipper.classList.add("flipper");
    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = card.englishWord;
    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `<strong>Český překlad:</strong> ${card.czechTranslation}<br><strong>Vysvětlení:</strong> ${card.explanation}
   <br><button class="delete" onclick="deleteCard(${index})">Smazat</button>`;
    flipper.appendChild(front);
    flipper.appendChild(back);
    flipContainer.appendChild(flipper);
    cardElement.appendChild(flipContainer);
    return cardElement;
   }
   function deleteCard(index) {
    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.splice(index, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
    loadCards();
   }