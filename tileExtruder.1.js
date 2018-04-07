/* es6 */

tileExtruder = class  {
    constructor(source, dest, dim){
        this.dim = dim;
        this.img = new Canvas.Image();
        this.img.src = source;
        this.dest = dest;
        this.canvas = new Canvas();
        this.ctx =  this.canvas.getContext('2d');
    }
    drawImage()
    {
        if(!this.img.complete){
            setTimeout(()=>this.drawImage(), 10);
            return;
        }
        let tilesWide = this.img.width / this.dim.x;
        let tilesHeight = this.img.height / this.dim.y;
        this.canvas.width = tilesWide * (this.dim.x+2) - 1;
        this.canvas.height = tilesHeight * (this.dim.y+2) -1;
        this.ctx =  this.canvas.getContext('2d');
        for(let x=0; x< tilesWide; x++){
            for(let y=0; y< tilesHeight; y++){
                // copy tile
                this.ctx.drawImage(this.img, x*this.dim.x, y*this.dim.y, this.dim.x, this.dim.y,  x*(this.dim.x+2), y*(this.dim.y+2), this.dim.x, this.dim.y);
                // draw top outline
                this.ctx.drawImage(this.img, x*this.dim.x, y*this.dim.y, this.dim.x, 1,  x*(this.dim.x+2), y*(this.dim.y+2)-1, this.dim.x, 1);
                // draw right outline
                this.ctx.drawImage(this.img, (x+1)*this.dim.x-1, y*this.dim.y, 1, this.dim.y,  (x+1)*(this.dim.x+2)-2, y*(this.dim.y+2), 1, this.dim.y);
                // draw down outline
                this.ctx.drawImage(this.img, x*this.dim.x, (y+1)*this.dim.y-1, this.dim.x, 1,  x*(this.dim.x+2), (y+1)*(this.dim.y+2)-2, this.dim.x, 1);
                // draw left outline
                this.ctx.drawImage(this.img, x*this.dim.x, y*this.dim.x, 1, this.dim.y,  x*(this.dim.x+2)-1, y*(this.dim.y+2), 1, this.dim.x);
            }
        }
        this.save();
    }
    save(){
        let buf = this.canvas.toBuffer();
        fs.writeFileSync(this.dest, buf);
        console.log("SUCCESS");
    }
}
exports.tileExtruder = new tileExtruder();