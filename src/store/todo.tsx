import { createSlice } from "@reduxjs/toolkit";

export type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

export type TodoState = {
	todos: Todo[];
	loading: boolean;
	error: null | string;
};

const initialState: TodoState = {
	todos: [],
	loading: false,
	error: null,
};

const reducers = {
	removeTodoSuccess: (state: TodoState, action: { payload: number }) => {
		state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		return state;
	},
	removeTodoError: (state: TodoState, action: { payload: string }) => {
		state.error = action.payload;
		return state;
	},
	toggleTodoSuccess: (state: TodoState, action: { payload: number }) => {
		state.todos = state.todos.map((todo) => {
			if (todo.id === action.payload) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		return state;
	},
	toggleTodoError: (state: TodoState, action: { payload: string }) => {
		state.error = action.payload;
		return state;
	},
	addTodoSuccess: (state: TodoState, action: { payload: Todo }) => {
		console.log("addTodoSuccess");
		state.todos = [...state.todos, action.payload];
		return state;
	},
	addTodoError: (state: TodoState, action: { payload: string }) => {
		console.log("addTodoError");
		state.error = action.payload;
		return state;
	},
	loadDataSuccess: (state: TodoState, action: { payload: Todo[] }) => {
		console.log("loadDataSuccess");
		state.todos = action.payload;
		return state;
	},
	loadDataError: (state: TodoState, action: { payload: string }) => {
		console.log("loadDataError");
		state.error = action.payload;
		return state;
	},
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers,
});

export default todoSlice.reducer;
