import { Card } from "./card.js";
import { Table } from "./table.js";
const backgroundCard = document.querySelector(".backgroundCard")
let cards = []
let table = new Table();

backgroundCard.addEventListener('click', function() {
    cards.push(new Card(1, cards))
    cards.push(new Card(2, cards))
  });
table.htmlElement.addEventListener('click', function() {
    console.log(Card.shape)
});