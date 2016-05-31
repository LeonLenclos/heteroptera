function display () {
	background(255);
	var margin = 20;
	push();
	positionBloc = 0;
	
	translate(margin,positionBloc+margin);
	image(logo, 0,0);

	positionBloc = logo.height;
	translate(0,positionBloc+margin);

	positionBloc = displayPlay();

	translate(0,positionBloc+margin);
	positionBloc = displayMap();


	translate(0,positionBloc+margin);
	positionBloc = displayHeteropteraEnv();
	translate(0,positionBloc+margin);
	positionBloc = displayHeteropteraInfos();

	pop();
	}


function displayMap () {
	// the grid
	for (var i = 0; i < grid.w; i++) {
		for (var j = 0; j < grid.h; j++) {
			if (grid.m[index(i,j,grid.w)]==1)
				fill(0);
			else
				fill (255);
			rect(i*cellSize,j*cellSize,cellSize,cellSize);
		}
	}

	// start and end
	fill(5,200,99,100);
	rect(grid.startPoint.x*cellSize,grid.startPoint.y*cellSize,cellSize,cellSize);
	rect(grid.endPoint.x*cellSize,grid.endPoint.y*cellSize,cellSize,cellSize);

	// heteropteras
	for (var i = 0; i < 10; i++) {
		heteropteras[i].display(cellSize);
	}

	// active heteroptera
	heteropteras[selectedHeteroptera].display(cellSize, true);

	return grid.h*cellSize;
}

function displayHeteropteraInfos () {
	var size = 12;
	var h = heteropteras[selectedHeteroptera];
	var infos = [];
	
	infos.push("# " + selectedHeteroptera);
	//infos.push("prénom : " + h.name);
	for (var i = h.genealogy.length - 2; i >= 0; i--) {
		//infos.push("fille de " + h.genealogy[i]);
	}

	fill(0);
	textSize(size);
	textFont(font);

	var positionLine = size;
	for (var j = 0; j < infos.length; j++) {
		text(infos[j], 0, positionLine);
		positionLine += size;//bbox[i].h;
	}
	return positionLine;
}

function displayHeteropteraEnv() {
	var h = heteropteras[selectedHeteroptera];
	var env = h.getEnvironement();
	var dir = h.direction;
	var s = 20; //
	push();
	translate(s,s);
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			if (env[i*5+j] == 1) {
				fill(0);
			}
			else if (env[i*5+j] === 0)
				fill(255);
			else
				fill(123);
			rect(i*s,j*s,s,s);
		}
	}
	push();
	imageMode(CENTER);
	translate(2.5*s,2.5*s);
	rotate(dir*HALF_PI);
	image(heteropteraIcon,0,0);
	pop();
	noFill();
	rect(2*s,2*s,s,s);

	var idx = -1;
	var choices = [0,0,0,0];
	if (h.motherMemory !== null)
		idx = h.motherMemory.findIndex(allreadyExist, env); //looking in the mother memory for this same situation		var this.direction = -1;
	if(idx != -1) {
		for (var k = 0; k < 4; k++) {
			choices[k] = h.motherMemory[idx].choices[k];
		}
	}
	pop();
	textAlign(CENTER);
	text(choices[0], 3.5*s,0.5*s);
	text(choices[1], 6.5*s,3.5*s);
	text(choices[2], 3.5*s,6.5*s);
	text(choices[3], 0.5*s,3.5*s);

	return 7*s;
}

function displayPlay (argument) {
	var img;
	if (isPlaying) {
		img = playIcon; }
	else {
		img = pauseIcon; }
	image(img,0,0);
	push();
	fill(0);
	textFont(font);
	textSize(12);
	text("Vitesse : ×" + actualFrameRate +
		" Génération : " + heteropteras[0].genealogy.length +
		" Pas : "+ stepCount,
		25,20);
	pop();
	return 20;
}