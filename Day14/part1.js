const md5 = require('md5');

var input = 'abc';

var potentialKeys = [];
var confirmedKeys = [];
var tripsRegex = /(\w)(\1{2})/;
var quintRegex = /(\w)(\1{4})/;
var match;
var stopHashIndex = Number.MAX_VALUE;

for (var i = 0; i < stopHashIndex; i++) {
    var hash = md5(input + i);
    if (match = tripsRegex.exec(hash)) {
        potentialKeys.push({index: i, char: match[1], hash: hash});

        if (match = quintRegex.exec(hash)) {
            // Clear out 'expired' keys
            while (potentialKeys[0].index < (i - 1000)) {
                potentialKeys.shift();
            }
            for (var j = 0; j < potentialKeys.length; j++) {
                var quintChar = new RegExp(`${potentialKeys[j].char}{5}`);
                if (quintChar.test(hash)) {
                    var confirmed = potentialKeys[j];
                    confirmed.confirmedIndex = i;
                    confirmed.confirmedHash = hash;
                    confirmedKeys.push(confirmed);
                    potentialKeys.splice(j, 1);
                    j--;
                    if (confirmedKeys.length === 64) {
                        stopHashIndex = i + 1000;
                    }
                }
            }
        }
    }
}

confirmedKeys = confirmedKeys.sort((a,b) => a.index - b.index);

confirmedKeys.forEach(key => {
    if (key.index < key.confirmedIndex - 1000
        || !(new RegExp(`${key.char}{5}`).test(key.confirmedHash))) {
            console.log('WTF?: ' + JSON.stringify(key));
        }
})

console.log(confirmedKeys[63].index);
