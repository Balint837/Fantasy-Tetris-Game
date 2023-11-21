import { Card } from "./card.js";
import { Color } from "./color.js";
import { Building } from "./building.js";
import { Field } from "./field.js";
import { Environment } from "./environment.js";
import { GetSrc } from "./utils.js";

export class Table {
    constructor(size = 10) {
        this.cards = [];
        const mainTable = document.querySelector("#main-table");
        this.htmlElement = mainTable;
        mainTable.innerHTML = "";
        this.rotation = 0;
        this.fields = [];
        this.currentPlayer = Color.Red;
        for (let y = 0; y < size; y++) {
            const currentRow = [];

            const tr = document.createElement("tr");
            mainTable.appendChild(tr);
            this.fields.push(currentRow);
            for (let x = 0; x < size; x++) {
                const td = document.createElement("td");
                const currentField = new Field(x,y, this);
                currentField.BindToTD(td);
                tr.appendChild(td);
                currentRow.push(currentField);
            }
        }
        this.UnselectAll();
        document.addEventListener("auxclick", () => { this.CycleRotation() });
        document.addEventListener("mouseout", () => { this.UnselectAll() });
        this.RandomizeTable();
        this.SetupStartPositions();
    }

    CycleRotation(){
        this.rotation++;
        if (this.rotation < 0) {
            this.rotation = 3;
        }
        else if (this.rotation > 3) {
            this.rotation = 0;
        }
    }

    UnselectAll() {
        for (const row of this.fields) {
            for (const field of row) {
                field.layerSelection3.style.opacity = '0';
            }
        }
    }

    PassTurn() {
        console.log("passed turn!");
        if (this.currentPlayer == Color.Red) {
            this.currentPlayer = Color.Blue
        }
        else{
            this.currentPlayer = Color.Red;
        }
        Card.Reset();
        for (const card of this.cards) {
            card.cardDiv.remove();
        }
        for (const row of this.fields) {
            for (const field of row) {
                if (GetSrc(field.layerEnvironment1) != Environment.BeforeHole || GetSrc(field.layerTile0) != Color.None) {
                    continue;
                }
                const random = Math.random();
                if (random < 0.05) {
                    field.layerEnvironment1.src = Environment.Hole;
                }
            }
        }
    }

    RandomizeTable(){
        for (const row of this.fields) {
            for (const field of row) {
                const random = Math.random()*100;
                if (random < 3) {
                    field.layerEnvironment1.src = Environment.Mountain;
                }
                else if (random < 10) {
                    field.layerEnvironment1.src = Environment.Water;
                }
                else if (random < 15) {
                    field.layerEnvironment1.src = Environment.BeforeHole;
                }
            }
        }
    }

    SetupStartPositions() {
        let startFieldRed = this.fields[0][0];
        startFieldRed.SetBuilding(Building.StartTile, Environment.None, Color.Red);

        let lastRow = this.fields[this.fields.length - 1];
        let startFieldBlue = lastRow[lastRow.length - 1];
        startFieldBlue.SetBuilding(Building.StartTile, Environment.None, Color.Blue);
    }
}