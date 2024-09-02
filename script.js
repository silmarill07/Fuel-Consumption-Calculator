document.addEventListener('DOMContentLoaded', () => {
    // Загрузка сохраненных заметок и настроек
    loadNotes();
    loadTheme();
    loadFontSize();
    loadSortOrder();

    document.getElementById('themeToggle').addEventListener('change', toggleTheme);
    document.getElementById('fontSize').addEventListener('change', changeFontSize);
    document.getElementById('sortOrder').addEventListener('change', changeSortOrder);
});

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function openAddNotePage() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('addNotePage').style.display = 'flex';
}

function closeAddNotePage() {
    document.getElementById('mainContainer').style.display = 'flex';
    document.getElementById('addNotePage').style.display = 'none';
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    if (title && content) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ title, content, date: new Date() });
        localStorage.setItem('notes', JSON.stringify(notes));
        closeAddNotePage();
        loadNotes();
    }
}

function openViewNotePage(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortOrder = localStorage.getItem('sortOrder') || 'creationDate';

    // Сортировка заметок
    notes.sort((a, b) => {
        if (sortOrder === 'creationDate') {
            return new Date(b.date) - new Date(a.date); // От новых к старым
        } else if (sortOrder === 'modificationDate') {
            return new Date(b.date) - new Date(a.date); // От новых к старым
        }
    });

    if (index >= 0 && index < notes.length) {
        document.getElementById('viewNoteTitle').value = notes[index].title;
        document.getElementById('viewNoteContent').value = notes[index].content;
        document.getElementById('viewNotePage').setAttribute('data-index', index);
        document.getElementById('mainContainer').style.display = 'none';
        document.getElementById('viewNotePage').style.display = 'flex';
    }
}

function closeViewNotePage() {
    document.getElementById('mainContainer').style.display = 'flex';
    document.getElementById('viewNotePage').style.display = 'none';
}

function updateNote() {
    const index = parseInt(document.getElementById('viewNotePage').getAttribute('data-index'), 10);
    const title = document.getElementById('viewNoteTitle').value;
    const content = document.getElementById('viewNoteContent').value;
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (index >= 0 && index < notes.length) {
        notes[index] = { title, content, date: notes[index].date };
        localStorage.setItem('notes', JSON.stringify(notes));
        closeViewNotePage();
        loadNotes();
    }
}

function deleteNote() {
    const index = parseInt(document.getElementById('viewNotePage').getAttribute('data-index'), 10);
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (index >= 0 && index < notes.length) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        closeViewNotePage();
        loadNotes();
    }
}

function loadNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const sortOrder = localStorage.getItem('sortOrder') || 'creationDate';

    // Сортировка заметок
    notes.sort((a, b) => {
        if (sortOrder === 'creationDate') {
            return new Date(b.date) - new Date(a.date); // От новых к старым
        } else if (sortOrder === 'modificationDate') {
            return new Date(b.date) - new Date(a.date); // От новых к старым
        }
    });

    // Отображение отсортированных заметок
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-date">${new Date(note.date).toLocaleDateString()}</div>
        `;
        // Добавляем обработчик клика, передающий правильный индекс
        noteElement.addEventListener('click', () => openViewNotePage(index));
        notesContainer.appendChild(noteElement);
    });

    // Восстанавливаем ширину контейнера
    notesContainer.style.width = '100%';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    saveTheme();
}

function saveTheme() {
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').checked = true;
    }
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    document.body.style.fontSize = fontSize === 'small' ? '12px' :
                                  fontSize === 'medium' ? '16px' :
                                  fontSize === 'large' ? '20px' : '24px';
    localStorage.setItem('fontSize', fontSize);
}

function loadFontSize() {
    const fontSize = localStorage.getItem('fontSize') || 'medium';
    document.getElementById('fontSize').value = fontSize;
    document.body.style.fontSize = fontSize === 'small' ? '12px' :
                                  fontSize === 'medium' ? '16px' :
                                  fontSize === 'large' ? '20px' : '24px';
}

function changeSortOrder() {
    const sortOrder = document.getElementById('sortOrder').value;
    localStorage.setItem('sortOrder', sortOrder);
    loadNotes(); // Обновляем заметки в соответствии с новым порядком сортировки
}

function loadSortOrder() {
    const sortOrder = localStorage.getItem('sortOrder') || 'creationDate';
    document.getElementById('sortOrder').value = sortOrder;
}
