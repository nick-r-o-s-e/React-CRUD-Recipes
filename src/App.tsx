import { useState } from "react";
import "./App.scss";
import Card from "./components/Card";
import AddingCard from "./components/AddingCard";
import AddingForm from "./components/addingForm/AddingForm";
import axios from "axios";
import Recipe from "./assets/types/Recipe";
import { v4 as uuidv4 } from "uuid";

const getPosts = () => {
  return axios.get("http://localhost:3004/recipes").then(({ data }) => data);
};
const data = await getPosts().then((data) => data);

function App() {
  const [recipes, setRecipes] = useState(data);

  const [formState, setFormState] = useState(false);

  return (
    <div className="main-container">
      <h1>Sweet Recipes</h1>
      <div className="cards-container">
        {recipes.map((recipe: Recipe, key: string) => {
          return (
            <Card key={uuidv4()} recipe={recipe} setRecipes={setRecipes} />
          );
        })}

        <AddingCard setFormState={setFormState} />
      </div>
      <AddingForm
        state={formState}
        setState={setFormState}
        setRecipes={setRecipes}
      />
    </div>
  );
}

export default App;
