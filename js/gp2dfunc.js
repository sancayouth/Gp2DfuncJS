/**
 * Gp2dfunc.js
 *
 * Licensed under the MIT license.
 */

function Gp2dfunc(options) {
	'use strict';
    this.canvas = document.getElementById(options.id);
    if (this.canvas.getContext) {
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
    } else {
        throw new Error('Canvas isn\'t supported');
    }
}


Gp2dfunc.prototype.drawAxis = function() {
    this.ctx.save();
    this.ctx.beginPath();
    //draws X axis
    this.ctx.moveTo(0, this.center.Y);
    this.ctx.lineTo(this.canvas.width, this.center.Y);
    //draws Y axis        
    this.ctx.moveTo(this.center.X, 0);
    this.ctx.lineTo(this.center.X, this.canvas.height);
    this.ctx.stroke();
    //draws ticks in Y axis             
    var position = this.canvas.height - this.increment;
    var initPos = this.center.X - this.tickSize / 2;
    var unit = -1 * (Math.round((this.canvas.height / this.increment) / 2) - 1);
    this.ctx.textAlign = 'right';
    this.ctx.fillText('-Y', initPos + this.tickSize + 10, (position + this.increment) - 5);
    while (position > 0) {
        this.ctx.moveTo(initPos, position);
        this.ctx.lineTo(initPos + this.tickSize, position);
        this.ctx.stroke();
        if (position != this.center.Y) {
            this.ctx.fillText(unit, initPos - 2, position);
        }
        unit += 1;
        position = Math.round(position - this.increment);
    }
    this.ctx.fillText('Y', initPos + this.tickSize + 8, (position + this.increment) - 15);
    this.ctx.restore();
    //draws ticks in X axis
    this.ctx.save();
    initPos = this.center.Y - this.tickSize / 2;
    unit = Math.round((this.canvas.width / this.increment) / 2) - 1;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    position = this.canvas.width - this.increment;
    this.ctx.fillText('X', position + this.increment - 10, initPos - 12);
    while (position > 0) {
        this.ctx.moveTo(position, initPos);
        this.ctx.lineTo(position, initPos + this.tickSize);
        this.ctx.stroke();
        if (position != this.center.X) {
            this.ctx.fillText(unit, position, (this.center.Y + this.tickSize / 2) + 2);
        }
        unit -= 1;
        position = Math.round(position - this.increment);
    }
    this.ctx.fillText('-X', position + this.increment - 20, initPos - 12);
    this.ctx.restore();
}

Gp2dfunc.prototype.drawArrows = function(callback) {
    //draw arrows
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.center.Y);
    this.ctx.lineTo(this.tickSize, this.center.Y + this.tickSize);
    this.ctx.lineTo(this.tickSize, this.center.Y - this.tickSize);
    this.ctx.fill();
    this.ctx.moveTo(this.canvas.width, this.center.Y);
    this.ctx.lineTo(this.canvas.width - this.tickSize, this.center.Y + this.tickSize);
    this.ctx.lineTo(this.canvas.width - this.tickSize, this.center.Y - this.tickSize);
    this.ctx.fill();
    this.ctx.moveTo(this.center.X, 0);
    this.ctx.lineTo(this.center.X + this.tickSize, this.tickSize);
    this.ctx.lineTo(this.center.X - this.tickSize, this.tickSize);
    this.ctx.fill();
    this.ctx.moveTo(this.center.X, this.canvas.height);
    this.ctx.lineTo(this.center.X + this.tickSize, this.canvas.height - this.tickSize);
    this.ctx.lineTo(this.center.X - this.tickSize, this.canvas.height - this.tickSize);
    this.ctx.fill();
    this.ctx.restore();
}

Gp2dfunc.prototype.drawEquation = function(callback) {
    this.ctx.save();
    this.ctx.translate(this.center.X, this.center.Y);
    var scale = this.canvas.width / this.range.X;
    this.ctx.scale(scale, -scale);

    this.ctx.beginPath();
    this.ctx.lineJoin = 'round';
    this.ctx.moveTo(this.X.min, callback(this.X.min));
    for (var x = this.X.min + 0.1; x <= this.X.max; x += 0.1) {
        this.ctx.lineTo(x, callback(x));
    }
    this.ctx.restore();
    this.ctx.strokeStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.ctx.stroke();
    this.ctx.restore();
}

Gp2dfunc.prototype.render = function() {
    this.drawAxis();
    this.drawArrows();
}