import { useState } from "react";
import Recipe from "../../assets/types/Recipe";

interface Props {
  data: Recipe;
  id: number;
  deleteIngredient: Function;
  onChange: Function;
}

function FormIngredientField({ data, id, deleteIngredient, onChange }: Props) {
  const [ingredients, setIngredients] = useState<string[][]>(data.ingredients);

  return (
    <div className="input-group mb-3 ingredient-form-input">
      <input
        type="text"
        className="form-control form-ingredient-quantity"
        placeholder="Quantity"
        aria-label="Quantity"
        value={ingredients[id][0]}
        required
        onChange={(e) => {
          setIngredients((prevVal) => {
            const temp = [...prevVal];
            temp[id][0] = (e.target as HTMLInputElement).value;

            return temp;
          });
          onChange(e, id, 0);
        }}
      />

      <input
        type="text"
        className="form-control form-ingredient-text"
        placeholder="Ingredient"
        aria-label="Ingredient"
        value={ingredients[id][1]}
        required
        onChange={(e) => {
          setIngredients((prevVal) => {
            const temp = [...prevVal];
            temp[id][1] = (e.target as HTMLInputElement).value;

            return temp;
          });
          onChange(e, id, 1);
        }}
      />
      <button
        className="delete-ingredient btn btn-outline-secondary"
        type="button"
        onClick={() => {
          deleteIngredient(id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default FormIngredientField;
