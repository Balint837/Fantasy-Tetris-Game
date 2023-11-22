import { Card } from "./card.js";
import { Table } from "./table.js";
const backgroundCard = document.querySelector(".backgroundCard")
let table = new Table();

backgroundCard.addEventListener('click', function() {
    if (table.gameOver) {
      return;
    }
    table.cards.push(new Card(1, table.cards))
    table.cards.push(new Card(2, table.cards))
  });

const passButton = document.querySelector("#passButton");
passButton.addEventListener('click', function() {
  table.PassTurn(false);
})