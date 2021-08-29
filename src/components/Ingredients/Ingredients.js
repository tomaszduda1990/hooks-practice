import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
	const [ingredients, setIngredients] = useState([]);
	useEffect(() => {
		console.log('ingredients changed');
	}, [ingredients]);
	const addIngredient = async (ing) => {
		const res = await fetch(
			'https://dummy-project-a6a61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(ing),
			}
		);
		const { status: responseStatus } = res;
		const responseBody = await res.json();
		if (responseStatus === 200 || responseStatus === 201)
			setIngredients((prevState) => [
				...prevState,
				{ id: responseBody.name, ...ing },
			]);
	};
	const removeIngredient = (id) => {
		setIngredients((prevState) => prevState.filter((ing) => ing.id !== id));
	};
	const onLoadIngredientsHandler = useCallback((filteredIngridients) => {
		setIngredients(filteredIngridients);
	}, []);
	return (
		<div className='App'>
			<IngredientForm addIngredient={addIngredient} ingredients={ingredients} />

			<section>
				<Search onLoadIngredients={onLoadIngredientsHandler} />
				{/* Need to add list here! */}
				{ingredients.length && (
					<IngredientList
						ingredients={ingredients}
						removeIngredient={removeIngredient}
					/>
				)}
			</section>
		</div>
	);
}

export default Ingredients;
