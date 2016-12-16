function dragonCurve(a) {
    var b = a.split('').reverse().map(bit => bit === '1' ? '0' : '1').join('');
    return `${a}0${b}`;
}

function checksum(data) {
    if (data.length % 2 === 1) {
        return data;
    }

    var sum = [];
    for (var i = 0; i < data.length; i += 2) {
        if (data[i] === data[i + 1]) {
            sum.push('1');
        } else {
            sum.push('0');
        }
    }

    return checksum(sum.join(''));
}

function generateRandomDataChecksum(seed, length) {
    var data = dragonCurve(seed);

    while (data.length < length) {
        data = dragonCurve(data);
    }

    data = data.substring(0, length);

    return checksum(data);
}

console.log(generateRandomDataChecksum('11011110011011101', 35651584));