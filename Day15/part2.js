var discs = [
    {positions: 19, t0: 10, offset: 2},
    {positions: 17, t0: 5, offset: 6},
    {positions: 13, t0: 1, offset: 1},
    {positions: 11, t0: 0, offset: 7},
    {positions: 7, t0: 1, offset: 4},
    {positions: 5, t0: 3, offset: 5},
    {positions: 3, t0: 2, offset: 3},
];

function findTimeToPressButton() {
    var incrementValue = 1;
    var startTime = 0;
    discs.forEach((disc) => {
        for (var t = startTime; true; t += incrementValue) {
            if ((disc.t0 + t + disc.offset) % disc.positions === 0) {
                startTime = t;
                incrementValue *= disc.positions;
                return;
            }
        }
    });

    return startTime;
}

console.log(`Time to press button: ${findTimeToPressButton()}`);