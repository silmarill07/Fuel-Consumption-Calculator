// Определение аудио контекста и основных переменных
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundBuffers = {};
let nextNoteTime = 0;
let scheduledNotes = [];
const scheduleAheadTime = 0.1;

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
        'kick': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    metronom2: {
        'hihat': [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        'snare': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'kick': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};

let isPlaying = false;
let currentStep = 0;
let intervalId = null;
let globalVolume = 0.7;
let currentTempo = 90;

// Контроль громкости
document.getElementById('volumeControl').addEventListener('input', (e) => {
    globalVolume = e.target.value / 100;
    document.getElementById('volumeValue').textContent = `${e.target.value}%`;
});

// Контроль темпа
document.getElementById('tempoInput').addEventListener('input', (e) => {
    const tempo = parseInt(e.target.value);
    if (tempo >= 40 && tempo <= 240) {
        currentTempo = tempo;
        if (isPlaying) {
            stop();
            play();
        }
    }
});

function createGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    grid.appendChild(document.createElement('div'));
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

// Новые функции для точного тайминга
function schedule() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        scheduleNote(currentStep, nextNoteTime);
        nextStep();
    }
}

function scheduleNote(step, time) {
    const cells = document.querySelectorAll(`.cell[data-step='${step}']`);
    
    scheduledNotes.push({
        step: step,
        time: time,
        cells: cells
    });

    cells.forEach(cell => {
        if (cell.classList.contains('active')) {
            playSound(cell.dataset.instrument, time);
        }
    });
}

function nextStep() {
    const secondsPerBeat = 60.0 / currentTempo;
    nextNoteTime += secondsPerBeat / 4;
    currentStep = (currentStep + 1) % 16;
}

function playSound(soundFile, time) {
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = globalVolume;
    
    if (!soundBuffers[soundFile]) {
        fetch(`sounds/${soundFile}`)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                soundBuffers[soundFile] = audioBuffer;
                source.buffer = audioBuffer;
                source.connect(gainNode);
                gainNode.connect(audioContext.destination);
                source.start(time);
            })
            .catch(error => {
                console.error('Error loading sound:', error);
            });
    } else {
        source.buffer = soundBuffers[soundFile];
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start(time);
    }
}

function play() {
    if (!isPlaying) {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        isPlaying = true;
        currentStep = 0;
        nextNoteTime = audioContext.currentTime;
        
        intervalId = setInterval(() => {
            schedule();
            
            const currentTime = audioContext.currentTime;
            scheduledNotes = scheduledNotes.filter(note => {
                if (note.time <= currentTime) {
                    document.querySelectorAll('.playing').forEach(cell => 
                        cell.classList.remove('playing'));
                    note.cells.forEach(cell => cell.classList.add('playing'));
                    return false;
                }
                return true;
            });
        }, 25);
    }
}

function stop() {
    isPlaying = false;
    clearInterval(intervalId);
    scheduledNotes = [];
    currentStep = 0;
    document.querySelectorAll('.playing').forEach(cell => 
        cell.classList.remove('playing'));
}

// Обработчики событий
document.getElementById('playBtn').addEventListener('click', play);
document.getElementById('stopBtn').addEventListener('click', stop);
document.getElementById('patternSelect').addEventListener('change', e => {
    loadPattern(e.target.value);
});

// Инициализация
createGrid();
loadPattern('popRock1');