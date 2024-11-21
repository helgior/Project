import React from 'react';
import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Street {
    coordinates: [number, number][];
    houses: number[];
}

interface Streets {
    [key: string]: Street;
}

const streets: Streets = {
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

const getStreetColor = (houses: number[]): string => {
    const activeCount = houses.filter(house => house === 1).length;
    if (activeCount === 3) {
        return 'green';
    } else if (activeCount === 2) {
        return 'yellow';
    } else {
        return 'red';
    }
};

const Maps: React.FC = () => {
    return (
        <div>
            <h1>Карта села Завьялово</h1>
            <MapContainer center={[56.838, 53.367]} zoom={15} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.entries(streets).map(([streetName, streetData]) => {
                    const { coordinates, houses } = streetData;
                    const streetColor = getStreetColor(houses);
                    const inactiveCount = houses.filter(house => house === 0).length;

                    return (
                        <Polyline
                            key={streetName}
                            positions={coordinates}
                            color={streetColor}
                            weight={5}
                            eventHandlers={{
                                mouseover: (e) => {
                                    const target = e.target as any;
                                    target.setStyle({ weight: 7 });
                                },
                                mouseout: (e) => {
                                    const target = e.target as any;
                                    target.setStyle({ weight: 5 });
                                }
                            }}
                        >
                            <Popup>
                                {streetName}<br />Домов с проблемой: {inactiveCount}
                            </Popup>
                        </Polyline>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Maps;
