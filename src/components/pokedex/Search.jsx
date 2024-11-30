import React, { useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

function Search({ handleSearch }) {
	const inputRef = useRef();

	const onSearch = () => {
		handleSearch(inputRef.current.value.toLowerCase().trim());
		inputRef.current.value = '';
	};

	return (
		<div className="search">
			<div className="search__input">
				<IoSearchOutline />
				<input
					className="search-component"
					type="text"
					placeholder="Buscar un pokemón"
					ref={inputRef}
				/>
			</div>
			<button className="filters-component" onClick={onSearch}>
				Buscar
			</button>
		</div>
	);
}

export default Search;
