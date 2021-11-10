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

    getLayerDataFrom(column) {
        // refactor to 60% world height - use while loop
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
            let previousData = (chunkAbove) ? chunkAbove.getLayerDataFrom(column) : false;
            for (let row = 0; row < this.base; row++) {
                let layer = Math.floor(this.height * 0.6);
                while (layer < this.height - 1 && layer > 0) {
                    if (world[layer][row][column] === dataTypes.air) {

                    } else {

                    }
                }
                if (previousData) {
                    continue;
                }
                previousData = layer;
            }
        }
    }
}