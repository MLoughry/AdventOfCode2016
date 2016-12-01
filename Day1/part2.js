// var fs = require('fs');

// var input = fs.readFileSync('./Day1/input.txt').split(',').map(instr => instr.trim());

var inputString = 'L3, R1, L4, L1, L2, R4, L3, L3, R2, R3, L5, R1, R3, L4, L1, L2, R2, R1, L4, L4, R2, L5, R3, R2, R1, L1, L2, R2, R2, L1, L1, R2, R1, L3, L5, R4, L3, R3, R3, L5, L190, L4, R4, R51, L4, R5, R5, R2, L1, L3, R1, R4, L3, R1, R3, L5, L4, R2, R5, R2, L1, L5, L1, L1, R78, L3, R2, L3, R5, L2, R2, R4, L1, L4, R1, R185, R3, L4, L1, L1, L3, R4, L4, L1, R5, L5, L1, R5, L1, R2, L5, L2, R4, R3, L2, R3, R1, L3, L5, L4, R3, L2, L4, L5, L4, R1, L1, R5, L2, R4, R2, R3, L1, L1, L4, L3, R4, L3, L5, R2, L5, L1, L1, R2, R3, L5, L3, L2, L1, L4, R4, R4, L2, R3, R1, L2, R1, L2, L2, R3, R3, L1, R4, L5, L3, R4, R4, R1, L2, L5, L3, R1, R4, L2, R5, R4, R2, L5, L3, R4, R1, L1, R5, L3, R1, R5, L2, R1, L5, L2, R2, L2, L3, R3, R3, R1';

var input = (inputString).split(',').map(instr => instr.trim());

var xDir = 0,
    yDir = 1,
    yDistance = 0,
    xDistance = 0;

var map = {};

var foundPosition = false;

(() => {
    for(var i = 0; !foundPosition && i < input.length; i++) {
        var instruction = (/(L|R)(\d+)/).exec(input[i]);

        var oldX = xDir;
        switch (instruction[1]) {
            case 'L':
                xDir = yDir * -1;
                yDir = oldX;
                break;
            case 'R':
                xDir = yDir;
                yDir = oldX * -1;
                break;
        }

        var travelDistance = +(instruction[2]);

        for (var j = 0; j < travelDistance; j++) {
            yDistance += yDir;
            xDistance += xDir;

            if (map[`x${xDistance}y${yDistance}`]) {
                console.log(`Final position of ${xDistance},${yDistance} is ${Math.abs(xDistance) + Math.abs(yDistance)} steps away`);
                return;
            }

            map[`x${xDistance}y${yDistance}`] = true;
        }
    }
})();