import { useState } from "react";
import { useDispatch } from "react-redux";

export const TodoInput = () => {
	const [text, setText] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: "todo/addTodo", payload: text });
		setText("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				id='text'
				name='text'
				placeholder='Task'
				required
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button type='submit'>Submit</button>
		</form>
	);
};
