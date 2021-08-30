import React, { useReducer, useCallback, useEffect } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

function Ingredients() {
  const [ingredientsState, dispatchIng] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  const loadData = async () => {
    try {
      const res = await fetch(
        `https://dummy-project-a6a61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json`
      );
      const { status: responseStatus } = res;

      if (responseStatus === 200 || responseStatus === 201) {
        const responseBody = await res.json();
        if (responseBody) {
          const loadedData = [];
          Object.keys(responseBody).forEach((key) =>
            loadedData.push({ id: responseBody[key].id, ...responseBody[key] })
          );
          dispatchIng({
            type: "SET",
            ingredients: loadedData,
          });
          dispatchHttp({
            type: "RESPONSE",
          });
        }
      }
    } catch (error) {
      dispatchHttp({ type: "ERROR" });
      throw new Error("Something went wrong");
    }
  };
  const addIngredient = useCallback(async (ing) => {
    try {
      dispatchHttp({
        type: "SEND",
      });
      const res = await fetch(
        "https://dummy-project-a6a61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ing),
        }
      );
      const { status: responseStatus } = res;
      if (responseStatus === 200 || responseStatus === 201) {
        dispatchIng({
          type: "ADD",
          ingredient: ing,
        });
        dispatchHttp({
          type: "RESPONSE",
        });
      }
    } catch (error) {
      dispatchHttp({
        type: "ERROR",
        errorMessage: error.message,
      });
    }
  });
  const removeIngredient = useCallback(async (id) => {
    try {
      dispatchHttp({
        type: "SEND",
      });
      const res = await fetch(
        `https://dummy-project-a6a61-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 200 || res.status === 201) {
        dispatchIng({ type: "DELETE", id });
        dispatchHttp({
          type: "RESPONSE",
        });
      }
    } catch (error) {
      dispatchHttp({
        type: "ERROR",
        errorMessage: error.message,
      });
    }
  }, []);
  const onLoadIngredientsHandler = useCallback((filteredIngridients) => {
    dispatchIng({ type: "SET", ingredients: filteredIngridients });
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal
          onClose={() => {
            dispatchHttp({ type: "CLEAR" });
          }}
        >
          <p>{httpState.error}</p>
        </ErrorModal>
      )}
      <IngredientForm
        addIngredient={addIngredient}
        ingredients={ingredientsState}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={onLoadIngredientsHandler} />
        {/* Need to add list here! */}
        {ingredientsState.length > 0 && (
          <IngredientList
            ingredients={ingredientsState}
            removeIngredient={removeIngredient}
          />
        )}
      </section>
    </div>
  );
}

export default Ingredients;
