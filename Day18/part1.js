var input = ['.^^^^^.^^.^^^.^...^..^^.^.^..^^^^^^^^^^..^...^^.^..^^^^..^^^^...^.^.^^^^^^^^....^..^^^^^^.^^^.^^^.^^'];

function generateNextRow(prevRow) {
    var prev = `.${prevRow}.`;
    var nextRow = '';
    for (var i = 0; i < prevRow.length; i++) {
        var consider = prev.substr(i, 3);
        if (consider === '^^.'
            || consider === '.^^'
            || consider === '^..'
            || consider === '..^') {
                nextRow += '^';
        } else {
            nextRow += '.';
        }
    }

    return nextRow;
}

function generateGrid(grid) {
    for (var i = 0; grid.length < 40; i++) {
        grid.push(generateNextRow(grid[i]));
    }

    return grid;
}

function countSafeTiles(grid) {
    return grid.reduce((total, row) =>
        row.split('').reduce((a, tile) =>
            a + (tile === '.' ? 1 : 0),
            total
        ), 0);
}

console.log(countSafeTiles(generateGrid(input)));