import dayjs from 'dayjs';
import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.min.css';

import type { todo } from '../interfacess';
import { todoList, categoryID, apiBaseUrl } from '$lib/stores';

export let todos: Array<todo> = [];
let payloadApiBaseUrl = '';
apiBaseUrl.subscribe((value) => {
	payloadApiBaseUrl = value;
});

export async function getToDo(categoryId: number, userId: number) {
	todos = [];
	const response = await fetch(`${payloadApiBaseUrl}/todo`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'githubId': userId,
			'categoryId': categoryId
		}
	});
	if (response.status === 200) {
		const payload = await response.json();
		todos = payload.data;
		if (todos !== undefined) {
			todos.forEach((todo) => {
				todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm');
			});
		}
	}
	categoryID.set(categoryId);
	todoList.set(todos);
}
export async function addToDo(
	categoryId: number,
	todoText: string,
	todoDate: Date,
	userId: number
) {
	console.log('addToDo')
	await fetch(`${payloadApiBaseUrl}/todo`, {
		method: 'POST',
		body: JSON.stringify({
			text: todoText,
			targetDate: todoDate,
			categoryId: categoryId
		}),
		headers: {
			'content-type': 'application/json',
			'githubId': userId,
		}
	});
}
export async function clickToDo(todoItem: todo, event: MouseEvent, userId: number) {
	todoItem.completed = !todoItem.completed;

	await fetch(`${payloadApiBaseUrl}/todo`, {
		method: 'PUT',
		body: JSON.stringify({
			id: todoItem.id
		}),
		headers: {
			'content-type': 'application/json',
			'githubId': userId,
		}
	});
	const target = event.target as HTMLElement;
	if (target !== null) {
		const todoElement = target.closest('.todoItem') as HTMLDivElement;
		if (todoElement !== null) {
			const categoryId = todoElement.getAttribute('data-categoryid');
			if (categoryId !== null) {
				await getToDo(parseInt(categoryId), userId);
			}
			successToast(todoItem);
		}
	}
}
async function successToast(todoItem: todo) {
	let title: string;
	let text: string;
	if (todoItem.completed) {
		title = 'Completed! 🥳🎉';
		text = `Complete ${todoItem.text}`;
	} else {
		title = 'Uncompleted! 😥🤦‍♀️';
		text = `Uncomplete ${todoItem.text}`;
	}
	new Notify({
		status: 'success',
		title: title,
		text: text,
		effect: 'slide',
		speed: 300,
		customClass: '',
		customIcon: '',
		showIcon: true,
		showCloseButton: true,
		autoclose: true,
		autotimeout: 3000,
		gap: 20,
		distance: 20,
		type: 1,
		position: 'right bottom'
	});
}
