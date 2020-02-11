import { useEffect } from 'react';
import { useOffence } from '../context/OffenceContext';
import { filterOffence } from '../API';

const useOffences = () => {
	const { data, setData, columns, setColumns, filters } = useOffence();

	useEffect(
		() => {
			filterOffence(filters).then((result) => {
				setColumns(Object.keys(result[0]));
				setData(result);
			});
		},
		[ filters ]
	);

	return { data, columns };
};

export default useOffences;
