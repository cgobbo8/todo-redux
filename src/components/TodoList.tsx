import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../store/todo";

export const TodoList = () => {
	const dispatch = useDispatch();
	const todos: Todo[] = useSelector((state: any) => state.todos.todos);

	useEffect(() => {
		dispatch({ type: "todo/loadData" });
	}, []);

	return (
		<ul>
			{todos.map((todo) => (
				<li key={todo.id}>
					<input
						type='checkbox'
						checked={todo.completed}
						onChange={() =>
							dispatch({ type: "todo/toggleTodo", payload: todo.id })
						}
					/>
					<span
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
						}}
					>
						{todo.text}
					</span>
					<button
						onClick={() =>
							dispatch({ type: "todo/removeTodo", payload: todo.id })
						}
					>
						Remove
					</button>
				</li>
			))}
		</ul>
	);
};
