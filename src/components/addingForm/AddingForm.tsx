import React, { useEffect, useState } from "react";
import Recipe from "../../assets/types/Recipe";
import FormIngredientField from "./FormIngredientField";
import FormDirectionField from "./FormDirectionField";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./Form.scss";

interface Props {
  state: boolean;
  setState: Function;
  setRecipes: Function;
}

function AddingForm({ state, setState, setRecipes }: Props) {
  const [data, setData] = useState({
    image: "",
    title: "",
    ingredients: [["", ""]],
    prepTime: "",
    coocTime: "",
    servings: "",
    directions: [""],
  });

  const hideForm = (target: HTMLElement) => {
    if ((target as HTMLElement).contains(target.querySelector("form"))) {
      setState(false);
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(false);
    setRecipes((prevPecipes: Recipe[]) => [...prevPecipes, data]);
    setData({
      image: "",
      title: "",
      ingredients: [["", ""]],
      prepTime: "",
      coocTime: "",
      servings: "",
      directions: [""],
    });
    axios.post("http://localhost:3004/recipes", data);
  };

  const addIngredientInput = () => {
    setData((prevVal) => {
      const newDataIngredients = [...data.ingredients, ["", ""]];
      return { ...prevVal, ingredients: newDataIngredients };
    });
  };
  const addDirectionInput = () => {
    setData((prevVal) => {
      const newDataDirections = [...data.directions, ""];
      return { ...prevVal, directions: newDataDirections };
    });
  };

  const deleteDirection = (id: number):void => {
    if (data.directions.length > 1) {
      setData((prevVal) => {
        const newDataDirections = [...data.directions].filter(
          (dir, i) => i != id
        );
        return { ...prevVal, directions: newDataDirections };
      });
    }
  };
  const deleteIngredient = (id: number):void => {
    if (data.ingredients.length > 1) {
      setData((prevVal) => {
        const newDataIngredients = [...data.ingredients].filter(
          (ing, i) => i != id
        );
        return { ...prevVal, ingredients: newDataIngredients };
      });
    }
  };

  return (
    <div
      className="expanded-div"
      style={{ display: state ? "block" : "none" }}
      onClick={(e) => {
        hideForm(e.target as HTMLElement);
      }}
    >
      <form
        action="submit"
        className="new-recipe-form"
        id="add-recipe"
        onSubmit={(e) => submitForm(e)}
      >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-title"
            id="floatingInput"
            placeholder="Title"
            value={data.title}
            onChange={(e) => {
              setData({ ...data, title: e.target.value });
            }}
            required
          />
          <label htmlFor="floatingInput">Title</label>
        </div>

        <hr />

        <div className="input-group mb-3 form-image-url-div">
          <span className="input-group-text" id="basic-addon1">
            URL
          </span>
          <input
            type="text"
            className="form-control form-image-url-input"
            placeholder="Image URL"
            aria-label="ImageUrl"
            aria-describedby="basic-addon1"
            value={data.image}
            onChange={(e) => {
              setData({ ...data, image: e.target.value });
            }}
          />
        </div>

        <hr />

        <div className="form-details">
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Servings
            </span>
            <input
              type="text"
              className="form-control rounded-right form-servings"
              aria-label="Servings input"
              aria-describedby="inputGroup-sizing-default"
              value={data.servings}
              onChange={(e) => {
                setData({ ...data, servings: e.target.value });
              }}
              required
            />
            <span>qty</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Prep time
            </span>
            <input
              type="text"
              className="form-control form-prep-time"
              aria-label="Prep time input"
              aria-describedby="inputGroup-sizing-default"
              value={data.prepTime}
              onChange={(e) => {
                setData({ ...data, prepTime: e.target.value });
              }}
              required
            />
            <span>mins</span>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Cooc time
            </span>
            <input
              type="text"
              className="form-control form-cooc-time"
              aria-label="Cooc time input"
              aria-describedby="inputGroup-sizing-default"
              value={data.coocTime}
              onChange={(e) => {
                setData({ ...data, coocTime: e.target.value });
              }}
              required
            />
            <span>mins</span>
          </div>
        </div>

        <hr />

        <div className="main-content">
          <div className="form-ingredients">
            <h3>Ingredients</h3>
            <div className="ingredients-fields">
              {data.ingredients.map((ingredient, i) => {
                return (
                  <FormIngredientField
                    key={uuidv4()}
                    id={i}
                    data={data}
                    setData={setData}
                    deleteIngredient={deleteIngredient}
                    changeData={(ingredients: string[][]) => {
                      setData((prevVal) => {
                        return { ...prevVal, ingredients: ingredients };
                      });
                    }}
                  />
                );
              })}
            </div>

            <i
              onClick={addIngredientInput}
              className="add-ingredient fa-solid fa-circle-plus"
            ></i>
          </div>
          <div className="form-directions">
            <h3>Directions</h3>
            <div className="directions-fields">
              {data.directions.map((direction, i) => {
                return (
                  <FormDirectionField
                    key={uuidv4()}
                    data={data}
                    setData={setData}
                    id={i}
                    deleteDirection={deleteDirection}
                  />
                );
              })}
            </div>

            <i
              className="add-direction fa-solid fa-circle-plus"
              onClick={addDirectionInput}
            ></i>
          </div>
        </div>
        <button className="btn btn-dark" type="submit">
          Submit form
        </button>
      </form>
    </div>
  );
}

export default AddingForm;
