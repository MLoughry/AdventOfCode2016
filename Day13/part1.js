var input = 1350

// undefined - uncalculated
// '#' - wall
// '.' - open
var maze = [];

function isOpenSpace(y, x) {
    if (y < 0
    || x < 0
    || (maze[y] && maze[y][x])) {
        return false;
    }

    var value = ((3 + x) * x) + ((1 + y) * y) + (2 * y * x) + input;

    var isOpen = true;
    while (value) {
        isOpen = (value % 2) ? !isOpen : isOpen;
        value = value >> 1;
    }

    if (!maze[y]) {
        maze[y] = [];
    }
    maze[y][x] = isOpen ? '.' : '#';


    return isOpen;
}

var stepQueue = [{y: 1, x:1, steps: 0}];

function addSteps(y, x, currentSteps) {
    [[1,0],[0,-1],[-1,0],[0,1]].forEach(offsets => {
        var newY = y + offsets[0];
        var newX = x + offsets[1];

        if (isOpenSpace(newX, newY)) {
            stepQueue.push({
                y: newY,
                x: newX,
                steps: currentSteps + 1
            });
        }
    });
}

var currentStep;

while ((currentStep = stepQueue.shift()) && (currentStep.y != 31 || currentStep.x != 39)) {
    addSteps(currentStep.y, currentStep.x, currentStep.steps);
}

for (var y = 0; y < maze.length; y++) {
    if (!maze[y]) {
        console.log(new Array(maze.length).join('?'));
    } else {
        var line = [];
        for (var x = 0; x < maze[y].length; x++) {
            line.push(maze[y][x] || '?')
        }
        console.log(line.join(''));
    }
}

console.log(currentStep.steps);


