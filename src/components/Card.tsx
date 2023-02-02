import React, { useState } from "react";
import Recipe from "../assets/types/Recipe";
import ExpandedCard from "./expandedCard/ExpandedCard";

interface Props {
  recipe: Recipe;
  setRecipes: Function;
}

function Card({ recipe, setRecipes }: Props) {
  const [expanded, setExpanded] = useState(false);

  const showExpandedCard = () => {
    setExpanded(true);
  };

  return (
    <div className="card">
      <div
        className="card-image-top"
        style={{ backgroundImage: `url(${recipe.image})` }}
      ></div>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <hr />
        <div className="card-details">
          <div className="card-detail">
            <h5>Ingredients:</h5>
            <p className="card-text">{recipe.ingredients.length}</p>
          </div>
          <div className="card-detail">
            <h5>Servings:</h5>
            <p className="card-text">{recipe.servings}</p>
          </div>
          <div className="card-detail">
            <h5>Prep Time:</h5>
            <p className="card-text">{recipe.prepTime}</p>
          </div>
          <div className="card-detail">
            <h5>Cooc Time:</h5>
            <p className="card-text">{recipe.coocTime}</p>
          </div>
        </div>
      </div>
      <button className="read-more-btn" onClick={showExpandedCard}>
        <i className="fa-solid fa-book-open"></i>
      </button>
      <ExpandedCard
        recipe={recipe}
        expanded={expanded}
        setExpanded={setExpanded}
        setRecipes={setRecipes}
      />
    </div>
  );
}

export default Card;
