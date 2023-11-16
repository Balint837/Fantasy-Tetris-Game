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
        this.layerTile0.src = `icons/${colorPath}`;
        this.layerTile0.style.zIndex = 0;

        this.layerEnvironment1 = document.createElement("img");
        this.layerEnvironment1.src = `icons/${environmentPath}`;
        this.layerTile0.style.zIndex = 1;

        this.layerBuilding2 = document.createElement("img");
        this.layerBuilding2.src = `icons/${buildingPath}`;
        this.layerTile0.style.zIndex = 2;

        this.layerSelection3 = document.createElement("div");
        this.layerSelection3.classList.add("selection-div");
        this.layerSelection3.style.display = 'hidden';
        this.layerTile0.style.zIndex = 3;
    }

    SetBuilding(buildingPath, colorPath) {
        this.layerBuilding2.src = `icons/${buildingPath}`;
        this.layerEnvironment1.src = `icons/${Environment.None}`;
        if (colorPath === undefined) {
            return;
        }
        SetColor(colorPath);
    }

    SetColor(colorPath) {
        this.layerTile0.src = `icons/${colorPath}`;
        this.layerEnvironment1.src = `icons/${Environment.None}`;
    }

    SetSelected(isSelected) {
        this.layerSelection3.style.display = isSelected ? '' : 'hidden';
    }

    BindToTD(td) {
        td.appendChild(this.layerTile0);
        td.appendChild(this.layerEnvironment1);
        td.appendChild(this.layerBuilding2);
        td.appendChild(this.layerSelection3);
    }
}