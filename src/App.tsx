import "./App.css";
import { Provider, useDispatch } from "react-redux";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import store from "./store";
import { useEffect } from "react";

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<div className='container'>
					<h1>Todolist</h1>
					<TodoInput />
					<TodoList />
				</div>
			</div>
		</Provider>
	);
}

export default App;
