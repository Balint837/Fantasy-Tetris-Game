import { Color } from "./color.js"
export class Field
{
    constructor(x, y, table, colorPath) // x: int, y: int, color: 
    {
        this.x = x;
        this.y = y;
        this.table = table;
        this.colorPath = colorPath;
    }
}