import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import '../index.css';

export function Details() {
	const params = useParams();
	const {
		data: pokemon,
		loading,
		error,
	} = useFetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
	useEffect(() => {
		if (params.name) {
		}
	}, [params.name]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<img
				className="pokedex-title-details"
				src="/pokedex-title.png"
				alt="pokedex title"
			/>
			<img
				className="pokedex-bar-details"
				src="/pokedex-bar.png"
				alt="pokedex bar"
			/>
			<div className="pokemon-details-info">
				<Link className="btn-volver-details" to="/pokedex">
					{'←'} Volver
				</Link>
				<div>
					<img
						src={pokemon?.sprites?.other?.dream_world?.front_default}
						alt={pokemon?.name}
					/>
				</div>
				<div>
					<span className="pokemon-id">
						#{pokemon?.id.toString().padStart(3, '0')}
					</span>
					<h2>{pokemon?.name}</h2>
					<div className="pokemon-stats">
						<div className="pokemon-stat">
							<span>Peso</span>
							<div className="pokemon-weight">{pokemon?.weight}</div>
						</div>
						<div className="pokemon-stat">
							<span>Altura</span>
							<div className="pokemon-height">{pokemon?.height}</div>
						</div>
					</div>

					<div className="pokemon-extra-stats">
						<div className="pokemon-extra-stat">
							<h3 className="pokemon-type">Tipo</h3>
							<div className="types-container">
								{pokemon?.types?.map((type) => (
									<span key={type.type.name} className="pokemon-type-box">
										{type.type.name}
									</span>
								))}
							</div>
							<div className="pokemon-extra-stat"></div>
							<h3 className="pokemon-abilities">Habilidades</h3>
							<div className="abilities-container">
								{pokemon?.abilities?.map((data) => (
									<span key={data.ability.name} className="pokemon-ability-box">
										{data.ability.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
