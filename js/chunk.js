import { getChunk } from "./world.js";
import { dataTypes, directions, colours } from "./dictionary.js";

export class chunk {
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

    generateGround(seed, height) {
        for (let layer = height; layer < this.height; layer++) {
            for (let row = 0; row < this.base; row++) {
                for (let column = 0; column < this.base; column++) {

                }
            }
        }
    }

    getLayerHeightFrom(column) {
        const row = this.base - 1;
        let layer = Math.floor(this.height * 0.6);
        while (layer < this.height - 1 && layer > 0) {
            let layerNotAir = this.data[layer][row][column] !== dataTypes.air;
            if (layerNotAir && this.data[layer + 1][row][column] === dataTypes.air) {
                break;
            }
            layer += layerNotAir ? 1 : -1;
        }
        return layer;
    }

    shading(dataType, colourList, layer, info, waterDepth) {
        switch (dataType) {
            case dataTypes.air:
                return colourList[0];
            case dataTypes.water:
                return colourList[waterDepth];
            default:
                let compare = !info.exists && info.row === 0 ? 0 : layer - info.height;
                return (compare === 0) ?
                    colourList[1] : (compare > 0) ?
                        colourList[0] : colourList[2];
        }
    }

    render(pixel) {
        const chunkAbove = getChunk(this.x, this.y, this.base, directions.none, directions.up);
        const clamp = i => (i === 0) ? i + 1 : (i === this.height - 1) ? i - 1 : i;
        const position = (chunkAxis, axis) => chunkAxis + (axis * pixel);
        let previousData = { dataType: false, colourList: false };
        for (let column = 0; column < this.base; column++) {
            let previousLayer = chunkAbove ?
                clamp(chunkAbove.getLayerHeightFrom(column)) : Math.floor(this.height * 0.6);
            for (let row = 0; row < this.base; row++) {
                let layer = (this.data[this.height - 1][row][column] === dataTypes.air) ?
                    previousLayer : this.height - 1;
                let water = { exists: false, depth: 0 };
                while (layer < this.height - 1 && layer > 0) {
                    let layerDataType = this.data[layer][row][column];
                    water.depth += (water.exists) ? 1 : 0;
                    if (
                        layerDataType !== dataTypes.air &&
                        this.data[layer + 1][row][column] === dataTypes.air
                    ) {
                        water.exists = layerDataType === dataTypes.water;
                        if (!water.exists) {
                            break;
                        }
                    }
                    if ((water.exists && layerDataType !== dataTypes.water) || water.depth === 3) {
                        break;
                    }
                    layer += (layerDataType !== dataTypes.air && !water.exists) ? 1 : -1;
                }
                let positions = { x: position(this.x, column), y: position(this.y, row) };
                let dataType = this.data[layer][row][column];
                let colourList = dataType === previousData.dataType ?
                    previousData.colourList : colours(dataType);
                previousData = { dataType, colourList };
                this.display.fillStyle = this.shading(
                    dataType,
                    colourList,
                    layer,
                    { exists: chunkAbove, height: previousLayer, row },
                    water.depth,
                );
                this.display.fillRect(
                    positions.x,
                    positions.y,
                    positions.x + pixel,
                    positions.y + pixel
                );
                previousLayer = layer;
            }
        }
    }
}