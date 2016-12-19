function createLoop(size) {
    var firstElf = {number: 1};
    var mostRecentElf = firstElf;
    for (var i = 2; i <= size; i++) {
        var newElf = {number: i};
        mostRecentElf.next = newElf;
        mostRecentElf = newElf;
    }
    mostRecentElf.next = firstElf;

    return firstElf;
}

function whiteElephant(elfLoop) {
    while (elfLoop.next != elfLoop) {
        elfLoop.next = elfLoop.next.next;
        elfLoop = elfLoop.next;
    }

    return elfLoop;
}

console.log(whiteElephant(createLoop(3018458)).number);