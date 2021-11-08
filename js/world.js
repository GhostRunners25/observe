let pixel;
let world;

function initialise(display, chunkSize, pixelSize) {
    pixel = pixelSize;
    generateEmptyWorld(display, chunkSize);
    console.log(world[0][0].data[0][0][0]);
}

function generateEmptyWorld(display, chunkSize) {
    const position = i => chunkSize.base * pixel * i;

    const { width, height } = display.canvas;
    const rows = Math.ceil(height / chunkSize.base);
    const columns = Math.ceil(width / chunkSize.base);

    world = new Array(rows);
    for (let row = 0; row < rows; row++) {
        world[row] = new Array(columns);
        for (let column = 0; column < columns; column++) {
            world[row][column] = new chunk(display, position(column), position(row), chunkSize);
        }
    }
}