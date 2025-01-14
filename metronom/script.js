const instruments = [
    { name: 'Хай-хэт', sound: 'hihat.wav' },
    { name: 'Малый барабан', sound: 'snare.wav' },
    { name: 'Бас-барабан', sound: 'kick.wav' },
];

const patterns = {
    popRock1: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        'kick': [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    popRock2: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        'kick': [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
    },
    popRock3: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        'kick': [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    popRock4: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        'kick': [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    },
    popRock5: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        'kick': [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
    },
    popRock6: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        'kick': [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    metronom1: {
        'hihat': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'snare': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'kick': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0]
    },
    metronom2: {
        'hihat': [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        'snare': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'kick': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0]
    }
};

let isPlaying = false;
let currentStep = 0;
let intervalId = null;

function createGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    grid.appendChild(document.createElement('div')); // Empty cell
    for (let i = 0; i < 16; i++) {
        const labelCell = document.createElement('div');
        labelCell.textContent = (i % 4 === 0) ? Math.floor(i / 4) + 1 : '';
        labelCell.className = (i % 4 === 0) ? 'cell' : 'cell green-cell';
        grid.appendChild(labelCell);
    }

    instruments.forEach(instrument => {
        const nameCell = document.createElement('div');
        nameCell.textContent = instrument.name;
        nameCell.className = 'instrument-name';
        grid.appendChild(nameCell);

        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.instrument = instrument.sound;
            cell.dataset.step = i;
            cell.addEventListener('click', () => {
                cell.classList.toggle('active');
            });
            grid.appendChild(cell);
        }
    });
}

function loadPattern(patternName) {
    const pattern = patterns[patternName];
    const cells = document.querySelectorAll('.cell[data-instrument]');
    cells.forEach(cell => {
        const instrument = cell.dataset.instrument.replace('.wav', '');
        const step = parseInt(cell.dataset.step);
        if (pattern[instrument] && pattern[instrument][step]) {
            cell.classList.add('active');
        } else {
            cell.classList.remove('active');
        }
    });
}

function play() {
    const tempo = parseInt(document.getElementById('tempoInput').value);
    const interval = (60 / tempo) * 1000 / 4;

    intervalId = setInterval(() => {
        const cells = document.querySelectorAll(`.cell[data-step='${currentStep}']`);
        document.querySelectorAll('.playing').forEach(cell => cell.classList.remove('playing'));
        cells.forEach(cell => {
            cell.classList.add('playing');
            if (cell.classList.contains('active')) {
                playSound(cell.dataset.instrument);
            }
        });
        currentStep = (currentStep + 1) % 16;
    }, interval);
}

function stop() {
    isPlaying = false;
    clearInterval(intervalId);
    currentStep = 0;
    document.querySelectorAll('.playing').forEach(cell => cell.classList.remove('playing'));
}

function playSound(soundFile) {
    const audio = new Audio(`sounds/${soundFile}`);
    audio.play();
}

document.getElementById('playBtn').addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        play();
    }
});

document.getElementById('stopBtn').addEventListener('click', stop);

document.getElementById('patternSelect').addEventListener('change', e => {
    loadPattern(e.target.value);
});

createGrid();
loadPattern('popRock1');
