// Показать нужный раздел на основе выбора в выпадающем меню
function showCalculation() {
    const calculationType = document.getElementById("calculationType").value;
    document.getElementById("fuelConsumptionSection").classList.add("hidden");
    document.getElementById("tripCostSection").classList.add("hidden");
    document.getElementById("distanceSection").classList.add("hidden");

    if (calculationType === "fuelConsumption") {
        document.getElementById("fuelConsumptionSection").classList.remove("hidden");
    } else if (calculationType === "tripCost") {
        document.getElementById("tripCostSection").classList.remove("hidden");
    } else if (calculationType === "distance") {
        document.getElementById("distanceSection").classList.remove("hidden");
    }
}

// Расчет расхода топлива на 100 км
function calculateFuelConsumption() {
    const distance = parseFloat(document.getElementById("distance1").value);
    const fuelUsed = parseFloat(document.getElementById("fuelUsed1").value);
    if (distance > 0 && fuelUsed > 0) {
        const fuelConsumption = (fuelUsed / distance) * 100;
        document.getElementById("fuelConsumptionResult").innerText = `Расход топлива: ${fuelConsumption.toFixed(2)} л/100 км`;
    } else {
        document.getElementById("fuelConsumptionResult").innerText = "Введите корректные данные";
    }
}

// Расчет стоимости поездки
function calculateTripCost() {
    const distance = parseFloat(document.getElementById("distance2").value);
    const fuelPer100km = parseFloat(document.getElementById("fuelPer100km").value);
    const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);
    if (distance > 0 && fuelPer100km > 0 && fuelPrice > 0) {
        const tripCost = (distance / 100) * fuelPer100km * fuelPrice;
        document.getElementById("tripCostResult").innerText = `Стоимость поездки: ${tripCost.toFixed(2)} грн`;
    } else {
        document.getElementById("tripCostResult").innerText = "Введите корректные данные";
    }
}

// Расчет пройденного расстояния по количеству топлива
function calculateDistance() {
    const availableFuel = parseFloat(document.getElementById("availableFuel").value);
    const fuelPer100km = parseFloat(document.getElementById("fuelPer100km2").value);
    if (availableFuel > 0 && fuelPer100km > 0) {
        const distance = (availableFuel / fuelPer100km) * 100;
        document.getElementById("distanceResult").innerText = `Возможное расстояние: ${distance.toFixed(2)} км`;
    } else {
        document.getElementById("distanceResult").innerText = "Введите корректные данные";
    }
}

// Инициализация отображения по умолчанию
showCalculation();
