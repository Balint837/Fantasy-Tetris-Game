import { Card } from "./card.js";
import { Color } from "./color.js";
import { Building } from "./building.js";
import { Field } from "./field.js";

export class Table {
    constructor(size = 10) {
        const mainTable = document.querySelector("#main-table");
        this.htmlElement = mainTable;
        mainTable.innerHTML = "";
        this.rotation = 0;
        this.fields = [];
        this.hoveredField = null;
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
        this.hoveredField = null;
        for (const row of this.fields) {
            for (const field of row) {
                field.layerSelection3.style.opacity = '0';
            }
        }
    }

    IncrementTurn() {

    }

    SetupStartPositions() {
        let startFieldRed = this.fields[0][0];
        startFieldRed.SetBuilding(Building.StartTile, Color.Red);

        let lastRow = this.fields[this.fields.length - 1];
        let startFieldBlue = lastRow[lastRow.length - 1];
        startFieldBlue.SetBuilding(Building.StartTile, Color.Blue);
    }
}