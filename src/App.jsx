import './App.css';
import { useMovies } from './hook/useMovies';
import { Movies } from './components/Movies';
import { useSearch } from './hook/useSearch';
import { useCallback, useState } from 'react';
import debounce from 'just-debounce-it';

const App = () => {
	const [sort, setSort] = useState(false);

	const { error, search, updateSearch } = useSearch();
	const { movies, getMovies, loading } = useMovies({ search, sort });

	const debounceGetMovies = useCallback(
		debounce((search) => {
			console.log('search', search);
			getMovies({ search });
		}, 500),
		[getMovies]
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		getMovies({ search });
	};

	const handleSort = () => {
		setSort(!sort);
	};

	const handleChange = (event) => {
		const newSearch = event.target.value;
		if (newSearch.startsWith(' ')) return;
		updateSearch(event.target.value);
		//usar un debounce → just aungus debounce
		debounceGetMovies(newSearch);
	};

	return (
		<div className='page'>
			<header>
				<h1>Buscador de peliculas</h1>
				<form className='form' onSubmit={handleSubmit}>
					<input
						onChange={handleChange}
						value={search}
						name='query'
						placeholder='Avengers, Star Wars...'
					/>
					<input type='checkbox' name='checkbox' onChange={handleSort} checked={sort} />
					<button type='submit'>Buscar</button>
				</form>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</header>
			<main>
				{loading || <p>Cargando... </p>}
				<Movies movies={movies} />
			</main>
		</div>
	);
};

export default App;
