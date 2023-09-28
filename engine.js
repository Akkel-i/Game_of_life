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

function setup() {
    createCanvas(1200, 800);
    columns = width / resolution;
    rows = height / resolution;

    grid = make2DArray(columns, rows);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
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
    canvas.addEventListener("click", function (event) {
        // This function will be called when the canvas is clicked
        // You can access the mouse click coordinates using event.clientX and event.clientY
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        // Now, you can do something with the mouse click coordinates
        //console.log(`Mouse clicked at (${mouseX}, ${mouseY})`);

        const cellX = Math.floor(mouseX / resolution);
        const cellY = Math.floor(mouseY / resolution);

        /*
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];

                if (state == 0) {
                    next_gen[i][j] = 1;
                } else if (state == 1) {
                    next_gen[i][j] = 0;
                }
            }
        }
    });
    */
    if (next_gen[cellX][cellY] == 0) {
        next_gen[cellX][cellY] = 1;
    } else {
        next_gen[cellX][cellY] = 0;
    }

});
}