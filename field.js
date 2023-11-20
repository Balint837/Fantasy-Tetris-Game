import { Color } from "./color.js";
import { Environment } from "./environment.js";
import { Building } from "./building.js";
import { Card } from "./card.js";
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

    SetBuilding(buildingPath, colorPath) {
        this.layerBuilding2.src = buildingPath;
        this.layerEnvironment1.src = environmentPath;
        if (colorPath === undefined) {
            return;
        }
        SetColor(colorPath);
    }

    UnselectAll() {
        Field.UnselectAll(this.table);
    }

    UnselectAll() {
        this.table.UnselectAll();
    }

    RotateShape(){

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

    #OnMouseOver() {
        console.log(`hovered x=${this.x}, y=${this.y}`);

        this.UnselectAll();
        let shape = Card.shape;

        console.log(shape);
        for (let i = 0; i < this.table.rotation; i++) {
            shape = this.#RotateGridClockwise(shape);
        }
        console.log(shape);

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
            // console.log(columns);
        }
        // console.log(columns);
        
        for (let row of shape) {
            for (let i = row.length-1; i > -1; i--) {
                const columnHasElements = columns[i];
                if (!columnHasElements) {
                    row.splice(i,1);
                }
            }
        }
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

    SetColor(colorPath) {
        this.layerTile0.src = colorPath;
        this.layerEnvironment1.src = environmentPath;
    }

    SetSelected(isSelected) {
        this.layerSelection3.style.opacity = isSelected ? '1' : '0';
    }

    BindToTD(td) {
        td.appendChild(this.layerTile0);
        td.appendChild(this.layerEnvironment1);
        td.appendChild(this.layerBuilding2);
        td.appendChild(this.layerSelection3);
        //document.addEventListener("")
        td.onmouseover = () => { this.#OnMouseOver() };
    }
}