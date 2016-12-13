function iterateCombinations(floor) {
    var combinations = [];
    for (var i = 0; i < floor.length; i++) {
        combinations.push([floor[i]]);
        for (var j = i + 1; j < floor.length; j++) {
            combinations.push([floor[i], floor[j]]);
        }
    }

    return combinations;
}

function stepWithElevatorPayload(facility, elevatorOffset, payload) {
    var clonedFacility = facility.clone();
    clonedFacility.elevatorFloor += elevatorOffset;

    if (clonedFacility.elevatorFloor >= clonedFacility.floors.length
        || clonedFacility.elevatorFloor < 0) {
            return null;
        }

    clonedFacility.floors[facility.elevatorFloor] = clonedFacility.floors[facility.elevatorFloor].filter(item => {
        return payload.find((comboItem) => comboItem === item);
    });
    clonedFacility.floors[clonedFacility.elevatorFloor] = clonedFacility.floors[clonedFacility.elevatorFloor].concat(payload);
    clonedFacility.step++;
    return clonedFacility;
}

class Facility {
    constructor(floors, elevatorFloor, steps) {
        this.floors = floors;
        this.elevatorFloor = elevatorFloor || 0;
        this.step = steps || 0;
    }

    clone() {
        return new Facility(this.floors.map(floor => floor.map(item => item)), this.elevatorFloor, this.step);
    }

    isValidState() {
        return this.floors.reduce((isFacilityValid, floor) => {
            return isFacilityValid && floor.reduce((isFloorValid, item) => isFloorValid && item.isValidState(floor), true)
        }, true);
    }

    isFinalState() {
        return !this.floors.slice(0, this.floors.length - 1).filter(floor => floor.length).length;
    }

    createNextSteps() {
        var elevatorCombos = iterateCombinations(this.floors[this.elevatorFloor]);

        var nextSteps = elevatorCombos.map(combo => stepWithElevatorPayload(this, 1, combo)).filter(facility => facility);

        if (this.floors.slice(0, this.elevatorFloor).reduce((a, floor) => a + floor.length, 0)) {
            nextSteps = nextSteps.concat(elevatorCombos.map(combo => stepWithElevatorPayload(this, -1, combo)).filter(facility => facility));
        }

        return nextSteps.filter(facility => facility.isValidState());
    }

    hash() {
        return this.computedHash ||
            (this.computedHash = this.elevatorFloor + '#' + this.floors.map(this.hashFloor).join('#'));
    }

    hashFloor(floor) {
        var elements = {};
        floor.forEach(item => elements[item.element] = (elements[item.element] || 0) + 1);

        var pairs = Object.keys(elements).filter((key) => elements[key] == 2);
        return pairs.length + floor.filter(item => elements[item.element] != 2).map(item => item.element).join('|');
    }
}

class Item {
    constructor(element, isGenerator) {
        this.element = element;
        this.isGenerator = isGenerator;
    }

    isValidState(floor) {
        if (this.isGenerator) {
            return true;
        } else if (floor.find(item => item.isGenerator && item.element === this.element)) {
            // See if the matching generator is here
            return true;
        } else if (floor.find(item => item.isGenerator)) {
            // Microchip is irradiated
            return false;
        } else {
            // Only microchips on this floor
            return true;
        }
    }

    toString() {
        return this.element + this.isGenerator;
    }

    compare(other) {
        return this.element.localeCompare(other.element);
    }
}

var facility = new Facility([
    [new Item('stronium', true), new Item('stronium', false), new Item('plutonium', true), new Item('plutonium', false), ],
    [new Item('thulium', true), new Item('ruthenium ', true), new Item('ruthenium ', false), new Item('curium ', true), new Item('curium ', false), ],
    [new Item('thulium', false), ],
    [],
]);

var searchQueue = [facility];
var currentFacilityStep;

var seenStates = {};

var currentSteps = 0;

while (!(currentFacilityStep = searchQueue.shift()).isFinalState()) {
    if (currentSteps != currentFacilityStep.step) {
        currentSteps = currentFacilityStep.step;
        console.log(`Steps:\t${currentSteps}\t\tQueue size:\t${searchQueue.length}`);
    }
    var newStates = currentFacilityStep.createNextSteps().filter(step => !seenStates[step.hash()]);
    searchQueue = searchQueue.concat(newStates);
    newStates.forEach(step => seenStates[step.hash()] = true);
}

console.log(`Took ${currentFacilityStep.step} steps`);
