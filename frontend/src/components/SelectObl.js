import React, { useState } from "react";
import Select from "react-select";
import npData from "../np.json";

const customStyles = {
    control: (base) => ({
        ...base,
        borderRadius: "90px",
        border: "1px solid black",
        padding: "6px 10px",
        fontSize: "16px",
    }),
};

const CityWarehouseSelect = ({placeholder}) => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    // Получаем список уникальных городов
    const uniqueCities = Array.from(
        new Set(npData.map((entry) => entry.city))
    ).map((city) => ({
        value: city,
        label: city,
    }));

    // Получаем отделения только для выбранного города
    const warehouseOptions = selectedCity
        ? npData
            .filter((entry) => entry.city === selectedCity.value)
            .map((entry) => ({
                value: entry.warehouse_number,
                label: entry.warehouse,
            }))
        : [];

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Select
                options={uniqueCities}
                placeholder="Оберіть місто"
                styles={customStyles}
                onChange={(option) => {
                    setSelectedCity(option);
                    setSelectedWarehouse(null);
                }}
                isSearchable
            />

            {selectedCity && (
                <Select
                    options={warehouseOptions}
                    placeholder="Оберіть відділення"
                    styles={customStyles}
                    onChange={setSelectedWarehouse}
                    value={selectedWarehouse}
                    isSearchable
                />
            )}
        </div>
    );
};

export default CityWarehouseSelect;