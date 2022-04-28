import dayjs from 'dayjs'
import type { todo } from './interfaces';
import { todoList, categoryID, apiBaseUrl, categoryTEXT } from './lib/stores';
export let todos: Array<todo> = [];
let payloadApiBaseUrl = ''
apiBaseUrl.subscribe(value => {
	payloadApiBaseUrl = value;
});

export async function getToDo(categoryId: number, userId: number) {
	todos = []
	const response = await fetch(`${payloadApiBaseUrl}/todo`, {
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
	categoryID.set(categoryId)
	todoList.set(todos)
}
export async function addToDo(categoryId: number, todoText: string, todoDate: Date,
	userId: number) {
	await fetch(`${payloadApiBaseUrl}/addtodo`, {
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
