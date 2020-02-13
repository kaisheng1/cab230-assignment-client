import { useState, useEffect } from 'react';
import { useOffence } from '../context/OffenceContext';
import { filterOffence } from '../API';

const useOffences = () => {
	const { data, setData, columns, setColumns, filters } = useOffence();
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	useEffect(
		() => {
			setLoading(true);
			setError(null);
			filterOffence(filters)
				.then((result) => {
					setColumns(Object.keys(result[0]));
					setData(result);
				})
				.catch((err) => setError(err))
				.finally(() => setLoading(false));
		},
		[ filters ]
	);

	return { data, columns, filters, loading, error };
};

export default useOffences;
