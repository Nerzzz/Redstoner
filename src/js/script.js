const gameGrid = document.getElementById("game-grid");
let cols = 5;
let rows = 5;

let grid = [
    "air", "air", "air", "air", "air",
    "air", "air", "air", "air", "air",
    "air", "air", "air", "air", "air",
    "air", "air", "air", "air", "air",
    "air", "air", "air", "air", "air"
];


function loadGame(){
    const lampPos = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
    grid[lampPos] = "redstoneLamp";
    document.querySelectorAll(".cell")[lampPos].innerHTML = '<img src="./assets/images/blocks/lit_redstone_lamp.png">';
    document.querySelectorAll(".cell")[lampPos].classList.add("light-on");

    const rbPos = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
    grid[rbPos] = "redstoneBlock";
    document.querySelectorAll(".cell")[rbPos].innerHTML = '<img src="./assets/images/blocks/block_of_redstone.png">';

}

gameGrid.addEventListener("click", function(e){
    const cell = e.target.closest(".cell");
    if(!cell) return;

    const cells = Array.from(document.querySelectorAll(".cell")); 
    const index = cells.indexOf(cell);

    if(cell.children.length === 0){
        cell.innerHTML = '<img src="./assets/images/blocks/redstone_dust_dot.png">';
        grid[index] = "wire";
    } else if(grid[index] === "wire") {
        cell.innerHTML = "";
        grid[index] = "air";
    } else if(grid[index] != "air") return;

    console.log(grid);
});

loadGame();