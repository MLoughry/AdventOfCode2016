function createLoop(size) {
    return new Array(size).fill(true).map((a, index) => index + 1);
}

function whiteElephant(elfLoop) {
    for (var i = 0; elfLoop.length > 1; i++) {
        if (i >= elfLoop.length) {
            i -= elfLoop.length;
            console.log(`Completed loop. Length: ${elfLoop.length}`);
        }
        var elfToRemove = Math.floor(i + elfLoop.length / 2) % elfLoop.length;
        elfLoop.splice(elfToRemove, 1);
    }

    return elfLoop[0];
}

console.log(whiteElephant(createLoop(3018458)));