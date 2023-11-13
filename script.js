import { Card } from "./card.js";

function OnResize() {
    UpdateTableSize();
}

function UpdateTableSize() {
    
    
    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;

    height = height * 0.9;
    width = width * 0.45;

    height = height / document.querySelectorAll("#main-table > tbody > tr").length
    width = width / document.querySelectorAll("#main-table > tbody > tr:first-child > td").length

    const min = Math.min(height, width);
    let squareSize = `${min}px`
    for (const element of document.querySelectorAll("#main-table > tbody > tr > td")) {
        element.style.width = squareSize;
        element.style.height = squareSize;
    }
}


const backgroundCard = document.querySelector(".backgroundCard")
let cards = []


backgroundCard.addEventListener('click', function() {
    cards.push(new Card(1, cards))
    cards.push(new Card(2, cards))
  });

window.addEventListener('resize', OnResize)
OnResize(); // initial call;

const table = document.querySelector("#main-table")

table.addEventListener('click', function() {
    console.log(Card.shape)
  });