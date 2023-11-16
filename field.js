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

        this.layerTile0 = document.createElement("img");
        this.layerTile0.src = colorPath;
        this.layerTile0.style.zIndex = 0;

        this.layerEnvironment1 = document.createElement("img");
        this.layerEnvironment1.src = environmentPath;
        this.layerTile0.style.zIndex = 1;

        this.layerBuilding2 = document.createElement("img");
        this.layerBuilding2.src = buildingPath;
        this.layerTile0.style.zIndex = 2;

        this.layerSelection3 = document.createElement("div");
        this.layerSelection3.classList.add("selection-div");
        this.layerSelection3.style.display = 'hidden';
        this.layerTile0.style.zIndex = 3;
    }

    BindToTD(td) {
        var td = new HTMLElement();
        td.appendChild(this.layerTile0);
        td.appendChild(this.layerEnvironment1);
        td.appendChild(this.layerBuilding2);
        td.appendChild(this.layerSelection3);
    }
}