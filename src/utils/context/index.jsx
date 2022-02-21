import React, { useState, useEffect, createContext } from 'react';
import { v4 as uuid } from 'uuid';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const getLocalStorage = () => {
        let datas = localStorage.getItem('data');
        if(datas) {
            return (
                datas = JSON.parse(localStorage.getItem('data')))
        } else {
            return [];
        }
    }

    const [datas, setData] = useState(getLocalStorage());


    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(datas));
        localStorage.setItem('id', uuid());
    },[datas])

    return (
        <DataContext.Provider value={{ datas, setData }}>
            {children}
        </DataContext.Provider>
    )
}
