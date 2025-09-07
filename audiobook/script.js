// script.js
class AudioBookPlayer {
    constructor() {
        this.book = null;
        this.currentChapterIndex = 0;
        this.isPlaying = false;
        this.audio = new Audio();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.loadBook();
    }

    setupEventListeners() {
        // Тема
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // Аудио события
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.onAudioEnd());
        
        // Кнопки управления
        document.addEventListener('click', (e) => {
            if (e.target.closest('#playBtn')) this.togglePlay();
            if (e.target.closest('#prevBtn')) this.prevChapter();
            if (e.target.closest('#nextBtn')) this.nextChapter();
            if (e.target.closest('#rewindBack')) this.rewind(-10);
            if (e.target.closest('#rewindForward')) this.rewind(10);
        });
        
        // Прогресс бар
        document.addEventListener('click', (e) => {
            if (e.target.closest('#progressBar')) this.seek(e);
        });
        
        // Скорость воспроизведения
        document.addEventListener('change', (e) => {
            if (e.target.id === 'speedInput') this.setSpeed(e.target.value);
        });
        
        // Фокус на поле скорости для мобильных
        document.addEventListener('focus', (e) => {
            if (e.target.id === 'speedInput') {
                e.target.select();
            }
        }, true);
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-toggle i').classList.remove('fa-moon');
            document.querySelector('.theme-toggle i').classList.add('fa-sun');
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const themeIcon = document.querySelector('.theme-toggle i');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    // Загрузка книги
    async loadBook() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><p>Загрузка книги...</p></div>';
        
        try {
            // Одна книга
            this.book = {
                id: "audiobook",
                title: "Круз Андрей, Круз Мария - Странники",
                cover: "img/Странники.jpeg",
                audioFiles: [
                    { title: "Глава 1", file: "audio/001.mp3" },
                    { title: "Глава 2", file: "audio/002.mp3" },
                    { title: "Глава 3", file: "audio/003.mp3" },
                    { title: "Глава 4", file: "audio/004.mp3" },
                    { title: "Глава 5", file: "audio/005.mp3" },
                    { title: "Глава 6", file: "audio/006.mp3" },
                    { title: "Глава 7", file: "audio/007.mp3" },
                    { title: "Глава 8", file: "audio/008.mp3" },
                    { title: "Глава 9", file: "audio/009.mp3" },
                    { title: "Глава 10", file: "audio/010.mp3" },
                    { title: "Глава 11", file: "audio/011.mp3" },
                    { title: "Глава 12", file: "audio/012.mp3" },
                    { title: "Глава 13", file: "audio/013.mp3" },
                    { title: "Глава 14", file: "audio/014.mp3" },
                    { title: "Глава 15", file: "audio/015.mp3" },
                    { title: "Глава 16", file: "audio/016.mp3" },
                    { title: "Глава 17", file: "audio/017.mp3" },
                    { title: "Глава 18", file: "audio/018.mp3" },
                    { title: "Глава 19", file: "audio/019.mp3" },
                    { title: "Глава 20", file: "audio/020.mp3" },
                    { title: "Глава 21", file: "audio/021.mp3" },
                    { title: "Глава 22", file: "audio/022.mp3" },
                    { title: "Глава 23", file: "audio/023.mp3" },
                    { title: "Глава 24", file: "audio/024.mp3" },
                    { title: "Глава 25", file: "audio/025.mp3" },
                    { title: "Глава 26", file: "audio/026.mp3" },
                    { title: "Глава 27", file: "audio/027.mp3" },
                    { title: "Глава 28", file: "audio/028.mp3" },
                    { title: "Глава 29", file: "audio/029.mp3" },
                    { title: "Глава 30", file: "audio/030.mp3" },
                    { title: "Глава 31", file: "audio/031.mp3" },
                    { title: "Глава 32", file: "audio/032.mp3" },
                    { title: "Глава 33", file: "audio/033.mp3" },
                    { title: "Глава 34", file: "audio/034.mp3" },
                    { title: "Глава 35", file: "audio/035.mp3" },
                    { title: "Глава 36", file: "audio/036.mp3" },
                    { title: "Глава 37", file: "audio/037.mp3" },
                    { title: "Глава 38", file: "audio/038.mp3" },
                    { title: "Глава 39", file: "audio/039.mp3" },
                    { title: "Глава 40", file: "audio/040.mp3" },
                    { title: "Глава 41", file: "audio/041.mp3" },
                    { title: "Глава 42", file: "audio/042.mp3" }
                ]
            };
            
            // Преобразуем аудиофайлы в главы без фиксированной длительности
            this.book.chapters = this.book.audioFiles.map((file, index) => ({
                title: file.title || `Глава ${index + 1}`,
                duration: "00:00", // Будет определено позже
                file: file.file
            }));
            
            setTimeout(() => {
                this.showBook();
            }, 1000);
        } catch (error) {
            console.error('Ошибка загрузки книги:', error);
            mainContent.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Ошибка загрузки книги</h3>
                    <p>Не удалось загрузить книгу.</p>
                </div>
            `;
        }
    }

    showBook() {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = `
            <div class="book-title-header">
                <h2>${this.book.title}</h2>
            </div>
            
            <div class="player-container" style="background-image: url('${this.book.cover}');">
                <div class="cover-overlay"></div>
                
                <div class="audio-player">
                    <div class="player-header">
                        <div class="player-title">Сейчас играет: ${this.book.chapters[0].title}</div>
                        <div class="speed-control">
                            <label for="speedInput">Скорость:</label>
                            <input type="number" id="speedInput" class="speed-input" min="0.1" max="3" step="0.01" value="1.00" placeholder="1.00">
                        </div>
                    </div>
                    
                    <div class="progress-container">
                        <div class="progress-bar" id="progressBar">
                            <div class="progress" id="progress"></div>
                        </div>
                        <div class="time-info">
                            <span id="currentTime">00:00</span>
                            <span id="duration">00:00</span>
                        </div>
                    </div>
                    
                    <div class="controls">
                        <button class="control-btn" id="rewindBack" title="Назад на 10 сек">
                            <i class="fas fa-backward"></i>
                            <span class="rewind-text">10s</span>
                        </button>
                        <button class="control-btn" id="prevBtn" title="Предыдущая глава">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button class="control-btn play-btn" id="playBtn">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="control-btn" id="nextBtn" title="Следующая глава">
                            <i class="fas fa-step-forward"></i>
                        </button>
                        <button class="control-btn" id="rewindForward" title="Вперед на 10 сек">
                            <span class="rewind-text">10s</span>
                            <i class="fas fa-forward"></i>
                        </button>
                    </div>
                    
                    <div class="playlist">
                        <div class="playlist-header">
                            <div class="playlist-title">Список глав</div>
                            <div class="playlist-stats">${this.book.chapters.length} глав</div>
                        </div>
                        <div class="playlist-items" id="playlistItems">
                            <!-- Элементы плейлиста будут добавлены сюда -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.renderPlaylist();
        this.loadChapterWithSavedProgress();
    }

