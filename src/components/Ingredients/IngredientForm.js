/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo(({ addIngredient, loading }) => {
  const [formData, formDataUpdate] = useState({
    title: "",
    amount: "",
  });
  const submitHandler = (event) => {
    event.preventDefault();
    addIngredient(formData);
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    formDataUpdate((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              onChange={(e) => onChange(e)}
              value={formData.title}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              onChange={(e) => onChange(e)}
              value={formData.amount}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
