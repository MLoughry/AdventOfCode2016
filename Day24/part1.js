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
    let costMatrix = numberedNodes.map(node => []);

    numberedNodes.forEach((sourceNode, index) => {
        numberedNodes.slice(index + 1).forEach(destNode => {
            let cost = getShortestPathCost(sourceNode, destNode);
            costMatrix[sourceNode.checkpoint][destNode.checkpoint] = cost;
            costMatrix[destNode.checkpoint][sourceNode.checkpoint] = cost;
        });
    });

    return costMatrix;
}

function getShortestPathCost(source, dest) {
    let queue = source.links.map(node => ({ cost: 1, node: node}));
    let visitedNodes = [];
    visitedNodes[source.id] = true;

    let nextNode;
    while ((nextNode = queue.shift()).node.id !== dest.id) {
        visitedNodes[nextNode.node.id] = true;
        nextNode.node.links.forEach(node => {
            if (!visitedNodes[node.id]) {
                queue.push({cost: nextNode.cost + 1, node: node});
            }
        });
    }

    return nextNode.cost;
}

function getSalesmanPathCost(costMatrix) {
    let queue = costMatrix[0].map((cost, index) => ({cost: cost, visited: [0, index], current: index}));
    queue.sort((a, b) => a.cost - b.cost);

    let next;

    while ((next = queue.shift()).visited.length !== costMatrix.length) {
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
    }

    return next.cost;
}

function performPart1Calc() {
    let numberedNodes = buildMazeGraph(fs.readFileSync(require.resolve('./input.txt'), 'utf8'));
    let costMatrix = buildCheckpointCostMatrix(numberedNodes);
    console.log(getSalesmanPathCost(costMatrix));
}

performPart1Calc();