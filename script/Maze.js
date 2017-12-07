var WALL = 1;
var VOID = 0;
var START = 2;
var END = 3;

function Maze () {
	
	this.name = "";
	this.description = "";
	this.w = 0;
	this.h = 0;
	this.m = [];

	this.toText = function () {
		return JSON.stringify(this);
	};
	this.fromText = function (txt) {
		data = JSON.parse(txt);
		this.name = data.name;
		this.description = data.description;
		this.w = data.w;
		this.h = data.h;
		this.m = data.m;
	};
	this.reset = function () {
		this.m = [];
		for (var i = 0; i < this.w*this.h; i++) {
			this.m[i] = VOID;
		}
	};
	this.inverse = function (x, y) {
		if(this.getCell(x,y) == WALL)
			this.setCell(x,y,VOID);
		else
			this.setCell(x,y,WALL);
	};
	this.indexOf = function (x, y) {
		if(x>this.w||x<0||y>this.h||y<0){
			return undefined;
		}
		return y*this.w+x;
	};
	this.positionOf = function (index) {
		x = index % this.w;
		y = int(index / this.w);

		return {x:x, y:y};
	};
	this.getCell = function (x, y) {
		if(x<0||x>=this.w||y<0||y>=this.h)
			return WALL;
		return this.m[this.indexOf(x,y)];
	};
	this.setCell = function (x, y, v) {
		this.m[this.indexOf(x,y)] = v;
	};
	this.nestSize = function () {
		size = 0;
		for (var i = 0; i < this.m.length; i++) {
			if (this.m[i] == START) size ++;
		}
		return size;
	};
	this.getDetail = function (centerX, centerY) {
		var detail = [];
		for (var x = -2; x <= 2; x++) {
			for (var y = -2; y <= 2; y++) {
				detail.push(this.getCell(centerX+x,centerY+y));
			}
		}
		return detail;
	};
}