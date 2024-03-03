document.addEventListener('DOMContentLoaded', function() {
    const buyItemsForm = document.getElementById('buy-items-form');
    const animalCountElements = document.querySelectorAll('.animal-count');
    let money = 5000;
    let farmLevel = 1; 

    // Mapa przechowująca informacje o produktach i ich maksymalnej liczbie
    const maxProducts = {
        'Milk': 50,
        'Bacon': 50,
        'Eggs': 50,
        'Horsehair': 50,
        'Rabbit Meat': 50,
        'Beef': 50,
        'Duck Eggs': 50,
        'Wool': 50
    };

    // Obsługa kupowania zwierząt
    buyItemsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const checkedItems = document.querySelectorAll('input[name="item"]:checked');

        checkedItems.forEach(function(item) {
            const itemName = item.value;
            const itemCost = getItemCost(itemName);

            if (money >= itemCost) {
                const animalCountElement = getAnimalCountElement(itemName);
                const currentCount = parseInt(animalCountElement.textContent);
                if (currentCount < 50) { 
                    animalCountElement.textContent = currentCount + 1;
                    money -= itemCost;
                } else {
                    alert('You already have the maximum amount of ' + itemName);
                }
            } else {
                alert('Not enough money to buy ' + itemName);
            }
        });

        updateMoneyDisplay();
    });

    // Funkcja do pobierania kosztu zwierzęcia
    function getItemCost(itemName) {
        switch (itemName) {
            case 'COW':
                return 2500;
            case 'PIG':
                return 1500;
            case 'CHICKEN':
                return 500;
            case 'HORSE':
                return 5000;
            case 'RABBIT':
                return 1000;
            case 'DUCK':
                return 1200;
            case 'BULL':
                return 3000;
            case 'GOAT':
                return 2000;
            case 'SHEEP':
                return 1800;
            default:
                return 0;
        }
    }

    // Funkcja do znalezienia elementu z liczbą zwierząt na podstawie nazwy zwierzęcia
    function getAnimalCountElement(animalName) {
        return Array.from(animalCountElements).find(function(element) {
            return element.parentNode.querySelector('img').alt.toLowerCase() === animalName.toLowerCase();
        });
    }

    // Funkcja do aktualizacji wyświetlania ilości pieniędzy
    function updateMoneyDisplay() {
        const moneyCounter = document.getElementById('money-counter');
        moneyCounter.textContent = 'MONEY: ' + money + '$';
    }

    // Funkcja do produkcji i zwiększania liczby produktów co kilka sekund
    const productionInterval = 5000; // Interwał produkcji w milisekundach
    const animalProducts = {
        'COW': 'Milk',
        'PIG': 'Bacon',
        'CHICKEN': 'Eggs',
        'HORSE': 'Horsehair',
        'RABBIT': 'Rabbit Meat',
        'DUCK': 'Duck Eggs',
        'BULL': 'Beef',
        'GOAT': 'Milk',
        'SHEEP': 'Wool'
    };

    setInterval(produceProducts, productionInterval);

    function produceProducts() {
        for (const animal in animalProducts) {
            const product = animalProducts[animal];
            const animalCountElement = getAnimalCountElement(animal);
            const productCounterElement = document.getElementById(product.toLowerCase() + '-counter');
            if (animalCountElement && productCounterElement) {
                const currentCount = parseInt(productCounterElement.textContent.split(': ')[1]); // Pobierz aktualną liczbę produktów
                const newCount = Math.min(currentCount + Math.floor(Math.random() * 6), maxProducts[product]); // Zwiększ o losową liczbę od 0 do 5, ale nie więcej niż maksymalna liczba produktów
                productCounterElement.textContent = product + ': ' + newCount;
            }
        }
    }

    // Funkcja do obsługi ulepszania poziomu farmy
    const farmLevelButton = document.getElementById('farm_lvl');
    farmLevelButton.textContent = 'FARM LVL: ' + farmLevel; // Ustawienie początkowej wartości przycisku FARM LVL

    farmLevelButton.addEventListener('click', function() {
        if (farmLevel === 1) {
            alert('Farm Level 1 upgraded!');
            farmLevel++;
            farmLevelButton.textContent = 'FARM LVL: ' + farmLevel;
        } else if (farmLevel === 2) {
            alert('Farm Level 2 upgraded!');
            farmLevel++;
            farmLevelButton.textContent = 'FARM LVL: ' + farmLevel;
        } else if (farmLevel === 3) {
            alert('Farm Level 3 upgraded!');
            farmLevel++;
            farmLevelButton.textContent = 'FARM LVL: ' + farmLevel;
        } else {
            alert('Maximum farm level reached!');
        }
    });

    // Obsługa kupowania sprzętu
    const buyEquipmentForm = document.getElementById('buy-equipment');
    buyEquipmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const checkedItems = document.querySelectorAll('#buy-equipment input[name="item"]:checked');
        checkedItems.forEach(function(item) {
            const itemName = item.value;
            const itemCost = getEquipmentCost(itemName);

            if (money >= itemCost) {
                const equipmentCell = document.querySelector('#left-main td:nth-child(3)');
                if (!checkIfItemExists(itemName, equipmentCell)) {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `<td>${itemName}</td>`;
                    equipmentCell.parentNode.appendChild(newRow);
                    money -= itemCost;
                } else {
                    alert('You already have the ' + itemName);
                }
            } else {
                alert('Not enough money to buy ' + itemName);
            }
        });

        updateMoneyDisplay();
    });

    // Funkcja do pobierania kosztu sprzętu
    function getEquipmentCost(itemName) {
        switch (itemName) {
            case 'TRACTOR':
                return 5000;
            case 'PLOW':
                return 2000;
            case 'FEEDING_TROUGH':
                return 1000;
            case 'INCUBATOR':
                return 3000;
            default:
                return 0;
        }
    }

    // Obsługa kupowania pól
    const buyFieldsForm = document.getElementById('buy-fields');
    buyFieldsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const checkedItems = document.querySelectorAll('#buy-fields input[name="item"]:checked');
        checkedItems.forEach(function(item) {
            const itemName = item.value;
            const itemCost = getFieldCost(itemName);

            if (money >= itemCost) {
                const fieldsCell = document.querySelector('#left-main td:nth-child(4)');
                if (!checkIfItemExists(itemName, fieldsCell)) {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `<td>${itemName}</td>`;
                    fieldsCell.parentNode.appendChild(newRow);
                    money -= itemCost;
                } else {
                    alert('You already have the ' + itemName);
                }
            } else {
                alert('Not enough money to buy ' + itemName);
            }
        });

        updateMoneyDisplay();
    });

    // Funkcja do pobierania kosztu pól
    function getFieldCost(itemName) {
        switch (itemName) {
            case 'WHEAT_FIELD':
                return 2000;
            case 'CORN_FIELD':
                return 1500;
            case 'PASTURE':
                return 3000;
            case 'CHICKEN_RUN':
                return 1000;
            default:
                return 0;
        }
    }

    // Obsługa kupowania pracowników
    const buyWorkersForm = document.getElementById('buy-workers');
    buyWorkersForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const checkedItems = document.querySelectorAll('#buy-workers input[name="item"]:checked');
        checkedItems.forEach(function(item) {
            const itemName = item.value;
            const itemCost = getWorkerCost(itemName);

            if (money >= itemCost) {
                const workersCell = document.querySelector('#left-main td:nth-child(5)');
                if (!checkIfItemExists(itemName, workersCell)) {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `<td>${itemName}</td>`;
                    workersCell.parentNode.appendChild(newRow);
                    money -= itemCost;
                } else {
                    alert('You already have the ' + itemName);
                }
            } else {
                alert('Not enough money to buy ' + itemName);
            }
        });

        updateMoneyDisplay();
    });

    // Funkcja do pobierania kosztu pracowników
    function getWorkerCost(itemName) {
        switch (itemName) {
            case 'FARMHAND':
                return 1000;
            case 'VETERINARIAN':
                return 2000;
            case 'SWINEHERD':
                return 1500;
            case 'POULTRY_FARMER':
                return 2500;
            default:
                return 0;
        }
    }

    // Funkcja sprawdzająca, czy dany przedmiot już istnieje w danej kategorii
    function checkIfItemExists(itemName, categoryCell) {
        const items = Array.from(categoryCell.parentNode.querySelectorAll('td'));
        return items.some(function(item) {
            return item.textContent === itemName;
        });
    }
});
