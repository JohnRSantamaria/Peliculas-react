import { useEffect, useRef, useState } from 'react';

export function useSearch() {
	const [search, updateSearch] = useState('');
	const [error, setError] = useState();
	const isFistInput = useRef(true);

	useEffect(() => {
		if (isFistInput.current) {
			isFistInput.current = search === '';
			return;
		}
		if (search === '') {
			setError('No se puede buscar una pelicula vacia');
			return;
		}
		if (search?.length < 3) {
			setError('La busqueda debe tener almenos 3 caracteres ');
			return;
		}
		setError(null);
	}, [search]);

	return { search, updateSearch, error };
}
