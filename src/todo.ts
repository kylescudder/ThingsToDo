import dayjs from 'dayjs'
import type { todo } from './interfaces';
export let todos: Array<todo> = [];

export async function getToDo(categoryId: number, apiBaseUrl: string, userId: number) {
	todos = []
	const response = await fetch(`${apiBaseUrl}/todo`, {
		method: "POST",
		body: JSON.stringify({
			githubId: userId,
			categoryId: categoryId
		}),
		headers: {
			"content-type": "application/json",
		},
	});
	if (response.status === 200) {
		const payload = await response.json();
		todos = payload.data;
		if (todos !== undefined) {
			todos.forEach(todo => {
				todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm')
			});
		}
	}
	return todos;
}
export async function addToDo(categoryId: number, todoText: string, todoDate: Date,
	apiBaseUrl: string, userId: number) {
	await fetch(`${apiBaseUrl}/addtodo`, {
		method: "POST",
		body: JSON.stringify({
			githubId: userId,
			text: todoText,
			targetDate: todoDate,
			categoryId: categoryId

		}),
		headers: {
			"content-type": "application/json",
		},
	});
}
