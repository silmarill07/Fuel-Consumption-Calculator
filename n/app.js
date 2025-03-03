const translations = {
    ru: {
        notes: 'Заметки',
        settings: 'Настройки',
        search: 'Поиск',
        searchPlaceholder: 'Поиск заметок...',
        cancel: 'Отмена',
        save: 'Сохранить',
        delete: 'Удалить',
        deleteNote: 'Удалить заметку',
        deleteSelected: 'Удалить выбранные',
        selected: 'Выбрано',
        noNotes: 'Нет заметок',
        notFound: 'Ничего не найдено',
        noteTitle: 'Заголовок заметки',
        noteContent: 'Текст заметки',
        confirm: 'Подтверждение',
        yes: 'Да',
        no: 'Нет',
        ok: 'OK',
        saveBoth: 'Сохранить обе',
        today: 'Сегодня в',
        yesterday: 'Вчера в',
        modified: 'Изменено',
        untitled: '(Без заголовка)',
        githubSync: 'GitHub Синхронизация',
        githubConnected: 'Подключено к GitHub',
        githubDisconnected: 'Отключить GitHub',
        githubUsername: 'Имя пользователя',
        githubRepo: 'Репозиторий',
        githubToken: 'Токен доступа',
        connect: 'Подключить',
        disconnect: 'Выйти',
        sortNotes: 'Сортировка заметок',
        sortByCreated: 'По дате создания',
        sortByUpdated: 'По дате редактирования',
        language: 'Язык',
        theme: 'Тема',
        darkTheme: 'Тёмная тема',
        pleaseEnterTokenAndRepo: 'Пожалуйста, введите токен и имя репозитория',
        githubConnectionFailed: 'Не удалось подключиться к GitHub. Проверьте токен и имя репозитория.',
        githubConnectionError: 'Ошибка подключения к GitHub',
        confirmDeleteNote: 'Вы уверены, что хотите удалить эту заметку?',
        confirmDeleteSelected: 'Вы уверены, что хотите удалить выбранные заметки?',
        confirmDisconnectGithub: 'Вы уверены, что хотите отключить GitHub? Локальные заметки останутся без изменений.',
        errorLoadingImage: 'Ошибка при загрузке изображения'
    },
    uk: {
        notes: 'Нотатки',
        settings: 'Налаштування',
        search: 'Пошук',
        searchPlaceholder: 'Пошук нотаток...',
        cancel: 'Скасувати',
        save: 'Зберегти',
        delete: 'Видалити',
        deleteNote: 'Видалити нотатку',
        deleteSelected: 'Видалити обрані',
        selected: 'Обрано',
        noNotes: 'Немає нотаток',
        notFound: 'Нічого не знайдено',
        noteTitle: 'Заголовок нотатки',
        noteContent: 'Текст нотатки',
        confirm: 'Підтвердження',
        yes: 'Так',
        no: 'Ні',
        ok: 'OK',
        saveBoth: 'Зберегти обидві',
        today: 'Сьогодні о',
        yesterday: 'Вчора о',
        modified: 'Змінено',
        untitled: '(Без назви)',
        githubSync: 'GitHub Синхронізація',
        githubConnected: 'Підключено до GitHub',
        githubDisconnected: 'Відключити GitHub',
        githubUsername: "Ім'я користувача",
        githubRepo: 'Репозиторій',
        githubToken: 'Токен доступу',
        connect: 'Підключити',
        disconnect: 'Вийти',
        sortNotes: 'Сортування нотаток',
        sortByCreated: 'За датою створення',
        sortByUpdated: 'За датою редагування',
        language: 'Мова',
        theme: 'Тема',
        darkTheme: 'Темна тема',
        pleaseEnterTokenAndRepo: 'Будь ласка, введіть токен та назву репозиторію',
        githubConnectionFailed: 'Не вдалося підключитися до GitHub. Перевірте токен та назву репозиторію.',
        githubConnectionError: 'Помилка підключення до GitHub',
        confirmDeleteNote: 'Ви впевнені, що хочете видалити цю нотатку?',
        confirmDeleteSelected: 'Ви впевнені, що хочете видалити обрані нотатки?',
        confirmDisconnectGithub: 'Ви впевнені, що хочете відключити GitHub? Локальні нотатки залишаться без змін.',
        errorLoadingImage: 'Помилка при завантаженні зображення'
    },
    en: {
        notes: 'Notes',
        settings: 'Settings',
        search: 'Search',
        searchPlaceholder: 'Search notes...',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        deleteNote: 'Delete note',
        deleteSelected: 'Delete selected',
        selected: 'Selected',
        noNotes: 'No notes',
        notFound: 'Nothing found',
        noteTitle: 'Note title',
        noteContent: 'Note content',
        confirm: 'Confirmation',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        saveBoth: 'Save both',
        today: 'Today at',
        yesterday: 'Yesterday at',
        modified: 'Modified',
        untitled: '(Untitled)',
        githubSync: 'GitHub Sync',
        githubConnected: 'Connected to GitHub',
        githubDisconnected: 'Disconnect GitHub',
        githubUsername: 'Username',
        githubRepo: 'Repository',
        githubToken: 'Access token',
        connect: 'Connect',
        disconnect: 'Disconnect',
        sortNotes: 'Sort notes',
        sortByCreated: 'By creation date',
        sortByUpdated: 'By modification date',
        language: 'Language',
        theme: 'Theme',
        darkTheme: 'Dark theme',
        pleaseEnterTokenAndRepo: 'Please enter the token and repository name',
        githubConnectionFailed: 'Failed to connect to GitHub. Please check the token and repository name.',
        githubConnectionError: 'GitHub connection error',
        confirmDeleteNote: 'Are you sure you want to delete this note?',
        confirmDeleteSelected: 'Are you sure you want to delete selected notes?',
        confirmDisconnectGithub: 'Are you sure you want to disconnect GitHub? Local notes will remain unchanged.',
        errorLoadingImage: 'Error loading image'
    }
};

