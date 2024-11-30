import React, { Fragment, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import '../../index.css';

export const tipos = {
	normal: 'normal',
	fighting: 'luchador',
	flying: 'volador',
	poison: 'veneno',
	ground: 'tierra',
	rock: 'roca',
	bug: 'bicho',
	ghost: 'fantasma',
	steel: 'acero',
	fire: 'fuego',
	water: 'agua',
	grass: 'planta',
	electric: 'eléctrico',
	psychic: 'psíquico',
	ice: 'hielo',
	dragon: 'dragón',
	dark: 'siniestro',
	fairy: 'hada',
	stellar: 'estelar',
	unknown: 'desconocido',
	shadow: 'sombra',
};

function PokemonCard({ url }) {
	const { data: pokemon, loading, error } = useFetch(url);

	if (loading) return <p>Cargando...</p>;
	if (error)
		return (
			<p>
				Error: No existe el pokemon o ingreselo de manera correcta.
				<br /> {error}
			</p>
		);
	if (!pokemon) return <p>Pokemon no encontrado.</p>;

	const types = pokemon?.types?.map((type) => type.type.name) || [];

	return (
		<Link to={`/pokedex/${pokemon?.name}`}>
			<div className={`pokemons__card ${types[0] ? `type--${types[0]}` : ''}`}>
				<div className="pokemons__card-header">
					<img
						className="pokemons__card_image"
						src={pokemon?.sprites?.other?.dream_world?.front_default || ''}
						alt={pokemon?.name || 'Pokemon'}
					/>
				</div>
				<div>
					<h2>{pokemon?.name}</h2>
					<span>
						{types.length > 0 ? (
							types.map((type, index) => (
								<Fragment key={type}>
									{index > 0 && ' / '}
									<span>{tipos[type]}</span>
								</Fragment>
							))
						) : (
							<span>Desconocido</span>
						)}
					</span>
					<p>Tipo</p>
				</div>
				<div className="stats__container">
					<div className="stats__line">
						<div className="hp__info">
							<span>HP</span>
							<span className="stats__hp">
								{pokemon?.stats?.[0]?.base_stat || 'N/A'}{' '}
							</span>
						</div>
						<div className="attack__info">
							<span>Ataque</span>
							<span className="stats__attack">
								{pokemon?.stats?.[1]?.base_stat || 'N/A'}{' '}
							</span>
						</div>
					</div>
					<div className="stats__line">
						<div className="defense__info">
							<span>Defensa</span>
							<span className="stats__defense">
								{pokemon?.stats?.[2]?.base_stat || 'N/A'}{' '}
							</span>
						</div>
						<div className="velocity__info">
							<span>Velocidad</span>
							<span className="stats__velocity">
								{pokemon?.stats?.[5]?.base_stat || 'N/A'}{' '}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default PokemonCard;
