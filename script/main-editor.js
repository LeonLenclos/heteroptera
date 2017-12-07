////// img and font var
var logo;

////// pref var
var cellSize = 8;

////// dom var
var cnv, nameInput, descInput, wInput, hInput, mazeInfos, valueSelect, dataInput;
////// syst var
var clickedCells =[];
var maze;


function setup() {
	maze = new Maze();

	// from
	createP("Name");
	nameInput = createInput("name");

	createP("Description");
	descInput = createInput("description");

	createP("Width");
	wInput = createInput(30);

	createP("Height");
	hInput = createInput(30);

	createButton("set").mousePressed(setMaze);

	valueSelect = createSelect();
	valueSelect.option("wall");
	valueSelect.option("void");
	valueSelect.option("start");
	valueSelect.option("end");

	mazeInfos = createP("Maze editor");

	createCanvas(10,10);

	createP("Export / import");
	dataInput = createInput();
	createButton("text to maze").mousePressed(textToMaze);
	createButton("maze to text").mousePressed(mazeToText);
}

function draw() {
	background(255);
	// loop threw all cells
	for (var x = 0; x < maze.w; x++) {
		for (var y = 0; y < maze.h; y++) {
			var alreadyClicked = false;

			// look in clickedCells if she is already clicked
			for (var i = 0; i < clickedCells.length; i++) {
				if(clickedCells[i].x == x && clickedCells[i].y == y){
					alreadyClicked = true;
					break;
				}
			}
			
			// if mouse press on it
			if (mouseIsPressed && mouseInCell(x,y,cellSize)){

				// if not, record it
				if (! alreadyClicked) {
					clickedCells.push({x:x,y:y});
					alreadyClicked = true;
				}
			}

			// witch color
			var value = maze.getCell(x,y);
			if(alreadyClicked) {
				value = valueOfValueSelect();
			}
			
			var c = colorOf(value);
			fill(c.r, c.v, c.b);
			
			// draw the rec
			rect(x*cellSize, y*cellSize, cellSize, cellSize);
		}
	}
}

function valueOfValueSelect(){
	// return the value of the html seclect
	if(valueSelect.value() == "wall") return WALL;
	else if(valueSelect.value() == "void") return VOID;
	else if(valueSelect.value() == "start") return START;
	else if(valueSelect.value() == "end") return END;
}

function mouseReleased () {
	// set all clicked cells
	var value = valueOfValueSelect();
	for (var i = 0; i < clickedCells.length; i++) {
		maze.setCell(clickedCells[i].x, clickedCells[i].y, value);
	}

	// reset clickedCells
	clickedCells = [];
}

function setMaze () {
	// set maze infos with input values
	maze.name = nameInput.value();
	maze.description = descInput.value();
	maze.w = int(wInput.value());
	maze.h = int(hInput.value());
	maze.reset();
	resizeCanvas(maze.w * cellSize + 1, maze.h * cellSize + 1);
}

