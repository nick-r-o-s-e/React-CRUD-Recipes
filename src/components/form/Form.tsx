import { v4 as uuidv4 } from "uuid";
import Recipe from "../../assets/types/Recipe";
import FormIngredientField from "./FormIngredientField";
import FormDirectionField from "./FormDirectionField";
import "./Form.scss";

interface Props {
  state: Boolean;
  setState: Function;
  data: Recipe;
  setData: Function;
  submitForm: Function;
}

function Form({ state, setState, data, submitForm, setData }: Props) {
  const hideForm = (target: HTMLElement) => {
    if ((target as HTMLElement).contains(target.querySelector("form"))) {
      setState(false);
    }
  };

  const deleteDirection = (id: number): void => {
    if (data.directions.length > 1) {
      setData((prevVal: Recipe) => {
        const newDataDirections = [...data.directions].filter(
          (_, i) => i != id
        );
        return { ...prevVal, directions: newDataDirections };
      });
    }
  };

  const deleteIngredient = (id: number): void => {
    if (data.ingredients.length > 1) {
      setData((prevVal: Recipe) => {
        const newDataIngredients = [...data.ingredients].filter(
          (_, i) => i != id
        );
        return { ...prevVal, ingredients: newDataIngredients };
      });
    }
  };

  const addIngredientInput = () => {
    setData((prevVal: Recipe) => {
      const newDataIngredients = [...data.ingredients, ["", ""]];
      return { ...prevVal, ingredients: newDataIngredients };
    });
  };

  const addDirectionInput = () => {
    setData((prevVal: Recipe) => {
      const newDataDirections = [...data.directions, ""];
      return { ...prevVal, directions: newDataDirections };
    });
  };

  const handleInputChange = (e: Event, i: number, item: number) => {
    const ingredients: string[][] = data.ingredients;
    ingredients[i][item] = (e.target as HTMLInputElement).value;
    data.ingredients = ingredients;
  };

  const handleDirectionChange = (e: Event, i: number) => {
    const directions: string[] = data.directions;
    directions[i] = (e.target as HTMLTextAreaElement).value;
    data.directions = directions;
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
        <div className="form-floating mb-3 title-input-div">
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
              {data.ingredients.map((_, i) => {
                return (
                  <FormIngredientField
                    key={uuidv4()}
                    id={i}
                    data={data}
                    deleteIngredient={deleteIngredient}
                    onChange={handleInputChange}
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
              {data.directions.map((_, i) => {
                return (
                  <FormDirectionField
                    key={uuidv4()}
                    data={data}
                    i={i}
                    deleteDirection={deleteDirection}
                    onChange={handleDirectionChange}
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

export default Form;
