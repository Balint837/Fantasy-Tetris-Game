import { Card } from "./card.js";
import { Color } from "./color.js";
import { Building } from "./building.js";
import { Field } from "./field.js";
import { Environment } from "./environment.js";
import { GetSrc } from "./utils.js";

export class Table {
    constructor(size = 10) {
        if (size < 3) {
            throw new Error("size must be at least 3");
        }
        this.cards = [];
        const mainTable = document.querySelector("#main-table");
        this.htmlElement = mainTable;
        mainTable.innerHTML = "";
        this.gameOver = false;
        this.rotation = 0;
        this.emptyPasses = 0;
        this.fields = [];
        const currentPlayerText = document.querySelector("#currentPlayer p");
        this.currentPlayer = Color.Red;
        currentPlayerText.innerText = "Red";
        document.querySelector("#winAnnouncement p").innerText = " ";
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
                field.SetSelected(false);
            }
        }
    }

    PassTurn(placed=true) {
        if (this.gameOver) {
            return;
        }
        this.rotation = 0;
        const currentPlayerText = document.querySelector("#currentPlayer p");

        if (this.currentPlayer == Color.Red) {
            this.currentPlayer = Color.Blue
            currentPlayerText.innerText = "Blue";
        }
        else{
            this.currentPlayer = Color.Red;
            currentPlayerText.innerText = "Red";
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
                if (random < 0.025) {
                    field.layerEnvironment1.src = Environment.Hole;
                }
            }
        }
        this.cards.length = 0;
        if (placed) {
            this.emptyPasses = 0;
            this.RefreshScore();
        }
        else{
            this.emptyPasses++;
            if (this.emptyPasses > 4) {
                this.GameEnd();
            }
        }
    }

    GameEnd(){
        const scores = this.RefreshScore();
        const winText = document.querySelector("#winAnnouncement p");
        if (scores[0] == scores[1]) {
            winText.innerText = "Draw!";
        }
        else if (scores[0] < scores[1]) {
            winText.innerText = "Blue won!";
        }
        else{
            winText.innerText = "Red won!";
        }
        this.gameOver = true;
    }

    CalculateScores(){
        let redScore = 0;
        let blueScore = 0;
        for (let y = 0; y < this.fields.length; y++) {
            const row = this.fields[y];
            for (let x = 0; x < row.length; x++) {
                const field = row[x];
                if (GetSrc(field.layerTile0) == Color.None) {
                    continue;
                }
                let fieldValue = 1;

                switch (GetSrc(field.layerBuilding2)) {
                    case Building.Airship:
                        fieldValue+=1;
                        if (GetSrc(field.layerEnvironment1) == Environment.Water) {
                            fieldValue+=1;
                            break;
                        }
                        if (GetSrc(field.layerEnvironment1) == Environment.Hole) {
                            fieldValue+=2;
                            break;
                        }
                        break;
                    case Building.Lilypad:
                        fieldValue+=5;
                        break;
                    case Building.Dragon:
                        fieldValue+=1;
                        if (x > 0 && GetSrc(row[x-1].layerBuilding2) == Building.Cave && row[x-1].layerTile0.src == field.layerTile0.src) {
                            fieldValue+=2;
                            break;
                        }
                        if (x < (row.length-1) && GetSrc(row[x+1].layerBuilding2) == Building.Cave && row[x+1].layerTile0.src == field.layerTile0.src) {
                            fieldValue+=2;
                            break;
                        }
                        if (y > 0 && GetSrc(this.fields[y-1][x].layerBuilding2) == Building.Cave && this.fields[y-1][x].layerTile0.src == field.layerTile0.src) {
                            fieldValue+=2;
                            break;
                        }
                        if (y < (this.fields.length-1) && GetSrc(this.fields[y+1][x].layerBuilding2) == Building.Cave && this.fields[y+1][x].layerTile0.src == field.layerTile0.src) {
                            fieldValue+=2;
                            break;
                        }
                        break;
                    case Building.Castle:
                        fieldValue+=1;
                        if (x > 0 && row[x-1].layerTile0.src != field.layerTile0.src) {
                            fieldValue+=1;
                            break;
                        }
                        if (x < (row.length-1) && row[x+1].layerTile0.src != field.layerTile0.src) {
                            fieldValue+=1;
                            break;
                        }
                        if (y > 0 && this.fields[y-1][x].layerTile0.src != field.layerTile0.src) {
                            fieldValue+=1;
                            break;
                        }
                        if (y < (this.fields.length-1) && this.fields[y+1][x].layerTile0.src != field.layerTile0.src) {
                            fieldValue+=1;
                            break;
                        }
                        break;
                    case Building.Wood:
                        fieldValue+=1;
                        if (x > 0 && GetSrc(row[x-1].layerEnvironment1) == Environment.Water) {
                            fieldValue+=1;
                            break;
                        }
                        if (x < (row.length-1) && GetSrc(row[x+1].layerEnvironment1) == Environment.Water) {
                            fieldValue+=1;
                            break;
                        }
                        if (y > 0 && GetSrc(this.fields[y-1][x].layerEnvironment1) == Environment.Water) {
                            fieldValue+=1;
                            break;
                        }
                        if (y < (this.fields.length-1) && GetSrc(this.fields[y+1][x].layerEnvironment1) == Environment.Water) {
                            fieldValue+=1;
                            break;
                        }
                        break;
                    case Building.Boat:
                        if (GetSrc(field.layerEnvironment1) == Environment.Water) {
                            fieldValue+=3;
                        }
                        break;
                    default:
                        fieldValue+=1;
                        break;
                }

                if (GetSrc(field.layerTile0) == Color.Red) {
                    redScore+=fieldValue;
                }
                else{
                    blueScore+=fieldValue;
                }
            }
        }
        return [redScore, blueScore];
    }

    RefreshScore(){
        const scores = this.CalculateScores();
        const redScoreSpan = document.querySelector("#redPlayerScore p span");
        const blueScoreSpan = document.querySelector("#bluePlayerScore p span");
        redScoreSpan.innerText = `${scores[0]}`;
        blueScoreSpan.innerText = `${scores[1]}`;
        return scores;
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
        const startFieldRed = this.fields[0][0];
        startFieldRed.SetBuilding(Building.StartTile, Environment.None, Color.Red);
        this.fields[1][0].SetBuilding(Building.None, Environment.None, Color.None);
        this.fields[0][1].SetBuilding(Building.None, Environment.None, Color.None);
        this.fields[1][1].SetBuilding(Building.None, Environment.None, Color.None);

        const lastY = this.fields.length - 1;
        const lastRow = this.fields[lastY];
        const lastX = lastRow.length - 1;
        const startFieldBlue = lastRow[lastX];
        startFieldBlue.SetBuilding(Building.StartTile, Environment.None, Color.Blue);

        this.fields[lastY][lastX-1].SetBuilding(Building.None, Environment.None, Color.None);
        this.fields[lastY-1][lastX].SetBuilding(Building.None, Environment.None, Color.None);
        this.fields[lastY-1][lastX-1].SetBuilding(Building.None, Environment.None, Color.None);
    }
}