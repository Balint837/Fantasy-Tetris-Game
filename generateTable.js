let x = Math.round(Math.random() * 5);
let y = Math.round(Math.random() * 5);

console.log(x, y)

function generateTable() {
    const tbl = document.getElementById("field");
    const tblBody = document.createElement("tbody");

    for (let i = 0; i < (5 + x); i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < (5 + y); j++) {
            const cell = document.createElement("td");
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    const s = document.getElementById("btnStart");
    s.remove();
}