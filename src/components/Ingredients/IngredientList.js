import React from "react";

import "./IngredientList.css";

const IngredientList = ({ removeIngredient, ingredients }) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map((ig) => {
          return (
            <li key={`${ig.id}`}>
              <button type="button" onClick={() => removeIngredient(ig.id)}>
                remove
              </button>
              <span>{ig.title}</span>
              <span>{ig.amount}x</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default IngredientList;
