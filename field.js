let x = Math.round(Math.random() * 5);
let y = Math.round(Math.random() * 5);

let blue = Math.round(Math.random() * 5 + x);
let red = Math.round(Math.random() * 5 + x);

function generateTable() {
    const tbl = document.getElementById("field");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < (5 + x); i++) {
        const row = document.createElement("tr");
        
        for (let j = 0; j < (5 + y); j++) {
            const cell = document.createElement("td");
            if(i == 0 && j == red){
                row.appendChild(cell)
                cell.setAttribute("id", "playerRed")
            }
            if(i == x + 5 && j == blue){
                row.appendChild(cell)
                cell.setAttribute("id", "playerBlue")
            }
            else{
                row.appendChild(cell);
            }
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    const s = document.getElementById("btnStart");
    s.remove();
}