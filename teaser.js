const min = 1;
const max = 30;

let block;
let fixedBlock;
let margin = 0;
let randomPosition = 0;
let currentHref = '';

const positions = [];
let positionIndex = 0;
const assignedPositions = [];

for (let i = 1; i < max + 1; i++) {
    positions.push(i);
}

for (let i = 1; i < max + 1; i++) {
    block = document.querySelector(`[data-block="${i}"]`);
    if (block.dataset.fixed === 'true') {
        removeArrayElement(positions, +block.dataset.block);
        assignedPositions.push(+block.dataset.block);
    }
}

let positionsToAssign = positions.length;

    for (let i = 0; i < positionsToAssign; i++) {
        if (assignedPositions.length === 0) {
            randomPosition = getRandomPositionFromArray(positions);
            assignedPositions.push(randomPosition);
        } else {
            randomPosition = getRandomPositionFromArray(positions);
            if (assignedPositions.some(elem => elem === randomPosition)) {
                do {
                    randomPosition = getRandomPositionFromArray(positions);
                } while (!assignedPositions.every(elem => elem !== randomPosition))
                assignedPositions.push(randomPosition);
            } else {
                assignedPositions.push(randomPosition);
            }
        }
        margin = randomPosition % 3 === 0 ? 0 : 30;
        block = document.querySelector(`[data-block="${positions[i]}"]`);
        currentHref = block.querySelector('a').getAttribute('href').split('position=')[0];
        block.style.order = randomPosition;
        block.style.marginRight = margin + 'px';
        block.querySelector('a').setAttribute('href', `${currentHref}position=${randomPosition}`);
    }

function getRandomPositionFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function removeArrayElement(arr, value) {
    let index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}