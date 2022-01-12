import React, { useContext } from "react";

import AppContext from "./store/appContext";
import Container from "./components/ui/Container";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Bucket from "./components/Bucket";

import "./App.css";
import Auth from "./components/Auth";
import Button from "./components/ui/Button";
import Loader from "./components/ui/Loader";
import Snackbar from "./components/ui/Snackbar";

const App: React.FC = () => {
  const { user, isLoading } = useContext(AppContext);
  return (
    <Container>
      <Snackbar />
      <h1>TODO APP</h1>
      {user && <Button text="logout" />}
      {!user && <Auth />}

      {user && (
        <React.Fragment>
          <TodoForm />
          <div className="operations">
            {isLoading && <Loader />}
            <div className="lists-container">
              <TodoList isDoneTodoList={false} />
              <TodoList isDoneTodoList={true} />
            </div>
          </div>
          <Bucket />
        </React.Fragment>
      )}
    </Container>
  );
};

export default App;
