import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Field, Form } from "react-final-form";

const AddForm = ({ fetchData }) => {
  const onSubmit = (values, form) => {
    addNewTask(values);
    form.reset();
  };

  const addNewTask = (values) => {
    axios
      .post("http://localhost:8000/todos", {
        id: uuidv4(),
        title: values.title,
        owner: values.owner,
        location: values.location,
        completed: false,
        edited: false,
      })
      .then(function (response) {
        fetchData();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            component="input"
            type="text"
            className="task-input"
            placeholder="add a title..."
            required
          />

          <Field
            name="owner"
            component="input"
            type="text"
            className="task-input"
            placeholder="add a owner..."
            required
          />

          <Field
            name="location"
            component="input"
            type="text"
            className="task-input"
            placeholder="add a location..."
            required
          />

          <button type="submit" className="button-add">
            add
          </button>
        </form>
      )}
    />
  );
};

export default AddForm;
