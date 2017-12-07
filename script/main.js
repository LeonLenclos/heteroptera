////// meta var
var isPlaying = true;
var playAStep = false;
var selectedHeteroptera = 0;
var stepCount = 0;
var genCount = 0;

////// imgs
var heteropterasImgs = [];

////// dom var
var dataInput;

////// pref var
var cellSize = 8;

////// syst var
var maze;
var heteropteras =[];

function preload () {
	// load one images per directions
	for (var i = 0; i < 4; i++) {
		heteropterasImgs[i] = loadImage("img/8-" + i + ".png");

	}
}

function setup() {
	createP("import maze");
	data = '{"name":"name","description":"description","w":10,"h":5,"m":[2,0,0,0,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,3,2,0,0,0,0,0,0,0,0,3]}';
	dataInput = createInput(data);
	createButton("text to maze").mousePressed(textToMaze);
	createButton("start").mousePressed(start);

	createP("simulation");
	createCanvas(10,10);

	maze = new Maze();

	frameRate(10);
	noStroke();
}

function draw() {
	// draw maze
	for (var x = 0; x < maze.w; x++) {
		for (var y = 0; y < maze.h; y++) {
			// witch color
			var value = maze.getCell(x,y);
			var c = colorOf(value);
			fill(c.r, c.v, c.b);
			// draw the rect
			rect(x*cellSize, y*cellSize, cellSize, cellSize);
		}
	}

	// draw heteropteras
	for (var i = 0; i < heteropteras.length; i++) {
		push();
		// move to the cell
		translate(heteropteras[i].x * cellSize, heteropteras[i].y * cellSize);
		// draw the correct direction image
		image(heteropterasImgs[heteropteras[i].direction], 0,0);
		// show if she has eaten
		if (heteropteras[i].foundFood){
			fill(colorOf(END).r, colorOf(END).v, colorOf(END).b);
			ellipse(cellSize/2,cellSize/2,cellSize/2,cellSize/2);
		}
		pop();
	}

	// moving heteropteras
	if (isPlaying||playAStep) {
		playAStep=false;
		stepCount++;
		// looping threw heteropteras
		for (var i = 0; i < heteropteras.length; i++) {
			// what does she see
			heteropteraEnv = maze.getDetail(heteropteras[i].x, heteropteras[i].y);
			// where does she want to go
			var newPos = heteropteras[i].tryToMove(heteropteraEnv);
			// go to here if it is not a wall or an heteroptere;
			if(maze.getCell(newPos.x, newPos.y) != WALL) {
				var hitSomeOne = false;
				for (var j = 0; j < heteropteras.length; j++) {
					if(heteropteras[j].x == newPos.x && heteropteras[j].y == newPos.y) {
						hitSomeOne = true;
						break;
					}
				}
				if(!hitSomeOne) {
					heteropteras[i].moveTo(newPos.x, newPos.y);
				}
			}
			// she eat if this is food
			if(maze.getCell(heteropteras[i].x, heteropteras[i].y) == END) {
				heteropteras[i].foundFood = true;
			}
			// she win if this is nest and if she has eaten
			else if(heteropteras[i].foundFood && maze.getCell(heteropteras[i].x, heteropteras[i].y) == START) {
				start(heteropteras[i]);
				break;
			}
		}
	}
}

function start (mother) {
	stepCount=0;
	genCount++;
	heteropteras = [];
	for (var i = 0; i < maze.m.length; i++) {
		if(maze.m[i] == START){
			pos = maze.positionOf(i);
			heteropteras.push(new Heteroptera(pos.x, pos.y, mother));
		}
	}
}