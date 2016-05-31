function Heteroptera (maze, mother) {
	
	// env var
	this.maze = maze;

	// positions var
	this.x = this.maze.startPoint.x;
	this.y = this.maze.startPoint.y;
	this.direction = null;

	// syst var
	this.memory = [];

	// heritage var
	if(mother === undefined) {
		this.motherMemory = null;
		this.name = choseName("Heteroptera");
		this.genealogy = [];
					console.log(0);

	} else {
		this.motherMemory = mother.memory;
		this.name = choseName(mother.name);
		this.genealogy = mother.genealogy.slice();
	}
	this.genealogy.push(this.name);

	// the heteroptera moves
	this.move = function () {

		var env = this.getEnvironement();
		var newX = this.x;
		var newY = this.y;
		
		var idx = -1 ; // the index of the place where this situation is descrived in the mother memory (-1 mean nowhere)
		
		this.direction = -1;

		if (this.motherMemory !== null)
			idx = this.motherMemory.findIndex(allreadyExist, env); //looking in the mother memory for this same situation		var this.direction = -1;
		
		// witch direction ?
		if(idx == -1)
			this.direction = floor(random(4));
		else  {
			// in this else we just pick a this.directionection to take folowing the statistic of mom
			var totalChoice = 0;
			for (var i = 0; i < this.motherMemory[idx].choices.length; i++) {
				totalChoice+=this.motherMemory[idx].choices[i];
			}

			var randomChoice = random(totalChoice);
			while(randomChoice>0) {
				this.direction++;
				randomChoice -= this.motherMemory[idx].choices[this.direction];
			}
		}

		// so where she's going ?
		switch (this.direction) {
			case 0 :
			newY--; break;
			case 1 :
			newX++; break;
			case 2 :
			newY++; break;
			case 3 :
			newX--; break;
			default :
			console.log("err : dir = " + this.direction);
		}

		// if it is a wall
		if(this.maze.m[index(newX,newY,this.maze.w)] === 0) {
			this.x = newX;
			this.y = newY;
		}

		// remember that
		this.memorisation(env);
	};

	// draw her
	this.display = function (scale, selected) {
		fill(83,71,99,100);
		
		if (selected)
			fill(200,171,179);
	
		rect(this.x*scale, this.y*scale, scale, scale);
	};

	// the heteroptera look around
	this.getEnvironement = function () {
		var env = [];
		var v;
		for (var x = -2; x <= 2; x++) {
			for (var y = -2; y <= 2; y++) {
				v = this.maze.m[index(this.x+x,this.y+y,this.maze.w)];
				if (v === undefined)
					env.push(-1);
				else
					env.push(v);
			}
		}
		return env;
	};

	// the heteroptera memorise
	this.memorisation = function (env) {


		var idx = this.memory.findIndex(allreadyExist, env);
		var choices = [0,0,0,0];

		if (idx == -1) {
			this.memory.push({
								env: env,
								choices : [0,0,0,0]
							});
			idx = this.memory.length-1;
		}
		this.memory[idx].choices[this.direction]++;
	
	};



}

function choseName (name) {
		var n = name.split('');
		var i = floor(random(n.length));
		var voyelle = ['a','e','i','o','u'];
		var consone = ['t','r','p','t','s','f','j','k','l','z','b'];
		if (consone.indexOf(n[i]) > -1){
			n[i]=consone[floor(random(consone.length))];
		} else if (voyelle.indexOf(n[i]) > -1){
			n[i]=voyelle[floor(random(voyelle.length))];
		}
		return n.join('');
}
function allreadyExist(mem) {
			for (var i = 0; i < this.length; i++) {
				if (mem.env[i] != this[i]) {
					return false;
				}
			}
			return true;
}