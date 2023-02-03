import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Recipe from "../../assets/types/Recipe";
import Form from "../form/Form";

interface Props {
  state: boolean;
  setState: Function;
  setRecipes: Function;
  recipeToEdit: Recipe | undefined;
}

function AddingForm({ state, setState, setRecipes, recipeToEdit }: Props) {
  const [data, setData] = useState(
    recipeToEdit
      ? recipeToEdit
      : {
          id: uuidv4(),
          image: "",
          title: "",
          ingredients: [["", ""]],
          prepTime: "",
          coocTime: "",
          servings: "",
          directions: [""],
        }
  );

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setState(false);

    axios.post("http://localhost:3004/recipes", data);

    setRecipes((prevPecipes: Recipe[]) => [
      ...prevPecipes,
      {
        ...data,
        prepTime: data.prepTime + "mins",
        coocTime: data.coocTime + "mins",
      },
    ]);

    setData({
      id: uuidv4(),
      image: "",
      title: "",
      ingredients: [["", ""]],
      prepTime: "",
      coocTime: "",
      servings: "",
      directions: [""],
    });
  }

  return (
    <Form
      state={state}
      setState={setState}
      data={data}
      setData={setData}
      submitForm={submitForm}
    />
  );
}

export default AddingForm;