    renderPlaylist() {
        const playlistItems = document.getElementById('playlistItems');
        playlistItems.innerHTML = '';
        
        this.book.chapters.forEach((chapter, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === this.currentChapterIndex ? 'active' : ''}`;
            item.innerHTML = `
                <div class="playlist-item-number">${index + 1}</div>
                <div class="playlist-item-title">${chapter.title}</div>
                <div class="playlist-item-time">${chapter.duration}</div>
            `;
            item.addEventListener('click', () => this.loadChapter(index));
            playlistItems.appendChild(item);
        });
    }

    // Загрузка главы с восстановлением сохраненного прогресса
    loadChapterWithSavedProgress() {
        // Получаем сохраненную главу и время
        const savedChapter = localStorage.getItem(`book-${this.book.id}-last-chapter`);
        const savedTime = localStorage.getItem(`book-${this.book.id}-last-time`);
        const savedSpeed = localStorage.getItem(`book-${this.book.id}-speed`);
        
        let chapterIndex = 0;
        let startTime = 0;
        
        if (savedChapter !== null) {
            chapterIndex = parseInt(savedChapter);
            if (chapterIndex >= this.book.chapters.length) {
                chapterIndex = 0; // Если глава выходит за пределы, начинаем с первой
            }
        }
        
        if (savedTime !== null) {
            startTime = parseFloat(savedTime);
        }
        
        // Устанавливаем скорость воспроизведения из сохраненных данных
        if (savedSpeed !== null) {
            const speedValue = parseFloat(savedSpeed);
            if (speedValue >= 0.1 && speedValue <= 3) {
                this.audio.playbackRate = speedValue;
                if (document.getElementById('speedInput')) {
                    document.getElementById('speedInput').value = speedValue.toFixed(2);
                }
            }
        } else {
            // Если нет сохраненной скорости, берем из input
            const speedInput = document.getElementById('speedInput');
            if (speedInput) {
                const speedValue = parseFloat(speedInput.value) || 1.0;
                if (speedValue >= 0.1 && speedValue <= 3) {
                    this.audio.playbackRate = speedValue;
                }
            }
        }
        
        this.currentChapterIndex = chapterIndex;
        
        // Загружаем главу
        const chapter = this.book.chapters[chapterIndex];
        this.audio.src = chapter.file;
        this.audio.load();
        
        // Устанавливаем время воспроизведения
        this.audio.currentTime = startTime;
        
        // Обновляем UI
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            if (i === chapterIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        document.querySelector('.player-title').textContent = `Сейчас играет: ${chapter.title}`;
    }

    loadChapter(index) {
        // Сохраняем прогресс текущей главы
        this.saveCurrentProgress();
        
        this.currentChapterIndex = index;
        const chapter = this.book.chapters[index];
        
        // Загружаем новую главу
        this.audio.src = chapter.file;
        this.audio.load();
        this.audio.currentTime = 0; // Начинаем с начала новой главы
        
        // Обновляем UI
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        document.querySelector('.player-title').textContent = `Сейчас играет: ${chapter.title}`;
        
        // Если воспроизводилось, продолжаем воспроизведение
        if (this.isPlaying) {
            this.audio.play();
        }
    }

    // Сохранение текущего прогресса
    saveCurrentProgress() {
        if (this.book && this.currentChapterIndex >= 0) {
            // Сохраняем номер текущей главы
            localStorage.setItem(
                `book-${this.book.id}-last-chapter`, 
                this.currentChapterIndex.toString()
            );
            
            // Сохраняем текущее время воспроизведения
            localStorage.setItem(
                `book-${this.book.id}-last-time`, 
                this.audio.currentTime.toString()
            );
            
            // Сохраняем скорость воспроизведения
            localStorage.setItem(
                `book-${this.book.id}-speed`, 
                this.audio.playbackRate.toString()
            );
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
        } else {
            this.audio.play();
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-pause"></i>';
        }
        this.isPlaying = !this.isPlaying;
        this.saveCurrentProgress();
    }

    prevChapter() {
        if (this.currentChapterIndex > 0) {
            this.loadChapter(this.currentChapterIndex - 1);
        }
    }

    nextChapter() {
        if (this.currentChapterIndex < this.book.chapters.length - 1) {
            this.loadChapter(this.currentChapterIndex + 1);
        }
    }

    // Перемотка на заданное количество секунд
    rewind(seconds) {
        if (this.audio.duration) {
            const newTime = this.audio.currentTime + seconds;
            this.audio.currentTime = Math.max(0, Math.min(newTime, this.audio.duration));
            this.saveCurrentProgress();
        }
    }

    seek(e) {
        const progressBar = document.getElementById('progressBar');
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        
        this.audio.currentTime = (clickX / width) * duration;
        this.saveCurrentProgress();
    }

    setSpeed(speed) {
        const speedValue = parseFloat(speed);
        if (speedValue >= 0.1 && speedValue <= 3) {
            this.audio.playbackRate = speedValue;
            // Сохраняем скорость
            if (this.book) {
                localStorage.setItem(
                    `book-${this.book.id}-speed`, 
                    speedValue.toString()
                );
            }
        } else {
            document.getElementById('speedInput').value = '1.00';
            this.audio.playbackRate = 1.0;
        }
    }

    updateDuration() {
        const durationEl = document.getElementById('duration');
        durationEl.textContent = this.formatTime(this.audio.duration);
        
        // Обновляем длительность в списке глав
        if (this.book && this.currentChapterIndex >= 0) {
            this.book.chapters[this.currentChapterIndex].duration = this.formatTime(this.audio.duration);
            this.updatePlaylistItem(this.currentChapterIndex);
        }
    }

    updatePlaylistItem(index) {
        const playlistItems = document.querySelectorAll('.playlist-item');
        if (playlistItems[index]) {
            const timeElement = playlistItems[index].querySelector('.playlist-item-time');
            if (timeElement) {
                timeElement.textContent = this.book.chapters[index].duration;
            }
        }
    }

    updateProgress() {
        const progress = document.getElementById('progress');
        const currentTimeEl = document.getElementById('currentTime');
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        
        // Периодически сохраняем прогресс (каждые 5 секунд)
        if (Math.floor(this.audio.currentTime) % 5 === 0) {
            this.saveCurrentProgress();
        }
    }

    onAudioEnd() {
        // Сохраняем прогресс завершенной главы
        this.saveCurrentProgress();
        
        if (this.currentChapterIndex < this.book.chapters.length - 1) {
            this.loadChapter(this.currentChapterIndex + 1);
        } else {
            this.isPlaying = false;
            document.getElementById('playBtn').innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.player = new AudioBookPlayer();
});

// Сохраняем прогресс перед закрытием страницы
window.addEventListener('beforeunload', () => {
    if (window.player) {
        window.player.saveCurrentProgress();
    }
});