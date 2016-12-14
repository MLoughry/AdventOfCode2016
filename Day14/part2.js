const md5 = require('md5');

var input = 'zpqevtbw';

var potentialKeys = [];
var confirmedKeys = [];
var tripsRegex = /(\w)(\1{2})/;
var quintRegex = /(\w)(\1{4})/;
var match;
var stopHashIndex = Number.MAX_VALUE;

for (var i = 0; i < stopHashIndex; i++) {
    var hash = input + i;
    for (var k = 0; k <= 2016; k++) {
        hash = md5(hash);
    }

    if (match = tripsRegex.exec(hash)) {
        potentialKeys.push({index: i, char: match[1], hash: hash});

        // Can only be 5-of-a-kind if it's also 3-of-a-kind
        if (match = quintRegex.exec(hash)) {
            // Take this opportunity to clear out 'expired' keys
            while (potentialKeys[0].index < (i - 1000)) {
                potentialKeys.shift();
            }

            // Check all potential keys to see if they're confirmed
            for (var j = 0; j < potentialKeys.length - 1; j++) {
                var quintChar = new RegExp(`${potentialKeys[j].char}{5}`);
                if (quintChar.test(hash)) {
                    var confirmed = potentialKeys[j];
                    confirmed.confirmedIndex = i;
                    confirmed.confirmedHash = hash;
                    confirmedKeys.push(confirmed);
                    potentialKeys.splice(j, 1);
                    j--;

                    // If we've found 64 confirmed keys, then cycle through the next 1000 hashes
                    //   to shake out all the remaining potential keys.
                    if (confirmedKeys.length === 64) {
                        stopHashIndex = i + 1000;
                    }
                }
            }
        }
    }
}

// Sort the confirmed keys by their indices
confirmedKeys = confirmedKeys.sort((a,b) => a.index - b.index);

// Validate that all keys are valid, since I seem to have too many
confirmedKeys.forEach(key => {
    if (key.index < key.confirmedIndex - 1000
        || !(new RegExp(`${key.char}{5}`).test(key.confirmedHash))) {
            console.log('WTF?: ' + JSON.stringify(key));
        }
})

// This should be the answer
console.log(confirmedKeys[63].index);
