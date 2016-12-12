var input = `rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 6
rect 1x1
rotate row y=0 by 5
rect 1x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 5
rect 2x1
rotate row y=0 by 2
rect 1x1
rotate row y=0 by 4
rect 1x1
rotate row y=0 by 3
rect 2x1
rotate row y=0 by 7
rect 3x1
rotate row y=0 by 3
rect 1x1
rotate row y=0 by 3
rect 1x2
rotate row y=1 by 13
rotate column x=0 by 1
rect 2x1
rotate row y=0 by 5
rotate column x=0 by 1
rect 3x1
rotate row y=0 by 18
rotate column x=13 by 1
rotate column x=7 by 2
rotate column x=2 by 3
rotate column x=0 by 1
rect 17x1
rotate row y=3 by 13
rotate row y=1 by 37
rotate row y=0 by 11
rotate column x=7 by 1
rotate column x=6 by 1
rotate column x=4 by 1
rotate column x=0 by 1
rect 10x1
rotate row y=2 by 37
rotate column x=19 by 2
rotate column x=9 by 2
rotate row y=3 by 5
rotate row y=2 by 1
rotate row y=1 by 4
rotate row y=0 by 4
rect 1x4
rotate column x=25 by 3
rotate row y=3 by 5
rotate row y=2 by 2
rotate row y=1 by 1
rotate row y=0 by 1
rect 1x5
rotate row y=2 by 10
rotate column x=39 by 1
rotate column x=35 by 1
rotate column x=29 by 1
rotate column x=19 by 1
rotate column x=7 by 2
rotate row y=4 by 22
rotate row y=3 by 5
rotate row y=1 by 21
rotate row y=0 by 10
rotate column x=2 by 2
rotate column x=0 by 2
rect 4x2
rotate column x=46 by 2
rotate column x=44 by 2
rotate column x=42 by 1
rotate column x=41 by 1
rotate column x=40 by 2
rotate column x=38 by 2
rotate column x=37 by 3
rotate column x=35 by 1
rotate column x=33 by 2
rotate column x=32 by 1
rotate column x=31 by 2
rotate column x=30 by 1
rotate column x=28 by 1
rotate column x=27 by 3
rotate column x=26 by 1
rotate column x=23 by 2
rotate column x=22 by 1
rotate column x=21 by 1
rotate column x=20 by 1
rotate column x=19 by 1
rotate column x=18 by 2
rotate column x=16 by 2
rotate column x=15 by 1
rotate column x=13 by 1
rotate column x=12 by 1
rotate column x=11 by 1
rotate column x=10 by 1
rotate column x=7 by 1
rotate column x=6 by 1
rotate column x=5 by 1
rotate column x=3 by 2
rotate column x=2 by 1
rotate column x=1 by 1
rotate column x=0 by 1
rect 49x1
rotate row y=2 by 34
rotate column x=44 by 1
rotate column x=40 by 2
rotate column x=39 by 1
rotate column x=35 by 4
rotate column x=34 by 1
rotate column x=30 by 4
rotate column x=29 by 1
rotate column x=24 by 1
rotate column x=15 by 4
rotate column x=14 by 1
rotate column x=13 by 3
rotate column x=10 by 4
rotate column x=9 by 1
rotate column x=5 by 4
rotate column x=4 by 3
rotate row y=5 by 20
rotate row y=4 by 20
rotate row y=3 by 48
rotate row y=2 by 20
rotate row y=1 by 41
rotate column x=47 by 5
rotate column x=46 by 5
rotate column x=45 by 4
rotate column x=43 by 5
rotate column x=41 by 5
rotate column x=33 by 1
rotate column x=32 by 3
rotate column x=23 by 5
rotate column x=22 by 1
rotate column x=21 by 2
rotate column x=18 by 2
rotate column x=17 by 3
rotate column x=16 by 2
rotate column x=13 by 5
rotate column x=12 by 5
rotate column x=11 by 5
rotate column x=3 by 5
rotate column x=2 by 5
rotate column x=1 by 5`;

class Display {
    constructor(rows, cols) {
        this.grid = new Array(cols)
                        .fill(0)
                        .map(row => new Array(rows).fill(0));
    }

    rect(cols, rows) {
        for (var x= 0; x < cols; x++) {
            for (var y = 0; y < rows; y++) {
                this.grid[x][y] = 1;
            }
        }
    }

    rotateColumn(col, distance) {
        for (var i = 0; i < this.grid[col].length - distance; i++) {
            this.grid[col].push(this.grid[col].shift());
        }
    }

    rotateRow(row, distance) {
        var shiftedRow = new Array(this.grid.length);
        for (var i = 0; i < shiftedRow.length; i++) {
            shiftedRow[(i + distance) % shiftedRow.length] = this.grid[i][row];
        }
        for (var i = 0; i < shiftedRow.length; i++) {
            this.grid[i][row] = shiftedRow[i];
        }
    }

    getNumberLit() {
        return this.grid
            .reduce((total, row) =>
                total + row.reduce((a, light) => a + light,
                        0),
            0);
    }
}

var rectRegex = /rect (\d+)x(\d+)/;
var rotateRegex = /rotate (row y|column x)=(\d+) by (\d+)/;

function programDisplay(instructions, rows, cols) {
    var display = new Display(rows, cols);

    instructions
        .split('\n')
        .forEach((line) => {
            var match;

            if ((match = rectRegex.exec(line)) !== null) {
                display.rect(+match[1], +match[2]);
            } else if ((match = rotateRegex.exec(line)) !== null) {
                if (match[1] === 'row y') {
                    display.rotateRow(+match[2], +match[3]);
                } else {
                    display.rotateColumn(+match[2], +match[3]);
                }
            }
        });

    return display;
}

console.log(programDisplay(input, 6, 50).getNumberLit());