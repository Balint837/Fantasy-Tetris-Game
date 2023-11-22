import { Color } from "./color.js";
import { Environment } from "./environment.js";
import { Building } from "./building.js";
import { Card } from "./card.js";
import { GetSrc } from "./utils.js";
export class Field
{
    constructor(x, y, table, colorPath = Color.None, environmentPath = Environment.None, buildingPath = Building.None) // x: int, y: int, color: 
    {
        this.x = x;
        this.y = y;
        this.table = table;

        this.layerTile0 = this.#CreateImg(0, colorPath);

        this.layerEnvironment1 = this.#CreateImg(1, environmentPath);

        this.layerBuilding2 = this.#CreateImg(2, buildingPath);

        this.layerSelection3 = document.createElement("div");
        this.layerSelection3.classList.add("selection-div");
        this.layerSelection3.classList.add("table-tile");
        this.layerSelection3.style.zIndex = 3;

        this.layerSelectionBuilding4 = this.#CreateImg(4, Building.None);
        
        this.SetSelected(false);
    }

    #CreateImg(zindex, src = undefined){
        const img = document.createElement("img");
        img.classList.add("table-tile");
        img.style.zIndex = zindex;
        if (src === undefined) {
            return;
        }
        img.src = src;
        return img;
    }

    SetBuilding(buildingPath, environmentPath=undefined, colorPath=undefined) {
        this.layerBuilding2.src = buildingPath;
        if (environmentPath != undefined) {
            this.layerEnvironment1.src = environmentPath;   
        }
        if (colorPath != undefined) {
            this.SetColor(colorPath);
        }
    }

    UnselectAll() {
        this.table.UnselectAll();
    }

    #TryPlace(){
        const tableLength = this.table.fields[0].length;
        const tableHeight = this.table.fields.length;
        const shape = this.#CutGridForSelection(Card.shape);
        let anyWithNeighbors = false;
        if (!shape.length) {
            return;
        }
        for (let y = 0; y < shape.length; y++) {
            const row = shape[y];

            for (let x = 0; x < row.length; x++) {
                const currentBuilding = row[x];
                if (currentBuilding == null) {
                    continue;
                }
                const isOutOfBounds = this.x+x >= tableLength || this.y+y >= tableHeight;
                if (isOutOfBounds) {
                    alertText = document.querySelector("#alertText")[0]
                    alertText.innerHTML = "Out of bounds"
                    return;
                }
                const field = this.table.fields[this.y+y][this.x+x];

                if (!anyWithNeighbors) {
                    let ty = this.y+y-1;
                    let tx = this.x+x;
                    if (ty > -1 && ty < tableHeight) {
                        anyWithNeighbors |= GetSrc(this.table.fields[ty][tx].layerTile0) == this.table.currentPlayer;
                    }
                    ty = ty+2;
                    if (ty > -1 && ty < tableHeight) {
                        anyWithNeighbors |= GetSrc(this.table.fields[ty][tx].layerTile0) == this.table.currentPlayer;
                    }
                    ty = ty-1;
                    tx = tx-1;
                    if (tx > -1 && tx < tableLength) {
                        anyWithNeighbors |= GetSrc(this.table.fields[ty][tx].layerTile0) == this.table.currentPlayer;
                    }
                    tx = tx+2;
                    if (tx > -1 && tx < tableLength) {
                        anyWithNeighbors |= GetSrc(this.table.fields[ty][tx].layerTile0) == this.table.currentPlayer;
                    }
                }

                if (GetSrc(field.layerEnvironment1) == Environment.Mountain) {
                    const alertText = document.getElementById("alertText")
                    alertText.innerHTML = "The mountain is in the way!"
                    alertText.style.color = "red"
                    return;
                }
                if (GetSrc(field.layerBuilding2) == Building.StartTile) {
                    const alertText = document.getElementById("alertText")
                    alertText.innerHTML = "You can't place on your starting tile!"
                    alertText.style.color = "red"
                    return;
                }
                
                if (field.table.currentPlayer == GetSrc(field.layerTile0)) {
                    const alertText = document.getElementById("alertText")
                    alertText.innerHTML = "This is your own territory!"
                    alertText.style.color = "red"
                    return;
                }
                else if (GetSrc(field.layerTile0) != Color.None) {
                    if (currentBuilding != Building.Sword) {
                        const alertText = document.getElementById("alertText")
                        alertText.innerHTML = "The enemy owns this tile!"
                        alertText.style.color = "red"
                        return;
                    }
                }
                else{
                    switch (currentBuilding) {
                        case Building.Airship:
                            break;
                        case Building.Boat:
                            if (GetSrc(field.layerEnvironment1) != Environment.BeforeHole && GetSrc(field.layerEnvironment1) != Environment.None && GetSrc(field.layerEnvironment1) != Environment.Water) {
                                const alertText = document.getElementById("alertText")
                                alertText.innerHTML = "A boat needs surface or water!"
                                alertText.style.color = "red"
                                return;
                            }
                            break;
                        case Building.Lilypad:
                            if (GetSrc(field.layerEnvironment1) == Environment.Hole) {
                                const alertText = document.getElementById("alertText")
                                alertText.innerHTML = "Lilypads can't on a hole!"
                                alertText.style.color = "red"
                                return;
                            }
                            break;
                        default:
                            if (GetSrc(field.layerEnvironment1) != Environment.BeforeHole && GetSrc(field.layerEnvironment1) != Environment.None) {
                                const alertText = document.getElementById("alertText")
                                alertText.innerHTML = "A building needs surface!"
                                alertText.style.color = "red"
                                return;
                            }
                            break;
                    }
                }
            }
        }

        if (!anyWithNeighbors) {
            return;
        }
        for (let y = 0; y < shape.length; y++) {
            const row = shape[y];

            for (let x = 0; x < row.length; x++) {
                const currentBuilding = row[x];
                if (currentBuilding == null) {
                    continue;
                }
                const field = this.table.fields[this.y+y][this.x+x];

                if (GetSrc(field.layerTile0) == Color.None) { //empty field
                    field.SetBuilding(currentBuilding, undefined, this.table.currentPlayer);
                    if (GetSrc(field.layerEnvironment1) != Environment.Hole && GetSrc(field.layerEnvironment1) != Environment.Water) {
                        field.layerEnvironment1.src = Environment.None;
                    }
                    if (currentBuilding == Building.Sword) {
                        field.SetBuilding(Building.None);
                    }
                    if (currentBuilding == Building.Lilypad && GetSrc(field.layerEnvironment1) != Environment.Water) {
                        field.SetBuilding(Building.None);
                    }
                }
                else { //enemy field
                    if (currentBuilding != Building.Sword) {
                        const alertText = document.getElementById("alertText")
                        alertText.innerHTML = "You shouldn't be able to see this (building!=sword)"
                        alertText.style.color = "red"
                        return;
                    }
                    field.SetBuilding(Building.None, undefined, Color.None);
                }
            }
        }
        this.table.PassTurn();
        this.UnselectAll();
    }

    #RotateGridClockwise(grid){
        let gridHeight = grid.length;
        let gridLength = grid[0].length;

        const output = []
        for (let i = 0; i < gridLength; i++) {
            const newRow = []
            for (let i = 0; i < gridHeight; i++) {
                newRow.push(undefined);
            }
            output.push(newRow);
        }

        for (let y = 0; y < gridHeight; y++) {
            const row = grid[y];
            if (row.length != gridLength) {
                throw new Error("This isn't a valid matrix!");
            }
            for (let x = 0; x < gridLength; x++) {
                const element = row[x];
                output[x][gridHeight-y-1] = element;
            }
        }
        return output;
    }

    #CutGridForSelection(shape){

        
        for (let i = 0; i < this.table.rotation; i++) {
            shape = this.#RotateGridClockwise(shape);
        }
        

        let transformShape = [];
        for (const row of shape) {
            for (const buildingType of row) {
                if (buildingType != null) {
                    transformShape.push(row);
                    break;
                }
            }
        }
        shape = transformShape;
        let columns = []
        for (const row of shape) {
            for (let x = 0; x < row.length; x++) {
                const element = row[x];
                const isNotNull = element != null;
                if (columns.length == x) {
                    columns.push(isNotNull);
                }
                else{
                    columns[x] |= isNotNull;
                }
            }
        }
        
        for (let row of shape) {
            for (let i = row.length-1; i > -1; i--) {
                const columnHasElements = columns[i];
                if (!columnHasElements) {
                    row.splice(i,1);
                }
            }
        }
        return shape;
    }

    #OnMouseOver() {
        if (this.table.gameOver) {
            return;
        }
        const shape = this.#CutGridForSelection(Card.shape);
        this.UnselectAll();
        const tableLength = this.table.fields[0].length;
        const tableHeight = this.table.fields.length;
        for (let y = 0; y < shape.length; y++) {
            const row = shape[y];

            for (let x = 0; x < row.length; x++) {
                const building = row[x];
                if (building == null) {
                    continue;
                }
                const isOutOfBounds = this.x+x >= tableLength || this.y+y >= tableHeight;
                if (isOutOfBounds) {
                    this.UnselectAll();
                    return;
                }
                this.table.fields[this.y+y][this.x+x].SetSelected(true, building);
            }
        }
    }

    SetColor(colorPath, environmentPath=undefined) {
        this.layerTile0.src = colorPath;
        if (environmentPath != undefined) {
            this.layerEnvironment1.src = environmentPath;
        }
    }

    SetSelected(isSelected, building=Building.None) {
        this.layerSelection3.style.opacity = isSelected ? '0.25' : '0';
        this.layerSelectionBuilding4.style.opacity = isSelected ? '0.5' : '0';
        this.layerSelectionBuilding4.src = building;
    }

    BindToTD(td) {
        td.appendChild(this.layerTile0);
        td.appendChild(this.layerEnvironment1);
        td.appendChild(this.layerBuilding2);
        td.appendChild(this.layerSelectionBuilding4);
        td.appendChild(this.layerSelection3);
        //document.addEventListener("")
        td.onmouseover = () => { this.#OnMouseOver() };
        td.addEventListener("click", () => { this.#TryPlace() });
    }
}