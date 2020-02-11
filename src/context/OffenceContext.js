import React, { createContext, useState, useContext } from 'react';

export const OffenceContext = createContext();

export const useOffence = () => useContext(OffenceContext);

export const OffenceProvider = ({ children }) => {
	const [ filters, setFilters ] = useState({
		offence: 'Advertising Prostitution'
	});
	const [ data, setData ] = useState([]);
	const [ columns, setColumns ] = useState([]);

	const searchOffence = (offence) => {
		setFilters({ ...filters, offence });
	};

	const filterResult = (inputs) => {
		const inputsMap = inputs.reduce((acc, curr) => {
			const key = Object.keys(curr)[0];
			const oldArray = acc[key] || [];
			const newArray = [ ...oldArray, curr[key] ];
			return { ...acc, [key]: newArray };
		}, {});
		setFilters({ offence: filters.offence, ...inputsMap });
	};

	return (
		<OffenceContext.Provider value={{ data, columns, filters, setData, setColumns, searchOffence, filterResult }}>
			{children}
		</OffenceContext.Provider>
	);
};
