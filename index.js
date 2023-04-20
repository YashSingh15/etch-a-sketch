function makeGrid(n) {
    for (let i = 0; i < n; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        grid.appendChild(gridRow);

        for (let j = 0; j < n; j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridRow.appendChild(gridSquare);

            gridSquare.addEventListener('mouseenter', colorSquare);
        }
    }
}

function colorSquare(e) {
    e.target.classList.add('colored');
}

function removeGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function resetGrid() {
    const gridSquares = document.querySelectorAll('.grid-square');

    for (const gridSquare of gridSquares) {
        gridSquare.classList.remove('colored');
    }
}

function setNumGridSquares() {
    const numGridSquares = +prompt('How many squares per side do you want the grid to have?');
    removeGrid();
    makeGrid(numGridSquares);
}

const grid = document.querySelector('#grid');
makeGrid(4);

const setGridButton = document.querySelector('#set-grid');
const resetGridButton = document.querySelector('#reset-grid');

setGridButton.addEventListener('click', setNumGridSquares);
resetGridButton.addEventListener('click', resetGrid);
