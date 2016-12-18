var md5 = require('md5');

var input = 'yjjvjgan';
var queue = [{path: '', x: 1, y: 1}];

function isValidPosition(x, y) {
    return x >= 1 && x <= 4
        && y >= 1 && y <= 4;
}

function isFinalRoom(x, y) {
    return x === 4 && y === 4;
}

function isDoorOpen(char) {
    return /[b-f]/.test(char);
}

function iteratePath(step) {
    var hash = md5(input + step.path);

    if (isDoorOpen(hash[0])) {
        queue.push({
            path: step.path + 'U',
            x: step.x,
            y: step.y - 1
        });
    }
    if (isDoorOpen(hash[1])) {
        queue.push({
            path: step.path + 'D',
            x: step.x,
            y: step.y + 1
        });
    }
    if (isDoorOpen(hash[2])) {
        queue.push({
            path: step.path + 'L',
            x: step.x - 1,
            y: step.y
        });
    }
    if (isDoorOpen(hash[3])) {
        queue.push({
            path: step.path + 'R',
            x: step.x + 1,
            y: step.y
        });
    }    
}

function findShortestPath() {
    var step;
    while ((step = queue.shift()) !== null) {
        if (!isValidPosition(step.x, step.y)) {
            continue;
        }
        if (isFinalRoom(step.x, step.y)) {
            return step.path;
        }
        iteratePath(step); 
    }
}

console.log(findShortestPath());