function Gp2dfunc(options) {
    this.canvas = document.getElementById(options.id);
    this.X = options.X;
    this.Y = options.Y;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = '#000';    
    this.range = {
        X: 0,
        Y: 0
    };
    this.center = {
        X: 0,
        Y: 0
    };
    this.range.X = this.X.max - this.X.min;
    this.range.Y = this.Y.max - this.Y.min;
    this.center.Y = Math.abs(this.Y.min / this.range.Y) * this.canvas.height;
    this.center.X = Math.abs(this.X.min / this.range.X) * this.canvas.width;
    this.render();

}

Gp2dfunc.prototype.drawAxis = function() {    
    var ctx = this.ctx;        
    ctx.beginPath();
    //ctx.save();
    //draws X axis
    ctx.moveTo(0, this.center.Y);
    ctx.lineTo(this.canvas.width, this.center.Y);        
    //draws Y axis        
    ctx.moveTo(this.center.X, 0);
    ctx.lineTo(this.center.X, this.canvas.height);        
    ctx.stroke();
    
}


Gp2dfunc.prototype.render = function() {
    this.drawAxis();
}