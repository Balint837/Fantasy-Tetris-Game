export class Card{
    constructor(){
        this.Set()
    }

    Set(){
        const cardsDiv = document.querySelector(".cardsDiv")
        const cardDiv = document.createElement("div")
        cardDiv.classList.add("cardDiv")
        cardDiv.innerHTML +=`
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
        cardsDiv.appendChild(cardDiv)
    }
}