class NotesApp {
    constructor() {
        this.notes = [];
        this.githubConfig = null;
        this.isSelectionMode = false;
        this.selectedNotes = new Set();
        this.initialSync = true;
        this.deletedNoteIds = new Set(JSON.parse(localStorage.getItem('deletedNoteIds') || '[]'));
        
        // Настройка Marked.js
        marked.setOptions({
            breaks: true, // Переносы строк как в GitHub
            gfm: true,    // GitHub Flavored Markdown
            sanitize: true // Безопасный HTML
        });
        
        // Настройки приложения
        const defaultSettings = {
            theme: 'light',
            sortType: 'created',
            language: 'ru'
        };

        this.appSettings = this.loadSettings();
        this.applyTranslations(); // Применяем переводы сразу после загрузки настроек

        this.setupEventListeners();
        this.loadTheme();
        this.loadNotes();
        this.loadGithubConfig();
        this.setupTouchEvents();

        // Обработчики изменения настроек
        document.getElementById('themeToggle').addEventListener('change', (e) => {
            this.appSettings.theme = e.target.checked ? 'dark' : 'light';
            document.body.classList.toggle('dark-theme', e.target.checked);
            this.saveSettings(this.appSettings);
        });

        document.getElementById('sortType').addEventListener('change', (e) => this.handleSortChange(e));

        document.getElementById('language').addEventListener('change', (e) => {
            this.appSettings.language = e.target.value;
            this.saveSettings(this.appSettings);
            this.applyTranslations();
            this.renderNotes();
        });

        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastTapTime = 0;
    }

    setupEventListeners() {
        // Основные кнопки
        document.getElementById('addNoteButton').addEventListener('click', () => this.showNoteEditScreen());
        document.getElementById('settingsButton').addEventListener('click', () => this.showSettingsScreen());
        
        // Поиск
        document.getElementById('searchButton').addEventListener('click', () => this.showSearch());
        document.getElementById('cancelSearch').addEventListener('click', () => this.hideSearch());
        document.getElementById('submitSearch').addEventListener('click', () => this.performSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        document.getElementById('themeToggle').addEventListener('change', (e) => this.toggleTheme(e.target.checked));

        // GitHub интеграция
        document.getElementById('githubConnect').addEventListener('click', () => this.connectGithub());
        document.getElementById('githubDisconnect').addEventListener('click', () => this.disconnectGithub());
        document.getElementById('syncButton').addEventListener('click', () => this.syncWithGithub());

        // Выбор заметок
        document.getElementById('selectNotesButton').addEventListener('click', () => this.toggleSelectionMode());
        document.getElementById('selectAll').addEventListener('click', () => this.selectAllNotes());
        document.getElementById('cancelSelection').addEventListener('click', () => this.exitSelectionMode());
        document.getElementById('deleteSelected').addEventListener('click', () => this.deleteSelectedNotes());

        // Экран редактирования
        const saveButton = document.getElementById('saveNoteButton');
        saveButton.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('Нажата кнопка сохранения');
            await this.saveNote();
        });
        document.getElementById('deleteNoteButton').addEventListener('click', () => this.deleteCurrentNote());
        
