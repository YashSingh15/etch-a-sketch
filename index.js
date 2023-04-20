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

function startListeningForFade() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.addEventListener('mouseenter', fade);
    }
}

function stopListeningForFade() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.removeEventListener('mouseenter', fade);
    }
}

function getOpacity(color) {
    const rgbaValues = color.replace('rgba(', '').replace(')', '').split(', ');
    return parseFloat(rgbaValues[3]);
}

function colorSquare(e) {
    const gridSquare = e.target;
    gridSquare.style.backgroundColor = 'pink';
}

function colorRainbow(e) {
    const gridSquare = e.target;
    gridSquare.style.backgroundColor = generateRandomColor();
}

function fade(e) {
    const gridSquare = e.target;
    const color = gridSquare.style.backgroundColor;

    if (color === 'yellow') {
        gridSquare.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    } else {
        const opacity = getOpacity(color);

        if (opacity < 1) {
            gridSquare.style.backgroundColor = `rgba(0, 0, 0, ${opacity + 0.1})`;
        }
    }
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
    document.removeEventListener('keydown', startListeningForFade);
    document.removeEventListener('keyup', stopListeningForFade);
    document.addEventListener('keydown', startListeningForRainbow);
    document.addEventListener('keyup', stopListeningForRainbow);
}

function enableSketchMode() {
    resetGrid();

    document.removeEventListener('keydown', startListeningForRainbow);
    document.removeEventListener('keyup', stopListeningForRainbow);
    document.removeEventListener('keydown', startListeningForFade);
    document.removeEventListener('keyup', stopListeningForFade);
    document.addEventListener('keydown', startListeningForSketch);
    document.addEventListener('keyup', stopListeningForSketch);
}

function enableFadeMode() {
    resetGrid();

    document.removeEventListener('keydown', startListeningForRainbow);
    document.removeEventListener('keyup', stopListeningForRainbow);
    document.removeEventListener('keydown', startListeningForSketch);
    document.removeEventListener('keyup', stopListeningForSketch);
    document.addEventListener('keydown', startListeningForFade);
    document.addEventListener('keyup', stopListeningForFade);
}

function resetGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.style.backgroundColor = 'yellow';
    }
}

function setNumGridSquares() {
    let numGridSquares = +prompt('How many squares per side do you want the grid to have?');

    while (numGridSquares < 1 || numGridSquares > 100) {
        numGridSquares = +prompt('Invalid! Please enter a number between 1 and 100');
    }

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
const fadeModeButton = document.querySelector('#fade-mode');

setGridButton.addEventListener('click', setNumGridSquares);
resetGridButton.addEventListener('click', resetGrid);
sketchModeButton.addEventListener('click', enableSketchMode);
rainbowModeButton.addEventListener('click', enableRainbowMode);
fadeModeButton.addEventListener('click', enableFadeMode);

makeGrid(4);

document.addEventListener('keydown', startListeningForSketch);
document.addEventListener('keyup', stopListeningForSketch);