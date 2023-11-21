import { Building } from "./building.js"
import { tetrisShapes } from "./shapes.js"
import { BuildingNames } from "./shapes.js"

export class Card{
        constructor(index, cards){
          this.cardFields = []
          this.things = []
          this.Create()
          this.isSelect = false
          this.index = index
          this.cards = cards
      }
      static shape =[
        [null, null],
        [null, null],
        [null, null],
        [null, null]
      ]

      static Reset(){
        Card.shape = [
          [null, null],
          [null, null],
          [null, null],
          [null, null]
        ]
      }

      static getShape() {
        return this.shape;
      }

      Create(){
          const cardsDiv = document.querySelector(".cardsDiv")
          const cardDiv = document.createElement("div")
          cardDiv.classList.add("cardDiv")
          cardDiv.addEventListener('click', () => {
            this.#Select();
          });

          const random = Math.floor(Math.random() * tetrisShapes.length);

          cardDiv.innerHTML += this.#AddImgAndTexts()
          cardDiv.innerHTML += this.#AddTable(tetrisShapes[random], random)

          cardsDiv.appendChild(cardDiv)
          this.cardDiv = cardDiv;

      }
    
      #Select(){

        this.cards.forEach(card => {
          if (card == this){
            card.isSelect = true
            const cardElement = document.querySelectorAll(".cardDiv .card")[card.index]
            cardElement.id = "cardSelected";
            this.#CreateShape(card)
          }else{
            card.isSelect = false
            const cardElement = document.querySelectorAll(".cardDiv .card")[card.index]
            cardElement.id = ""
          }
        });

      }
      #AddImgAndTexts(){
        const randomStr = this.#generateRandomString();
        const randomStr2 = this.#generateRandomString();
        return `
        <div class="card cardImg">
        <p class="cardText">${randomStr}</p>
        <svg class="cardTitle" viewBox="0 0 500 500">
            <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"/>
            <text width="500">
              <textPath xlink:href="#curve">
                ${randomStr2}
              </textPath>
            </text>
        </svg>
        `
      }

      #generateRandomString() {
        const length = 14;
        let randomString = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      
        for (var i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
      
        return randomString;
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
                <img src="${buildingName}" alt="BuildingImage" class="BuildingImg">
                </td>`
                this.things.push(buildingName)
              }else{
                this.things.push(null)
                result += "<td class=\"cardTd\"></td>"
              }
            })
            result += "</tr>"
          });
        result += "</table></div>"
        return result 
      }

      #CreateShape(card){
        let x = 0
        let y = 0
        Card.shape = [
          [null, null],
          [null, null],
          [null, null],
          [null, null]
        ]
        card.things.forEach(element => {
          Card.shape[x][y] = element
          if (y == 1){
            y = 0
            x++
          }else{
            y++
          }
        });
      }
}