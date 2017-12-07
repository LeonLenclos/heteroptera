function Heteroptera (x, y, mother) {
	
	this.x = x;
	this.y = y;

	this.direction = floor(random(4)); // UP=0 RIGHT=1 DOWN=2 LEFT=3	

	// init the brain
	this.brain = new Brain();
	if(mother === undefined) {
		this.brain.init();
	} else {
		this.brain.initFrom();
	}

	// the heteroptera moves
	this.tryToMove = function (env) {

		var newX = this.x;
		var newY = this.y;
		
		// the brain choose a direction
		this.direction = this.brain.choose(env);

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

		return {x:newX,y:newY};
	};

	this.moveTo = function (x, y) {
		this.x = x;
		this.y = y;
	};

	this.chooseDir = function (env) {
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

function allreadyExist(mem) {
	for (var i = 0; i < this.length; i++) {
		if (mem.env[i] != this[i]) {
			return false;
		}
	}
	return true;
}