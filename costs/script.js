// Состояние приложения
let expenses = JSON.parse(localStorage.getItem('expenses')) || {};
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// DOM элементы
const menuButton = document.querySelector('.menu-button');
const menuOverlay = document.querySelector('.menu-overlay');
const sideMenu = document.querySelector('.side-menu');
const modal = document.getElementById('expenseModal');
const addButton = document.getElementById('addExpense');
const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');
const expensesList = document.getElementById('expensesList');
const totalAmount = document.getElementById('totalAmount');

// Создание модального окна подтверждения
const confirmationModal = document.createElement('div');
confirmationModal.className = 'modal';
confirmationModal.id = 'confirmationModal';
confirmationModal.innerHTML = `
    <div class="modal-content">
        <h2>Підтвердження</h2>
        <p>Ви впевнені, що хочете видалити цей запис?</p>
        <div class="modal-buttons">
            <button class="cancel-button">Скасувати</button>
            <button class="save-button">Видалити</button>
        </div>
    </div>
`;
document.querySelector('.app').appendChild(confirmationModal);

// Функция для отображения модального окна подтверждения
function showConfirmationModal(onConfirm) {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
    
    const cancelBtn = modal.querySelector('.cancel-button');
    const confirmBtn = modal.querySelector('.save-button');
    
    const closeModal = () => {
        modal.style.display = 'none';
        cancelBtn.removeEventListener('click', handleCancel);
        confirmBtn.removeEventListener('click', handleConfirm);
    };
    
    const handleCancel = () => closeModal();
    const handleConfirm = () => {
        onConfirm();
        closeModal();
    };
    
    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
}

// Инициализация
function init() {
    populateDateSelectors();
    updateExpensesList();
    setupEventListeners();
}

// Заполнение селекторов даты
function populateDateSelectors() {
    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 
                   'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    
    monthSelect.innerHTML = '';
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        const hasExpenses = expenses[`${yearSelect.value || currentYear}-${index}`]?.length > 0;
        if (hasExpenses) {
            option.classList.add('has-expenses');
        }
        monthSelect.appendChild(option);
    });

    // Собираем все уникальные годы
    const years = new Set();
    Object.keys(expenses).forEach(key => {
        const year = key.split('-')[0];
        years.add(year);
    });

    // Заполняем селектор годов
    yearSelect.innerHTML = '';
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    // Добавляем текущий год, если его нет
    if (!years.has(currentYear.toString())) {
        const option = document.createElement('option');
        option.value = currentYear;
        option.textContent = currentYear;
        yearSelect.appendChild(option);
    }

    // Устанавливаем текущий месяц и год
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
}

// Обновление списка расходов
function updateExpensesList() {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);
    const key = `${year}-${month}`;
    const monthExpenses = expenses[key] || [];
    
    expensesList.innerHTML = '';
    let total = 0;

    monthExpenses.forEach((expense, index) => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'expense-item';
        expenseElement.innerHTML = `
            <div class="expense-content">
                <div class="expense-name">${expense.name}</div>
                <div class="expense-details">
                    <span class="expense-date">${new Date(expense.date).toLocaleDateString('uk-UA')}</span>
                    <span class="expense-amount">${expense.amount} грн</span>
                </div>
            </div>
            <button class="delete-button">
                <i class="fas fa-trash"></i>
            </button>
        `;

        expenseElement.querySelector('.delete-button').addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmationModal(() => {
                const key = `${year}-${month}`;
                expenses[key].splice(index, 1);
                
                if (expenses[key].length === 0) {
                    delete expenses[key];
                    monthSelect.options[month].classList.remove('has-expenses');
                }
                
                localStorage.setItem('expenses', JSON.stringify(expenses));
                updateExpensesList();
            });
        });

        expensesList.appendChild(expenseElement);
        total += parseFloat(expense.amount);
    });

    totalAmount.textContent = total.toFixed(2);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Меню
    menuButton.addEventListener('click', () => {
        menuOverlay.style.display = 'block';
        sideMenu.style.left = '0';
    });

    menuOverlay.addEventListener('click', () => {
        menuOverlay.style.display = 'none';
        sideMenu.style.left = '-280px';
    });

    // Выбор даты
    monthSelect.addEventListener('change', updateExpensesList);
    yearSelect.addEventListener('change', () => {
        const options = monthSelect.querySelectorAll('option');
        options.forEach((option, index) => {
            const hasExpenses = expenses[`${yearSelect.value}-${index}`]?.length > 0;
            option.classList.toggle('has-expenses', hasExpenses);
        });
        updateExpensesList();
    });

    // Добавление расхода
    addButton.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.paddingBottom = `${modal.offsetHeight}px`; // Поднимаем контент, чтобы не перекрывалась клавиатурой
    });

    // Модальное окно
    modal.querySelector('.cancel-button').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.paddingBottom = '0'; // Убираем отступ при закрытии окна
    });

    modal.querySelector('.save-button').addEventListener('click', () => {
        const name = document.getElementById('expenseName').value;
        const amount = document.getElementById('expenseAmount').value;
        
        if (name && amount) {
            addExpense(name, amount);
            modal.style.display = 'none';
            document.body.style.paddingBottom = '0'; // Убираем отступ
            document.getElementById('expenseName').value = '';
            document.getElementById('expenseAmount').value = '';
        }
    });

    // Бэкап
    document.getElementById('createBackup').addEventListener('click', createBackup);
    
    document.getElementById('importBackup').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });
    
    document.getElementById('fileInput').addEventListener('change', (e) => {
        if (e.target.files[0]) {
            importBackup(e.target.files[0]);
        }
    });
}

// Добавление нового расхода
function addExpense(name, amount) {
    const month = currentMonth; // Используем текущий месяц
    const year = currentYear; // Используем текущий год
    const key = `${year}-${month}`;
    
    if (!expenses[key]) {
        expenses[key] = [];
    }

    // Добавление в начало массива, чтобы новая запись была сверху
    expenses[key].unshift({
        name,
        amount: parseFloat(amount),
        date: new Date().toISOString()
    });

    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Обновляем подсветку месяца
    const options = monthSelect.querySelectorAll('option');
    options[month].classList.add('has-expenses');
    
    // Перенаправляем на текущий месяц и год
    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    
    updateExpensesList();
}

// Создание бэкапа
function createBackup() {
    const wb = XLSX.utils.book_new();
    const wsData = [];

    wsData.push(['Дата', 'Название', 'Сумма']);

    Object.entries(expenses).forEach(([key, monthExpenses]) => {
        monthExpenses.forEach(expense => {
            wsData.push([
                new Date(expense.date).toLocaleDateString('ru-RU'),
                expense.name,
                expense.amount
            ]);
        });
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Расходы');
    XLSX.writeFile(wb, `expenses_backup_${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Импорт бэкапа
function importBackup(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'}); 
        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        expenses = {};
        jsonData.forEach(row => {
            let dateStr = row['Дата'];
            let date;

            // Преобразуем дату из формата DD.MM.YYYY в YYYY-MM-DD
            const dateParts = dateStr.split('.');
            if (dateParts.length === 3) {
                const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                date = new Date(formattedDate);
            } else {
                console.error('Invalid date format:', dateStr);
                return;
            }

            const yearMonth = `${date.getFullYear()}-${date.getMonth()}`;
            if (!expenses[yearMonth]) {
                expenses[yearMonth] = [];
            }
            expenses[yearMonth].push({
                name: row['Название'],
                amount: parseFloat(row['Сумма']),
                date: date.toISOString()
            });
        });

        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateExpensesList();
    };
    
    reader.readAsArrayBuffer(file);
}

// Запуск приложения
init();
