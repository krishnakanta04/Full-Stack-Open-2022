import { updateFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      filter <input name="search" onChange={handleChange} />
    </div>
  );
};

export default Filter;
