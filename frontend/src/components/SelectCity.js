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
        marginBottom: "20px",
    }),
    menu: (base) => ({
        ...base,
        width: '100%',        // растягивает меню до ширины селекта
        minWidth: '100%',     // особенно важно для ширины
    }),
};

const SelectCity = ({placeholder}) => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    // 1. Уникальные области
    const regionOptions = Array.from(
        new Set(npData.map((entry) => entry.region))
    ).map((region) => ({
        value: region,
        label: region,
    }));

    // 2. Города по выбранной области
    const cityOptions = selectedRegion
        ? Array.from(
            new Set(
                npData
                    .filter((entry) => entry.region === selectedRegion.value)
                    .map((entry) => entry.city)
            )
        ).map((city) => ({
            value: city,
            label: city,
        }))
        : [];

    // 3. Отделения по выбранному городу
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
                options={regionOptions}
                placeholder="ОБЛАСТЬ"
                styles={customStyles}
                onChange={(option) => {
                    setSelectedRegion(option);
                    setSelectedCity(null);
                    setSelectedWarehouse(null);
                }}
                value={selectedRegion}
                isSearchable
            />
            <div className="name_input">
                МІСТО
            </div>

            <Select
                options={cityOptions}
                placeholder="МІСТО"
                styles={customStyles}
                onChange={(option) => {
                    setSelectedCity(option);
                    setSelectedWarehouse(null);
                }}
                value={selectedCity}
                isDisabled={!selectedRegion}
                isSearchable
            />
            <div className="name_input">
                відділення
            </div>

            <Select
                options={warehouseOptions}
                placeholder="ВІДДІЛЕННЯ"
                styles={customStyles}
                onChange={setSelectedWarehouse}
                value={selectedWarehouse}
                isDisabled={!selectedCity}
                isSearchable
            />
        </div>
    );
};

export default SelectCity;