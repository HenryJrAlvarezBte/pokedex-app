import { useState, useEffect } from 'react';
import { tipos } from './PokemonCard';

const Filters = ({ setPokemons }) => {
	const [types, setTypes] = useState([]);
	const [selectedType, setSelectedType] = useState('');

	useEffect(() => {
		const getTypes = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/type');
				const data = await response.json();
				setTypes(data.results);
			} catch (error) {
				console.error('Error fetching types:', error);
			}
		};
		getTypes();
	}, []);

	const handleTypeFilter = async (type) => {
		try {
			if (!type) {
				const response = await fetch(
					'https://pokeapi.co/api/v2/pokemon?limit=100',
				);
				const data = await response.json();
				setPokemons(data.results);
			} else {
				const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
				const data = await response.json();
				setPokemons(data.pokemon.map((poke) => poke.pokemon));
			}
		} catch (error) {
			console.error('Error fetching Pokémon:', error);
		}
	};

	const handleFilterChange = async (event) => {
		const type = event.target.value;
		setSelectedType(type);
		handleTypeFilter(type);
	};

	return (
		<div className="filters">
			<select
				id="type-filter"
				value={selectedType}
				onChange={handleFilterChange}
			>
				<option className="filters-pokemon" value="">
					Todos los pokemon
				</option>
				{types.map((type) => (
					<option key={type.name} value={type.name}>
						{tipos[type.name] || type.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default Filters;
