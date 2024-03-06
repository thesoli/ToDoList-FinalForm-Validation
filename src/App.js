import { useEffect, useState } from "react";
import "./App.css";
import AddForm from "./Components/AddForm";
import Header from "./Components/Header";
import Todos from "./Components/Todos";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:8000/todos").then((response) => {
      setTodos(response.data);
      return response;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete
  const updateDelete = (id) => {
    deleteTask(id);
  };

  const deleteTask = (id) => {
    axios
      .delete("http://localhost:8000/todos/" + id)
      .then(function (response) {
        fetchData();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //complete
  const completedHandler = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>

        <div>
          <AddForm fetchData={fetchData} />
        </div>

        <div>
          <table>
            <span>
              {todos.map((todos) => {
                return (
                  <Todos
                    key={todos.id}
                    fetchData={fetchData}
                    setTodos={setTodos}
                    completedHandler={completedHandler}
                    todos={todos}
                    updateDelete={updateDelete}
                  />
                );
              })}
            </span>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
