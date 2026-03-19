const gameGrid = document.getElementById("game-grid");

let cols = 0;
let rows = 0;
let grid = [];
let powerGrid = [];

let _lampPos = 0;
let _redstonePos = 0;

let redstonePower = 0;

function restart(){
    gameGrid.innerHTML = "";
    grid = [];
    powerGrid = [];
    loadGame();
}

function createGrid(){
    cols = Math.floor(Math.random() * (8 - 4 + 1) + 4);
    rows = Math.floor(Math.random() * (8 - 4 + 1) + 4);

    for(let i = 0; i < (cols*rows); i++){
        grid.push("air");
        powerGrid.push(0);
        gameGrid.innerHTML += "<div class='cell'></div>";
    }

    gameGrid.style.gridTemplateColumns = `repeat(${cols}, 64px)`;
    gameGrid.style.gridTemplateRows = `repeat(${rows}, 64px)`;

    console.log(`Created ${cols}x${rows} grid (${cols*rows})`);
}

function isLampOnBlock(){
    const row = Math.floor(_redstonePos/cols);
    const col = _redstonePos % cols;

    if(row > 0){
        if(grid[_redstonePos - cols] === "redstoneLamp" || grid[_lampPos - cols] == "redstoneBlock") return true;
    }

    if(row < rows - 1){
        if(grid[_redstonePos + cols] === "redstoneLamp" || grid[_lampPos + cols] == "redstoneBlock") return true;
    }

    if(col > 0){
        if(grid[_redstonePos - 1] === "redstoneLamp" || grid[_lampPos - 1] == "redstoneBlock") return true;
    }

    if(col < cols - 1){
        if(grid[_redstonePos + 1] === "redstoneLamp" || grid[_lampPos + 1] == "redstoneBlock") return true;
    }

    if(_redstonePos == _lampPos) return true;

    return false;
}

function loadGame(){
    createGrid();
    const gridSpaces = cols * rows;

    try{
        _lampPos = Math.floor(Math.random() * (gridSpaces - 0 + 1)) + 0;
        grid[_lampPos] = "redstoneLamp";
        powerGrid[_lampPos] = "RL";
        document.querySelectorAll(".cell")[_lampPos].innerHTML = '<img id="lamp" src="./assets/images/blocks/redstone_lamp.png">';
        document.querySelectorAll(".cell")[_lampPos].classList.add("light-off");

        _redstonePos = Math.floor(Math.random() * (gridSpaces - 0 + 1)) + 0;
        grid[_redstonePos] = "redstoneBlock";
        powerGrid[_redstonePos] = "RB";
        document.querySelectorAll(".cell")[_redstonePos].innerHTML = '<img id="block" src="./assets/images/blocks/block_of_redstone.png">';

        redstonePower = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
        document.getElementById("cur-rdPw").innerHTML = redstonePower;

        if(isLampOnBlock()) restart();
    }
    catch(error){
        restart();
    }
}

gameGrid.addEventListener("click", function(e){
    const cell = e.target.closest(".cell");
    if(!cell) return;

    const cells = Array.from(document.querySelectorAll(".cell")); 
    const index = cells.indexOf(cell);

    if(cell.children.length === 0){
        cell.innerHTML = '<img src="./assets/images/blocks/redstone_dust_dot_off.png" data-state="off" data-redstone-power="0">';
        checkRedstone(index);
        grid[index] = "wire";
    } else if(grid[index] === "wire") {
        cell.innerHTML = "";
        grid[index] = "air";
        powerGrid[index] = 0;
        return;
    } else if(grid[index] != "air") return;
});

function checkRedstone(index){
    const cell = document.querySelectorAll(".cell")[index];

    if(nearRedstoneBlock(index)){
        powerGrid[index] = redstonePower;
    }
    else{
        powerGrid[index] = testPower(index);
        if(powerGrid[index] < 0) powerGrid[index] = 0;
    }

    if(powerGrid[index] > 0) { 
        cell.innerHTML = `<img src="./assets/images/blocks/redstone_dust_dot_on.png" data-state="on" data-redstone-power="${powerGrid[index]}">`;
    }
    else{
        cell.innerHTML = `<img src="./assets/images/blocks/redstone_dust_dot_off.png" data-state="off" data-redstone-power="${powerGrid[index]}">`;
    }

    if(nearLamp(index) > 0){
        document.querySelectorAll(".cell")[_lampPos].innerHTML = '<img id="lamp" src="./assets/images/blocks/lit_redstone_lamp.png">';
        document.querySelectorAll(".cell")[_lampPos].classList.add("light-on");
    }
}

function nearLamp(index){
    const row = Math.floor(index/cols);
    const col = index % cols;

    if(row > 0){
        if(grid[index - cols] === "redstoneLamp") return powerGrid[index];
    }

    if(row < rows - 1){
        if(grid[index + cols] === "redstoneLamp") return powerGrid[index];
    }

    if(col > 0){
        if(grid[index - 1] === "redstoneLamp") return powerGrid[index];
    }

    if(col < cols - 1){
        if(grid[index + 1] === "redstoneLamp") return powerGrid[index];
    }

    return false;
}

function testPower(index){
    const row = Math.floor(index/cols);
    const col = index % cols;

    if(powerGrid[index] >= 0){
        if(row > 0){
            if(grid[index - cols] === "wire") return powerGrid[index - cols]-1;
        }
    
        if(row < rows - 1){
            if(grid[index + cols] === "wire") return powerGrid[index + cols]-1;
        }
    
        if(col > 0){
            if(grid[index - 1] === "wire") return powerGrid[index - 1]-1;
        }
    
        if(col < cols - 1){
            if(grid[index + 1] === "wire") return powerGrid[index + 1]-1;
        }
    }

}

function nearRedstoneBlock(index){
    const row = Math.floor(index/cols);
    const col = index % cols;

    if(row > 0){
        if(grid[index - cols] === "redstoneBlock") return true;
    }

    if(row < rows - 1){
        if(grid[index + cols] === "redstoneBlock") return true;
    }

    if(col > 0){
        if(grid[index - 1] === "redstoneBlock") return true;
    }

    if(col < cols - 1){
        if(grid[index + 1] === "redstoneBlock") return true;
    }

    return false;
}

loadGame();