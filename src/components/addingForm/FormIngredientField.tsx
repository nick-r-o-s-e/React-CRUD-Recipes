import React, { useState } from "react";
import Recipe from "../../assets/types/Recipe";

interface Props {
  data: Recipe;
  setData: Function;
  id: number;
  deleteIngredient: Function;
  changeData: Function
}

function FormIngredientField({ data, setData, id, deleteIngredient, changeData }: Props) {
  return (
    <div className="input-group mb-3 ingredient-form-input">
      <input
        type="text"
        className="form-control form-ingredient-quantity"
        placeholder="Quantity"
        aria-label="Quantity"
        value={data.ingredients[id][0]}
        onChange={(e) => {
          const ingredients = [...data.ingredients];
          const ingredient = [...ingredients[id]];
          ingredient[0] = (e.target as HTMLInputElement).value;
          ingredients[id] = ingredient;

          setData((prevVal: Recipe) => {
            return { ...prevVal, ingredients: ingredients };
          });
        }}
        required
      />

      <input
        type="text"
        className="form-control form-ingredient-text"
        placeholder="Ingredient"
        aria-label="Ingredient"
        value={data.ingredients[id][1]}
        onChange={(e) => {
          const ingredients = [...data.ingredients];
          const ingredient = [...ingredients[id]];
          ingredient[1] = e.target.value;
          ingredients[id] = ingredient;
          changeData(ingredients)
          // setData((prevVal: Recipe) => {
          //   return { ...prevVal, ingredients: ingredients };
          // });
        }}
        required
      />
      <button
        onClick={() => {
          deleteIngredient(id);
        }}
        className="delete-ingredient btn btn-outline-secondary"
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

export default FormIngredientField;
