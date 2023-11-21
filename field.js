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
        this.layerSelection3.style.display = 'hidden';
        this.layerSelection3.style.zIndex = 3;
        
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
        console.log("click!");
        const tableLength = this.table.fields[0].length;
        const tableHeight = this.table.fields.length;
        const shape = this.#CutGridForSelection(Card.shape);
        console.log(shape);
        let anyWithNeighbors = false;
        if (!shape.length) {
            console.log("nothing is selected!");
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
                    console.log("out of bounds!");
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
                    console.log("mountain!");
                    return;
                }
                if (GetSrc(field.layerBuilding2) == Building.StartTile) {
                    console.log("start tile!");
                    return;
                }
                
                if (field.table.currentPlayer == GetSrc(field.layerTile0)) {
                    console.log("you own this tile!")
                    return;
                }
                else if (GetSrc(field.layerTile0) != Color.None) {
                    if (currentBuilding != Building.Sword) {
                        console.log(`the enemy owns this tile! '${currentBuilding}', '${field.layerTile0.src}'`)
                        return;
                    }
                }
                else{
                    switch (currentBuilding) {
                        case Building.Airship:
                            break;
                        case Building.Lilypad:
                            if (GetSrc(field.layerEnvironment1) == Environment.Hole) {
                                console.log("lilypads can't go here!")
                                return;
                            }
                            break;
                        case Building.Boat:
                            if (GetSrc(field.layerEnvironment1) != Environment.Water) {
                                console.log("boats can't go here!")
                                return;
                            }
                            break;
                        default:
                            if (GetSrc(field.layerEnvironment1) != Environment.BeforeHole && GetSrc(field.layerEnvironment1) != Environment.None) {
                                console.log("that can't go there!")
                                return;
                            }
                            break;
                    }
                }
            }
        }

        if (!anyWithNeighbors) {
            console.log("no neighboring friendlies!")
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
                }
                else { //enemy field
                    if (currentBuilding != Building.Sword) {
                        console.log(`only swords go here! '${currentBuilding}', '${GetSrc(field.layerTile0)}'`)
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

        const shape = this.#CutGridForSelection(Card.shape);
        this.UnselectAll();
        const tableLength = this.table.fields[0].length;
        const tableHeight = this.table.fields.length;
        for (let y = 0; y < shape.length; y++) {
            const row = shape[y];

            for (let x = 0; x < row.length; x++) {
                if (row[x] == null) {
                    continue;
                }
                const isOutOfBounds = this.x+x >= tableLength || this.y+y >= tableHeight;
                if (isOutOfBounds) {
                    this.UnselectAll();
                    return;
                }
                this.table.fields[this.y+y][this.x+x].SetSelected(true);
            }
        }
    }

    SetColor(colorPath, environmentPath=undefined) {
        this.layerTile0.src = colorPath;
        if (environmentPath != undefined) {
            this.layerEnvironment1.src = environmentPath;
        }
    }

    SetSelected(isSelected) {
        this.layerSelection3.style.opacity = isSelected ? '0.4' : '0';
    }

    BindToTD(td) {
        td.appendChild(this.layerTile0);
        td.appendChild(this.layerEnvironment1);
        td.appendChild(this.layerBuilding2);
        td.appendChild(this.layerSelection3);
        //document.addEventListener("")
        td.onmouseover = () => { this.#OnMouseOver() };
        td.addEventListener("click", () => { this.#TryPlace() });
    }
}