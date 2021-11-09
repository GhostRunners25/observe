class chunk {
    constructor(display, x, y, chunkSize) {
        this.display = display;
        this.x = x;
        this.y = y;
        this.base = chunkSize.base;
        this.height = chunkSize.height;
        this.generateEmptyChunk();
    }

    generateEmptyChunk() {
        this.data = new Array();
        for (let layer = 0; layer < this.height; layer++) {
            this.data.push(new Array());
            for (let row = 0; row < this.base; row++) {
                this.data[layer].push(new Uint8Array(this.base));
            }
        }
    }

    generateUnderground(height) {
        for (let layer = 0; layer < height; layer++) {
            for (let row = 0; row < this.base; row++) {
                for (let column = 0; column < this.base; column++) {
                    this.data[layer][row][column] = dataTypes.stone;
                }
            }
        }
    }

    get layerDataFrom(column) {
        const row = this.base - 1;
        for (let layer = this.height - 1; layer >= 0; layer--) {
            if (world[layer][row][column] !== dataTypes.air) {
                return layer;
            }
        }
        return 0;
    }

    render() {
        const chunkAbove = getChunk(this.x, this.y, this.base, directions.none, directions.up);
        for (let column = 0; column < this.base; column++) {
            for (let row = 0; row < this.base; row++) {
                for (let layer = this.height - 1; layer >= 0; layer--) {
                    if (world[layer][row][column] !== dataTypes.air) {
                        if (row === 0 && chunkAbove) {

                        }
                    }
                }
            }
        }
    }
}