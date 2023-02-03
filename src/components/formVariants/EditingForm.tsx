import { useState } from "react";
import axios from "axios";

import Form from "../form/Form";
import Recipe from "../../assets/types/Recipe";

interface Props {
  state: Boolean;
  setState: Function;
  setRecipes: Function;
  recipe: Recipe;
}

const EditingForm = ({ state, setState, setRecipes, recipe }: Props) => {
  const [data, setData] = useState(recipe);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setState(false);

    axios.patch(`http://localhost:3004/recipes/${data.id}`, data);

    setRecipes((prevPecipes: Recipe[]) => {
      const recipes = [...prevPecipes].map((recipe) => {
        if (recipe.id == data.id) {
          return data;
        } else {
          return recipe;
        }
      });
      return recipes;
    });
  };

  return (
    <Form
      state={state}
      setState={setState}
      data={data}
      setData={setData}
      submitForm={submitForm}
    />
  );
};

export default EditingForm;
