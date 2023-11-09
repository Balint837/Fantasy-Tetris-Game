import { Building } from "./building.js"
import { CardField } from "./CardField.js"
import { tetrisShapes } from "./shapes.js"
import { BuildingNames } from "./shapes.js"

export class Card{
        constructor(index, cards){
          this.cardFields = []
          this.Create()
          this.isSelect = false
          this.index = index
          this.cards = cards
      }

      Create(){
          const cardsDiv = document.querySelector(".cardsDiv")
          const cardDiv = document.createElement("div")
          cardDiv.classList.add("cardDiv")
          cardDiv.addEventListener('click', () => {
            this.#Select();
          });

          const random = Math.floor(Math.random() * tetrisShapes.length);
          console.log(random, tetrisShapes[random]);

          cardDiv.innerHTML += this.#AddImgAndTexts()
          cardDiv.innerHTML += this.#AddTable(tetrisShapes[random], random)

          cardsDiv.appendChild(cardDiv)
      }
    
      #Select(){

        this.cards.forEach(card => {
          if (card == this){
            card.isSelect = true
            const cardElement = document.querySelectorAll(".cardDiv .card")[card.index]
            cardElement.id = "cardSelected";
          }else{
            card.isSelect = false
            const cardElement = document.querySelectorAll(".cardDiv .card")[card.index]
            cardElement.id = ""
          }
        });

      }
      #AddImgAndTexts(){
        return `
        <img src="card/card.png" alt="Card" class="card">
        <p class="cardText">sdfsdfjksdfjksdfjk</p>
        <svg class="cardTitle" viewBox="0 0 500 500">
            <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"/>
            <text width="500">
              <textPath xlink:href="#curve">
                Dangerous Vala
              </textPath>
            </text>
        </svg>
        `
      }

      #AddTable(matrix, ShapeRandom){
        let result = `<table class="cardTable ${(ShapeRandom == 0) ? "OffsetCardShape" : ""}">`
        matrix.forEach(x => {
          result += "<tr class=\"cardTr\">"
            x.forEach(i =>{
              if (i === 1){
                const random = Math.floor(Math.random() * BuildingNames.length*2);
                let buildingName = Building.None;
                if (random < BuildingNames.length) {
                  buildingName = BuildingNames[random];
                }
                result += `<td class=\"cardTd tile\">
                  <img src="icons/${buildingName}" alt="BuildingImage" class="BuildingImg">
                </td>`
              }else{
                result += "<td class=\"cardTd\"></td>"
              }
            })
            result += "</tr>"
          });
        result += "</table>"
        return result 
      }
}