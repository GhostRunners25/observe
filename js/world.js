let pixel;
let world;
let rows;
let columns;

function initialise(display, chunkSize, pixelSize) {
    pixel = pixelSize;
    generateEmptyWorld(display, chunkSize);
}

function generateEmptyWorld(display, chunkSize) {
    const position = i => chunkSize.base * pixel * i;

    const { width, height } = display.canvas;
    rows = Math.ceil(height / chunkSize.base);
    columns = Math.ceil(width / chunkSize.base);

    world = new Array(rows);
    for (let row = 0; row < rows; row++) {
        world[row] = new Array(columns);
        for (let column = 0; column < columns; column++) {
            world[row][column] = new chunk(display, position(column), position(row), chunkSize);
        }
    }
}

function generateTerrain(seed, height) {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            world[row][column].generateUnderground(height);
        }
    }
}

function getChunk(x, y, base, horizontal, vertical) {
    const position = i => Math.ceil((i / pixel) / base);
    const calculatedChunk = {
        x: position(x) + horizontal,
        y: position(y) + vertical,
    }
    if (
        calculatedChunk.x < 0 || calculatedChunk.x > columns ||
        calculatedChunk.y < 0 || calculatedChunk.y > rows
    ) {
        return false;
    }
    return world[calculatedChunk.y][calculatedChunk.x];
}

function renderAllChunks() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            world[row][column].render();
        }
    }
}