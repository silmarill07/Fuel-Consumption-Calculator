let notes = [];
let currentNoteIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

function openAddNotePage() {
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("addNotePage").style.display = "flex";
    document.getElementById("viewNotePage").style.display = "none";
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
    currentNoteIndex = null; // Сбрасываем индекс текущей заметки при добавлении новой
}

function saveNote() {
    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();
    if (title || content) {
        const date = new Date().toISOString();
        let noteTitle = title || "Без названия";
        
        // Проверка на уникальность заголовка
        if (currentNoteIndex !== null) {
            notes[currentNoteIndex] = { title: noteTitle, content, date };
        } else {
            // Проверка на наличие заметок с заголовком "Без названия"
            let index = 1;
            while (notes.some(note => note.title === noteTitle)) {
                noteTitle = `Без названия ${index++}`;
            }
            notes.unshift({ title: noteTitle, content, date });
        }
        saveNotes();
    }
}

function closeAddNotePage() {
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("addNotePage").style.display = "none";
    loadNotes(); // Обновляем список заметок при закрытии
}

function openViewNotePage(index) {
    currentNoteIndex = index;
    const note = notes[index];
    document.getElementById("viewNoteTitle").value = note.title;
    document.getElementById("viewNoteContent").value = note.content;
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("addNotePage").style.display = "none";
    document.getElementById("viewNotePage").style.display = "flex";
}

function closeViewNote() {
    document.getElementById("mainContainer").style.display = "block";
    document.getElementById("addNotePage").style.display = "none";
    document.getElementById("viewNotePage").style.display = "none";
}

function deleteNote() {
    if (currentNoteIndex !== null) {
        notes.splice(currentNoteIndex, 1);
        saveNotes();
        loadNotes();
        closeViewNote();
    }
}

function updateNote() {
    const title = document.getElementById("viewNoteTitle").value.trim();
    const content = document.getElementById("viewNoteContent").value.trim();
    if (currentNoteIndex !== null && (title || content)) {
        notes[currentNoteIndex] = { title, content, date: notes[currentNoteIndex].date };
        saveNotes();
        loadNotes();
    }
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const notesData = localStorage.getItem("notes");
    if (notesData) {
        notes = JSON.parse(notesData);
    }
    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.innerHTML = `
            <div class="note-title">${note.title || "Без названия"}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-date">${new Date(note.date).toLocaleString()}</div>
        `;
        noteElement.onclick = () => openViewNotePage(index);
        notesContainer.appendChild(noteElement);
    });
}
