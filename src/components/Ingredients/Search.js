import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(() => {
  const [enteredFilter, setEnteredFilter] = useState("");
  //   const { onLoadIngredients } = props;
  const inputRef = useRef();
  //   const filterData = async () => {
  //     if (enteredFilter === inputRef.current.value) {
  //       try {
  //         const queryParams = enteredFilter
  //           ? `?orderBy="title"&equalTo="${enteredFilter}"`
  //           : "";
  //         const res = await fetch(
  //           `https://dummy-project-a6a61-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json${queryParams}`
  //         );
  //         const { status: responseStatus } = res;

  //         if (responseStatus === 200 || responseStatus === 201) {
  //           const responseBody = await res.json();
  //           const loadedData = [];
  //           Object.keys(responseBody).forEach((key) =>
  //             loadedData.push({ id: key, ...responseBody[key] })
  //           );
  //           onLoadIngredients(loadedData);
  //         }
  //       } catch (error) {
  //         throw new Error("Something went wrong");
  //       }
  //     }
  //   };
  //   useEffect(() => {
  //     const timer = setTimeout(filterData, 500);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, [enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label id="textLabel" htmlFor="text">
            Filter by Title
          </label>
          <input
            ref={inputRef}
            type="text"
            id="text"
            aria-labelledby="textLabel"
            value={enteredFilter}
            onChange={(e) => setEnteredFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
