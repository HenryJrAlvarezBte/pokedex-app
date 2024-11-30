import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/pokedex/Search';
import Filters from '../components/pokedex/Filters';
import { useFetch } from '../hooks/useFetch';
import PokemonList from '../components/pokedex/PokemonList';
import PokemonCard from '../components/pokedex/PokemonCard';
import { useNameContext } from '../contexts/nameContext';

export function Pokedex() {
	const { data: pokemons, loading, error } = useFetch();
	const [pokemonUrl, setPokemonUrl] = useState(null);
	const [isFiltering, setIsFiltering] = useState(false);
	const [pokemonsData, setPokemonsData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [name] = useNameContext();

	const itemsPerPage = 12;
	const maxVisiblePages = 7;

	const setPokemons = (newPokemons) => {
		if (Array.isArray(newPokemons)) {
			setPokemonsData({ results: newPokemons });
		}
	};

	useEffect(() => {
		fetchAllPokemons();
	}, []);

	const fetchAllPokemons = async () => {
		try {
			const response = await fetch(
				'https://pokeapi.co/api/v2/pokemon?limit=1000',
			);
			const data = await response.json();
			setPokemonsData(data);
		} catch (error) {
			console.error('Error al obtener todos los Pokémon:', error);
		}
	};

	const handleSearch = (value) => {
		if (!value) {
			setIsFiltering(false);
			setPokemonUrl(null);
			fetchAllPokemons();
		} else {
			value = value.toLowerCase().trim();
			setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/${value}/`);
		}
	};

	const totalPages = Math.ceil(pokemonsData?.results?.length / itemsPerPage);
	const startIdx = (currentPage - 1) * itemsPerPage;
	const endIdx = startIdx + itemsPerPage;
	const currentPokemons = pokemonsData?.results?.slice(startIdx, endIdx);

	const goToPage = (page) => {
		setCurrentPage(page);
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const renderPageNumbers = () => {
		let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
		let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

		if (endPage - startPage < maxVisiblePages - 1) {
			startPage = Math.max(endPage - maxVisiblePages + 1, 1);
		}

		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<button
					key={i}
					className={`page-number ${i === currentPage ? 'active' : ''}`}
					onClick={() => goToPage(i)}
				>
					{i}
				</button>,
			);
		}

		return pages;
	};

	const handleTypeFilter = async (type) => {
		if (!type) {
			setIsFiltering(false);
			fetchAllPokemons();
		} else {
			setIsFiltering(true);
			try {
				const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
				const data = await response.json();
				console.log('Pokémon filtrados por tipo:', data.pokemon);
				setPokemonsData({ results: data.pokemon.map((poke) => poke.pokemon) });
			} catch (error) {
				console.error('Error al obtener Pokémon por tipo:', error);
			}
		}
	};

	return (
		<>
			<img
				className="pokedex-title"
				src="../../public/pokedex-title.png"
				alt="pokedex title"
			/>
			<img
				className="pokedex-bar"
				src="../../public/pokedex-bar.png"
				alt="pokedex bar"
			/>
			<div className="pokedex__header">
				<div className="welcome-message">
					<h2 className="welcome-name">Bienvenido {name},</h2>
					<p>aquí podrás encontrar tu Pokémon favorito</p>
				</div>
				<Link className="btn-volver" to="/">
					Volver
				</Link>
			</div>
			<div className="form">
				<Search handleSearch={handleSearch} />
				<Filters
					handleTypeFilter={handleTypeFilter}
					setPokemons={setPokemons}
				/>
			</div>
			{/*<div>
                <button onClick={onPrev} disabled={!pokemonsData?.previous}>
                    Anterior
                </button>
                <button onClick={onNext} disabled={!pokemonsData?.next}>
                    Siguiente
                </button>
            </div> */}
			<div className="pokemons">
				{pokemonUrl ? (
					<PokemonCard url={pokemonUrl} />
				) : (
					<PokemonList pokemons={currentPokemons} isFiltering={isFiltering} />
				)}
			</div>
			<div className="pagination">
				<button onClick={prevPage} disabled={currentPage === 1}>
					{'<'}
				</button>
				{renderPageNumbers()}
				{totalPages > maxVisiblePages && currentPage < totalPages && (
					<button onClick={nextPage}>{'>'}</button>
				)}
			</div>
		</>
	);
}

export default Pokedex;