        // Кнопки "Назад"
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', () => this.handleBackButton());
        });

        // Подтверждение действий
        document.getElementById('confirmYes').addEventListener('click', () => {
            if (this.pendingConfirmCallback) {
                this.pendingConfirmCallback();
                this.hideConfirmModal();
            }
        });
        document.getElementById('confirmNo').addEventListener('click', () => this.hideConfirmModal());

        // Обработчик изменения сортировки
        document.getElementById('sortType').addEventListener('change', (e) => this.handleSortChange(e));

        // Обработчики форматирования
        document.getElementById('boldButton').addEventListener('click', () => this.toggleBold());
        document.getElementById('increaseTextButton').addEventListener('click', () => this.changeTextSize(1));
        document.getElementById('decreaseTextButton').addEventListener('click', () => this.changeTextSize(-1));
        document.getElementById('imageButton').addEventListener('click', () => document.getElementById('imageInput').click());
        document.getElementById('imageInput').addEventListener('change', (e) => this.handleImageUpload(e));

        // Добавляем обработчики для contenteditable div
        const noteContent = document.getElementById('noteContent');
        noteContent.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.execCommand('insertLineBreak');
            }
        });
    }

    setupTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;
        let longPressTimer = null;
        const longPressDuration = 500;

        document.getElementById('notesList').addEventListener('touchstart', (e) => {
            if (e.target.closest('.note-card')) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;

                longPressTimer = setTimeout(() => {
                    this.handleLongPress(e.target.closest('.note-card'));
                }, longPressDuration);
            }
        }, { passive: true });

        document.getElementById('notesList').addEventListener('touchmove', (e) => {
            if (!e.target.closest('.note-card')) return;

            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchX - touchStartX;
            const deltaY = Math.abs(touchY - touchStartY);

            // Отменяем длительное нажатие при движении
            if (longPressTimer && (Math.abs(deltaX) > 10 || deltaY > 10)) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }

            // Свайп влево для удаления
            if (deltaX < -50 && deltaY < 30) {
                e.target.closest('.note-card').classList.add('swiped');
            }
        }, { passive: true });

        document.getElementById('notesList').addEventListener('touchend', (e) => {
            clearTimeout(longPressTimer);
            const noteCard = e.target.closest('.note-card');
            if (!noteCard) return;

            if (noteCard.classList.contains('swiped')) {
                this.handleSwipeDelete(noteCard);
            }
        });
    }

    handleLongPress(noteCard) {
        if (!this.isSelectionMode) {
            this.toggleSelectionMode();
        }
        this.toggleNoteSelection(noteCard);
    }

    handleSwipeDelete(noteCard) {
        const noteId = noteCard.dataset.id;
        const index = this.notes.findIndex(note => note.id === noteId);
        if (index === -1) return;

        const t = translations[this.appSettings.language];
        this.showConfirmModal(
            t.deleteNote + '?',
            () => {
                noteCard.classList.remove('swiped');
                this.deleteNote(index);
            }
        );
    }

    toggleSelectionMode() {
        this.isSelectionMode = !this.isSelectionMode;
        document.querySelector('.selection-header').style.display = this.isSelectionMode ? 'flex' : 'none';
        document.getElementById('selectNotesButton').style.display = this.isSelectionMode ? 'none' : 'block';
        
        const noteCards = document.querySelectorAll('.note-card');
        noteCards.forEach(card => {
            card.classList.toggle('selection-mode', this.isSelectionMode);
        });

        if (!this.isSelectionMode) {
            this.selectedNotes.clear();
            this.updateSelectedCount();
        }
    }

    toggleNoteSelection(noteCard) {
        const index = Array.from(noteCard.parentNode.children).indexOf(noteCard);
        if (this.selectedNotes.has(index)) {
            this.selectedNotes.delete(index);
            noteCard.classList.remove('selected');
        } else {
            this.selectedNotes.add(index);
            noteCard.classList.add('selected');
        }
        this.updateSelectedCount();
    }

    selectAllNotes() {
        const noteCards = document.querySelectorAll('.note-card');
        const allSelected = this.selectedNotes.size === noteCards.length;

        if (allSelected) {
            this.selectedNotes.clear();
            noteCards.forEach(card => card.classList.remove('selected'));
        } else {
            noteCards.forEach((card, index) => {
                this.selectedNotes.add(index);
                card.classList.add('selected');
            });
        }
        this.updateSelectedCount();
    }

    updateSelectedCount() {
        document.getElementById('selectedCount').textContent = `Выбрано: ${this.selectedNotes.size}`;
    }

    exitSelectionMode() {
        this.toggleSelectionMode();
    }

    deleteSelectedNotes() {
        if (this.selectedNotes.size === 0) return;

        const t = translations[this.appSettings.language];
        this.showConfirmModal(
            `${t.deleteSelected} (${this.selectedNotes.size})?`,
            async () => {
                const selectedIds = Array.from(this.selectedNotes).map(index => this.notes[index].id);
                
                // Добавляем ID удаленных заметок в список
                selectedIds.forEach(id => this.deletedNoteIds.add(id));
                localStorage.setItem('deletedNoteIds', JSON.stringify([...this.deletedNoteIds]));
                
                this.notes = this.notes.filter(note => !selectedIds.includes(note.id));
                this.saveNotesToStorage();
                this.renderNotes();
                this.exitSelectionMode();

                if (this.githubConfig) {
                    await this.syncWithGithub();
                }
            }
        );
    }

    showNoteEditScreen(noteId = null) {
        const screen = document.getElementById('noteEditScreen');
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');
        const deleteButton = document.getElementById('deleteNoteButton');

        // Убедимся, что contentInput это div, а не textarea
        if (contentInput.tagName.toLowerCase() === 'textarea') {
            const div = document.createElement('div');
            div.id = 'noteContent';
            div.className = contentInput.className;
            div.setAttribute('contenteditable', 'true');
            div.setAttribute('placeholder', contentInput.getAttribute('placeholder'));
            contentInput.parentNode.replaceChild(div, contentInput);
        }

        if (noteId !== null) {
            const note = this.notes.find(note => note.id === noteId);
            if (!note) return;

            screen.dataset.noteId = note.id;
            
            // Извлекаем заголовок из markdown
            const titleMatch = note.content.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                titleInput.value = titleMatch[1];
                // Убираем заголовок и пустые строки в начале контента
                const content = note.content.replace(/^#\s+.+\n+/, '').trim();
                // Используем контент как есть, так как он уже содержит HTML-теги
                document.getElementById('noteContent').innerHTML = content;
            } else {
                titleInput.value = note.title || '';
                document.getElementById('noteContent').innerHTML = note.content || '';
            }
            
            deleteButton.style.display = 'block';
        } else {
            // Новая заметка
            titleInput.value = '';
            document.getElementById('noteContent').innerHTML = '';
            delete screen.dataset.noteId;
            deleteButton.style.display = 'none';
        }

        screen.classList.add('active');
        titleInput.focus();
    }

    showSettingsScreen() {
        document.getElementById('settingsScreen').classList.add('active');
    }

    handleBackButton() {
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen) {
            if (activeScreen.id === 'noteEditScreen') {
                // Проверяем, есть ли несохраненные изменения
                const noteId = activeScreen.dataset.noteId;
                const currentTitle = document.getElementById('noteTitle').value;
                const currentContent = document.getElementById('noteContent').innerHTML;

                if (noteId || currentTitle || currentContent) {
                    // Автоматически сохраняем изменения
                    this.saveNote();
                    return;
                }
            }
            activeScreen.classList.remove('active');
        }
    }

    async saveNote() {
        try {
            console.log('Начало сохранения заметки');
            
            const screen = document.getElementById('noteEditScreen');
            const titleInput = document.getElementById('noteTitle');
            const contentInput = document.getElementById('noteContent');
            const noteId = screen.dataset.noteId;

            console.log('Получены значения:', {
                noteId,
                title: titleInput.value,
                content: contentInput.innerHTML
            });

            // Получаем HTML-контент
            const htmlContent = contentInput.innerHTML;
            
            // Проверяем, что контент не пустой
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const hasContent = tempDiv.textContent.trim().length > 0 || tempDiv.querySelector('img');
            
            console.log('Проверка контента:', { hasContent, htmlContent });
            
            // Формируем markdown контент
            const title = titleInput.value.trim();
            const content = this.htmlToMarkdown(htmlContent);
            const markdownContent = title ? `# ${title}\n\n${content}` : content;

            console.log('Сформирован markdown:', { title, markdownContent });

            const note = {
                id: noteId || Date.now().toString(),
                title: title || translations[this.appSettings.language].untitled,
                content: markdownContent,
                updatedAt: new Date().toISOString()
            };

            console.log('Создан объект заметки:', note);

            let savedSuccessfully = false;

            if (noteId) {
                const index = this.notes.findIndex(n => n.id === noteId);
                console.log('Поиск существующей заметки:', { index, noteId });
                
                if (index !== -1) {
                    note.createdAt = this.notes[index].createdAt;
                    this.notes[index] = note;
                    savedSuccessfully = true;
                    console.log('Обновлена существующая заметка');
                } else {
                    note.createdAt = note.updatedAt;
                    this.notes.push(note);
                    savedSuccessfully = true;
                    console.log('Создана новая заметка (случай с ID)');
                }
            } else {
                note.createdAt = note.updatedAt;
                this.notes.push(note);
                savedSuccessfully = true;
                console.log('Создана новая заметка');
            }

            if (!savedSuccessfully) {
                throw new Error('Не удалось сохранить заметку');
            }

            // Сохраняем в localStorage
            try {
                this.saveNotesToStorage();
                console.log('Заметки сохранены в localStorage');
            } catch (error) {
                console.error('Ошибка при сохранении в localStorage:', error);
                throw new Error('Не удалось сохранить заметку в локальное хранилище');
            }

            // Обновляем список заметок
            this.renderNotes();
            console.log('Список заметок обновлен');
            
            // Закрываем экран редактирования
            screen.classList.remove('active');
            console.log('Экран редактирования закрыт');

            // Синхронизируем с GitHub
            if (this.githubConfig) {
                try {
                    console.log('Начало синхронизации с GitHub');
                    this.updateSyncIcon('syncing');
                    await this.syncWithGithub();
                    await this.showTemporaryState('success');
                    console.log('Синхронизация с GitHub завершена');
                } catch (error) {
                    console.error('Ошибка синхронизации:', error);
                    await this.showTemporaryState('error');
                    this.showInfoModal(translations[this.appSettings.language].githubConnectionError);
                }
            }
        } catch (error) {
            console.error('Ошибка при сохранении заметки:', error);
            this.showInfoModal(error.message || 'Произошла ошибка при сохранении заметки');
        }
    }

    htmlToMarkdown(html) {
        let div = document.createElement('div');
        div.innerHTML = html;
        
        let markdown = '';
        
        // Функция для рекурсивного обхода узлов
        const processNode = (node) => {
            if (node.nodeType === 3) { // Текстовый узел
                markdown += node.textContent;
                return;
            }
            
            if (node.nodeType !== 1) { // Не элемент
                return;
            }
            
            const tagName = node.tagName.toLowerCase();
            
            // Обработка различных тегов
            switch (tagName) {
                case 'div':
                case 'p':
                    if (markdown && !markdown.endsWith('\n\n')) {
                        markdown += '\n\n';
                    }
                    Array.from(node.childNodes).forEach(processNode);
                    if (!markdown.endsWith('\n\n')) {
                        markdown += '\n\n';
                    }
                    break;
                    
                case 'br':
                    markdown += '\n';
                    break;
                    
                case 'b':
                case 'strong':
                    const boldText = Array.from(node.childNodes).map(child => {
                        let tempMd = '';
                        processNode(child);
                        tempMd = markdown;
                        markdown = '';
                        return tempMd;
                    }).join('');
                    markdown += `<b>${boldText}</b>`;
                    break;
                    
                case 'i':
                case 'em':
                    const italicText = Array.from(node.childNodes).map(child => {
                        let tempMd = '';
                        processNode(child);
                        tempMd = markdown;
                        markdown = '';
                        return tempMd;
                    }).join('');
                    markdown += `<i>${italicText}</i>`;
                    break;
                    
                case 'img':
                    markdown += `<img src="${node.src}" alt="${node.alt || ''}">\n`;
                    break;
                    
                case 'input':
                    if (node.type === 'checkbox') {
                        markdown += `- [${node.checked ? 'x' : ' '}] `;
                    }
                    break;
                    
                case 'span':
                    const fontSize = node.style.fontSize;
                    const spanText = Array.from(node.childNodes).map(child => {
                        let tempMd = '';
                        processNode(child);
                        tempMd = markdown;
                        markdown = '';
                        return tempMd;
                    }).join('');
                    
                    if (fontSize) {
                        if (fontSize === '1.5em') {
                            markdown += `<span style="font-size: 1.5em">${spanText}</span>`;
                        } else if (fontSize === '0.8em') {
                            markdown += `<span style="font-size: 0.8em">${spanText}</span>`;
                        } else {
                            markdown += spanText;
                        }
                    } else {
                        markdown += spanText;
                    }
                    break;
                    
                default:
                    Array.from(node.childNodes).forEach(processNode);
            }
        };
        
        Array.from(div.childNodes).forEach(processNode);
        
        // Очистка лишних переносов строк
        return markdown.trim().replace(/\n{3,}/g, '\n\n');
    }

    deleteCurrentNote() {
        const screen = document.getElementById('noteEditScreen');
        const noteId = screen.dataset.noteId;
        if (!noteId) return;

        const t = translations[this.appSettings.language];
        this.showConfirmModal(
            t.deleteNote + '?',
            async () => {
                const indexToDelete = this.notes.findIndex(note => note.id === noteId);
                if (indexToDelete !== -1) {
                    // Добавляем ID удаленной заметки в список
                    this.deletedNoteIds.add(noteId);
                    localStorage.setItem('deletedNoteIds', JSON.stringify([...this.deletedNoteIds]));
                    
                    this.notes.splice(indexToDelete, 1);
                    this.saveNotesToStorage();
                    this.renderNotes();
                    screen.classList.remove('active');
                    if (this.githubConfig) {
                        try {
                            this.updateSyncIcon('syncing');
                            await this.syncWithGithub();
                            await this.showTemporaryState('success');
                        } catch (error) {
                            console.error('Ошибка синхронизации:', error);
                            await this.showTemporaryState('error');
                            this.showInfoModal(t.githubConnectionError);
                        }
                    }
                }
            }
        );
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const t = translations[this.appSettings.language];
        
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        // Если прошло меньше 24 часов
        if (diff < 24 * 60 * 60 * 1000) {
            return `${t.today} ${hours}:${minutes}`;
        }
        
        // Если прошло меньше 48 часов
        if (diff < 48 * 60 * 60 * 1000) {
            return `${t.yesterday} ${hours}:${minutes}`;
        }
        
        // Для остальных случаев
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    renderNotes() {
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        
        const sortedNotes = this.sortNotes([...this.notes]);
        
        sortedNotes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-card';
            noteElement.dataset.id = note.id;
            
            if (this.isSelectionMode) {
                noteElement.classList.add('selection-mode');
                if (this.selectedNotes.has(index)) {
                    noteElement.classList.add('selected');
                }
            }

            // Извлекаем заголовок и превью текста
            const titleMatch = note.content.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : note.title || translations[this.appSettings.language].untitled;
            
            // Получаем контент без заголовка
            let content = note.content;
            if (titleMatch) {
                content = content.replace(/^#\s+.+\n+/, '').trim();
            }
            
            // Создаем временный div для преобразования markdown в HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = marked.parse(content);
            
            // Находим первое изображение
            const firstImage = tempDiv.querySelector('img');
            
            // Получаем текст для превью (без HTML тегов)
            let preview = tempDiv.textContent;
            if (preview.length > 100) {
                preview = preview.substring(0, 100) + '...';
            }

            noteElement.innerHTML = `
                <div class="note-card-content">
                    <div class="checkbox">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>${this.escapeHtml(title)}</h3>
                    <p>${this.escapeHtml(preview)}</p>
                    <div class="note-date">
                        ${this.formatDate(note.updatedAt || note.createdAt)}
                    </div>
                </div>
                ${firstImage ? `
                    <img src="${firstImage.src}" class="note-card-image" alt="Изображение заметки">
                ` : ''}
                <div class="note-card-swipe-action">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            
            noteElement.addEventListener('click', (e) => {
                if (this.isSelectionMode) {
                    this.toggleNoteSelection(noteElement);
                } else {
                    this.showNoteEditScreen(note.id);
                }
            });

            notesList.appendChild(noteElement);
        });

        const selectButton = document.getElementById('selectNotesButton');
        selectButton.classList.toggle('visible', this.notes.length > 0);
    }

    // Работа с заметками
    loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        this.notes = savedNotes ? JSON.parse(savedNotes) : [];
        this.renderNotes();
    }

    saveNotesToStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    filterNotes(query) {
        const notesList = document.getElementById('notesList');
        let hasMatches = false;

        notesList.childNodes.forEach(noteElement => {
            const title = noteElement.querySelector('h3').textContent.toLowerCase();
            const content = noteElement.querySelector('p').textContent.toLowerCase();
            const matches = title.includes(query) || content.includes(query);
            noteElement.style.display = matches ? 'block' : 'none';
            if (matches) hasMatches = true;
        });

        // Показываем или скрываем сообщение о результатах поиска
        let noResultsMessage = document.querySelector('.no-results-message');
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            notesList.parentNode.appendChild(noResultsMessage);
        }

        if (!hasMatches) {
            noResultsMessage.textContent = 'Ничего не найдено';
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    showNoteModal(noteIndex = null) {
        const modal = document.getElementById('noteModal');
        const titleInput = document.getElementById('noteTitle');
        const contentInput = document.getElementById('noteContent');

        if (noteIndex !== null) {
            const note = this.notes[noteIndex];
            titleInput.value = note.title;
            contentInput.value = note.content;
            modal.dataset.noteIndex = noteIndex;
        } else {
            titleInput.value = '';
            contentInput.value = '';
            delete modal.dataset.noteIndex;
        }

        modal.classList.add('active');
    }

    hideNoteModal() {
        const modal = document.getElementById('noteModal');
        modal.classList.remove('active');
    }

    editNote(index) {
        this.showNoteModal(index);
    }

    deleteNote(index) {
        const noteId = this.notes[index].id;
        const t = translations[this.appSettings.language];
        
        this.showConfirmModal(
            t.confirmDeleteNote,
            async () => {
                const indexToDelete = this.notes.findIndex(note => note.id === noteId);
                if (indexToDelete !== -1) {
                    // Добавляем ID удаленной заметки в список
                    this.deletedNoteIds.add(noteId);
                    localStorage.setItem('deletedNoteIds', JSON.stringify([...this.deletedNoteIds]));
                    
                    this.notes.splice(indexToDelete, 1);
                    this.saveNotesToStorage();
                    this.renderNotes();
                    if (this.githubConfig) {
                        try {
                            this.updateSyncIcon('syncing');
                            await this.syncWithGithub();
                            await this.showTemporaryState('success');
                        } catch (error) {
                            console.error('Ошибка синхронизации:', error);
                            await this.showTemporaryState('error');
                            this.showInfoModal(t.githubConnectionError);
                        }
                    }
                }
            }
        );
    }

    // Работа с темой
    loadTheme() {
        const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
        document.body.classList.toggle('dark-theme', isDarkTheme);
        document.getElementById('themeToggle').checked = isDarkTheme;
    }

    toggleTheme(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('darkTheme', isDark);
    }

    // Работа с GitHub
    loadGithubConfig() {
        const config = localStorage.getItem('githubConfig');
        if (config) {
            this.githubConfig = JSON.parse(config);
            this.updateGithubUI(true);
        }
    }

    // Вспомогательные функции
    encodeUnicode(str) {
        // Преобразуем Unicode строку в Base64
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    decodeUnicode(str) {
        return decodeURIComponent(
            atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );
    }

    async testGithubConnection(config) {
        try {
            // Проверяем формат имени репозитория
            if (config.repo.startsWith('https://') || config.repo.includes('/')) {
                throw new Error('Укажите только название репозитория, без полного URL или имени пользователя');
            }

            const apiUrl = `https://api.github.com/repos/${config.username}/${config.repo}`;
            console.log('Попытка подключения к:', apiUrl);

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `token ${config.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            console.log('Статус ответа:', response.status);

            if (response.status === 404) {
                throw new Error(`Репозиторий ${config.username}/${config.repo} не найден. Убедитесь, что:\n` +
                    '1. Имя пользователя указано правильно\n' +
                    '2. Название репозитория указано правильно\n' +
                    '3. Репозиторий существует и не является приватным\n' +
                    '4. У токена есть права на доступ к репозиторию');
            } else if (response.status === 401) {
                throw new Error('Неверный токен доступа. Проверьте:\n' +
                    '1. Правильность токена\n' +
                    '2. Срок действия токена не истёк\n' +
                    '3. Токен имеет необходимые права доступа (repo)');
            }

            const responseData = await response.json();
            console.log('Ответ от GitHub:', responseData);

            if (!response.ok) {
                throw new Error(`Ошибка подключения: ${responseData.message || 'Неизвестная ошибка'}`);
            }

            // Проверяем права на запись
            console.log('Проверка прав на запись...');
            const writeResponse = await fetch(`https://api.github.com/repos/${config.username}/${config.repo}/contents/test.txt`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${config.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Test write access',
                    content: this.encodeUnicode('test'),
                    branch: 'main'
                })
            });

            console.log('Статус проверки прав на запись:', writeResponse.status);
            
            if (writeResponse.status === 403) {
                throw new Error('Недостаточно прав для записи в репозиторий. Убедитесь, что:\n' +
                    '1. Токен имеет права "repo" или "public_repo"\n' +
                    '2. У вас есть права на запись в репозиторий\n' +
                    '3. Репозиторий не защищён от записи');
            }

            const writeData = await writeResponse.json();
            console.log('Ответ при проверке прав:', writeData);

            // Если тестовый файл был создан, удаляем его
            if (writeResponse.ok) {
                console.log('Удаление тестового файла...');
                await fetch(`https://api.github.com/repos/${config.username}/${config.repo}/contents/test.txt`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `token ${config.token}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: 'Remove test file',
                        sha: writeData.content.sha,
                        branch: 'main'
                    })
                });
            }

            return true; // Возвращаем true, если все проверки прошли успешно
        } catch (error) {
            console.error('Ошибка при подключении к GitHub:', error);
            if (error.message.includes('Failed to fetch')) {
                throw new Error('Не удалось подключиться к GitHub. Проверьте:\n' +
                    '1. Подключение к интернету\n' +
                    '2. Доступность GitHub\n' +
                    '3. Блокировку файрволом или антивирусом');
            }
            throw error;
        }
    }

    async connectGithub() {
        const token = document.getElementById('githubToken').value.trim();
        const repo = document.getElementById('githubRepo').value.trim();
        const username = document.getElementById('githubUsername').value.trim();

        if (!token || !repo || !username) {
            this.showError(translations[this.appSettings.language].pleaseEnterTokenAndRepo);
            return;
        }

        this.githubConfig = { token, repo, username };
        this.initialSync = true;
        
        try {
            const isValid = await this.testGithubConnection(this.githubConfig);
            if (isValid) {
                localStorage.setItem('githubConfig', JSON.stringify(this.githubConfig));
                await this.syncWithGithub();
                this.updateGithubUI(true);
            } else {
                this.githubConfig = null;
                this.initialSync = false;
                this.showError(translations[this.appSettings.language].githubConnectionFailed);
            }
        } catch (error) {
            console.error('Error connecting to GitHub:', error);
            this.githubConfig = null;
            this.initialSync = false;
            this.showError(error.message || translations[this.appSettings.language].githubConnectionError);
        }
    }

    disconnectGithub() {
        const t = translations[this.appSettings.language];
        this.showConfirmModal(
            t.confirmDisconnectGithub,
            () => {
                this.githubConfig = null;
                this.initialSync = true;
                localStorage.removeItem('githubConfig');
                this.updateGithubUI(false);
            }
        );
    }

    async updateGithubUI(isConnected) {
        const githubStatus = document.getElementById('githubStatus');
        const githubForm = document.querySelector('.github-form');
        const githubUserInfo = document.querySelector('.github-user-info');
        const githubConnect = document.getElementById('githubConnect');
        const githubDisconnect = document.getElementById('githubDisconnect');
        const syncButton = document.getElementById('syncButton');

        if (isConnected && this.githubConfig) {
            try {
                // Получаем информацию о пользователе
                const response = await fetch(`https://api.github.com/users/${this.githubConfig.username}`, {
                    headers: {
                        'Authorization': `token ${this.githubConfig.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                const userData = await response.json();

                if (response.ok) {
                    // Скрываем форму и показываем информацию пользователя
                    githubForm.style.display = 'none';
                    githubUserInfo.classList.add('show');
                    
                    // Обновляем UI для подключенного состояния
                    document.querySelector('.github-avatar').style.backgroundImage = `url(${userData.avatar_url})`;
                    document.querySelector('.github-username').textContent = userData.login;
                    githubStatus.textContent = translations[this.appSettings.language].githubConnected;
                    
                    githubConnect.style.display = 'none';
                    githubDisconnect.classList.add('show');
                    syncButton.style.display = 'block';
                } else {
                    this.handleDisconnectedState();
                }
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
                this.handleDisconnectedState();
            }
        } else {
            this.handleDisconnectedState();
        }
    }

    handleDisconnectedState() {
        const githubStatus = document.getElementById('githubStatus');
        const githubForm = document.querySelector('.github-form');
        const githubUserInfo = document.querySelector('.github-user-info');
        const githubConnect = document.getElementById('githubConnect');
        const githubDisconnect = document.getElementById('githubDisconnect');
        const syncButton = document.getElementById('syncButton');

        // Показываем форму и скрываем информацию пользователя
        githubForm.style.display = 'flex';
        githubUserInfo.classList.remove('show');
        
        // Обновляем статус и кнопки
        githubStatus.textContent = translations[this.appSettings.language].githubDisconnected;
        githubConnect.style.display = 'block';
        githubDisconnect.classList.remove('show');
        syncButton.style.display = 'none';

        // Очищаем поля формы
        document.getElementById('githubUsername').value = '';
        document.getElementById('githubRepo').value = '';
        document.getElementById('githubToken').value = '';
    }

    // Обновляем состояние значка синхронизации
    updateSyncIcon(state = 'default') {
        const syncButton = document.getElementById('syncButton');
        const icon = syncButton.querySelector('i');
        
        // Удаляем все возможные классы состояний
        icon.classList.remove(
            'fa-sync-alt',
            'fa-spin',
            'fa-check',
            'fa-times'
        );

        // Устанавливаем нужный класс в зависимости от состояния
        switch (state) {
            case 'syncing':
                icon.classList.add('fa-sync-alt', 'fa-spin');
                break;
            case 'success':
                icon.classList.add('fa-check');
                break;
            case 'error':
                icon.classList.add('fa-times');
                break;
            default:
                icon.classList.add('fa-sync-alt');
                break;
        }
    }

    // Показываем временное состояние значка
    async showTemporaryState(state, duration = 2000) {
        this.updateSyncIcon(state);
        await new Promise(resolve => setTimeout(resolve, duration));
        this.updateSyncIcon();
    }

    async syncWithGithub() {
        if (!this.githubConfig) return;

        try {
            this.updateSyncIcon('syncing');
            
            // Сначала отправляем локальные изменения на GitHub
            await this.pushNotesToGithub();
            
            // Затем получаем обновления с GitHub
            const response = await this.fetchGithubNotes();
            
            if (!response.ok) {
                throw new Error('Не удалось получить заметки с GitHub');
            }

            const githubNotes = await response.json();
            
            // При первой синхронизации после входа
            if (this.initialSync) {
                // Объединяем локальные заметки с GitHub
                const mergedNotes = this.mergeNotes(this.notes, githubNotes);
                this.notes = mergedNotes;
                this.saveNotesToStorage();
                this.renderNotes();
                this.initialSync = false;
                await this.showTemporaryState('success');
                return;
            }

            // Обычная синхронизация
            const mergedNotes = this.mergeNotes(this.notes, githubNotes);
            this.notes = mergedNotes;
            this.saveNotesToStorage();
            this.renderNotes();
            
            await this.showTemporaryState('success');
        } catch (error) {
            console.error('Error syncing with GitHub:', error);
            this.showInfoModal('Ошибка синхронизации с GitHub');
            await this.showTemporaryState('error');
        }
    }

    async fetchGithubNotes() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.githubConfig.username}/${this.githubConfig.repo}/contents/notes.json`, {
                headers: {
                    'Authorization': `token ${this.githubConfig.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.status === 404) {
                return { ok: true, json: async () => [] };
            }

            if (!response.ok) {
                return { ok: false };
            }

            const data = await response.json();
            const content = this.decodeUnicode(data.content);
            const notes = JSON.parse(content);
            
            return { ok: true, json: async () => notes };
        } catch (error) {
            console.error('Error fetching notes from GitHub:', error);
            return { ok: false };
        }
    }

    findConflicts(githubNotes) {
        return githubNotes.filter(githubNote => {
            const localNote = this.notes.find(note => note.title === githubNote.title);
            return localNote && localNote.content !== githubNote.content;
        });
    }

    async handleConflicts(conflicts) {
        for (const conflict of conflicts) {
            await new Promise(resolve => {
                this.showConfirmModal(
                    `Обнаружен конфликт для заметки "${conflict.title}":\n\n` +
                    `Локальная версия:\n${conflict.content}\n\n` +
                    `Версия на GitHub:\n${conflict.content}\n\n` +
                    `Нажмите OK, чтобы использовать версию с GitHub, или Cancel, чтобы сохранить локальную версию.`,
                    () => {
                        const index = this.notes.findIndex(note => note.title === conflict.title);
                        if (index !== -1) {
                            this.notes[index] = conflict;
                        }
                        resolve();
                    },
                    () => {
                        resolve();
                    }
                );
            });
        }
        
        this.saveNotesToStorage();
        this.renderNotes();
    }

    async pushNotesToGithub() {
        const content = this.encodeUnicode(JSON.stringify(this.notes, null, 2));
        
        try {
            let sha = null;
            
            // Пытаемся получить существующий файл для его SHA
            try {
                const response = await fetch(`https://api.github.com/repos/${this.githubConfig.username}/${this.githubConfig.repo}/contents/notes.json`, {
                    headers: {
                        'Authorization': `token ${this.githubConfig.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    sha = data.sha;
                }
            } catch (error) {
                console.log('Файл notes.json не существует, будет создан новый');
            }

            // Создаем или обновляем файл
            const updateResponse = await fetch(`https://api.github.com/repos/${this.githubConfig.username}/${this.githubConfig.repo}/contents/notes.json`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.githubConfig.token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: sha ? 'Update notes' : 'Initial notes commit',
                    content: content,
                    sha: sha
                })
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                throw new Error(`Ошибка при сохранении: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Ошибка при сохранении в GitHub:', error);
            throw new Error(`Не удалось сохранить заметки на GitHub: ${error.message}`);
        }
    }

    // Вспомогательные функции
    showSettingsModal() {
        document.getElementById('settingsModal').classList.add('active');
    }

    hideSettingsModal() {
        document.getElementById('settingsModal').classList.remove('active');
    }

    showConfirmModal(message, confirmCallback, cancelCallback = null) {
        const modal = document.getElementById('confirmModal');
        document.getElementById('confirmMessage').textContent = message;
        this.pendingConfirmCallback = confirmCallback;
        this.pendingCancelCallback = cancelCallback;
        modal.classList.add('active');

        // Обновляем текст кнопок в соответствии с выбранным языком
        const t = translations[this.appSettings.language];
        document.getElementById('confirmYes').textContent = t.yes;
        document.getElementById('confirmNo').textContent = t.no;
    }

    hideConfirmModal(confirmed = true) {
        const modal = document.getElementById('confirmModal');
        modal.classList.remove('active');
        if (confirmed && this.pendingConfirmCallback) {
            this.pendingConfirmCallback();
        } else if (!confirmed && this.pendingCancelCallback) {
            this.pendingCancelCallback();
        }
        this.pendingConfirmCallback = null;
        this.pendingCancelCallback = null;
    }

    showInfoModal(message) {
        const modal = document.getElementById('infoModal');
        const t = translations[this.appSettings.language];
        
        if (!modal) {
            // Создаем модальное окно для информационных сообщений, если его нет
            const modalHtml = `
                <div id="infoModal" class="modal">
                    <div class="modal-content">
                        <p id="infoMessage"></p>
                        <div class="modal-actions">
                            <button id="infoOk">${t.ok || 'OK'}</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            document.getElementById('infoOk').addEventListener('click', () => {
                document.getElementById('infoModal').classList.remove('active');
            });
        } else {
            // Обновляем текст кнопки OK
            document.getElementById('infoOk').textContent = t.ok || 'OK';
        }
        document.getElementById('infoMessage').textContent = message;
        document.getElementById('infoModal').classList.add('active');
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    showSearch() {
        document.querySelector('.search-bar').classList.add('active');
        document.getElementById('searchInput').focus();
    }

    hideSearch() {
        document.querySelector('.search-bar').classList.remove('active');
        document.getElementById('searchInput').value = '';
        this.renderNotes(); // Сбрасываем результаты поиска
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        if (!query) {
            this.renderNotes();
            return;
        }
        this.filterNotes(query);
    }

    // Настройки приложения
    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('appSettings')) || {
            theme: 'light',
            sortType: 'created',
            language: 'ru'
        };
        
        // Применяем тему
        document.body.classList.toggle('dark-theme', settings.theme === 'dark');
        document.getElementById('themeToggle').checked = settings.theme === 'dark';
        
        // Применяем сортировку
        document.getElementById('sortType').value = settings.sortType;
        
        // Применяем язык
        document.getElementById('language').value = settings.language;
        
        return settings;
    }

    saveSettings(settings) {
        localStorage.setItem('appSettings', JSON.stringify(settings));
    }

    // Обновляем функцию сортировки заметок
    sortNotes(notes) {
        const sortedNotes = [...notes];
        const sortType = this.appSettings.sortType;

        return sortedNotes.sort((a, b) => {
            let dateA, dateB;

            if (sortType === 'created') {
                dateA = new Date(a.createdAt);
                dateB = new Date(b.createdAt);
            } else {
                dateA = new Date(a.updatedAt || a.createdAt);
                dateB = new Date(b.updatedAt || b.createdAt);
            }

            return dateB - dateA; // Сортировка по убыванию (новые сверху)
        });
    }

    // Обновляем обработчик изменения сортировки
    handleSortChange(e) {
        this.appSettings.sortType = e.target.value;
        this.saveSettings(this.appSettings);
        this.renderNotes(); // Перерисовываем заметки с новой сортировкой
    }

    // Добавляем метод для применения переводов
    applyTranslations() {
        const lang = this.appSettings.language;
        const t = translations[lang];

        // Обновляем все элементы с атрибутом data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (t[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = t[key];
                } else {
                    element.textContent = t[key];
                }
            }
        });

        // Обновляем заголовки кнопок
        document.getElementById('searchButton').title = t.search;
        document.getElementById('settingsButton').title = t.settings;
        document.getElementById('syncButton').title = t.githubSync;

        // Обновляем динамические элементы
        const selectedCount = this.selectedNotes ? this.selectedNotes.size : 0;
        const selectedCountElement = document.getElementById('selectedCount');
        if (selectedCountElement) {
            selectedCountElement.textContent = `${t.selected}: ${selectedCount}`;
        }

        // Обновляем статус GitHub
        const githubStatus = document.getElementById('githubStatus');
        if (githubStatus) {
            githubStatus.textContent = this.githubConfig ? t.githubConnected : t.githubDisconnected;
        }

        // Обновляем сообщения
        const noResultsMessage = document.querySelector('.no-results-message');
        if (noResultsMessage) {
            noResultsMessage.textContent = this.notes.length === 0 ? t.noNotes : t.notFound;
        }

        // Обновляем язык документа
        document.documentElement.lang = lang;
    }

    // Методы форматирования
    toggleBold() {
        const selection = window.getSelection();
        const noteContent = document.getElementById('noteContent');

        // Проверяем, есть ли выделение
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        
        // Проверяем, что выделение находится внутри noteContent
        if (!noteContent.contains(range.commonAncestorContainer)) return;
        
        // Сохраняем выделенный текст
        const selectedText = range.toString().trim();
        if (!selectedText) return;

        // Проверяем, находится ли выделение уже внутри тега <b>
        let existingBold = range.commonAncestorContainer;
        while (existingBold && existingBold !== noteContent) {
            if (existingBold.nodeType === 1 && 
                (existingBold.tagName === 'B' || existingBold.tagName === 'STRONG')) {
                // Если текст уже жирный, удаляем форматирование
                const parent = existingBold.parentNode;
                const fragment = document.createDocumentFragment();
                while (existingBold.firstChild) {
                    fragment.appendChild(existingBold.firstChild);
                }
                parent.replaceChild(fragment, existingBold);
                return;
            }
            existingBold = existingBold.parentNode;
        }

        // Если текст не жирный, делаем его жирным
        try {
            // Создаем новый элемент
            const newElement = document.createElement('b');
            
            // Клонируем диапазон, чтобы не изменять оригинальное выделение
            const clonedRange = range.cloneRange();
            
            // Извлекаем содержимое выделения
            const fragment = clonedRange.extractContents();
            
            // Оборачиваем содержимое в новый элемент
            newElement.appendChild(fragment);
            
            // Вставляем новый элемент
            clonedRange.insertNode(newElement);
            
            // Очищаем выделение
            selection.removeAllRanges();
            
            // Создаем новое выделение вокруг нового элемента
            const newRange = document.createRange();
            newRange.selectNodeContents(newElement);
            selection.addRange(newRange);
        } catch (e) {
            console.error('Ошибка при форматировании текста:', e);
        }
    }

    changeTextSize(delta) {
        const selection = window.getSelection();
        const noteContent = document.getElementById('noteContent');

        // Проверяем, есть ли выделение
        if (!selection.rangeCount) {
            console.log('Нет выделения');
            return;
        }

        // Получаем диапазон выделения
        const range = selection.getRangeAt(0);
        
        // Проверяем, что выделение находится внутри noteContent
        if (!noteContent.contains(range.commonAncestorContainer)) {
            console.log('Выделение вне noteContent');
            return;
        }

        // Получаем выделенный текст
        const selectedText = range.toString();
        if (!selectedText.trim()) {
            console.log('Пустое выделение');
            return;
        }

        console.log('Выделенный текст:', selectedText);

        try {
            // Сохраняем границы выделения
            const startContainer = range.startContainer;
            const startOffset = range.startOffset;
            const endContainer = range.endContainer;
            const endOffset = range.endOffset;

            // Создаем новый span
            const newSpan = document.createElement('span');
            newSpan.style.fontSize = delta > 0 ? '1.5em' : '0.8em';

            // Клонируем диапазон для безопасной работы
            const clonedRange = range.cloneRange();
            
            // Извлекаем содержимое выделения
            const fragment = clonedRange.extractContents();
            
            // Проверяем, есть ли уже форматирование
            const tempDiv = document.createElement('div');
            tempDiv.appendChild(fragment.cloneNode(true));
            const existingSpan = tempDiv.querySelector(`span[style*="font-size: ${delta > 0 ? '1.5em' : '0.8em'}"]`);

            if (existingSpan) {
                // Если форматирование уже есть, удаляем его
                const textNode = document.createTextNode(fragment.textContent);
                clonedRange.insertNode(textNode);
                
                // Восстанавливаем выделение
                const newRange = document.createRange();
                newRange.setStart(textNode, 0);
                newRange.setEnd(textNode, textNode.length);
                selection.removeAllRanges();
                selection.addRange(newRange);
            } else {
                // Добавляем новое форматирование
                newSpan.appendChild(fragment);
                clonedRange.insertNode(newSpan);
                
                // Восстанавливаем выделение
                const newRange = document.createRange();
                newRange.selectNodeContents(newSpan);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }

            console.log('Форматирование применено успешно');
        } catch (e) {
            console.error('Ошибка при изменении размера текста:', e);
        }
    }

    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            const base64 = await this.fileToBase64(file);
            const img = document.createElement('img');
            img.src = base64;
            img.alt = file.name;
            
            const noteContent = document.getElementById('noteContent');
            const selection = window.getSelection();
            if (selection.rangeCount > 0 && noteContent.contains(selection.anchorNode)) {
                const range = selection.getRangeAt(0);
                range.insertNode(img);
            } else {
                noteContent.appendChild(img);
            }
            
            event.target.value = '';
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            this.showInfoModal(translations[this.appSettings.language].errorLoadingImage);
        }
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    setupTouchGestures(element) {
        let touchStartTime = 0;
        let touchEndTime = 0;

        element.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();

            const tapLength = touchStartTime - this.lastTapTime;
            if (tapLength < 500 && tapLength > 0) {
                e.preventDefault();
                this.insertChecklist();
            }
            this.lastTapTime = touchStartTime;
        });

        element.addEventListener('touchmove', (e) => {
            if (!e.target.closest('.checklist-item')) return;

            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchX - this.touchStartX;
            const deltaY = Math.abs(touchY - this.touchStartY);

            if (deltaY < Math.abs(deltaX) / 2) {
                e.preventDefault();
                const item = e.target.closest('.checklist-item');
                if (item) {
                    if (deltaX < -50) {
                        item.classList.add('swiped-left');
                    } else {
                        item.classList.remove('swiped-left');
                    }
                }
            }
        });

        element.addEventListener('touchend', (e) => {
            const item = e.target.closest('.checklist-item');
            if (!item) return;

            touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;

            if (item.classList.contains('swiped-left')) {
                setTimeout(() => item.remove(), 300);
            } else if (touchDuration < 200) {
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    this.handleCheckboxClick({ target: checkbox });
                }
            }
        });
    }

    mergeNotes(localNotes, githubNotes) {
        const mergedNotes = [...localNotes];
        
        // Фильтруем заметки с GitHub, исключая удаленные
        const filteredGithubNotes = githubNotes.filter(note => !this.deletedNoteIds.has(note.id));
        
        for (const githubNote of filteredGithubNotes) {
            const localNoteIndex = mergedNotes.findIndex(note => note.id === githubNote.id);
            
            if (localNoteIndex === -1) {
                // Если заметки нет локально и она не была удалена, добавляем её
                if (!this.deletedNoteIds.has(githubNote.id)) {
                    mergedNotes.push(githubNote);
                }
            } else {
                // Сравниваем заметки
                const localNote = mergedNotes[localNoteIndex];
                
                // Проверяем, есть ли отличия в названии или тексте
                const hasDifferences = 
                    localNote.title !== githubNote.title ||
                    localNote.content !== githubNote.content;
                
                // Если есть отличия, всегда оставляем локальную версию
                if (hasDifferences) {
                    // Локальная версия имеет приоритет
                    continue;
                }
            }
        }
        
        return mergedNotes;
    }

    showError(message) {
        this.showInfoModal(message);
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new NotesApp();
}); 