import { Card } from "./card.js";
import { Table } from "./table.js";
const backgroundCard = document.querySelector(".backgroundCard")
let table = new Table();

backgroundCard.addEventListener('click', function() {
    table.cards.push(new Card(1, table.cards))
    table.cards.push(new Card(2, table.cards))
  });