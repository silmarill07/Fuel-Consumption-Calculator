// Конфигурация приложения
const CONFIG = {
    MIN_LINKS: 1,
    MAX_LINKS: 100,
    DELAY_BETWEEN_DOWNLOADS: 1000 // Задержка между скачиваниями в миллисекундах (3 секунды)
};

// DOM-элементы
const DOM = {
    linksInput: document.getElementById('links-input'),
    parseBtn: document.getElementById('parse-btn'),
    downloadBtn: document.getElementById('download-btn'),
    linksContainer: document.getElementById('links-container'),
    linksCount: document.getElementById('links-count'),
    loadingOverlay: document.getElementById('loading-overlay'),
    loadingText: document.getElementById('loading-text')
};

// Состояние приложения
const STATE = {
    parsedLinks: [],
    isLoading: false
};

// Функция для отображения уведомлений
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = 'notification ' + (isError ? 'error' : 'success');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Функция для проверки валидности URL
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Функция для анализа ссылок
async function parseLinks() {
    try {
        const text = DOM.linksInput.value.trim();
        if (!text) {
            showNotification('Введіть посилання для аналізу', true);
            return;
        }
        
        // Разбиваем текст на строки и фильтруем пустые
        const links = text.split('\n')
            .map(link => link.trim())
            .filter(link => link.length > 0);
        
        if (links.length === 0) {
            showNotification('Введіть хоча б одне посилання', true);
            return;
        }
        
        if (links.length > CONFIG.MAX_LINKS) {
            showNotification(`Забагато посилань. Максимум: ${CONFIG.MAX_LINKS}`, true);
            return;
        }
        
        // Показываем индикатор загрузки
        setLoading(true, 'Аналіз посилань...');
        
        // Проверяем каждую ссылку
        const validLinks = links.filter(link => {
            if (!link.startsWith('http://') && !link.startsWith('https://')) {
                return false;
            }
            return isValidUrl(link);
        });
        
        if (validLinks.length === 0) {
            showNotification('Не знайдено валідних посилань', true);
            return;
        }
        
        STATE.parsedLinks = validLinks;
        updateLinksList(validLinks);
        DOM.linksCount.textContent = validLinks.length;
        DOM.downloadBtn.disabled = false;
        
        showNotification(`Успішно знайдено ${validLinks.length} посилань`);
    } catch (error) {
        console.error('Помилка при аналізі посилань:', error);
        showNotification('Сталася помилка при аналізі посилань', true);
    } finally {
        setLoading(false);
    }
}

// Функция для обновления списка ссылок в UI
function updateLinksList(links) {
    DOM.linksContainer.innerHTML = '';
    
    if (links.length === 0) {
        DOM.linksContainer.innerHTML = '<p class="no-links">Нет обнаруженных ссылок</p>';
        return;
    }
    
    links.forEach((link, index) => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-item';
        
        const linkNumber = document.createElement('span');
        linkNumber.className = 'link-number';
        linkNumber.textContent = index + 1;
        
        const linkText = document.createElement('span');
        linkText.className = 'link-text';
        linkText.textContent = link;
        linkText.title = link;
        
        linkElement.appendChild(linkNumber);
        linkElement.appendChild(linkText);
        DOM.linksContainer.appendChild(linkElement);
    });
}

// Функция для открытия ссылки в новой вкладке
function openLinkInNewTab(url) {
    const newWindow = window.open(url, '_blank');
    return newWindow !== null;
}

// Функция для задержки
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция для создания скрытого iframe
function createHiddenIframe() {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    return iframe;
}

// Функция для скачивания файла через iframe
async function downloadFile(url, index) {
    return new Promise((resolve) => {
        const iframe = createHiddenIframe();
        
        // Устанавливаем таймаут для удаления iframe
        setTimeout(() => {
            document.body.removeChild(iframe);
            resolve(true);
        }, 5000); // 5 секунд на скачивание
        
        // Загружаем файл в iframe
        iframe.src = url;
    });
}

// Функция для создания ZIP-архива
async function createZipArchive(files) {
    const zip = new JSZip();
    
    files.forEach(file => {
        if (file.success) {
            zip.file(file.filename, file.blob);
        }
    });
    
    const content = await zip.generateAsync({type: "blob"});
    return content;
}

// Функция для скачивания всех файлов
async function downloadAllFiles() {
    if (STATE.parsedLinks.length === 0) {
        showNotification('Немає посилань для завантаження', true);
        return;
    }
    
    setLoading(true, 'Відкриття посилань...');
    
    let openedCount = 0;
    let failedCount = 0;
    
    for (let i = 0; i < STATE.parsedLinks.length; i++) {
        const url = STATE.parsedLinks[i];
        DOM.loadingText.textContent = `Відкриття посилання ${i + 1}/${STATE.parsedLinks.length}...`;
        
        try {
            const success = openLinkInNewTab(url);
            if (success) {
                openedCount++;
            } else {
                failedCount++;
            }
        } catch (error) {
            console.error(`Помилка при відкритті ${url}:`, error);
            failedCount++;
        }
        
        // Задержка между открытиями (настраивается в CONFIG.DELAY_BETWEEN_DOWNLOADS)
        await delay(CONFIG.DELAY_BETWEEN_DOWNLOADS);
    }
    
    setLoading(false);
    showNotification(`Відкрито ${openedCount} посилань. Помилок: ${failedCount}`);
}

// Функция для управления состоянием загрузки
function setLoading(isLoading, text = 'Загрузка...') {
    STATE.isLoading = isLoading;
    DOM.loadingOverlay.style.display = isLoading ? 'flex' : 'none';
    DOM.loadingText.textContent = text;
}

// Инициализация приложения
function init() {
    // Настраиваем обработчики событий
    DOM.parseBtn.addEventListener('click', parseLinks);
    DOM.downloadBtn.addEventListener('click', downloadAllFiles);
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', init);