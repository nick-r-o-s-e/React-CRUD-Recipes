import { useState } from "react";
import Recipe from "../../assets/types/Recipe";

interface Props {
  data: Recipe;
  i: number;
  deleteDirection: Function;
  onChange: Function;
}

function FormDirectionField({ data, i, deleteDirection, onChange }: Props) {
  const [directions, setDirections] = useState<string[]>(data.directions);

  return (
    <div className="input-group mb-3 direction-form-input">
      <div className="form-control">
        <label htmlFor="floatingTextarea2">Step {i + 1}</label>

        <textarea
          className="form-control form-direction"
          id="floatingTextarea2"
          style={{ height: "100px" }}
          value={directions[i]}
          required
          onChange={(e) => {
            setDirections((prevVal) => {
              const temp = [...prevVal];
              temp[i] = (e.target as HTMLTextAreaElement).value;

              return temp;
            });

            onChange(e, i);
          }}
        ></textarea>
        <i
          className="delete-direction fa-solid fa-trash-can"
          onClick={() => {
            deleteDirection(i);
          }}
        ></i>
      </div>
    </div>
  );
}

export default FormDirectionField;
