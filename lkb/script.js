// === 1. Получаем данные из knowledge.js ===
let knowledgeBase = [];
let filteredData = [];
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// === 2. Загрузка данных с синхронизацией ===
function initKnowledgeBase() {
  // Сначала загружаем из knowledge.js
  if (Array.isArray(window.knowledgeData)) {
    knowledgeBase = [...window.knowledgeData];
    console.log('[INFO] Загружено из knowledge.js:', knowledgeBase.length, 'записей');
  } else {
    console.warn('[WARN] knowledge.js не загружен или пуст');
    knowledgeBase = [];
  }

  // Потом синхронизируем с localStorage
  loadFromStorage();

  // Сортируем по id (новые — сверху)
  sortByIdDesc();

  console.log('[INFO] Итоговая база:', knowledgeBase.length, 'записей');
}

// === 3. Загрузка из localStorage с синхронизацией ===
function loadFromStorage() {
  try {
    const saved = localStorage.getItem('linux-kb-data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Получаем ID из knowledge.js (актуальные записи)
        const currentIds = new Set(knowledgeBase.map(item => item.id));
        
        // Оставляем только те записи из localStorage, которых НЕТ в knowledge.js
        // Это позволяет удалять записи из knowledge.js, и они исчезнут с сайта
        const onlyNewRecords = parsed.filter(item => !currentIds.has(item.id));
        
        // Объединяем: сначала базовые записи, потом новые
        knowledgeBase = [...knowledgeBase, ...onlyNewRecords];
        
        console.log('[INFO] Добавлено из localStorage:', onlyNewRecords.length, 'записей');
      }
    }
  } catch (e) {
    console.warn('[ERROR] Ошибка загрузки localStorage:', e);
  }
}

// === 4. Сохранение в localStorage ===
function saveToStorage() {
  try {
    localStorage.setItem('linux-kb-data', JSON.stringify(knowledgeBase));
  } catch (e) {
    console.warn('[ERROR] Не удалось сохранить в localStorage:', e);
  }
}

// === 5. Сортировка по id (новые — сверху) ===
function sortByIdDesc() {
  knowledgeBase.sort((a, b) => b.id - a.id);
}

// === 6. Поиск ===
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const suggestionsBox = document.getElementById('suggestions');

  function updateSuggestions(query) {
    if (!query.trim()) {
      suggestionsBox.classList.remove('active');
      return;
    }

    const matches = knowledgeBase
      .filter(item => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.solution.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q))
        );
      })
      .map(item => item.title)
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 8);

    suggestionsBox.innerHTML = '';
    if (matches.length > 0) {
      matches.forEach(title => {
        const li = document.createElement('li');
        li.textContent = title;
        li.addEventListener('click', () => {
          searchInput.value = title;
          suggestionsBox.classList.remove('active');
          performSearch(title.toLowerCase());
        });
        suggestionsBox.appendChild(li);
      });
      suggestionsBox.classList.add('active');
    } else {
      suggestionsBox.classList.remove('active');
    }
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    updateSuggestions(query);
    performSearch(query);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      suggestionsBox.classList.remove('active');
      performSearch(searchInput.value.toLowerCase().trim());
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.classList.remove('active');
    }
  });
}

// === 7. Основной поиск ===
function performSearch(query = '') {
  const q = query.trim().toLowerCase();

  filteredData = q === ''
    ? [...knowledgeBase]
    : knowledgeBase.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.solution.toLowerCase().includes(q) ||
          item.tags.some(tag => tag.toLowerCase().includes(q))
        );
      });

  filteredData.sort((a, b) => b.id - a.id);

  currentPage = 1;
  renderPage(currentPage);
  renderPagination();
}

// === 8. Отображение страницы ===
function renderPage(page) {
  const container = document.getElementById('knowledgeContainer');
  container.innerHTML = '';

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const items = filteredData.slice(start, end);

  if (items.length === 0) {
    const searchValue = document.getElementById('searchInput').value || '';
    container.innerHTML = `<div class="no-results">❌ Ничего не найдено по запросу "<strong>${searchValue}</strong>"</div>`;
    document.getElementById('pagination').style.display = 'none';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'kb-card';
    card.dataset.id = item.id;

    const tagsHtml = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    card.innerHTML = `
      <h2><i class="fas fa-exclamation-triangle"></i> ${item.title}</h2>
      <div class="tags">${tagsHtml}</div>
      <p>${item.content}</p>
      <pre><code>${item.solution}</code></pre>
      <button class="copy-btn" data-clipboard="${item.solution.replace(/"/g, '&quot;')}"><i class="fas fa-copy"></i> Копировать</button>
    `;

    container.appendChild(card);
  });

  // Обработчики копирования
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-clipboard');
      navigator.clipboard.writeText(text).then(() => {
        showToast('Скопировано!');
      }).catch(() => {
        showToast('Ошибка копирования');
      });
    });
  });
}

// === 9. Пагинация ===
function renderPagination() {
  const container = document.getElementById('pagination');
  container.innerHTML = '';

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  if (totalPages <= 1) {
    container.style.display = 'none';
    return;
  }
  container.style.display = 'flex';

  // Кнопка "Назад"
  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '◀ Назад';
    prevBtn.className = 'page-btn prev-btn';
    prevBtn.addEventListener('click', () => {
      currentPage--;
      renderPage(currentPage);
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    container.appendChild(prevBtn);
  }

  // Все страницы
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderPage(currentPage);
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    container.appendChild(btn);
  }

  // Кнопка "Вперёд"
  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = 'Вперёд ▶';
    nextBtn.className = 'page-btn next-btn';
    nextBtn.addEventListener('click', () => {
      currentPage++;
      renderPage(currentPage);
      renderPagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    container.appendChild(nextBtn);
  }
}

// === 10. Toast ===
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// === 11. Прилипание поиска ===
const searchSection = document.querySelector('.search-section');
const containerMain = document.querySelector('.container');
let isSticky = false;

function updateSticky() {
  const scrollTop = window.pageYOffset;
  if (scrollTop > 100 && !isSticky) {
    searchSection.classList.add('sticky-search');
    containerMain.classList.add('sticky-active');
    isSticky = true;
  } else if (scrollTop <= 100 && isSticky) {
    searchSection.classList.remove('sticky-search');
    containerMain.classList.remove('sticky-active');
    isSticky = false;
  }
}

window.addEventListener('scroll', updateSticky);
window.addEventListener('load', updateSticky);

// === 12. Кнопка "Наверх" ===
const scrollTopBtn = document.getElementById('scrollToTop');

function toggleScrollTopBtn() {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', toggleScrollTopBtn);

// === 13. Инициализация ===
function init() {
  initKnowledgeBase();
  setupSearch();
  performSearch('');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('beforeunload', saveToStorage);

// === 14. Добавление новой записи ===
window.addKnowledge = (title, content, solution, tags) => {
  const maxId = knowledgeBase.length ? Math.max(...knowledgeBase.map(i => i.id)) : 0;
  const newItem = {
    id: maxId + 1,
    title,
    content,
    solution,
    tags: Array.isArray(tags) ? tags : [tags]
  };

  knowledgeBase.unshift(newItem);
  saveToStorage();
  performSearch(document.getElementById('searchInput').value.toLowerCase().trim());

  return newItem;
};

window.knowledgeBase = knowledgeBase;