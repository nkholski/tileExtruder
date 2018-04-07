const fs = require('fs'),
    Canvas = require('canvas-prebuilt'); // Node

const Extruder = class {
    constructor() {
        if (Canvas) {
            if (!fs.existsSync("extruded")) {
                fs.mkdirSync("extruded");
            }
        }
    }

    extrude(source, dest, dim) {
        if (source.endsWith("json")) {
            this.extrudeFromTilemap(source, dest, dim);
        } else {
            this.extrudeImage(source, dest, dim);
        }
    }

    extrudeFromTilemap(source, dest, data) {
        let tilesets;
        if (typeof (data) === "string") {
            data = JSON.parse(data);
            tilesets = data.tilesets;
        } else {
            tilesets = data.tilesets; // ???
        }
        tilesets.forEach(
            (tileset) => {
                let dim = { x: tileset.tilewidth, y: tileset.tileheight };
                this.extrudeImage(tileset.image, dim, tileset.spacing);
                tileset.imageheight = (tileset.imageheight / dim.y)*(dim.y+2)-1;
                tileset.imagewidth = (tileset.imagewidth / dim.x)*(dim.x+2)-1;
                if (Canvas) {
                    /* Node */
                    while(!this.image.complete){}
                    this.render(dim, tileset.spacing);
                    this.save();
                    tileset.spacing = 2;
                } else {
                    /* Phaser */
                }
            }
        );
        // Save into Tilemap if it's node
        if (Canvas) {
            /* Node */
            data = JSON.stringify(data);

            fs.writeFileSync("extruded/" + dest, data);
            console.log("Tilemap saved");
        }

    }

    extrudeImage(source, dim, spacing) {
        this.source = source;
        if (!this.canvas) {
            if (Canvas) {
                console.log("Making canvas");
                this.image = new Canvas.Image();
                this.canvas = new Canvas();
            } else {
                this.image = new Image();
                this.canvas = document.createElement("canvas");
            }
        }
        this.image.src = source;
        this.ctx = this.canvas.getContext('2d');
    }

    render(dim, spacing) {
        if (!this.image.complete) {
            setTimeout(() => this.render(), 10);
            return;
        }
        let tilesWide = this.image.width / dim.x;
        let tilesHeight = this.image.height / dim.y;
        this.canvas.width = tilesWide * (dim.x + 2) - 1;
        this.canvas.height = tilesHeight * (dim.y + 2) - 1;
        this.ctx = this.canvas.getContext('2d');
        for (let x = 0; x < tilesWide; x++) {
            for (let y = 0; y < tilesHeight; y++) {
                // copy tile
                this.ctx.drawImage(this.image, x * dim.x, y * dim.y, dim.x, dim.y, x * (dim.x + 2), y * (dim.y + 2), dim.x, dim.y);
                // draw top outline
                this.ctx.drawImage(this.image, x * dim.x, y * dim.y, dim.x, 1, x * (dim.x + 2), y * (dim.y + 2) - 1, dim.x, 1);
                // draw right outline
                this.ctx.drawImage(this.image, (x + 1) * dim.x - 1, y * dim.y, 1, dim.y, (x + 1) * (dim.x + 2) - 2, y * (dim.y + 2), 1, dim.y);
                // draw down outline
                this.ctx.drawImage(this.image, x * dim.x, (y + 1) * dim.y - 1, dim.x, 1, x * (dim.x + 2), (y + 1) * (dim.y + 2) - 2, dim.x, 1);
                // draw left outline
                this.ctx.drawImage(this.image, x * dim.x, y * dim.x, 1, dim.y, x * (dim.x + 2) - 1, y * (dim.y + 2), 1, dim.x);
            }
        }
    }

    save() {
        let buf = this.canvas.toBuffer();
        fs.writeFileSync("extruded/" + this.source, buf);
        console.log("Image saved: " + this.source);
    }
}
exports.Extruder = Extruder;