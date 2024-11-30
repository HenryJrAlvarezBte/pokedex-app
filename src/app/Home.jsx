import { useRef } from 'react';
import { types, useNameContext } from '../contexts/nameContext';

import { Link, useNavigate } from 'react-router-dom';

function Home() {
	const inputRef = useRef();
	const [name, dispatch] = useNameContext();
	const navigate = useNavigate();

	const setName = () => {
		dispatch({ type: types.SET_NAME, payload: inputRef.current.value.trim() });
		inputRef.current.value = '';
		navigate('pokedex');
	};

	const clearName = () => {
		dispatch({ type: types.SET_NAME, payload: '' });
	};

	return (
		<>
			<img
				className="home-pokedex-title"
				src="../../public/pokedex-title.png"
				alt="pokedex title"
			/>
			<div className="home">
				<h2 className="title-welcome">
					¡Hola {name ? <>de nuevo, {name}</> : 'Entrenador'}!
				</h2>
				<div>
					{name ? (
						<>
							<p>¡Continuemos con tu viaje!</p>
							<br />
							<p className="back-pokedex">
								Ve a tu <Link to="/pokedex">Pokédex</Link>
							</p>
							<br />
							<button className="btn-go-out" onClick={clearName}>
								Salir
							</button>
						</>
					) : (
						<>
							<p className="begin-welcome">
								Para poder comenzar, dame tu nombre
							</p>
							<input
								className="input-name"
								ref={inputRef}
								type="text"
								placeholder="Tu nombre..."
							/>
							<button className="btn-begin" onClick={setName}>
								Comenzar
							</button>
						</>
					)}
				</div>
				<img
					className="img-home-bar"
					src="../../public/home-bar.png"
					alt="home bar"
				/>
			</div>
		</>
	);
}

export { Home };
