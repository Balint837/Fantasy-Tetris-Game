import { Card } from "./card.js";
import { Color } from "./color.js";
import { Building } from "./building.js";
import { Field } from "./field.js";

export class Table {
    constructor(size = 10) {
        const mainTable = document.querySelector("#main-table");
        this.htmlElement = mainTable;
        mainTable.innerHTML = "";
        this.fields = [];
        for (let y = 0; y < size; y++) {
            const currentRow = [];

            const tr = document.createElement("tr");
            mainTable.appendChild(tr);
            this.fields.push(currentRow);
            for (let x = 0; x < size; x++) {
                const td = document.createElement("td");
                const currentField = new Field();
                currentField.BindToTD(td);
                tr.appendChild(td);
                currentRow.push(currentField);
            }
        }
        const tbody = document.querySelector("#main-table>tbody");
        this.htmlElementBody = tbody;
    }

    SetupStartPositions() {
        let startFieldRed = this.fields[0][0];
        startFieldRed.SetBuilding(Building.StartTile, Color.Red);

        let lastRow = this.fields[this.fields.length - 1];
        let startFieldBlue = lastRow[lastRow.length - 1];
        startFieldBlue.SetBuilding(Building.StartTile, Color.Blue);
    }
}