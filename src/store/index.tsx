import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todo";
import { createEpicMiddleware } from "redux-observable";
import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { catchError, map, mergeMap, of } from "rxjs";

const addTodoEpic = (action$: any) =>
	action$.pipe(
		ofType("todo/addTodo"),
		mergeMap((action: any) =>
			ajax
				.post("http://localhost:3000/tasks", {
					text: action.payload,
					completed: false,
				})
				.pipe(
					map((response: any) => ({
						type: "todo/addTodoSuccess",
						payload: response.response,
					})),
					catchError((error: any) =>
						of({
							type: "todo/addTodoError",
							payload: error.xhr.response,
							error: true,
						})
					)
				)
		)
	);

const loadDataEpic = (action$: any) =>
	action$.pipe(
		ofType("todo/loadData"),
		mergeMap(() =>
			ajax.getJSON("http://localhost:3000/tasks").pipe(
				map((response: any) => ({
					type: "todo/loadDataSuccess",
					payload: response,
				})),
				catchError((error: any) =>
					of({
						type: "todo/loadDataError",
						payload: error.xhr.response,
						error: true,
					})
				)
			)
		)
	);

const removeTodoEpic = (action$: any) =>
	action$.pipe(
		ofType("todo/removeTodo"),
		mergeMap((action: any) =>
			ajax.delete(`http://localhost:3000/tasks/${action.payload}`).pipe(
				map((response: any) => ({
					type: "todo/removeTodoSuccess",
					payload: action.payload,
				})),
				catchError((error: any) =>
					of({
						type: "todo/removeTodoError",
						payload: error.xhr.response,
						error: true,
					})
				)
			)
		)
	);

const toggleTodoEpic = (action$: any) =>
	action$.pipe(
		ofType("todo/toggleTodo"),
		mergeMap((action: any) =>
			ajax
				.patch(`http://localhost:3000/tasks/${action.payload}`, {
					completed: true,
				})
				.pipe(
					map((response: any) => ({
						type: "todo/toggleTodoSuccess",
						payload: action.payload,
					})),
					catchError((error: any) =>
						of({
							type: "todo/toggleTodoError",
							payload: error.xhr.response,
							error: true,
						})
					)
				)
		)
	);

export const epicMiddleware = createEpicMiddleware();

export default configureStore({
	reducer: {
		todos: todosReducer,
	},
	middleware: [epicMiddleware],
});

epicMiddleware.run(addTodoEpic);
epicMiddleware.run(loadDataEpic);
epicMiddleware.run(removeTodoEpic);
epicMiddleware.run(toggleTodoEpic);
