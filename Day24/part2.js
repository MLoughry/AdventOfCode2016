const fs = require('fs');

/**
 * Builds a graph of the maze from the input, and returns an array with the numbered nodes
 * @param {string} inputText
 */
function buildMazeGraph(inputText) {
    let graphData = inputText.split('\n').map(line => line.split(''));

    let numberedNodes = [];
    let idCounter = 0;

    graphData.forEach((line, lineNo) => {
        line.forEach((cell, colNo) => {
            if (cell === '#') {
                graphData[lineNo][colNo] = undefined;
                return;
            }

            let graphNode = {
                id: idCounter++,
                links: [],
            };

            if (graphData[lineNo - 1] && graphData[lineNo - 1][colNo]) {
                graphNode.links.push(graphData[lineNo - 1][colNo]);
                graphData[lineNo - 1][colNo].links.push(graphNode);
            }
            if (graphData[lineNo] && graphData[lineNo][colNo - 1]) {
                graphNode.links.push(graphData[lineNo][colNo - 1]);
                graphData[lineNo][colNo - 1].links.push(graphNode);
            }

            let cellNumber = parseInt(cell);
            if (!isNaN(cellNumber)) {
                numberedNodes[cellNumber] = graphNode;
                graphNode.checkpoint = cellNumber;
            }

            graphData[lineNo][colNo] = graphNode;
        });
    });

    return numberedNodes;
}

function buildCheckpointCostMatrix(numberedNodes) {
    let searchNodes = numberedNodes.map(node => {
        node.costs = numberedNodes.map(() => NaN);
        node.costs[node.checkpoint] = 0;
        return node;
    });

    while(searchNodes.length !== 0) {
        searchNodes = iterateGraph(searchNodes);
    }

    return numberedNodes.map(node => node.costs);
}

function iterateGraph(searchNodes) {
    let nextIteration = [];

    searchNodes.forEach(source => {
        source.links.forEach(dest => {
            let shouldAdd = false;

            if (!dest.costs) {
                shouldAdd = true;
                dest.costs = source.costs.map(cost => cost + 1);
            } else {
                for (let i = 0; i < dest.costs.length; i++) {
                    if (!isNaN(source.costs[i])
                        && (isNaN(dest.costs[i]) || source.costs[i] + 1 < dest.costs[i])) {
                            dest.costs[i] = source.costs[i] + 1;
                            shouldAdd = true;
                        }
                }
            }

            if (shouldAdd) {
                nextIteration.push(dest);
            }
        });
    });

    return nextIteration;
}

function getSalesmanPathCost(costMatrix) {
    let queue = costMatrix[0].slice(1).map((cost, index) => ({cost: cost, visited: [0, index + 1], current: index + 1}));
    queue.sort((a, b) => a.cost - b.cost);

    let next;

    while ((next = queue.shift()).visited.length !== costMatrix.length + 1) {
        if (next.visited.length < costMatrix.length) {
            costMatrix[next.current].forEach((destCost, index) => {
                if (next.visited.indexOf(index) === -1) {
                    let destNode = {
                        cost: next.cost + destCost,
                        visited: next.visited.concat(index),
                        current: index
                    };

                    let queueIndex = queue.findIndex(node => !node || node.cost > destNode.cost);
                    queue.splice(queueIndex, 0, destNode);
                }
            });
        } else {
            let destNode = {
                cost: next.cost + costMatrix[next.current][0],
                visited: next.visited.concat(0),
                current: 0
            };

            let queueIndex = queue.findIndex(node => !node || node.cost > destNode.cost);
            queue.splice(queueIndex, 0, destNode);
        }
    }

    return next.cost;
}

function performPart1Calc() {
    let numberedNodes = buildMazeGraph(fs.readFileSync(require.resolve('./input.txt'), 'utf8'));
    let costMatrix = buildCheckpointCostMatrix(numberedNodes);
    console.log(getSalesmanPathCost(costMatrix));
}

performPart1Calc();