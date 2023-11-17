import { Color } from "./color.js";
import { Environment } from "./environment.js";
import { Building } from "./building.js";
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
        this.layerSelection3.style.display = 'hidden';
        this.layerSelection3.style.zIndex = 3;
    }

    #CreateImg(zindex, src = undefined){
        const img = document.createElement("img");
        img.onmou
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

    #OnMouseOver() {

    }
    #OnMouseLeave() {

    }

    SetColor(colorPath) {
        this.layerTile0.src = colorPath;
        this.layerEnvironment1.src = environmentPath;
    }

    SetSelected(isSelected) {
        this.layerSelection3.style.display = isSelected ? '' : 'hidden';
    }

    BindToTD(td) {
        td.appendChild(this.layerTile0);
        td.appendChild(this.layerEnvironment1);
        td.appendChild(this.layerBuilding2);
        td.appendChild(this.layerSelection3);
        td.onmouseover = this.#OnMouseOver;
    }
}