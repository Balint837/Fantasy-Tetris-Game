let x = Math.round(Math.random() * 5);
let y = Math.round(Math.random() * 5);

let blue = Math.round(Math.random() * (x-1) + 5);
let red = Math.round(Math.random() * (x-1) + 5);

let crackx = Math.round(Math.random() * (x) + 4);
let cracky = Math.round(Math.random() * (y) + 4);

let holex = Math.round(Math.random() * (x) + 4);
let holey = Math.round(Math.random() * (y) + 4);

let lakex = Math.round(Math.random() * (x) + 4);  
let lakey = Math.round(Math.random() * (y) + 4);

console.log("red", red)
console.log("blue", blue)
console.log("crack", crackx, cracky)
console.log("hole", holex, holey)
console.log("lake", lakex, lakey)

function generateTable() {
    const tbl = document.getElementById("field");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < (5 + x); i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < (5 + y); j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
            
            if (i == crackx && j == cracky) {
                cell.setAttribute("class", "crack");
                cell.innerHTML = '<img src="icons/beforeHole.png" >'
            }
            else if (i == holex && j == holey) {
                cell.setAttribute("class", "hole");
                cell.innerHTML = '<img src="icons/hole1.png" >'
            }
            else if (i == lakex && j == lakey) {
                cell.setAttribute("class", "lake");
                cell.innerHTML = '<img src="icons/water.png" >'
            }
            else if (i == 0 && j == red) {
                cell.setAttribute("id", "playerRed");
                cell.innerHTML = '<img src="icons/StartTile.png" >'
            }
            else if (i == x + 4 && j == blue) {
                cell.setAttribute("id", "playerBlue");
                cell.innerHTML = '<img src="icons/StartTile.png" >'
            }
            else{
                cell.setAttribute("class", "title");
            }
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    const s = document.getElementById("btnStart");
    s.remove();
}