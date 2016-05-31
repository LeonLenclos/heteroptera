////// meta var
var isPlaying = true;
var playAStep = false;
var actualFrameRate = 10;
var selectedHeteroptera = 0;
var stepCount = 0;

////// img and font var
var logo;
var heteropteraIcon;
var playIcon;
var pauseIcon;
var font;

////// pref var
var cellSize = 8;

////// syst var
var positionBloc = 0;

var grid; // cf. preload
var maman; // cf. preload
var heteropteras =[];

////// p5 functions

function preload() {
	grid = loadJSON('example.json');
	maman = loadJSON('maman.json');
	logo = loadImage('logo.png');
	heteropteraIcon = loadImage('heteropteraIcon.png');
	playIcon = loadImage('playIcon.png');
	pauseIcon = loadImage('pauseIcon.png');
	font = loadFont('LetterGothicStd.otf');
}

function setup() {
	if (grid.w*cellSize+40>1000)
		createCanvas(grid.w*cellSize+40, 1000);
	else
		createCanvas(1000, 1000);

	resetup();
}

function draw() {
	display();

	// moving heteropteras
	if (isPlaying||playAStep) {
		playAStep=false;
		stepCount++;
		for (var i = 0; i < 10; i++) {
			heteropteras[i].move(grid);
			if(heteropteras[i].x == grid.endPoint.x && heteropteras[i].y == grid.endPoint.y) {
				maman = heteropteras[i];
				resetup();
				break;
			}
		}
	}
}

function keyPressed () {
	// next
	if (key == 'N') {
		playAStep = true;
	}

	// play/pause
	else if (key == 'P') {
		if (isPlaying === true) {
			isPlaying = false;
		} else {
			isPlaying = true;
		}
	}

	// step forward
	else if (key == 'S') {
		if (actualFrameRate == 1)
			actualFrameRate = 10;
		else if (actualFrameRate == 10)
			actualFrameRate = 100;
		else
			actualFrameRate = 1;
		frameRate(actualFrameRate);
	}

	// if 100
	else if (key >= 0 && key <= 9) {
		selectedHeteroptera = key;
	}

}


function resetup () {

	stepCount=0;

	heteropteras = [];
	for (var i = 0; i < 10; i++) {
		heteropteras[i] = new Heteroptera(grid, maman);
	}

	frameRate(actualFrameRate);
}

////// generic functions

function index (x,y,w) {
	//
	if(x>w||x<0){
		return undefined;
	}
	return y*w+x;
}
function indexToVector (i,w) {
	var v = createVector() 
}
