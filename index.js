function makeGrid(n) {
    for (let i = 0; i < n; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        grid.appendChild(gridRow);

        for (let j = 0; j < n; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridRow.appendChild(gridSquare);
        }
    }
}

function startListeningForSketch() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.addEventListener('mouseenter', colorSquare);
    }
}

function stopListeningForSketch() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.removeEventListener('mouseenter', colorSquare);
    }
}

function startListeningForRainbow() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.addEventListener('mouseenter', colorRainbow);
    }
}

function stopListeningForRainbow() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.removeEventListener('mouseenter', colorRainbow);
    }
}

function colorSquare(e) {
    const gridSquare = e.target;
    gridSquare.style.backgroundColor = 'pink';
}

function colorRainbow(e) {
    const gridSquare = e.target;
    gridSquare.style.backgroundColor = generateRandomColor();
}

function removeGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function enableRainbowMode() {
    resetGrid();

    document.removeEventListener('keydown', startListeningForSketch);
    document.removeEventListener('keyup', stopListeningForSketch);
    document.addEventListener('keydown', startListeningForRainbow);
    document.addEventListener('keyup', stopListeningForRainbow);
}

function enableSketchMode() {
    resetGrid();

    document.removeEventListener('keydown', startListeningForRainbow);
    document.removeEventListener('keyup', stopListeningForRainbow);
    document.addEventListener('keydown', startListeningForSketch);
    document.addEventListener('keyup', stopListeningForSketch);
}

function resetGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.style.backgroundColor = 'yellow';
    }
}

function setNumGridSquares() {
    const numGridSquares = +prompt('How many squares per side do you want the grid to have?');
    removeGrid();
    makeGrid(numGridSquares);
}

function generateRandomColor() {
    const choices = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        const randomNumber = choices[Math.floor(Math.random() * choices.length)];
        color += randomNumber;
    }

    return color;
}

const grid = document.querySelector('#grid');

const setGridButton = document.querySelector('#set-grid');
const resetGridButton = document.querySelector('#reset-grid');
const sketchModeButton = document.querySelector('#sketch-mode');
const rainbowModeButton = document.querySelector('#rainbow-mode');

setGridButton.addEventListener('click', setNumGridSquares);
resetGridButton.addEventListener('click', resetGrid);
sketchModeButton.addEventListener('click', enableSketchMode);
rainbowModeButton.addEventListener('click', enableRainbowMode);

makeGrid(4);

document.addEventListener('keydown', startListeningForSketch);
document.addEventListener('keyup', stopListeningForSketch);