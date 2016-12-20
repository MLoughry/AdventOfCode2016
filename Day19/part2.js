function whiteElephant(size) {
    // Derived from pattern at http://pastebin.com/raw/8vdM5Jcz
    var winner = 1;
    for (var i = 1; i < size; i++) {
        if (winner === i) {
            winner = 1;
        } else if (winner < i / 2) {
            winner++;
        } else {
            winner += 2;
        }
    }

    return winner;
}

console.log(whiteElephant(3018458));