import { useState } from "react";
import axios from "axios";

import Card from "./components/cards/card/Card";
import AddingCard from "./components/cards/newRecipeCard/NewRecipeCard";
import AddingForm from "./components/formVariants/AddingForm";

import Recipe from "./assets/types/Recipe";
import "./App.scss";

const getPosts = () => {
  return axios.get("http://localhost:3004/recipes").then(({ data }) => data);
};

const data = await getPosts().then((data) => data);

function App() {
  const [recipes, setRecipes] = useState(data);

  const [formState, setFormState] = useState(false);

  return (
    <div className="main-container">
      <AddingForm
        state={formState}
        setState={setFormState}
        setRecipes={setRecipes}
        recipeToEdit={undefined}
      />

      <h1>Sweet Recipes</h1>

      <div className="cards-container">
        {recipes.map((recipe: Recipe, key: string) => {
          return (
            <div className="" key={recipe.id}>
              <Card
                key={recipe.id}
                id={recipe.id}
                recipe={recipe}
                setRecipes={setRecipes}
              />
            </div>
          );
        })}

        <AddingCard setFormState={setFormState} />
      </div>
    </div>
  );
}

export default App;
