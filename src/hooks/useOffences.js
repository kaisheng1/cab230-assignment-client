import { useState, useEffect } from 'react';
import { filterOffence } from '../API';

const initialFilters = {
	offence: 'Arson'
};

const useOffences = () => {
	const [ filters, setFilters ] = useState(initialFilters);
	const [ data, setData ] = useState([]);
	const [ columns, setColumns ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	const actions = {
		searchOffence: (offence) => {
			setFilters({ ...filters, offence });
		},
		filterResult: (inputs) => {
			const inputsMap = inputs.reduce((acc, curr) => {
				const key = Object.keys(curr)[0];
				const oldArray = acc[key] || [];
				const newArray = [ ...oldArray, curr[key] ];
				return { ...acc, [key]: newArray };
			}, {});
			setFilters({ offence: filters.offence, ...inputsMap });
		},
		resetFilters: () => {
			setFilters(initialFilters);
		}
	};

	useEffect(
		() => {
			setLoading(true);
			setError(null);
			filterOffence(filters)
				.then((result) => {
					setColumns(Object.keys(result[0]));
					setData(result);
				})
				.catch((err) => setError(err.message))
				.finally(() => setLoading(false));
		},
		[ filters ]
	);

	return { data, columns, filters, loading, error, actions };
};

export default useOffences;
