// var fs = require('fs');

// var input = fs.readFileSync('./Day1/input.txt').split(',').map(instr => instr.trim());

var input = ('L3, R1, L4, L1, L2, R4, L3, L3, R2, R3, L5, R1, R3, L4, L1, L2, R2, R1, L4, L4, R2, L5, R3, R2, R1, L1, L2, R2, R2, L1, L1, R2, R1, L3, L5, R4, L3, R3, R3, L5, L190, L4, R4, R51, L4, R5, R5, R2, L1, L3, R1, R4, L3, R1, R3, L5, L4, R2, R5, R2, L1, L5, L1, L1, R78, L3, R2, L3, R5, L2, R2, R4, L1, L4, R1, R185, R3, L4, L1, L1, L3, R4, L4, L1, R5, L5, L1, R5, L1, R2, L5, L2, R4, R3, L2, R3, R1, L3, L5, L4, R3, L2, L4, L5, L4, R1, L1, R5, L2, R4, R2, R3, L1, L1, L4, L3, R4, L3, L5, R2, L5, L1, L1, R2, R3, L5, L3, L2, L1, L4, R4, R4, L2, R3, R1, L2, R1, L2, L2, R3, R3, L1, R4, L5, L3, R4, R4, R1, L2, L5, L3, R1, R4, L2, R5, R4, R2, L5, L3, R4, R1, L1, R5, L3, R1, R5, L2, R1, L5, L2, R2, L2, L3, R3, R3, R1').split(',').map(instr => instr.trim());

var xDir = 0,
    yDir = 1,
    yDistance = 0,
    xDistance = 0;


for(var i = 0; i < input.length; i++) {
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
    yDistance += yDir * instruction[2];
    xDistance += xDir * instruction[2];

    console.log(`Turning ${instruction[1]} and going ${instruction[2]} steps leads to position of ${xDistance},${yDistance}`);
}

console.log(`${Math.abs(xDistance) + Math.abs(yDistance)}`)