const grid = document.querySelector('#grid');

for (let i = 0; i < 4; i++) {
    const gridRow = document.createElement('div');
    gridRow.classList.add('grid-row');
    grid.appendChild(gridRow);

    for (let j = 0; j < 4; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridRow.appendChild(gridSquare);

        gridSquare.addEventListener('mouseenter', colorSquare);
        gridSquare.addEventListener('mouseleave', colorSquare)
    }
}

function colorSquare(e) {
    e.target.classList.toggle('colored');
}