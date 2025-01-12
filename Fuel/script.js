// Общие сообщения
const messages = {
    fillAllFields: 'Будь ласка, заповніть всі поля',
  };
  
  // Система уведомлень
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
  
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Функции расчёта
  function calculateCost() {
    const distance = parseFloat(document.getElementById('distance').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
  
    if (!distance || !fuelPrice || !fuelConsumption) {
      showNotification(messages.fillAllFields);
      return;
    }
  
    const cost = (distance * fuelConsumption / 100) * fuelPrice;
    document.getElementById('resultCost').innerText = `Вартість поїздки: ${cost.toFixed(2)} грн`;
  }
  
  function calculateDistance() {
    const fuelAmount = parseFloat(document.getElementById('fuelAmount').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption2').value);
  
    if (!fuelAmount || !fuelConsumption) {
      showNotification(messages.fillAllFields);
      return;
    }
  
    const distance = (fuelAmount / fuelConsumption) * 100;
    document.getElementById('resultDistance').innerText = `Можлива відстань: ${distance.toFixed(2)} км`;
  }
  
  function calculateFuelConsumption() {
    const distance = parseFloat(document.getElementById('distance2').value);
    const fuelAmount = parseFloat(document.getElementById('fuelAmount2').value);
  
    if (!distance || !fuelAmount) {
      showNotification(messages.fillAllFields);
      return;
    }
  
    const consumption = (fuelAmount / distance) * 100;
    document.getElementById('resultFuelConsumption').innerText = `Витрата пального: ${consumption.toFixed(2)} л/100 км`;
  }
  
  // Инициализация активного индикатора при загрузке
  document.addEventListener('DOMContentLoaded', () => {
    updateIndicators();
  });
  