function mouseInCell (x,y,s) {
	// return true if the mouse is in the x,y cell of a s sized grid
	return (mouseX > x*s)
			&& (mouseX < (x+1)*s)
			&& (mouseY > y*s)
			&& (mouseY < (y+1)*s)
}

function colorOf (value) {
	// return a color as object for each posible value
	if(value == WALL) return {r: 0, v: 0, b: 0};
	else if(value == VOID) return {r: 255, v: 255, b: 255};
	else if(value == START) return {r: 155, v: 255, b: 155};
	else if(value == END) return {r: 155, v: 155, b: 255};
}

function mazeToText () {
	dataInput.value(maze.toText());
}

function textToMaze() {
	maze.fromText(dataInput.value());
	resizeCanvas(maze.w * cellSize + 1, maze.h * cellSize + 1);
}
