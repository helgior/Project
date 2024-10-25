// Создаем карту и устанавливаем начальные координаты и уровень масштабирования
var map = L.map('map').setView([56.838, 53.367], 14); // Уменьшили уровень масштабирования

// Добавляем слой карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Определяем улицы и дома
var streets = {
    "Садовая": {
        coordinates: [
            [56.79167789744446, 53.38284215572648],
            [56.7867964023117, 53.38284215572648],
            [56.78206373426247, 53.38266027031713]
        ],
        houses: [1, 1, 1] // Все дома активны
    },
    "Мира": {
        coordinates: [
            [56.78198900313693, 53.38247838490778],
            [56.78261807462487, 53.37623553881286],
            [56.78405740436429, 53.367957514805305]
        ],
        houses: [1, 1, 0] // Два дома активны, один неактивен
    },
    "Рябиновая": {
        coordinates: [
            [56.785253913546235, 53.37473188237868],
            [56.782869527763026, 53.37425704352548],
            [56.781083306769645, 53.37246848384508]
        ],
        houses: [0, 0, 0] // Все дома неактивны
    }
};

// Добавляем улицы на карту
for (var streetName in streets) {
    var streetData = streets[streetName];
    var streetCoordinates = streetData.coordinates;
    var houses = streetData.houses;

    // Определяем цвет улицы
    var activeCount = houses.filter(house => house === 1).length;
    var inactiveCount = houses.filter(house => house === 0).length; // Количество неактивных домов
    var streetColor;

    if (activeCount === 3) {
        streetColor = 'green'; // Все дома активны
    } else if (activeCount === 2) {
        streetColor = 'yellow'; // Два дома активны
    } else {
        streetColor = 'red'; // Менее двух активных домов
    }

    // Создаем линию улицы на карте
    var streetLine = L.polyline(streetCoordinates, {color: streetColor, weight: 5}).addTo(map);
    streetLine.bindPopup(`${streetName}<br>Домов с проблемой: ${inactiveCount}`); // Название улицы и количество неактивных домов

    // Добавляем обработчики событий для изменения толщины улицы
    streetLine.on('mouseover', function(e) {
        this.setStyle({ weight: 7 }); // Увеличиваем толщину
    });

    streetLine.on('mouseout', function(e) {
        this.setStyle({ weight: 5 }); // Возвращаем исходную толщину
    });
}

// Центрируем карту по всем улицам
var allCoordinates = [].concat(...Object.values(streets).map(street => street.coordinates));
var bounds = L.latLngBounds(allCoordinates);
map.fitBounds(bounds);
