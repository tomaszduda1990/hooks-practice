import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
	const [enteredFilter, setEnteredFilter] = useState('');
	const { onLoadIngredients } = props;
	const inputRef = useRef();
	const filterData = async () => {
		if (enteredFilter === inputRef.current.value) {
			const queryParams = enteredFilter
				? `?orderBy="title"&equalTo="${enteredFilter}"`
				: '';
			const res = await fetch(
				'https://dummy-project-a6a61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' +
					queryParams
			);
			const { status: responseStatus } = res;

			if (responseStatus === 200 || responseStatus === 201) {
				const responseBody = await res.json();
				const loadedData = [];
				for (let key in responseBody) {
					loadedData.push({ id: key, ...responseBody[key] });
				}
				onLoadIngredients(loadedData);
			}
		}
	};
	useEffect(() => {
		const timer = setTimeout(filterData, 500);
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadIngredients, inputRef]);

	return (
		<section className='search'>
			<Card>
				<div className='search-input'>
					<label>Filter by Title</label>
					<input
						ref={inputRef}
						type='text'
						value={enteredFilter}
						onChange={(e) => setEnteredFilter(e.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
