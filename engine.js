
function make2DArray(columns, rows) {
    let array = new Array(columns);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
    }
    return array;
}

let grid;
let columns;
let rows;
let resolution = 10;

//graaffin piirtämiseen
let width = 1500;
let height = 1000;
let graph = new Array(width);
let time = width;
let graphsize = 1;

let FPS = 60;



for ( i = 0 ; i < width ; i ++ ) {
    graph[i] = 0;
  }

function setup() {
    createCanvas(1500, 1200);
    columns = width / resolution;
    rows = height / resolution;

    grid = make2DArray(columns, rows);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    frameRate(FPS);
}

function draw() {
    background(0);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    let next_gen = make2DArray(columns, rows);
    // Compute next based on grid
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];

            // Naapurien laskemista
            let sum = 0;
            let neighbors = countNeighbors(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next_gen[i][j] = 1;
            } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next_gen[i][j] = 0;
            } else {
                next_gen[i][j] = state;
            }

        }
    }
    grid = next_gen;
    clickToAddCell(next_gen);

    // laskee montako minkäväristä solua on
    var white = howManyCellsAndDrawGraf(grid);
    // graaffi kokeilua
    fill(200);
    textSize(20);
    text("FPS : " + FPS, 10, 50);
    text("Amount of white cells : " + white, 10, 20);
    text("Amount of white cells", width - 200, height + 30);
    text("Time: " + (int) (millis()/1000) + "s", 10, height + 30);
    graph[width-1] = white/2;
    text(white, width - 50, height + 180 - graph[width-1]/graphsize);
    stroke(255);
    for ( i = 1 ; i < width ; i ++ ) {
      point( i, height + 200 - graph[i]/graphsize);
      graph[i-1] = graph[i];
    }
    //console.log(graphsize);
    if ( white / graphsize > 350 ) {
      graphsize ++;
    }
    noStroke();
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let col = (x + i + columns) % columns;
            let row = (y + j + rows) % rows;

            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function clickToAddCell(next_gen) {
    // Get a reference to the canvas element
    const canvas = document.getElementById("defaultCanvas0");

    // Add a click event listener to the canvas
    //canvas.addEventListener("click", function (event) {
    canvas.addEventListener("mousedown", function (event) {
        // This function will be called when the canvas is clicked (click), or pressed (mousedown) - paitsi ei toimi koska miten rakennettu
        // You can access the mouse click coordinates using event.clientX and event.clientY
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        // Now, you can do something with the mouse click coordinates
        //console.log(`Mouse clicked at (${mouseX}, ${mouseY})`);

        const cellX = Math.floor(mouseX / resolution);
        const cellY = Math.floor(mouseY / resolution);

        if (next_gen[cellX][cellY] == 0) {
            next_gen[cellX][cellY] = 1;
        } else {
            next_gen[cellX][cellY] = 0;
        }

    });
}

function changeSpeed(speed) {
    //console.log(speed);
    if (speed == 1) {
        FPS = 1;
        frameRate(FPS);
    }
    if (speed == 2) {
        FPS = 20;
        frameRate(FPS);
    }
    if (speed == 3) {
        FPS = 500;
        frameRate(FPS);
    }
}

function howManyCellsAndDrawGraf(grid) {
    let white = 0;
    let black = 0;

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] == 0) {
                black++;
            } else if (grid[i][j] == 1) {
                white++;
            }
        }
    }
    //console.log("valkosia on: " + white);
    //console.log("mustia on: " + black);
    return white;
}