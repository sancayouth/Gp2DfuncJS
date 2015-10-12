function Gp2dfunc(options) {
    this.canvas = document.getElementById(options.id);
    this.X = options.X;
    this.Y = options.Y;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = '#000';
    this.tickSize = 5;
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
    this.increment = this.canvas.width / this.range.X;
    this.render();
}


Gp2dfunc.prototype.drawAxis = function() {
    var ctx = this.ctx;
    ctx.beginPath();
    //draws X axis
    ctx.moveTo(0, this.center.Y);
    ctx.lineTo(this.canvas.width, this.center.Y);
    //draws Y axis        
    ctx.moveTo(this.center.X, 0);
    ctx.lineTo(this.center.X, this.canvas.height);
    ctx.stroke();
    //draws ticks in Y axis             
    var position = this.canvas.height - this.increment;    
    var initPos = this.center.X - this.tickSize / 2;
    var unit = -1 * (Math.round((this.canvas.height / this.increment) / 2) - 1);
    ctx.textAlign = 'right';
    ctx.fillText('-Y', initPos + this.tickSize +10, (position + this.increment)-5);  
    while (position > 0) {
        ctx.moveTo(initPos, position);
        ctx.lineTo(initPos + this.tickSize, position);
        ctx.stroke();
        if (position != this.center.Y) {
            ctx.fillText(unit, initPos - 2, position);
        }
        unit += 1;
        position = Math.round(position - this.increment);
    }
    ctx.fillText('Y', initPos + this.tickSize + 8, (position + this.increment)-15);      
    //draws ticks in X axis
    initPos = this.center.Y - this.tickSize / 2;
    unit = Math.round((this.canvas.width / this.increment) / 2) - 1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    position = this.canvas.width - this.increment;
  
    ctx.fillText('X', position + this.increment -10 , initPos -12);
    while (position > 0) {
        ctx.moveTo(position, initPos);
        ctx.lineTo(position, initPos + this.tickSize);
        ctx.stroke();
        if (position != this.center.X) {
            ctx.fillText(unit, position, (this.center.Y + this.tickSize / 2) + 2);
        }
        unit -= 1;
        position = Math.round(position - this.increment);
    }
    ctx.fillText('-X', position + this.increment -20 , initPos -12);
}


Gp2dfunc.prototype.render = function() {
    this.drawAxis();
}