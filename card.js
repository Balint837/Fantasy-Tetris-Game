import { CardField } from "./CardField.js"

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
            this.Select();
          });

          this.CreateCardShape()
          cardDiv.innerHTML +=`
          <img src="card/card.png" alt="Card" class="card">
          <p class="cardText">sdfsdfjksdfjksdfjk</p>`
          this.cardFields.forEach(cardField => {
            cardDiv.innerHTML +=`
          <div class="cardField"></div>
            `
          });
          cardDiv.innerHTML +=`
          <svg class="cardTitle" viewBox="0 0 500 500">
              <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"/>
              <text width="500">
                <textPath xlink:href="#curve">
                  Dangerous Vala
                </textPath>
              </text>
          </svg>
          `
          cardsDiv.appendChild(cardDiv)
      }
    
      Select(){
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

      CreateCardShape(){
        this.cardFields.push(new CardField(0, 0))
        let currentPos = [0, 0]
        while (this.cardFields.length != 5){
            if (Math.random()>0.3){
              while (true){
                const direction = parseInt(Math.random()*100)/4
                let IsOk
                if (direction <= 25){
                  IsOk = this.CheckPos(currentPos[0], currentPos[1] + 1)
                  currentPos = [currentPos[0], currentPos[0] + 1]
                }
                else if (direction <= 50){
                  IsOk = this.CheckPos(currentPos[0], currentPos[1] - 1)
                  currentPos = [currentPos[0], currentPos[0] - 1]
                }
                else if (direction <= 75){
                  IsOk = this.CheckPos(currentPos[0] + 1, currentPos[1])
                  currentPos = [currentPos[0] + 1, currentPos[0]]
                }
                else{
                  IsOk = this.CheckPos(currentPos[0] - 1, currentPos[1])
                  currentPos = [currentPos[0] - 1, currentPos[0]]
                }
                if (IsOk){
                  break
                }
              }
            }
            else{
              break
            }
        }
      }

      CheckPos(x, y){
        this.cardFields.forEach(cardField => {
          if (cardField.relX == x && cardField.relY == y){
            return false
          }
        });
        this.cardFields.push(new CardField(x, y))
        return true
      }
}