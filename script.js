import { Card } from "./card.js";
const backgroundCard = document.querySelector(".backgroundCard")
let cards = []
backgroundCard.addEventListener('click', function() {
    cards.push(new Card(1, cards))
    cards.push(new Card(2, cards))
  });

