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
}