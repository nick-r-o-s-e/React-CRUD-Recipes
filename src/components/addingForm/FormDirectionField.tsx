import Recipe from "../../assets/types/Recipe";
interface Props {
  data: Recipe;
  setData: Function;
  id: number;
  deleteDirection: Function;
}

function FormDirectionField({ data, setData, id, deleteDirection }: Props) {
  return (
    <div className="input-group mb-3 direction-form-input">
      <div className="form-floating">
        <textarea
          className="form-control form-direction"
          placeholder="Step 1"
          id="floatingTextarea2"
          style={{ height: "100px" }}
          value={data.directions[id]}
          onChange={(e) => {
            const directions = [...data.directions];
            directions[id] = e.target.value;
            setData({ ...data, directions: directions });
          }}
          required
        ></textarea>
        <i
          onClick={() => {
            deleteDirection(id);
          }}
          className="delete-direction fa-solid fa-trash-can"
        ></i>
        <label htmlFor="floatingTextarea2">Step {id + 1}</label>
      </div>
    </div>
  );
}

export default FormDirectionField;
